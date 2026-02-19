import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope, LogOut, RefreshCw, Home, CalendarDays, Users } from "lucide-react";
import { PatientsList } from "@/components/admin/PatientsList";

const CALENDLY_URL = "https://calendly.com/andresalazarcevallos99/30min";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg">Panel de Administración</h1>
              <p className="text-sm text-muted-foreground">Dr. Jacinto Salazar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" /> Inicio
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Calendario
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Pacientes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <Card>
              <CardContent className="p-0">
                <iframe
                  src={CALENDLY_URL}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Calendly - Gestión de Citas"
                  className="rounded-lg"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <PatientsList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
