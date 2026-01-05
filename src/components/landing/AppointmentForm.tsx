import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User, Phone, Mail, Baby, CalendarDays, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { usePatient } from "@/hooks/usePatient";
import { supabase } from "@/integrations/supabase/client";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";
import DotPattern from "@/components/decorative/DotPattern";

const morningSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
const afternoonSlots = ["15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

const getTimeSlotsForDate = (dateString: string): string[] => {
  if (!dateString) return [...morningSlots, ...afternoonSlots];
  const date = new Date(dateString + "T12:00:00");
  const dayOfWeek = date.getDay();
  // Saturday (6) = morning only, Sunday (0) = none
  if (dayOfWeek === 6) return morningSlots;
  if (dayOfWeek === 0) return [];
  return [...morningSlots, ...afternoonSlots];
};

const AppointmentForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { patient, createOrLinkPatient } = usePatient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wantsAccount, setWantsAccount] = useState(false);
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

      toast({
        title: "¡Cita solicitada!",
        description: wantsAccount 
          ? "Crea tu cuenta para ver el estado de tus citas."
          : "Nos comunicaremos pronto para confirmar su cita.",
      });

      setFormData({
        parentName: "", childName: "", childAge: "", phone: "",
        email: "", date: "", time: "", reason: "",
      });

      // If user wants account, redirect to patient auth
      if (wantsAccount && !user) {
        setTimeout(() => {
          navigate("/paciente/auth");
        }, 1500);
      }
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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      // Reset time if date changes and current time is not available
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

              {/* Option to create account */}
              {!user && (
                <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-primary/5 to-blue-400/5 rounded-xl border border-primary/10">
                  <Checkbox
                    id="wantsAccount"
                    checked={wantsAccount}
                    onCheckedChange={(checked) => setWantsAccount(checked === true)}
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="wantsAccount"
                      className="flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <UserPlus className="w-4 h-4 text-primary" />
                      Crear cuenta para gestionar mis citas
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Podrás ver el estado de tus citas, historial y recibir recordatorios.
                    </p>
                  </div>
                </div>
              )}

              {user && (
                <div className="p-4 bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-xl border border-primary/10">
                  <p className="text-sm text-primary flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Sesión iniciada. Esta cita se guardará en tu historial.
                  </p>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 text-lg shadow-lg" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Solicitar Cita"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Link to view appointments */}
        {!user && (
          <div className="text-center mt-6">
            <p className="text-white/70 mb-2">¿Ya tienes una cuenta?</p>
            <Button
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => navigate("/paciente/auth")}
            >
              Ver mis citas
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AppointmentForm;
