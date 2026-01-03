import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
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

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

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

      // Reset state
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
            <Select value={newTime} onValueChange={setNewTime}>
              <SelectTrigger className="w-full">
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Seleccionar hora" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
