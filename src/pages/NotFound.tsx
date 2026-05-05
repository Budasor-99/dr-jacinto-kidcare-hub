import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-deep-sea relative overflow-hidden p-4">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center relative z-10 glass-strong border border-primary/20 rounded-3xl shadow-aqua p-10 md:p-14 max-w-md">
        <h1 className="font-display text-8xl md:text-9xl text-gradient mb-4 leading-none">404</h1>
        <p className="mb-8 text-xl text-foreground/80">
          Esta página parece haberse perdido en el océano.
        </p>
        <Button asChild className="bg-gradient-aqua text-primary-foreground hover:opacity-90 shadow-aqua font-semibold">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
