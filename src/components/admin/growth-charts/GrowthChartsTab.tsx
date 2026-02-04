import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { WeightForAgeChart } from "./WeightForAgeChart";
import { HeightForAgeChart } from "./HeightForAgeChart";
import { HeadCircumferenceChart } from "./HeadCircumferenceChart";
import { GrowthDataTable } from "./GrowthDataTable";
import { calculateAgeInMonths } from "@/lib/growth-data/growth-utils";

interface GrowthChartsTabProps {
  medicalRecordId: string;
  patientBirthDate: string | null;
  patientSex: string | null;
}

export interface MedicalControlData {
  id: string;
  control_date: string;
  weight: string | null;
  height: string | null;
  head_circumference: string | null;
  ageInMonths?: number;
}

export const GrowthChartsTab = ({
  medicalRecordId,
  patientBirthDate,
  patientSex,
}: GrowthChartsTabProps) => {
  const [controls, setControls] = useState<MedicalControlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState("weight");
  const { toast } = useToast();

  const sex = (patientSex === "M" || patientSex === "F") ? patientSex : "M";

  useEffect(() => {
    fetchControls();
  }, [medicalRecordId]);

  const fetchControls = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("medical_controls")
        .select("id, control_date, weight, height, head_circumference")
        .eq("medical_record_id", medicalRecordId)
        .order("control_date", { ascending: true });

      if (error) throw error;

      // Calculate age in months for each control
      const controlsWithAge = (data || []).map((control) => {
        let ageInMonths: number | undefined;
        if (patientBirthDate && control.control_date) {
          ageInMonths = calculateAgeInMonths(
            new Date(patientBirthDate),
            new Date(control.control_date)
          );
        }
        return { ...control, ageInMonths };
      });

      setControls(controlsWithAge);
    } catch (error) {
      console.error("Error fetching controls:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los controles médicos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddControl = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("medical_controls")
        .insert({
          medical_record_id: medicalRecordId,
          control_date: today,
        })
        .select("id, control_date, weight, height, head_circumference")
        .single();

      if (error) throw error;

      let ageInMonths: number | undefined;
      if (patientBirthDate && data.control_date) {
        ageInMonths = calculateAgeInMonths(
          new Date(patientBirthDate),
          new Date(data.control_date)
        );
      }

      setControls([...controls, { ...data, ageInMonths }]);
      toast({
        title: "Control agregado",
        description: "Se ha creado un nuevo control médico.",
      });
    } catch (error) {
      console.error("Error adding control:", error);
      toast({
        title: "Error",
        description: "No se pudo agregar el control.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateControl = async (
    controlId: string,
    field: string,
    value: string
  ) => {
    try {
      const { error } = await supabase
        .from("medical_controls")
        .update({ [field]: value || null })
        .eq("id", controlId);

      if (error) throw error;

      // Update local state
      setControls(
        controls.map((c) => {
          if (c.id === controlId) {
            const updated = { ...c, [field]: value || null };
            // Recalculate age if date changed
            if (field === "control_date" && patientBirthDate && value) {
              updated.ageInMonths = calculateAgeInMonths(
                new Date(patientBirthDate),
                new Date(value)
              );
            }
            return updated;
          }
          return c;
        })
      );

      toast({
        title: "Guardado",
        description: "Los datos han sido actualizados.",
      });
    } catch (error) {
      console.error("Error updating control:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el cambio.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteControl = async (controlId: string) => {
    try {
      const { error } = await supabase
        .from("medical_controls")
        .delete()
        .eq("id", controlId);

      if (error) throw error;

      setControls(controls.filter((c) => c.id !== controlId));
      toast({
        title: "Eliminado",
        description: "El control ha sido eliminado.",
      });
    } catch (error) {
      console.error("Error deleting control:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el control.",
        variant: "destructive",
      });
    }
  };

  if (!patientBirthDate) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Para ver las curvas de crecimiento, primero debe registrar la fecha de nacimiento del paciente en la pestaña "Paciente".</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Curvas de Crecimiento OMS
        </h3>
        <Button onClick={handleAddControl} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Agregar Medición
        </Button>
      </div>

      <Tabs value={activeChart} onValueChange={setActiveChart}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weight">Peso</TabsTrigger>
          <TabsTrigger value="height">Talla</TabsTrigger>
          <TabsTrigger value="headCircumference">P. Cefálico</TabsTrigger>
        </TabsList>

        <TabsContent value="weight" className="mt-4">
          <WeightForAgeChart
            controls={controls}
            sex={sex}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="height" className="mt-4">
          <HeightForAgeChart
            controls={controls}
            sex={sex}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="headCircumference" className="mt-4">
          <HeadCircumferenceChart
            controls={controls}
            sex={sex}
            loading={loading}
          />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tabla de Mediciones</CardTitle>
        </CardHeader>
        <CardContent>
          <GrowthDataTable
            controls={controls}
            patientBirthDate={patientBirthDate}
            onUpdate={handleUpdateControl}
            onDelete={handleDeleteControl}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};
