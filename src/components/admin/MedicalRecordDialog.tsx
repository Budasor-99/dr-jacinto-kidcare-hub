import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PatientDataForm } from "./PatientDataForm";
import { MedicalRecordForm } from "./MedicalRecordForm";
import { MedicalControlsTab } from "./MedicalControlsTab";
import { VaccinationsTab } from "./VaccinationsTab";
import { EvolutionNotesTab } from "./EvolutionNotesTab";
import { GrowthChartsTab } from "./growth-charts/GrowthChartsTab";
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
  paternal_surname: string | null;
  maternal_surname: string | null;
  first_names: string | null;
  birth_date: string | null;
  birth_place: string | null;
  sex: string | null;
  address: string | null;
  residence_place: string | null;
  origin_place: string | null;
  first_consultation_date: string | null;
  history_number: string | null;
  identification_number: string | null;
  father_name: string | null;
  father_age: string | null;
  father_education: string | null;
  father_occupation: string | null;
  mother_name: string | null;
  mother_age: string | null;
  mother_education: string | null;
  mother_occupation: string | null;
  information_source: string | null;
}

interface MedicalRecord {
  id: string;
  patient_id: string;
  // Datos del nacimiento
  birth_weight: string | null;
  birth_length: string | null;
  head_circumference: string | null;
  gestational_weeks: string | null;
  delivery_type: string | null;
  apgar_score: string | null;
  birth_place_type: string | null;
  professional_attention: string | null;
  birth_order: string | null;
  // Antecedentes familiares
  family_history: string | null;
  mother_health: string | null;
  father_health: string | null;
  siblings_health: string | null;
  pathological_family_history: string | null;
  // Antecedentes personales
  allergies: string | null;
  previous_diseases: string | null;
  previous_surgeries: string | null;
  current_medications: string | null;
  // Periodos
  prenatal_history: string | null;
  postnatal_observations: string | null;
  // Alimentación
  breastfeeding_duration: string | null;
  formula_feeding: string | null;
  complementary_feeding: string | null;
  current_diet: string | null;
  // Desarrollo
  motor_development: string | null;
  language_development: string | null;
  social_development: string | null;
  vaccines_received: string | null;
  personality: string | null;
  habits: string | null;
  // Motivo de consulta
  consultation_reason: string | null;
  current_illness: string | null;
  // Interrogatorio por aparatos
  sense_organs: string | null;
  cardiorespiratory: string | null;
  gastrointestinal: string | null;
  genitourinary: string | null;
  neuromusculoskeletal: string | null;
  psychological: string | null;
  // Examen físico - 15 campos individuales
  exam_skin: string | null;
  exam_head: string | null;
  exam_face_eyes_nose_ears: string | null;
  exam_mouth: string | null;
  exam_pharynx: string | null;
  exam_neck_thyroid: string | null;
  exam_thorax_lungs: string | null;
  exam_heart: string | null;
  exam_abdomen: string | null;
  exam_genitals: string | null;
  exam_rectum: string | null;
  exam_spine: string | null;
  exam_extremities: string | null;
  exam_lymph_nodes: string | null;
  exam_neurological: string | null;
  initial_physical_exam: string | null;
  notes: string | null;
}

export const MedicalRecordDialog = ({ patientId, open, onOpenChange }: MedicalRecordDialogProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingRecord, setSavingRecord] = useState(false);
  const [savingPatient, setSavingPatient] = useState(false);
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

  const handleSavePatient = async (data: Partial<Patient>) => {
    if (!patient) return;

    setSavingPatient(true);
    try {
      const { error } = await supabase
        .from("patients")
        .update(data)
        .eq("id", patient.id);

      if (error) throw error;

      setPatient({ ...patient, ...data });
      toast({
        title: "Guardado",
        description: "Los datos del paciente han sido actualizados.",
      });
    } catch (error: any) {
      console.error("Error saving patient:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la información del paciente.",
        variant: "destructive",
      });
    } finally {
      setSavingPatient(false);
    }
  };

  const handleSaveRecord = async (data: Partial<MedicalRecord>) => {
    if (!medicalRecord) return;

    setSavingRecord(true);
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
      setSavingRecord(false);
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

  const getPatientDisplayName = () => {
    if (!patient) return "Cargando...";
    if (patient.paternal_surname || patient.first_names) {
      return `${patient.paternal_surname || ""} ${patient.maternal_surname || ""} ${patient.first_names || ""}`.trim();
    }
    return patient.name;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <DialogTitle className="text-xl">
                Historia Clínica - {getPatientDisplayName()}
              </DialogTitle>
              {patient?.history_number && (
                <p className="text-sm text-muted-foreground mt-1">
                  N° Historia: {patient.history_number}
                </p>
              )}
            </div>
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
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="patient" className="text-xs sm:text-sm">Paciente</TabsTrigger>
              <TabsTrigger value="anamnesis" className="text-xs sm:text-sm">Anamnesis</TabsTrigger>
              <TabsTrigger value="controls" className="text-xs sm:text-sm">Controles</TabsTrigger>
              <TabsTrigger value="growth" className="text-xs sm:text-sm">Crecimiento</TabsTrigger>
              <TabsTrigger value="evolution" className="text-xs sm:text-sm">Evolución</TabsTrigger>
              <TabsTrigger value="vaccinations" className="text-xs sm:text-sm">Vacunas</TabsTrigger>
            </TabsList>

            <TabsContent value="patient" className="mt-4">
              {patient && (
                <PatientDataForm
                  patient={patient}
                  onSave={handleSavePatient}
                  saving={savingPatient}
                />
              )}
            </TabsContent>

            <TabsContent value="anamnesis" className="mt-4">
              {medicalRecord && (
                <MedicalRecordForm
                  record={medicalRecord}
                  onSave={handleSaveRecord}
                  saving={savingRecord}
                />
              )}
            </TabsContent>

            <TabsContent value="controls" className="mt-4">
              {medicalRecord && (
                <MedicalControlsTab medicalRecordId={medicalRecord.id} />
              )}
            </TabsContent>

            <TabsContent value="growth" className="mt-4">
              {medicalRecord && patient && (
                <GrowthChartsTab
                  medicalRecordId={medicalRecord.id}
                  patientBirthDate={patient.birth_date}
                  patientSex={patient.sex}
                  patientName={patient.name}
                />
              )}
            </TabsContent>

            <TabsContent value="evolution" className="mt-4">
              {medicalRecord && (
                <EvolutionNotesTab medicalRecordId={medicalRecord.id} />
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