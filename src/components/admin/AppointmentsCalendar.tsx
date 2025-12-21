import { useState, useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Clock, Baby, User, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  parent_name: string;
  child_name: string;
  child_age: string;
  phone: string;
  email: string;
  appointment_date: string;
  appointment_time: string;
  reason: string | null;
  status: string;
}

interface AppointmentsCalendarProps {
  appointments: Appointment[];
  onStatusChange: (id: string, status: string) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  confirmed: "bg-green-500",
  completed: "bg-blue-500",
  cancelled: "bg-red-500",
};

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
};

const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const AppointmentsCalendar = ({ appointments, onStatusChange }: AppointmentsCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the starting day of the week (0 = Sunday)
  const startDay = getDay(monthStart);

  // Group appointments by date
  const appointmentsByDate = useMemo(() => {
    const grouped: Record<string, Appointment[]> = {};
    appointments.forEach((apt) => {
      const dateKey = apt.appointment_date;
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(apt);
    });
    return grouped;
  }, [appointments]);

  const getAppointmentsForDate = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    return appointmentsByDate[dateKey] || [];
  };

  const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  const handleDateClick = (date: Date) => {
    const dayAppointments = getAppointmentsForDate(date);
    if (dayAppointments.length > 0) {
      setSelectedDate(date);
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="font-heading">Calendario de Citas</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-medium min-w-[140px] text-center capitalize">
              {format(currentMonth, "MMMM yyyy", { locale: es })}
            </span>
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month start */}
            {Array.from({ length: startDay }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square p-1" />
            ))}

            {/* Days of the month */}
            {daysInMonth.map((day) => {
              const dayAppointments = getAppointmentsForDate(day);
              const hasAppointments = dayAppointments.length > 0;
              const isToday = isSameDay(day, new Date());

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => handleDateClick(day)}
                  disabled={!hasAppointments}
                  className={cn(
                    "aspect-square p-1 rounded-lg text-sm relative transition-all",
                    "hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50",
                    isToday && "ring-2 ring-primary",
                    hasAppointments && "cursor-pointer",
                    !hasAppointments && "cursor-default"
                  )}
                >
                  <span className={cn(
                    "block w-7 h-7 mx-auto flex items-center justify-center rounded-full",
                    isToday && "bg-primary text-primary-foreground font-bold"
                  )}>
                    {format(day, "d")}
                  </span>
                  
                  {hasAppointments && (
                    <div className="flex justify-center gap-0.5 mt-1">
                      {dayAppointments.slice(0, 3).map((apt, idx) => (
                        <span
                          key={idx}
                          className={cn("w-2 h-2 rounded-full", statusColors[apt.status])}
                        />
                      ))}
                      {dayAppointments.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">+{dayAppointments.length - 3}</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
            {Object.entries(statusLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={cn("w-3 h-3 rounded-full", statusColors[key])} />
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Day detail dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading capitalize">
              {selectedDate && format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {selectedDateAppointments
              .sort((a, b) => a.appointment_time.localeCompare(b.appointment_time))
              .map((apt) => (
                <div key={apt.id} className="p-3 bg-secondary/50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium">
                      <Clock className="w-4 h-4 text-primary" />
                      {apt.appointment_time}
                    </span>
                    <Badge className={cn("text-white", statusColors[apt.status])}>
                      {statusLabels[apt.status]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Baby className="w-4 h-4 text-primary" />
                    <span className="font-medium">{apt.child_name}</span>
                    <span className="text-muted-foreground">({apt.child_age})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    {apt.parent_name}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {apt.phone}
                  </div>
                  {apt.reason && (
                    <p className="text-sm text-muted-foreground bg-background p-2 rounded">
                      {apt.reason}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentsCalendar;
