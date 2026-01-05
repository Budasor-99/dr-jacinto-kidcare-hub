import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  child_name: string;
  appointment_date: string;
  appointment_time: string;
}

interface RescheduleDialogProps {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (appointmentId: string, newDate: string, newTime: string) => void;
}

const morningSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
const afternoonSlots = ["15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

const getTimeSlotsForDate = (date: Date | undefined): string[] => {
  if (!date) return [...morningSlots, ...afternoonSlots];
  const dayOfWeek = date.getDay();
  // Saturday (6) = morning only, Sunday (0) = none (already blocked)
  if (dayOfWeek === 6) return morningSlots;
  return [...morningSlots, ...afternoonSlots];
};

export const RescheduleDialog = ({
  appointment,
  open,
  onOpenChange,
  onSuccess,
}: RescheduleDialogProps) => {
  const { toast } = useToast();
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [newTime, setNewTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch occupied slots when date changes
  useEffect(() => {
    const fetchOccupiedSlots = async () => {
      if (!newDate || !appointment) {
        setOccupiedSlots([]);
        return;
      }

      setLoadingSlots(true);
      try {
        const formattedDate = format(newDate, "yyyy-MM-dd");
        const { data, error } = await supabase
          .from("appointments")
          .select("appointment_time")
          .eq("appointment_date", formattedDate)
          .neq("id", appointment.id)
          .in("status", ["pending", "confirmed"]);

        if (error) throw error;

        setOccupiedSlots(data?.map(apt => apt.appointment_time) || []);
      } catch (error) {
        console.error("Error fetching occupied slots:", error);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchOccupiedSlots();
  }, [newDate, appointment]);

  // Reset time if selected slot becomes occupied or unavailable for the day
  useEffect(() => {
    const availableSlots = getTimeSlotsForDate(newDate);
    if (newTime && (occupiedSlots.includes(newTime) || !availableSlots.includes(newTime))) {
      setNewTime("");
    }
  }, [occupiedSlots, newTime, newDate]);

  const handleReschedule = async () => {
    if (!appointment || !newDate || !newTime) {
      toast({
        title: "Campos requeridos",
        description: "Por favor selecciona una nueva fecha y hora",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedDate = format(newDate, "yyyy-MM-dd");

      // Check availability first
      const { data: existingAppointments, error: checkError } = await supabase
        .from("appointments")
        .select("id")
        .eq("appointment_date", formattedDate)
        .eq("appointment_time", newTime)
        .neq("id", appointment.id)
        .in("status", ["pending", "confirmed"]);

      if (checkError) throw checkError;

      if (existingAppointments && existingAppointments.length > 0) {
        toast({
          title: "Horario no disponible",
          description: "Ya existe una cita programada para esa fecha y hora. Por favor selecciona otro horario.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from("appointments")
        .update({
          appointment_date: formattedDate,
          appointment_time: newTime,
        })
        .eq("id", appointment.id);

      if (error) throw error;

      onSuccess(appointment.id, formattedDate, newTime);

      toast({
        title: "Cita reagendada",
        description: "Su cita ha sido reagendada exitosamente",
      });

      setNewDate(undefined);
      setNewTime("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error rescheduling:", error);
      toast({
        title: "Error",
        description: "No se pudo reagendar la cita",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setNewDate(undefined);
    setNewTime("");
    setOccupiedSlots([]);
    onOpenChange(false);
  };

  // Disable past dates and weekends
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reagendar Cita</DialogTitle>
          <DialogDescription>
            Selecciona una nueva fecha y hora para la cita de {appointment.child_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Current appointment info */}
          <div className="rounded-lg bg-muted p-3 space-y-1">
            <p className="text-sm font-medium">Fecha actual:</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(appointment.appointment_date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })} a las {appointment.appointment_time}
            </p>
          </div>

          {/* New date picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Nueva fecha</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !newDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newDate ? format(newDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={newDate}
                  onSelect={setNewDate}
                  disabled={disabledDays}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* New time picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Nueva hora</label>
            <Select value={newTime} onValueChange={setNewTime} disabled={!newDate || loadingSlots}>
              <SelectTrigger className="w-full">
                {loadingSlots ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Clock className="mr-2 h-4 w-4" />
                )}
                <SelectValue placeholder={loadingSlots ? "Cargando horarios..." : "Seleccionar hora"} />
              </SelectTrigger>
              <SelectContent className="bg-background">
                {getTimeSlotsForDate(newDate).map((time) => {
                  const isOccupied = occupiedSlots.includes(time);
                  return (
                    <SelectItem
                      key={time}
                      value={time}
                      disabled={isOccupied}
                      className={cn(
                        isOccupied && "text-muted-foreground line-through opacity-50"
                      )}
                    >
                      {time} {isOccupied && "(Ocupado)"}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {newDate && !loadingSlots && occupiedSlots.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Los horarios tachados ya están ocupados
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleReschedule} disabled={isSubmitting || !newDate || !newTime}>
            {isSubmitting ? "Reagendando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
