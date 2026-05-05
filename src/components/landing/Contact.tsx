import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import BlobBackground from "@/components/decorative/BlobBackground";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    details: ["099 839 6186", "022 485 286"],
    action: "tel:0998396186",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["jacinto_salazar1958@hotmail.com"],
    action: "mailto:jacinto_salazar1958@hotmail.com",
  },
  {
    icon: MapPin,
    title: "Dirección",
    details: ["Rodrigo Muñoz N81-46", "Carcelén, Quito"],
    action: "https://www.google.com/maps/dir//Rodrigo+Mu%C3%B1oz+N81-46+y,+Quito+170302",
  },
  {
    icon: Clock,
    title: "Horario",
    details: ["Lun-Vie: 9AM-1PM, 3PM-7PM", "Sábados: 9AM-1PM"],
    action: null,
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto con usted pronto.",
    });
    
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const whatsappMessage = encodeURIComponent("Hola Dr. Salazar, me gustaría agendar una cita para mi hijo/a.");
  const whatsappLink = `https://wa.me/593998396186?text=${whatsappMessage}`;

  return (
    <section id="contacto" className="py-20 bg-gradient-deep-sea relative overflow-hidden">
      {/* Decorative elements */}
      <BlobBackground variant="section" />
      <MedicalCrosses variant="minimal" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card text-accent px-4 py-2 rounded-full mb-6">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Contacto</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase text-foreground mb-4 leading-[0.95] tracking-tight">
            ¿Listo para
            <span className="text-gradient block">agendar?</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Contáctenos por el medio que prefiera. Estamos aquí para atenderle.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <Card
                  key={item.title}
                  className="glass-card border-primary/20 hover:border-accent/40 hover:shadow-aqua transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-aqua rounded-xl flex items-center justify-center flex-shrink-0 shadow-aqua">
                        <item.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-foreground mb-1">
                          {item.title}
                        </h3>
                        {item.details.map((detail, idx) => (
                          item.action ? (
                            <a
                              key={idx}
                              href={item.action}
                              target={item.action.startsWith("http") ? "_blank" : undefined}
                              rel={item.action.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="block text-sm text-foreground/75 hover:text-accent transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={idx} className="text-sm text-foreground/75">
                              {detail}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* WhatsApp Button */}
            <Button 
              asChild 
              size="lg" 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-lg shadow-lg"
              onClick={() => trackWhatsAppClick('contact_section')}
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Escribir por WhatsApp
              </a>
            </Button>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-aqua h-64 border border-primary/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7960547559073!2d-78.47659!3d-0.0876095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d58f39ba1b512f%3A0xeb91b03c774a09e9!2sRodrigo%20Mu%C3%B1oz%20N81-46%2C%20Quito%20170302!5e0!3m2!1ses!2sec!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del consultorio"
              />
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border border-primary/5 bg-card/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                Envíenos un mensaje
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Su nombre"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50 border-primary/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="099 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50 border-primary/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="su@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-secondary/50 border-primary/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="¿En qué podemos ayudarle?"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-secondary/50 border-primary/10 resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
