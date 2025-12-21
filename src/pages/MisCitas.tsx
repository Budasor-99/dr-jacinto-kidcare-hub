import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User, Phone, Mail, ArrowLeft, Baby, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { usePatient } from "@/hooks/usePatient";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  created_at: string;
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pendiente", variant: "secondary" },
  confirmed: { label: "Confirmada", variant: "default" },
  cancelled: { label: "Cancelada", variant: "destructive" },
  completed: { label: "Completada", variant: "outline" },
};

const MisCitas = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { patient, loading: patientLoading } = usePatient();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/paciente/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!patient) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("appointments")
          .select("*")
          .eq("patient_id", patient.id)
          .order("appointment_date", { ascending: false });

        if (error) throw error;
        setAppointments(data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las citas",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (!patientLoading) {
      fetchAppointments();
    }
  }, [patient, patientLoading, toast]);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", appointmentId);

      if (error) throw error;

      setAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
        )
      );

      toast({
        title: "Cita cancelada",
        description: "Su cita ha sido cancelada exitosamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cancelar la cita",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || patientLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-heading text-2xl font-bold">Mis Citas</h1>
                <p className="text-primary-foreground/80 text-sm">
                  Bienvenido, {patient?.name || user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {!patient ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-heading text-xl font-semibold mb-2">
                Perfil no encontrado
              </h2>
              <p className="text-muted-foreground mb-4">
                No tienes un perfil de paciente asociado. Agenda tu primera cita para crear uno.
              </p>
              <Button onClick={() => navigate("/#citas")}>
                Agendar Cita
              </Button>
            </CardContent>
          </Card>
        ) : appointments.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-heading text-xl font-semibold mb-2">
                No tienes citas
              </h2>
              <p className="text-muted-foreground mb-4">
                Aún no has agendado ninguna cita. ¡Agenda tu primera cita hoy!
              </p>
              <Button onClick={() => navigate("/#citas")}>
                Agendar Cita
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold">
                Historial de Citas ({appointments.length})
              </h2>
              <Button onClick={() => navigate("/#citas")}>
                Nueva Cita
              </Button>
            </div>

            <div className="grid gap-4">
              {appointments.map((appointment) => {
                const status = statusLabels[appointment.status] || statusLabels.pending;
                const isPast = new Date(appointment.appointment_date) < new Date();
                const canCancel = appointment.status === "pending" && !isPast;

                return (
                  <Card key={appointment.id} className="shadow-soft">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Baby className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{appointment.child_name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{appointment.child_age}</p>
                          </div>
                        </div>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(appointment.appointment_date).toLocaleDateString("es-ES", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.appointment_time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{appointment.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span>{appointment.email}</span>
                        </div>
                      </div>

                      {appointment.reason && (
                        <div className="pt-2 border-t">
                          <p className="text-sm text-muted-foreground">
                            <strong>Motivo:</strong> {appointment.reason}
                          </p>
                        </div>
                      )}

                      {canCancel && (
                        <div className="pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            Cancelar Cita
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MisCitas;