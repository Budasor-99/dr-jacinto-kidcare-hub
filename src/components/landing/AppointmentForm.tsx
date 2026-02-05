import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User, Phone, Mail, Baby, CalendarDays, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { usePatient } from "@/hooks/usePatient";
import { supabase } from "@/integrations/supabase/client";
import { trackAppointmentRequest } from "@/lib/analytics";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";
import DotPattern from "@/components/decorative/DotPattern";

const morningSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
const afternoonSlots = ["15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

const getTimeSlotsForDate = (dateString: string): string[] => {
  if (!dateString) return [...morningSlots, ...afternoonSlots];
  const date = new Date(dateString + "T12:00:00");
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 6) return morningSlots;
  if (dayOfWeek === 0) return [];
  return [...morningSlots, ...afternoonSlots];
};

const AppointmentForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { patient, createOrLinkPatient } = usePatient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/#citas`,
        },
      });
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo iniciar sesión con Google. Intente de nuevo.",
        variant: "destructive",
      });
      setIsSigningIn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create or get patient record
      let patientId: string | null = null;
      
      if (patient) {
        patientId = patient.id;
      } else {
        const newPatient = await createOrLinkPatient({
          name: formData.parentName,
          email: formData.email,
          phone: formData.phone,
        });
        patientId = newPatient?.id || null;
      }

      const { error } = await supabase.from("appointments").insert({
        parent_name: formData.parentName,
        child_name: formData.childName,
        child_age: formData.childAge,
        phone: formData.phone,
        email: formData.email,
        appointment_date: formData.date,
        appointment_time: formData.time,
        reason: formData.reason,
        status: "pending",
        patient_id: patientId,
      });

      if (error) throw error;

      // Track conversion event
      trackAppointmentRequest({
        source: 'main_site',
        child_age: formData.childAge,
      });

      toast({
        title: "¡Cita solicitada!",
        description: "Tu cita ha sido registrada. Puedes verla en 'Mis Citas'.",
      });

      setFormData({
        parentName: "", childName: "", childAge: "", phone: "",
        email: "", date: "", time: "", reason: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la solicitud. Intente de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <section id="citas" className="py-20 bg-gradient-to-r from-primary via-primary/95 to-blue-500 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>
      <MedicalCrosses variant="scattered" className="opacity-30" />
      <DotPattern className="opacity-20" dotSize={2} gap={40} opacity={0.15} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4">
            <CalendarDays className="w-4 h-4" />
            <span className="text-sm font-semibold">Agendar Cita</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Reserve su cita hoy
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Complete el formulario y nos comunicaremos para confirmar su cita.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto border-0 shadow-2xl">
          <CardContent className="p-8">
            {/* Show login prompt if not authenticated */}
            {!user && !authLoading ? (
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    Inicia sesión para agendar tu cita
                  </h3>
                  <p className="text-muted-foreground">
                    Usa tu cuenta de Google para acceder rápidamente y gestionar tus citas.
                  </p>
                </div>

                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                  size="lg"
                  className="w-full max-w-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {isSigningIn ? "Iniciando sesión..." : "Continuar con Google"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      O inicia sesión con email
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => navigate("/paciente/auth")}
                  className="w-full max-w-sm"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Iniciar sesión con email
                </Button>

                <p className="text-sm text-muted-foreground">
                  Al iniciar sesión podrás ver el historial de tus citas y recibir recordatorios.
                </p>
              </div>
            ) : authLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                <p className="text-muted-foreground mt-4">Verificando sesión...</p>
              </div>
            ) : (
              /* Show form when authenticated */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-xl border border-primary/10 mb-6">
                  <p className="text-sm text-primary flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Sesión iniciada como <strong>{user?.email}</strong>. Esta cita se guardará en tu historial.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Nombre del padre/madre
                    </Label>
                    <Input id="parentName" name="parentName" placeholder="Su nombre completo" value={formData.parentName} onChange={handleChange} required className="bg-secondary/50 border-primary/10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childName" className="flex items-center gap-2">
                      <Baby className="w-4 h-4 text-primary" /> Nombre del niño/a
                    </Label>
                    <Input id="childName" name="childName" placeholder="Nombre del paciente" value={formData.childName} onChange={handleChange} required className="bg-secondary/50 border-primary/10" />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="childAge">Edad del niño/a</Label>
                    <Input id="childAge" name="childAge" placeholder="Ej: 3 años" value={formData.childAge} onChange={handleChange} required className="bg-secondary/50 border-primary/10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" /> Teléfono
                    </Label>
                    <Input id="phone" name="phone" type="tel" placeholder="099 123 4567" value={formData.phone} onChange={handleChange} required className="bg-secondary/50 border-primary/10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" /> Email
                    </Label>
                    <Input id="email" name="email" type="email" placeholder="su@email.com" value={formData.email} onChange={handleChange} required className="bg-secondary/50 border-primary/10" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Fecha preferida
                    </Label>
                    <Input 
                      id="date" 
                      name="date" 
                      type="date" 
                      min={minDate} 
                      value={formData.date} 
                      onChange={(e) => {
                        handleChange(e);
                        const newSlots = getTimeSlotsForDate(e.target.value);
                        if (!newSlots.includes(formData.time)) {
                          setFormData(prev => ({ ...prev, time: "" }));
                        }
                      }} 
                      required 
                      className="bg-secondary/50 border-primary/10" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" /> Hora preferida
                    </Label>
                    <Select value={formData.time} onValueChange={(value) => handleSelectChange("time", value)} required>
                      <SelectTrigger className="bg-secondary/50 border-primary/10">
                        <SelectValue placeholder="Seleccione hora" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTimeSlotsForDate(formData.date).length === 0 ? (
                          <SelectItem value="no-available" disabled>No hay horarios disponibles (Domingo)</SelectItem>
                        ) : (
                          getTimeSlotsForDate(formData.date).map((slot) => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo de la consulta</Label>
                  <Textarea id="reason" name="reason" placeholder="Describa brevemente el motivo" rows={3} value={formData.reason} onChange={handleChange} required className="bg-secondary/50 border-primary/10 resize-none" />
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 text-lg shadow-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Solicitar Cita"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AppointmentForm;
