import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Save, Trash2, Stethoscope } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MedicalControl {
  id: string;
  medical_record_id: string;
  control_date: string;
  age_at_control: string | null;
  weight: string | null;
  height: string | null;
  head_circumference: string | null;
  bmi: string | null;
  temperature: string | null;
  heart_rate: string | null;
  respiratory_rate: string | null;
  blood_pressure: string | null;
  general_appearance: string | null;
  skin_exam: string | null;
  head_exam: string | null;
  eyes_exam: string | null;
  ears_exam: string | null;
  nose_throat_exam: string | null;
  neck_exam: string | null;
  chest_exam: string | null;
  heart_exam: string | null;
  abdomen_exam: string | null;
  genitourinary_exam: string | null;
  extremities_exam: string | null;
  neurological_exam: string | null;
  diagnosis: string | null;
  treatment: string | null;
  recommendations: string | null;
  next_appointment: string | null;
}

interface MedicalControlsTabProps {
  medicalRecordId: string;
}

export const MedicalControlsTab = ({ medicalRecordId }: MedicalControlsTabProps) => {
  const [controls, setControls] = useState<MedicalControl[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchControls = async () => {
    try {
      const { data, error } = await supabase
        .from("medical_controls")
        .select("*")
        .eq("medical_record_id", medicalRecordId)
        .order("control_date", { ascending: false });

      if (error) throw error;
      setControls(data || []);
    } catch (error) {
      console.error("Error fetching controls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchControls();
  }, [medicalRecordId]);

  const addNewControl = async () => {
    try {
      const { data, error } = await supabase
        .from("medical_controls")
        .insert({
          medical_record_id: medicalRecordId,
          control_date: new Date().toISOString().split("T")[0],
        })
        .select()
        .single();

      if (error) throw error;
      setControls([data, ...controls]);
      toast({
        title: "Control agregado",
        description: "Se ha creado un nuevo control médico.",
      });
    } catch (error) {
      console.error("Error creating control:", error);
      toast({
        title: "Error",
        description: "No se pudo crear el control.",
        variant: "destructive",
      });
    }
  };

  const updateControl = async (control: MedicalControl) => {
    setSavingId(control.id);
    try {
      const { error } = await supabase
        .from("medical_controls")
        .update(control)
        .eq("id", control.id);

      if (error) throw error;
      toast({
        title: "Guardado",
        description: "El control ha sido actualizado.",
      });
    } catch (error) {
      console.error("Error updating control:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el control.",
        variant: "destructive",
      });
    } finally {
      setSavingId(null);
    }
  };

  const deleteControl = async (id: string) => {
    try {
      const { error } = await supabase
        .from("medical_controls")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setControls(controls.filter((c) => c.id !== id));
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

  const handleControlChange = (id: string, field: keyof MedicalControl, value: string) => {
    setControls(
      controls.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Cargando controles...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Controles Médicos
        </h3>
        <Button onClick={addNewControl} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Nuevo Control
        </Button>
      </div>

      {controls.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No hay controles registrados. Haga clic en "Nuevo Control" para agregar uno.
          </CardContent>
        </Card>
      ) : (
        <Accordion type="single" collapsible className="space-y-2">
          {controls.map((control) => (
            <AccordionItem key={control.id} value={control.id} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <span className="font-medium">
                    {new Date(control.control_date).toLocaleDateString("es-EC")}
                  </span>
                  {control.diagnosis && (
                    <span className="text-sm text-muted-foreground">
                      {control.diagnosis.substring(0, 50)}...
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-6">
                  {/* Información básica */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Fecha</Label>
                      <Input
                        type="date"
                        value={control.control_date}
                        onChange={(e) => handleControlChange(control.id, "control_date", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Edad</Label>
                      <Input
                        value={control.age_at_control || ""}
                        onChange={(e) => handleControlChange(control.id, "age_at_control", e.target.value)}
                        placeholder="Ej: 2 años 3 meses"
                      />
                    </div>
                  </div>

                  {/* Medidas */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Medidas Antropométricas</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Peso (kg)</Label>
                        <Input
                          value={control.weight || ""}
                          onChange={(e) => handleControlChange(control.id, "weight", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Talla (cm)</Label>
                        <Input
                          value={control.height || ""}
                          onChange={(e) => handleControlChange(control.id, "height", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>P. Cefálico (cm)</Label>
                        <Input
                          value={control.head_circumference || ""}
                          onChange={(e) => handleControlChange(control.id, "head_circumference", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>IMC</Label>
                        <Input
                          value={control.bmi || ""}
                          onChange={(e) => handleControlChange(control.id, "bmi", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Signos vitales */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Signos Vitales</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Temperatura (°C)</Label>
                        <Input
                          value={control.temperature || ""}
                          onChange={(e) => handleControlChange(control.id, "temperature", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>FC (lpm)</Label>
                        <Input
                          value={control.heart_rate || ""}
                          onChange={(e) => handleControlChange(control.id, "heart_rate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>FR (rpm)</Label>
                        <Input
                          value={control.respiratory_rate || ""}
                          onChange={(e) => handleControlChange(control.id, "respiratory_rate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>T/A</Label>
                        <Input
                          value={control.blood_pressure || ""}
                          onChange={(e) => handleControlChange(control.id, "blood_pressure", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Examen físico */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Examen Físico</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Aspecto general</Label>
                        <Textarea
                          value={control.general_appearance || ""}
                          onChange={(e) => handleControlChange(control.id, "general_appearance", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Piel</Label>
                        <Textarea
                          value={control.skin_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "skin_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Cabeza</Label>
                        <Textarea
                          value={control.head_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "head_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Ojos</Label>
                        <Textarea
                          value={control.eyes_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "eyes_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Oídos</Label>
                        <Textarea
                          value={control.ears_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "ears_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Nariz/Garganta</Label>
                        <Textarea
                          value={control.nose_throat_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "nose_throat_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Cuello</Label>
                        <Textarea
                          value={control.neck_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "neck_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tórax</Label>
                        <Textarea
                          value={control.chest_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "chest_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Corazón</Label>
                        <Textarea
                          value={control.heart_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "heart_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Abdomen</Label>
                        <Textarea
                          value={control.abdomen_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "abdomen_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Genitourinario</Label>
                        <Textarea
                          value={control.genitourinary_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "genitourinary_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Extremidades</Label>
                        <Textarea
                          value={control.extremities_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "extremities_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Neurológico</Label>
                        <Textarea
                          value={control.neurological_exam || ""}
                          onChange={(e) => handleControlChange(control.id, "neurological_exam", e.target.value)}
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Diagnóstico y plan */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Diagnóstico y Plan</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label>Diagnóstico</Label>
                        <Textarea
                          value={control.diagnosis || ""}
                          onChange={(e) => handleControlChange(control.id, "diagnosis", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tratamiento</Label>
                        <Textarea
                          value={control.treatment || ""}
                          onChange={(e) => handleControlChange(control.id, "treatment", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Recomendaciones</Label>
                        <Textarea
                          value={control.recommendations || ""}
                          onChange={(e) => handleControlChange(control.id, "recommendations", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Próxima cita</Label>
                        <Input
                          type="date"
                          value={control.next_appointment || ""}
                          onChange={(e) => handleControlChange(control.id, "next_appointment", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteControl(control.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                    <Button
                      onClick={() => updateControl(control)}
                      disabled={savingId === control.id}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      {savingId === control.id ? "Guardando..." : "Guardar"}
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};
