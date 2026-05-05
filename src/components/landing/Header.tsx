import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, Calendar, Lock } from "lucide-react";
import logoImage from "@/assets/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#sobre-mi", label: "Sobre Mí" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#faq", label: "FAQ" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-primary/10 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <img src={logoImage} alt="Centro Médico Salazar Vargas" className="w-12 h-12 object-contain brightness-0 invert" />
            <div className="hidden sm:block">
              <p className="font-display text-foreground text-base uppercase leading-tight tracking-wide">Pediatra</p>
              <p className="text-accent text-sm font-semibold tracking-wider uppercase">Jacinto Salazar</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-accent font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:0998396186" className="flex items-center gap-2 text-accent font-semibold">
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">099 839 6186</span>
            </a>

            <Button asChild className="bg-gradient-aqua text-primary-foreground hover:opacity-90 shadow-aqua font-semibold">
              <a href="#citas">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Cita
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
              <Link to="/auth" aria-label="Panel del Doctor">
                <Lock className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <a href="tel:0998396186" className="flex items-center gap-2 text-primary font-semibold">
                  <Phone className="w-4 h-4" />
                  099 839 6186
                </a>
                
                <Button asChild className="bg-gradient-to-r from-primary to-blue-500 w-full">
                  <a href="#citas" onClick={() => setIsMenuOpen(false)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Cita
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
