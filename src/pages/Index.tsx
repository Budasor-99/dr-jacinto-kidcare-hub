import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import About from "@/components/landing/About";
import Testimonials from "@/components/landing/Testimonials";
import FAQ, { faqs } from "@/components/landing/FAQ";
import Gallery from "@/components/landing/Gallery";
import AppointmentForm from "@/components/landing/AppointmentForm";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import SEO from "@/components/SEO";
import { faqSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { BUSINESS } from "@/lib/seo/businessData";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Pediatra en Carcelén, Quito | Dr. Jacinto Salazar Vargas"
        description="Pediatra en Carcelén, Quito con +30 años de experiencia. Control del niño sano, manejo de alergias respiratorias y atención personalizada. Lun-Vie 8-12 y 15-20, Sáb 9-12."
        path="/"
        schemas={[
          faqSchema(faqs),
          breadcrumbSchema([{ name: "Inicio", url: BUSINESS.url + "/" }]),
        ]}
      />
      <Header />
      <Hero />
      <Services />
      <About />
      <AppointmentForm />
      <Testimonials />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
