import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.svg";
import SEO from "@/components/SEO";

const MedicalDisclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-deep-sea relative overflow-hidden">
      <SEO
        title="Aviso Médico | Dr. Jacinto Salazar"
        description="Aviso médico-legal sobre el uso de la información publicada en el sitio del Dr. Jacinto Salazar, pediatra en Carcelén, Quito."
        path="/aviso-medico"
      />

      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <header className="glass-strong border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl relative z-10">
        <article className="glass-strong border border-primary/20 rounded-3xl shadow-aqua p-8 md:p-12 space-y-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-aqua rounded-full mb-4 shadow-aqua">
              <AlertTriangle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl uppercase text-foreground tracking-tight">
              Aviso Médico
            </h1>
          </div>

          <section className="space-y-3 text-foreground/85">
            <h2 className="font-heading font-bold text-xl text-foreground">No sustituye consulta presencial</h2>
            <p>
              La información contenida en este sitio web tiene fines exclusivamente informativos y educativos. No
              constituye diagnóstico médico, prescripción ni tratamiento, y no sustituye la consulta presencial con
              el Dr. Jacinto Salazar Vargas o cualquier otro profesional de la salud debidamente acreditado.
            </p>
          </section>

          <section className="space-y-3 text-foreground/85">
            <h2 className="font-heading font-bold text-xl text-foreground">Credenciales del profesional</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Dr. Jacinto Salazar Vargas — Médico Pediatra.</li>
              <li>Graduado de la Universidad Central del Ecuador.</li>
              <li>Más de 30 años de ejercicio profesional en Ecuador.</li>
              <li>Ejercicio regulado por el Ministerio de Salud Pública del Ecuador (MSP).</li>
            </ul>
          </section>

          <section className="space-y-3 text-foreground/85">
            <h2 className="font-heading font-bold text-xl text-foreground">Urgencias</h2>
            <p>
              Si su hijo o hija presenta síntomas que comprometan su vida (dificultad respiratoria severa, pérdida
              de conciencia, convulsiones, sangrado abundante u otros), acuda inmediatamente al servicio de
              emergencias hospitalarias más cercano o llame al ECU-911. No espere respuesta a través de este sitio
              web ni de mensajería.
            </p>
          </section>

          <section className="space-y-3 text-foreground/85">
            <h2 className="font-heading font-bold text-xl text-foreground">Contacto profesional</h2>
            <p>
              Para consultas médicas formales agende cita: <strong>099 839 6186</strong> · <strong>022 485 286</strong>{" "}
              · Rodrigo Muñoz N81-46, Carcelén, Quito.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default MedicalDisclaimer;
