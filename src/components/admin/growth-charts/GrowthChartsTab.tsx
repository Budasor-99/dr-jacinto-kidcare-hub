import { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Printer, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { WeightForAgeChart } from "./WeightForAgeChart";
import { HeightForAgeChart } from "./HeightForAgeChart";
import { HeadCircumferenceChart } from "./HeadCircumferenceChart";
import { GrowthDataTable } from "./GrowthDataTable";
import { GrowthCardHeader } from "./GrowthCardHeader";
import { GrowthTrackingTable } from "./GrowthTrackingTable";
import { ClinicalInterpretation } from "./ClinicalInterpretation";
import { calculateAgeInMonths, getRefDataForMonth, getPercentileStatus, getNutritionalDiagnosis } from "@/lib/growth-data/growth-utils";
import { weightForAgeBoys } from "@/lib/growth-data/who-weight-boys";
import { weightForAgeGirls } from "@/lib/growth-data/who-weight-girls";
import { heightForAgeBoys } from "@/lib/growth-data/who-height-boys";
import { heightForAgeGirls } from "@/lib/growth-data/who-height-girls";
import { headCircumferenceForAgeBoys } from "@/lib/growth-data/who-hc-boys";
import { headCircumferenceForAgeGirls } from "@/lib/growth-data/who-hc-girls";

interface GrowthChartsTabProps {
  medicalRecordId: string;
  patientBirthDate: string | null;
  patientSex: string | null;
  patientName?: string;
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
  patientName,
}: GrowthChartsTabProps) => {
  const [controls, setControls] = useState<MedicalControlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState("weight");
  const [viewMode, setViewMode] = useState<"charts" | "ficha">("charts");
  const [evaluation, setEvaluation] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const fichaRef = useRef<HTMLDivElement>(null);
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

      setControls(
        controls.map((c) => {
          if (c.id === controlId) {
            const updated = { ...c, [field]: value || null };
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

  const handleUpdateWithMonth = async (
    controlId: string,
    newValue: number,
    field: string,
    newMonth?: number
  ) => {
    // Update the value field
    await handleUpdateControl(controlId, field, newValue.toFixed(field === "weight" ? 2 : 1));

    // If month changed, recalculate control_date from birth date
    if (newMonth !== undefined && patientBirthDate) {
      const birthDate = new Date(patientBirthDate);
      const roundedMonths = Math.round(newMonth);
      const newDate = new Date(birthDate);
      newDate.setMonth(newDate.getMonth() + roundedMonths);
      const dateStr = newDate.toISOString().split("T")[0];
      await handleUpdateControl(controlId, "control_date", dateStr);
    }
  };

  const handleUpdateWeight = (controlId: string, newWeight: number, newMonth?: number) => {
    handleUpdateWithMonth(controlId, newWeight, "weight", newMonth);
  };

  const handleUpdateHeight = (controlId: string, newHeight: number, newMonth?: number) => {
    handleUpdateWithMonth(controlId, newHeight, "height", newMonth);
  };

  const handleUpdateHeadCircumference = (controlId: string, newHC: number, newMonth?: number) => {
    handleUpdateWithMonth(controlId, newHC, "head_circumference", newMonth);
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

  const handlePrint = () => {
    window.print();
  };

  const latestControl = controls.length > 0 ? controls[controls.length - 1] : undefined;

  // Compute risk items for header
  const headerRisks = useMemo(() => {
    const valid = controls.filter(c => c.ageInMonths !== undefined);
    if (valid.length === 0) return [];
    const latest = valid[valid.length - 1];
    const month = latest.ageInMonths!;
    const wRef = sex === "M" ? weightForAgeBoys : weightForAgeGirls;
    const hRef = sex === "M" ? heightForAgeBoys : heightForAgeGirls;
    const hcRefData = sex === "M" ? headCircumferenceForAgeBoys : headCircumferenceForAgeGirls;

    const assess = (val: string | null, ref: typeof wRef, label: string, type: "weight" | "height" | "hc") => {
      if (!val) return null;
      const refData = getRefDataForMonth(month, ref);
      if (!refData) return null;
      const v = parseFloat(val);
      const p = getPercentileStatus(v, refData);
      const dx = getNutritionalDiagnosis(v, refData, type);
      return { label, percentile: p.percentile, diagnosis: dx };
    };

    return [
      assess(latest.weight, wRef, "Peso", "weight"),
      assess(latest.height, hRef, "Talla", "height"),
      assess(latest.head_circumference, hcRefData, "P.C.", "hc"),
    ].filter(Boolean) as Array<{ label: string; percentile: number; diagnosis: any }>;
  }, [controls, sex]);

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
      {/* Top bar */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Curvas de Crecimiento OMS
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "charts" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("charts")}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Gráficas
          </Button>
          <Button
            variant={viewMode === "ficha" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("ficha")}
          >
            <FileText className="h-4 w-4 mr-1" />
            Ficha Completa
          </Button>
          <Button onClick={handleAddControl} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Agregar Medición
          </Button>
        </div>
      </div>

      {viewMode === "charts" ? (
        /* Original charts view */
        <>
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
                onUpdateWeight={handleUpdateWeight}
              />
            </TabsContent>

            <TabsContent value="height" className="mt-4">
              <HeightForAgeChart
                controls={controls}
                sex={sex}
                loading={loading}
                onUpdateHeight={handleUpdateHeight}
              />
            </TabsContent>

            <TabsContent value="headCircumference" className="mt-4">
              <HeadCircumferenceChart
                controls={controls}
                sex={sex}
                loading={loading}
                onUpdateHeadCircumference={handleUpdateHeadCircumference}
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
        </>
      ) : (
        /* Ficha Completa — printable A4 layout */
        <div ref={fichaRef} className="space-y-4 print:space-y-3">
          <div className="flex justify-end print:hidden">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1" />
              Imprimir Ficha
            </Button>
          </div>

          {/* 1. Header */}
          <GrowthCardHeader
            patientName={patientName || "Paciente"}
            birthDate={patientBirthDate}
            sex={sex}
            latestAgeMonths={latestControl?.ageInMonths}
            controlDate={latestControl?.control_date}
            risks={headerRisks}
          />

          {/* 2. Tracking table with percentiles */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-foreground">
              Tabla de Seguimiento
            </h3>
            <GrowthTrackingTable controls={controls} sex={sex} />
          </div>

          {/* 3. Three charts */}
          <div className="space-y-4 print:break-before-page">
            <h3 className="text-sm font-semibold text-foreground">
              Gráficas de Crecimiento
            </h3>
            <WeightForAgeChart
              controls={controls}
              sex={sex}
              loading={loading}
              onUpdateWeight={handleUpdateWeight}
            />
            <HeightForAgeChart
              controls={controls}
              sex={sex}
              loading={loading}
              onUpdateHeight={handleUpdateHeight}
            />
            <HeadCircumferenceChart
              controls={controls}
              sex={sex}
              loading={loading}
              onUpdateHeadCircumference={handleUpdateHeadCircumference}
            />
          </div>

          {/* 4. Clinical interpretation */}
          <ClinicalInterpretation
            controls={controls}
            sex={sex}
            evaluation={evaluation}
            onEvaluationChange={setEvaluation}
            recommendations={recommendations}
            onRecommendationsChange={setRecommendations}
          />
        </div>
      )}
    </div>
  );
};
