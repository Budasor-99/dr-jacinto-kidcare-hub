import { ArrowLeft, Shield, Lock, Eye, FileText, Users, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.svg";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-deep-sea relative overflow-hidden">
      <SEO
        title="Política de Privacidad | Dr. Jacinto Salazar"
        description="Política de privacidad y tratamiento de datos personales conforme a la LOPDP del Ecuador."
        path="/privacidad"
      />
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="glass-strong border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={logoImage} alt="Dr. Jacinto Salazar" className="w-10 h-10 object-contain" />
              <span className="font-display text-foreground uppercase tracking-tight">Dr. Jacinto Salazar</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-foreground/75 hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <div className="glass-strong border border-primary/20 rounded-3xl shadow-aqua p-8 md:p-12">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-aqua rounded-full mb-4 shadow-aqua">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl uppercase text-foreground mb-2 leading-[0.95] tracking-tight">
              Política de <span className="text-gradient">Privacidad</span>
            </h1>
            <p className="text-foreground/70">
              Última actualización: Enero {currentYear}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-foreground/85 leading-relaxed">
              En el consultorio del <strong>Dr. Jacinto Salazar Vargas</strong>, nos comprometemos a proteger 
              la privacidad y seguridad de la información personal de nuestros pacientes y usuarios. 
              Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos 
              sus datos personales de acuerdo con la legislación ecuatoriana vigente, incluyendo la 
              Ley Orgánica de Protección de Datos Personales (LOPDP).
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-aqua rounded-lg flex items-center justify-center shadow-aqua">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                1. Información que Recopilamos
              </h2>
            </div>
            <div className="pl-13 space-y-4 text-foreground/85">
              <p>Recopilamos los siguientes tipos de información:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Datos de identificación:</strong> Nombre del paciente, nombre del padre/madre 
                  o representante legal, fecha de nacimiento, dirección, teléfono y correo electrónico.
                </li>
                <li>
                  <strong>Datos de salud:</strong> Historial médico, diagnósticos, tratamientos, 
                  vacunas, alergias y cualquier información clínica relevante para la atención pediátrica.
                </li>
                <li>
                  <strong>Datos de citas:</strong> Fechas, horarios y motivos de consulta.
                </li>
                <li>
                  <strong>Datos de navegación:</strong> Información técnica sobre su visita a nuestro 
                  sitio web (cookies, dirección IP, tipo de navegador).
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-aqua rounded-lg flex items-center justify-center shadow-aqua">
                <Eye className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                2. Uso de la Información
              </h2>
            </div>
            <div className="pl-13 space-y-4 text-foreground/85">
              <p>Utilizamos su información personal para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Brindar atención médica pediátrica de calidad.</li>
                <li>Gestionar citas y recordatorios de consultas.</li>
                <li>Mantener un historial médico actualizado del paciente.</li>
                <li>Comunicarnos con usted sobre su atención médica.</li>
                <li>Cumplir con obligaciones legales y normativas de salud.</li>
                <li>Mejorar nuestros servicios y la experiencia del usuario en nuestro sitio web.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-aqua rounded-lg flex items-center justify-center shadow-aqua">
                <Lock className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                3. Protección de Datos
              </h2>
            </div>
            <div className="pl-13 space-y-4 text-foreground/85">
              <p>
                Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger 
                su información personal contra acceso no autorizado, pérdida, alteración o destrucción. 
                Estas medidas incluyen:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encriptación de datos sensibles.</li>
                <li>Acceso restringido a personal autorizado.</li>
                <li>Sistemas de respaldo y recuperación de información.</li>
                <li>Protocolos de seguridad en nuestros sistemas informáticos.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-aqua rounded-lg flex items-center justify-center shadow-aqua">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                4. Compartición de Datos
              </h2>
            </div>
            <div className="pl-13 space-y-4 text-foreground/85">
              <p>
                No vendemos, alquilamos ni compartimos su información personal con terceros, excepto en 
                los siguientes casos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cuando sea requerido por ley o autoridades competentes.</li>
                <li>Para referir pacientes a especialistas médicos con su consentimiento.</li>
                <li>Con proveedores de servicios que nos ayudan a operar nuestro consultorio, 
                    bajo estrictos acuerdos de confidencialidad.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-aqua rounded-lg flex items-center justify-center shadow-aqua">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                5. Derechos del Titular
              </h2>
            </div>
            <div className="pl-13 space-y-4 text-foreground/85">
              <p>
                De acuerdo con la Ley Orgánica de Protección de Datos Personales de Ecuador, 
                usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Acceso:</strong> Conocer qué datos personales tenemos sobre usted.</li>
                <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos.</li>
                <li><strong>Eliminación:</strong> Solicitar la eliminación de sus datos cuando sea legalmente procedente.</li>
                <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos en ciertos casos.</li>
                <li><strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado.</li>
              </ul>
              <p>
                Para ejercer estos derechos, puede contactarnos a través de los medios indicados 
                en la sección de contacto.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-aqua rounded-lg flex items-center justify-center shadow-aqua">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                6. Cookies y Tecnologías Similares
              </h2>
            </div>
            <div className="pl-13 space-y-4 text-foreground/85">
              <p>
                Nuestro sitio web utiliza cookies para mejorar su experiencia de navegación. 
                Las cookies son pequeños archivos que se almacenan en su dispositivo y nos permiten:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Recordar sus preferencias.</li>
                <li>Analizar el tráfico del sitio web.</li>
                <li>Mejorar la funcionalidad del sitio.</li>
              </ul>
              <p>
                Puede configurar su navegador para rechazar cookies, aunque esto podría afectar 
                algunas funcionalidades del sitio.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-aqua rounded-lg flex items-center justify-center shadow-aqua">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                7. Contacto
              </h2>
            </div>
            <div className="pl-13 space-y-4 text-foreground/85">
              <p>
                Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, 
                puede contactarnos a través de:
              </p>
              <div className="bg-background/40 border border-primary/20 rounded-xl p-6 mt-4">
                <p className="font-semibold text-foreground mb-2">Dr. Jacinto Salazar Vargas</p>
                <p><strong>Dirección:</strong> Rodrigo Muñoz N81-46, Carcelén, Quito</p>
                <p><strong>Teléfono:</strong> 099 839 6186 / 022 485 286</p>
                <p><strong>Email:</strong> jacinto_salazar1958@hotmail.com</p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-aqua rounded-lg flex items-center justify-center shadow-aqua">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                8. Modificaciones
              </h2>
            </div>
            <div className="pl-13 text-foreground/85">
              <p>
                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. 
                Cualquier cambio será publicado en esta página con la fecha de actualización correspondiente. 
                Le recomendamos revisar periódicamente esta política para estar informado sobre cómo 
                protegemos su información.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 mt-12 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-foreground/60 text-sm">
            © {currentYear} Dr. Jacinto Salazar. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
