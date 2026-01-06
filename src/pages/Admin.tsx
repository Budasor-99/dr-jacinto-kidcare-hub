import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope, Calendar, Clock, Phone, Mail, User, Baby, LogOut, RefreshCw, Home, List, CalendarDays, Users } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import AppointmentsCalendar from "@/components/admin/AppointmentsCalendar";
import { PatientsList } from "@/components/admin/PatientsList";

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

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
};

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  const fetchAppointments = async () => {
    setIsLoading(true);
    let query = supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    if (filterStatus !== "all") {
      query = query.eq("status", filterStatus);
    }

    const { data, error } = await query;

    if (error) {
      toast({ title: "Error", description: "No se pudieron cargar las citas", variant: "destructive" });
    } else {
      setAppointments(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchAppointments();
    }
  }, [user, isAdmin, filterStatus]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "No se pudo actualizar el estado", variant: "destructive" });
    } else {
      toast({ title: "Actualizado", description: "Estado de la cita actualizado" });
      fetchAppointments();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg">Panel de Administración</h1>
              <p className="text-sm text-muted-foreground">Dr. Jacinto Salazar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" /> Inicio
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{appointments.length}</div>
              <div className="text-sm text-muted-foreground">Total Citas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {appointments.filter(a => a.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pendientes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter(a => a.status === "confirmed").length}
              </div>
              <div className="text-sm text-muted-foreground">Confirmadas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {appointments.filter(a => a.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">Completadas</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Calendar and List views */}
        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Calendario
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="w-4 h-4" /> Lista
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Pacientes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <AppointmentsCalendar 
              appointments={appointments} 
              onStatusChange={updateStatus}
            />
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading">Citas Agendadas</CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filtrar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="pending">Pendientes</SelectItem>
                      <SelectItem value="confirmed">Confirmadas</SelectItem>
                      <SelectItem value="completed">Completadas</SelectItem>
                      <SelectItem value="cancelled">Canceladas</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={fetchAppointments}>
                    <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-primary" />
                    <p className="mt-2 text-muted-foreground">Cargando citas...</p>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No hay citas para mostrar
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha/Hora</TableHead>
                          <TableHead>Paciente</TableHead>
                          <TableHead>Contacto</TableHead>
                          <TableHead>Motivo</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((apt) => (
                          <TableRow key={apt.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="flex items-center gap-1 font-medium">
                                  <Calendar className="w-3 h-3" />
                                  {format(new Date(apt.appointment_date), "dd MMM yyyy", { locale: es })}
                                </span>
                                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  {apt.appointment_time}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="flex items-center gap-1">
                                  <Baby className="w-3 h-3 text-primary" />
                                  {apt.child_name} ({apt.child_age})
                                </span>
                                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <User className="w-3 h-3" />
                                  {apt.parent_name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col text-sm">
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {apt.phone}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {apt.email}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[200px]">
                              <span className="text-sm truncate block">
                                {apt.reason || "-"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge className={statusColors[apt.status]}>
                                {statusLabels[apt.status] || apt.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={apt.status}
                                onValueChange={(value) => updateStatus(apt.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pendiente</SelectItem>
                                  <SelectItem value="confirmed">Confirmar</SelectItem>
                                  <SelectItem value="completed">Completar</SelectItem>
                                  <SelectItem value="cancelled">Cancelar</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <PatientsList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
