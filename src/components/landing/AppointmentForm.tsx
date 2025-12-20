import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, Baby, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
];

const AppointmentForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      });

      if (error) throw error;

      toast({
        title: "¡Cita solicitada!",
        description: "Nos comunicaremos pronto para confirmar su cita.",
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
    <section id="citas" className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-full mb-4">
            <CalendarDays className="w-4 h-4" />
            <span className="text-sm font-semibold">Agendar Cita</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Reserve su cita hoy
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Complete el formulario y nos comunicaremos para confirmar su cita.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto border-0 shadow-card">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Nombre del padre/madre
                  </Label>
                  <Input id="parentName" name="parentName" placeholder="Su nombre completo" value={formData.parentName} onChange={handleChange} required className="bg-secondary/50 border-0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childName" className="flex items-center gap-2">
                    <Baby className="w-4 h-4 text-primary" /> Nombre del niño/a
                  </Label>
                  <Input id="childName" name="childName" placeholder="Nombre del paciente" value={formData.childName} onChange={handleChange} required className="bg-secondary/50 border-0" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="childAge">Edad del niño/a</Label>
                  <Input id="childAge" name="childAge" placeholder="Ej: 3 años" value={formData.childAge} onChange={handleChange} required className="bg-secondary/50 border-0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" /> Teléfono
                  </Label>
                  <Input id="phone" name="phone" type="tel" placeholder="099 123 4567" value={formData.phone} onChange={handleChange} required className="bg-secondary/50 border-0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" /> Email
                  </Label>
                  <Input id="email" name="email" type="email" placeholder="su@email.com" value={formData.email} onChange={handleChange} required className="bg-secondary/50 border-0" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Fecha preferida
                  </Label>
                  <Input id="date" name="date" type="date" min={minDate} value={formData.date} onChange={handleChange} required className="bg-secondary/50 border-0" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> Hora preferida
                  </Label>
                  <Select value={formData.time} onValueChange={(value) => handleSelectChange("time", value)} required>
                    <SelectTrigger className="bg-secondary/50 border-0">
                      <SelectValue placeholder="Seleccione hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo de la consulta</Label>
                <Textarea id="reason" name="reason" placeholder="Describa brevemente el motivo" rows={3} value={formData.reason} onChange={handleChange} required className="bg-secondary/50 border-0 resize-none" />
              </div>

              <Button type="submit" size="lg" className="w-full bg-gradient-hero hover:opacity-90 text-lg" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Solicitar Cita"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AppointmentForm;
