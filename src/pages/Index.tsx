import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import About from "@/components/landing/About";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Gallery from "@/components/landing/Gallery";
import AppointmentForm from "@/components/landing/AppointmentForm";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
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
