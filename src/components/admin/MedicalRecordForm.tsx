import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import { PhysicalExamField } from "./PhysicalExamField";

interface MedicalRecord {
  id: string;
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
  // Motivo de consulta y enfermedad actual
  consultation_reason: string | null;
  current_illness: string | null;
  // Interrogatorio por aparatos
  sense_organs: string | null;
  cardiorespiratory: string | null;
  gastrointestinal: string | null;
  genitourinary: string | null;
  neuromusculoskeletal: string | null;
  psychological: string | null;
  // Examen físico inicial - 15 campos individuales
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

interface MedicalRecordFormProps {
  record: MedicalRecord;
  onSave: (data: Partial<MedicalRecord>) => void;
  saving: boolean;
}

export const MedicalRecordForm = ({ record, onSave, saving }: MedicalRecordFormProps) => {
  const [formData, setFormData] = useState<Partial<MedicalRecord>>({});

  useEffect(() => {
    setFormData({
      birth_weight: record.birth_weight || "",
      birth_length: record.birth_length || "",
      head_circumference: record.head_circumference || "",
      gestational_weeks: record.gestational_weeks || "",
      delivery_type: record.delivery_type || "",
      apgar_score: record.apgar_score || "",
      birth_place_type: record.birth_place_type || "",
      professional_attention: record.professional_attention || "",
      birth_order: record.birth_order || "",
      family_history: record.family_history || "",
      mother_health: record.mother_health || "",
      father_health: record.father_health || "",
      siblings_health: record.siblings_health || "",
      pathological_family_history: record.pathological_family_history || "",
      allergies: record.allergies || "",
      previous_diseases: record.previous_diseases || "",
      previous_surgeries: record.previous_surgeries || "",
      current_medications: record.current_medications || "",
      prenatal_history: record.prenatal_history || "",
      postnatal_observations: record.postnatal_observations || "",
      breastfeeding_duration: record.breastfeeding_duration || "",
      formula_feeding: record.formula_feeding || "",
      complementary_feeding: record.complementary_feeding || "",
      current_diet: record.current_diet || "",
      motor_development: record.motor_development || "",
      language_development: record.language_development || "",
      social_development: record.social_development || "",
      vaccines_received: record.vaccines_received || "",
      personality: record.personality || "",
      habits: record.habits || "",
      consultation_reason: record.consultation_reason || "",
      current_illness: record.current_illness || "",
      sense_organs: record.sense_organs || "",
      cardiorespiratory: record.cardiorespiratory || "",
      gastrointestinal: record.gastrointestinal || "",
      genitourinary: record.genitourinary || "",
      neuromusculoskeletal: record.neuromusculoskeletal || "",
      psychological: record.psychological || "",
      // 15 campos de examen físico
      exam_skin: record.exam_skin || "",
      exam_head: record.exam_head || "",
      exam_face_eyes_nose_ears: record.exam_face_eyes_nose_ears || "",
      exam_mouth: record.exam_mouth || "",
      exam_pharynx: record.exam_pharynx || "",
      exam_neck_thyroid: record.exam_neck_thyroid || "",
      exam_thorax_lungs: record.exam_thorax_lungs || "",
      exam_heart: record.exam_heart || "",
      exam_abdomen: record.exam_abdomen || "",
      exam_genitals: record.exam_genitals || "",
      exam_rectum: record.exam_rectum || "",
      exam_spine: record.exam_spine || "",
      exam_extremities: record.exam_extremities || "",
      exam_lymph_nodes: record.exam_lymph_nodes || "",
      exam_neurological: record.exam_neurological || "",
      initial_physical_exam: record.initial_physical_exam || "",
      notes: record.notes || "",
    });
  }, [record]);

  const handleChange = (field: keyof MedicalRecord, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Motivo de consulta y enfermedad actual */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Motivo de Consulta</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="consultation_reason">Motivo de Consulta</Label>
            <Textarea
              id="consultation_reason"
              value={formData.consultation_reason || ""}
              onChange={(e) => handleChange("consultation_reason", e.target.value)}
              placeholder="Motivo principal de la consulta"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current_illness">Enfermedad Actual</Label>
            <Textarea
              id="current_illness"
              value={formData.current_illness || ""}
              onChange={(e) => handleChange("current_illness", e.target.value)}
              placeholder="Descripción de la enfermedad actual"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Interrogatorio por aparatos y sistemas */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Interrogatorio por Aparatos y Sistemas</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PhysicalExamField
            number={1}
            label="Órganos de los sentidos"
            fieldName="sense_organs"
            value={formData.sense_organs || ""}
            onChange={handleChange}
          />
          <PhysicalExamField
            number={2}
            label="Cardiorespiratorio"
            fieldName="cardiorespiratory"
            value={formData.cardiorespiratory || ""}
            onChange={handleChange}
          />
          <PhysicalExamField
            number={3}
            label="Gastrointestinal"
            fieldName="gastrointestinal"
            value={formData.gastrointestinal || ""}
            onChange={handleChange}
          />
          <PhysicalExamField
            number={4}
            label="Genitourinario"
            fieldName="genitourinary"
            value={formData.genitourinary || ""}
            onChange={handleChange}
          />
          <PhysicalExamField
            number={5}
            label="Neuromusculoesquelético"
            fieldName="neuromusculoskeletal"
            value={formData.neuromusculoskeletal || ""}
            onChange={handleChange}
          />
          <PhysicalExamField
            number={6}
            label="Psicológico"
            fieldName="psychological"
            value={formData.psychological || ""}
            onChange={handleChange}
          />
        </CardContent>
      </Card>

      {/* Antecedentes personales - Periodo Prenatal */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Antecedentes Personales - Periodo Prenatal</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-2">
            <Label htmlFor="prenatal_history">Antecedentes Prenatales</Label>
            <Textarea
              id="prenatal_history"
              value={formData.prenatal_history || ""}
              onChange={(e) => handleChange("prenatal_history", e.target.value)}
              placeholder="Descripción del periodo prenatal"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Periodo Natal */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Antecedentes Personales - Periodo Natal</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birth_place_type">Establecimiento/Domicilio</Label>
            <Select
              value={formData.birth_place_type || ""}
              onValueChange={(value) => handleChange("birth_place_type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="establecimiento">Establecimiento</SelectItem>
                <SelectItem value="domicilio">Domicilio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="professional_attention">Atención profesional</Label>
            <Input
              id="professional_attention"
              value={formData.professional_attention || ""}
              onChange={(e) => handleChange("professional_attention", e.target.value)}
              placeholder="Médico, Obstetra, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gestational_weeks">Edad Gestacional (semanas)</Label>
            <Input
              id="gestational_weeks"
              value={formData.gestational_weeks || ""}
              onChange={(e) => handleChange("gestational_weeks", e.target.value)}
              placeholder="40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="delivery_type">Tipo de Parto</Label>
            <Select
              value={formData.delivery_type || ""}
              onValueChange={(value) => handleChange("delivery_type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Parto normal</SelectItem>
                <SelectItem value="cesarea">Cesárea</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="apgar_score">APGAR (1° - 5°)</Label>
            <Input
              id="apgar_score"
              value={formData.apgar_score || ""}
              onChange={(e) => handleChange("apgar_score", e.target.value)}
              placeholder="9/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birth_weight">Peso al Nacer (g)</Label>
            <Input
              id="birth_weight"
              value={formData.birth_weight || ""}
              onChange={(e) => handleChange("birth_weight", e.target.value)}
              placeholder="3200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birth_length">Talla (cm)</Label>
            <Input
              id="birth_length"
              value={formData.birth_length || ""}
              onChange={(e) => handleChange("birth_length", e.target.value)}
              placeholder="50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="head_circumference">Perímetro Cefálico (cm)</Label>
            <Input
              id="head_circumference"
              value={formData.head_circumference || ""}
              onChange={(e) => handleChange("head_circumference", e.target.value)}
              placeholder="35"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birth_order">N° Orden de Nacimiento</Label>
            <Input
              id="birth_order"
              value={formData.birth_order || ""}
              onChange={(e) => handleChange("birth_order", e.target.value)}
              placeholder="1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Periodo Posnatal */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Antecedentes Personales - Periodo Posnatal</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="breastfeeding_duration">Lactancia Materna</Label>
            <Input
              id="breastfeeding_duration"
              value={formData.breastfeeding_duration || ""}
              onChange={(e) => handleChange("breastfeeding_duration", e.target.value)}
              placeholder="Duración y tipo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="formula_feeding">Alimentación Suplementaria/Fórmula</Label>
            <Input
              id="formula_feeding"
              value={formData.formula_feeding || ""}
              onChange={(e) => handleChange("formula_feeding", e.target.value)}
              placeholder="Tipo y duración"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complementary_feeding">Alimentación Complementaria (inicio)</Label>
            <Input
              id="complementary_feeding"
              value={formData.complementary_feeding || ""}
              onChange={(e) => handleChange("complementary_feeding", e.target.value)}
              placeholder="Edad de inicio"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vaccines_received">Vacunas Recibidas</Label>
            <Textarea
              id="vaccines_received"
              value={formData.vaccines_received || ""}
              onChange={(e) => handleChange("vaccines_received", e.target.value)}
              placeholder="Lista de vacunas recibidas"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="motor_development">Desarrollo Psicomotor</Label>
            <Textarea
              id="motor_development"
              value={formData.motor_development || ""}
              onChange={(e) => handleChange("motor_development", e.target.value)}
              placeholder="Hitos del desarrollo motor"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personality">Personalidad</Label>
            <Textarea
              id="personality"
              value={formData.personality || ""}
              onChange={(e) => handleChange("personality", e.target.value)}
              placeholder="Características de personalidad"
              rows={2}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="habits">Hábitos</Label>
            <Textarea
              id="habits"
              value={formData.habits || ""}
              onChange={(e) => handleChange("habits", e.target.value)}
              placeholder="Hábitos del niño"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Antecedentes patológicos */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Antecedentes Patológicos</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="previous_diseases">Enfermedades (edad, diagnóstico, complicaciones)</Label>
            <Textarea
              id="previous_diseases"
              value={formData.previous_diseases || ""}
              onChange={(e) => handleChange("previous_diseases", e.target.value)}
              placeholder="Describir enfermedades previas"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="previous_surgeries">Intervenciones Quirúrgicas</Label>
            <Textarea
              id="previous_surgeries"
              value={formData.previous_surgeries || ""}
              onChange={(e) => handleChange("previous_surgeries", e.target.value)}
              placeholder="Cirugías anteriores"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="allergies">Accidentes, Lesiones, Alergias</Label>
            <Textarea
              id="allergies"
              value={formData.allergies || ""}
              onChange={(e) => handleChange("allergies", e.target.value)}
              placeholder="Describir accidentes, lesiones y alergias conocidas"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current_medications">Medicamentos Actuales</Label>
            <Textarea
              id="current_medications"
              value={formData.current_medications || ""}
              onChange={(e) => handleChange("current_medications", e.target.value)}
              placeholder="Medicamentos que toma actualmente"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Antecedentes patológicos familiares */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Antecedentes Patológicos Familiares</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mother_health">Salud de la Madre</Label>
            <Textarea
              id="mother_health"
              value={formData.mother_health || ""}
              onChange={(e) => handleChange("mother_health", e.target.value)}
              placeholder="Condiciones de salud de la madre"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="father_health">Salud del Padre</Label>
            <Textarea
              id="father_health"
              value={formData.father_health || ""}
              onChange={(e) => handleChange("father_health", e.target.value)}
              placeholder="Condiciones de salud del padre"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siblings_health">Salud de Hermanos</Label>
            <Textarea
              id="siblings_health"
              value={formData.siblings_health || ""}
              onChange={(e) => handleChange("siblings_health", e.target.value)}
              placeholder="Condiciones de salud de hermanos"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pathological_family_history">Antecedentes Patológicos Familiares</Label>
            <Textarea
              id="pathological_family_history"
              value={formData.pathological_family_history || ""}
              onChange={(e) => handleChange("pathological_family_history", e.target.value)}
              placeholder="Enfermedades hereditarias, etc."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Examen físico general inicial - 15 campos con selector Normal/Otro */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Examen Físico General Inicial</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PhysicalExamField
              number={1}
              label="Piel"
              fieldName="exam_skin"
              value={formData.exam_skin || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={2}
              label="Cabeza"
              fieldName="exam_head"
              value={formData.exam_head || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={3}
              label="Cara/ojos/nariz/oídos"
              fieldName="exam_face_eyes_nose_ears"
              value={formData.exam_face_eyes_nose_ears || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={4}
              label="Boca"
              fieldName="exam_mouth"
              value={formData.exam_mouth || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={5}
              label="Faringe"
              fieldName="exam_pharynx"
              value={formData.exam_pharynx || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={6}
              label="Cuello/tiroides"
              fieldName="exam_neck_thyroid"
              value={formData.exam_neck_thyroid || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={7}
              label="Tórax/pulmones"
              fieldName="exam_thorax_lungs"
              value={formData.exam_thorax_lungs || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={8}
              label="Corazón"
              fieldName="exam_heart"
              value={formData.exam_heart || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={9}
              label="Abdomen"
              fieldName="exam_abdomen"
              value={formData.exam_abdomen || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={10}
              label="Genitales"
              fieldName="exam_genitals"
              value={formData.exam_genitals || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={11}
              label="Recto/ano"
              fieldName="exam_rectum"
              value={formData.exam_rectum || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={12}
              label="Columna vertebral"
              fieldName="exam_spine"
              value={formData.exam_spine || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={13}
              label="Extremidades/caderas"
              fieldName="exam_extremities"
              value={formData.exam_extremities || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={14}
              label="Ganglios Linfáticos"
              fieldName="exam_lymph_nodes"
              value={formData.exam_lymph_nodes || ""}
              onChange={handleChange}
            />
            <PhysicalExamField
              number={15}
              label="Examen neurológico"
              fieldName="exam_neurological"
              value={formData.exam_neurological || ""}
              onChange={handleChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notas generales */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Notas Generales</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Textarea
            id="notes"
            value={formData.notes || ""}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Observaciones adicionales"
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Guardando..." : "Guardar Historia Clínica"}
        </Button>
      </div>
    </form>
  );
};