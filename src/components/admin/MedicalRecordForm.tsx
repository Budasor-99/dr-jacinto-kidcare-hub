import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

interface MedicalRecord {
  id: string;
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
      family_history: record.family_history || "",
      mother_health: record.mother_health || "",
      father_health: record.father_health || "",
      siblings_health: record.siblings_health || "",
      allergies: record.allergies || "",
      previous_diseases: record.previous_diseases || "",
      previous_surgeries: record.previous_surgeries || "",
      current_medications: record.current_medications || "",
      breastfeeding_duration: record.breastfeeding_duration || "",
      formula_feeding: record.formula_feeding || "",
      complementary_feeding: record.complementary_feeding || "",
      current_diet: record.current_diet || "",
      motor_development: record.motor_development || "",
      language_development: record.language_development || "",
      social_development: record.social_development || "",
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
      {/* Datos del nacimiento */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Datos del Nacimiento</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birth_weight">Peso al nacer (g)</Label>
            <Input
              id="birth_weight"
              value={formData.birth_weight || ""}
              onChange={(e) => handleChange("birth_weight", e.target.value)}
              placeholder="3200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birth_length">Talla al nacer (cm)</Label>
            <Input
              id="birth_length"
              value={formData.birth_length || ""}
              onChange={(e) => handleChange("birth_length", e.target.value)}
              placeholder="50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="head_circumference">Perímetro cefálico (cm)</Label>
            <Input
              id="head_circumference"
              value={formData.head_circumference || ""}
              onChange={(e) => handleChange("head_circumference", e.target.value)}
              placeholder="35"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gestational_weeks">Semanas de gestación</Label>
            <Input
              id="gestational_weeks"
              value={formData.gestational_weeks || ""}
              onChange={(e) => handleChange("gestational_weeks", e.target.value)}
              placeholder="40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="delivery_type">Tipo de parto</Label>
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
            <Label htmlFor="apgar_score">APGAR</Label>
            <Input
              id="apgar_score"
              value={formData.apgar_score || ""}
              onChange={(e) => handleChange("apgar_score", e.target.value)}
              placeholder="9/10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Antecedentes familiares */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Antecedentes Familiares</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mother_health">Salud de la madre</Label>
            <Textarea
              id="mother_health"
              value={formData.mother_health || ""}
              onChange={(e) => handleChange("mother_health", e.target.value)}
              placeholder="Condiciones de salud de la madre"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="father_health">Salud del padre</Label>
            <Textarea
              id="father_health"
              value={formData.father_health || ""}
              onChange={(e) => handleChange("father_health", e.target.value)}
              placeholder="Condiciones de salud del padre"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siblings_health">Salud de hermanos</Label>
            <Textarea
              id="siblings_health"
              value={formData.siblings_health || ""}
              onChange={(e) => handleChange("siblings_health", e.target.value)}
              placeholder="Condiciones de salud de hermanos"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="family_history">Historia familiar general</Label>
            <Textarea
              id="family_history"
              value={formData.family_history || ""}
              onChange={(e) => handleChange("family_history", e.target.value)}
              placeholder="Enfermedades hereditarias, etc."
            />
          </div>
        </CardContent>
      </Card>

      {/* Antecedentes personales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Antecedentes Personales</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="allergies">Alergias</Label>
            <Textarea
              id="allergies"
              value={formData.allergies || ""}
              onChange={(e) => handleChange("allergies", e.target.value)}
              placeholder="Alergias conocidas"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="previous_diseases">Enfermedades previas</Label>
            <Textarea
              id="previous_diseases"
              value={formData.previous_diseases || ""}
              onChange={(e) => handleChange("previous_diseases", e.target.value)}
              placeholder="Enfermedades anteriores"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="previous_surgeries">Cirugías previas</Label>
            <Textarea
              id="previous_surgeries"
              value={formData.previous_surgeries || ""}
              onChange={(e) => handleChange("previous_surgeries", e.target.value)}
              placeholder="Cirugías anteriores"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current_medications">Medicamentos actuales</Label>
            <Textarea
              id="current_medications"
              value={formData.current_medications || ""}
              onChange={(e) => handleChange("current_medications", e.target.value)}
              placeholder="Medicamentos que toma actualmente"
            />
          </div>
        </CardContent>
      </Card>

      {/* Alimentación */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Alimentación</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="breastfeeding_duration">Lactancia materna</Label>
            <Input
              id="breastfeeding_duration"
              value={formData.breastfeeding_duration || ""}
              onChange={(e) => handleChange("breastfeeding_duration", e.target.value)}
              placeholder="Ej: 6 meses exclusiva"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="formula_feeding">Fórmula</Label>
            <Input
              id="formula_feeding"
              value={formData.formula_feeding || ""}
              onChange={(e) => handleChange("formula_feeding", e.target.value)}
              placeholder="Tipo y duración"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complementary_feeding">Alimentación complementaria</Label>
            <Input
              id="complementary_feeding"
              value={formData.complementary_feeding || ""}
              onChange={(e) => handleChange("complementary_feeding", e.target.value)}
              placeholder="Inicio de alimentación complementaria"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current_diet">Dieta actual</Label>
            <Textarea
              id="current_diet"
              value={formData.current_diet || ""}
              onChange={(e) => handleChange("current_diet", e.target.value)}
              placeholder="Descripción de la dieta actual"
            />
          </div>
        </CardContent>
      </Card>

      {/* Desarrollo psicomotor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Desarrollo Psicomotor</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="motor_development">Desarrollo motor</Label>
            <Textarea
              id="motor_development"
              value={formData.motor_development || ""}
              onChange={(e) => handleChange("motor_development", e.target.value)}
              placeholder="Hitos del desarrollo motor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language_development">Desarrollo del lenguaje</Label>
            <Textarea
              id="language_development"
              value={formData.language_development || ""}
              onChange={(e) => handleChange("language_development", e.target.value)}
              placeholder="Hitos del lenguaje"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="social_development">Desarrollo social</Label>
            <Textarea
              id="social_development"
              value={formData.social_development || ""}
              onChange={(e) => handleChange("social_development", e.target.value)}
              placeholder="Habilidades sociales"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notas generales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notas Generales</CardTitle>
        </CardHeader>
        <CardContent>
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
          {saving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </form>
  );
};
