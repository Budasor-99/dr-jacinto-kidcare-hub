import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MedicalRecordForm } from "./MedicalRecordForm";
import { MedicalControlsTab } from "./MedicalControlsTab";
import { VaccinationsTab } from "./VaccinationsTab";
import { generateMedicalRecordPDF } from "@/lib/pdfGenerator";

interface MedicalRecordDialogProps {
  patientId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

interface MedicalRecord {
  id: string;
  patient_id: string;
  birth_weight: string | null;
  birth_length: string | null;
  head_circumference: string | null;
  gestational_weeks: string | null;
  delivery_type: string | null;
  apgar_score: string | null;
  family_history: string | null;
  mother_health: string | null;
  father_health: string | null;
  siblings_health: string | null;
  allergies: string | null;
  previous_diseases: string | null;
  previous_surgeries: string | null;
  current_medications: string | null;
  breastfeeding_duration: string | null;
  formula_feeding: string | null;
  complementary_feeding: string | null;
  current_diet: string | null;
  motor_development: string | null;
  language_development: string | null;
  social_development: string | null;
  notes: string | null;
}

export const MedicalRecordDialog = ({ patientId, open, onOpenChange }: MedicalRecordDialogProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open && patientId) {
      fetchData();
    }
  }, [open, patientId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch patient
      const { data: patientData, error: patientError } = await supabase
        .from("patients")
        .select("*")
        .eq("id", patientId)
        .single();

      if (patientError) throw patientError;
      setPatient(patientData);

      // Fetch or create medical record
      let { data: recordData, error: recordError } = await supabase
        .from("medical_records")
        .select("*")
        .eq("patient_id", patientId)
        .maybeSingle();

      if (recordError) throw recordError;

      if (!recordData) {
        // Create medical record if it doesn't exist
        const { data: newRecord, error: createError } = await supabase
          .from("medical_records")
          .insert({ patient_id: patientId })
          .select()
          .single();

        if (createError) throw createError;
        recordData = newRecord;
      }

      setMedicalRecord(recordData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar la información del paciente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: Partial<MedicalRecord>) => {
    if (!medicalRecord) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("medical_records")
        .update(data)
        .eq("id", medicalRecord.id);

      if (error) throw error;

      setMedicalRecord({ ...medicalRecord, ...data });
      toast({
        title: "Guardado",
        description: "La historia clínica ha sido actualizada.",
      });
    } catch (error: any) {
      console.error("Error saving:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la información.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!patient || !medicalRecord) return;

    try {
      // Fetch controls and vaccinations
      const [controlsRes, vaccinationsRes] = await Promise.all([
        supabase
          .from("medical_controls")
          .select("*")
          .eq("medical_record_id", medicalRecord.id)
          .order("control_date", { ascending: false }),
        supabase
          .from("vaccinations")
          .select("*")
          .eq("medical_record_id", medicalRecord.id)
          .order("application_date", { ascending: true }),
      ]);

      generateMedicalRecordPDF(
        patient,
        medicalRecord,
        controlsRes.data || [],
        vaccinationsRes.data || []
      );

      toast({
        title: "PDF generado",
        description: "La historia clínica ha sido descargada.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "No se pudo generar el PDF.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <DialogTitle>
              Historia Clínica - {patient?.name || "Cargando..."}
            </DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              disabled={loading || !medicalRecord}
            >
              <Download className="h-4 w-4 mr-1" />
              Descargar PDF
            </Button>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="py-8 text-center text-muted-foreground">
            Cargando historia clínica...
          </div>
        ) : (
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">Datos Generales</TabsTrigger>
              <TabsTrigger value="controls">Controles</TabsTrigger>
              <TabsTrigger value="vaccinations">Vacunas</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-4">
              {medicalRecord && (
                <MedicalRecordForm
                  record={medicalRecord}
                  onSave={handleSave}
                  saving={saving}
                />
              )}
            </TabsContent>

            <TabsContent value="controls" className="mt-4">
              {medicalRecord && (
                <MedicalControlsTab medicalRecordId={medicalRecord.id} />
              )}
            </TabsContent>

            <TabsContent value="vaccinations" className="mt-4">
              {medicalRecord && (
                <VaccinationsTab medicalRecordId={medicalRecord.id} />
              )}
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};
