import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

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

interface PatientDataFormProps {
  patient: Patient;
  onSave: (data: Partial<Patient>) => void;
  saving: boolean;
}

export const PatientDataForm = ({ patient, onSave, saving }: PatientDataFormProps) => {
  const [formData, setFormData] = useState<Partial<Patient>>({});

  useEffect(() => {
    setFormData({
      paternal_surname: patient.paternal_surname || "",
      maternal_surname: patient.maternal_surname || "",
      first_names: patient.first_names || "",
      birth_date: patient.birth_date || "",
      birth_place: patient.birth_place || "",
      sex: patient.sex || "",
      address: patient.address || "",
      residence_place: patient.residence_place || "",
      origin_place: patient.origin_place || "",
      first_consultation_date: patient.first_consultation_date || "",
      history_number: patient.history_number || "",
      identification_number: patient.identification_number || "",
      phone: patient.phone || "",
      email: patient.email || "",
      father_name: patient.father_name || "",
      father_age: patient.father_age || "",
      father_education: patient.father_education || "",
      father_occupation: patient.father_occupation || "",
      mother_name: patient.mother_name || "",
      mother_age: patient.mother_age || "",
      mother_education: patient.mother_education || "",
      mother_occupation: patient.mother_occupation || "",
      information_source: patient.information_source || "",
    });
  }, [patient]);

  const handleChange = (field: keyof Patient, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Encabezado - Datos de identificación */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Datos de Identificación</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="paternal_surname">Apellido Paterno</Label>
            <Input
              id="paternal_surname"
              value={formData.paternal_surname || ""}
              onChange={(e) => handleChange("paternal_surname", e.target.value)}
              placeholder="Apellido paterno"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maternal_surname">Apellido Materno</Label>
            <Input
              id="maternal_surname"
              value={formData.maternal_surname || ""}
              onChange={(e) => handleChange("maternal_surname", e.target.value)}
              placeholder="Apellido materno"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="first_names">Nombres</Label>
            <Input
              id="first_names"
              value={formData.first_names || ""}
              onChange={(e) => handleChange("first_names", e.target.value)}
              placeholder="Nombres"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="history_number">N° Historia Clínica</Label>
            <Input
              id="history_number"
              value={formData.history_number || ""}
              onChange={(e) => handleChange("history_number", e.target.value)}
              placeholder="Número de historia"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="identification_number">CI (Cédula de Identificación)</Label>
            <Input
              id="identification_number"
              value={formData.identification_number || ""}
              onChange={(e) => handleChange("identification_number", e.target.value)}
              placeholder="Ej: 1712345678"
            />
          </div>
        </CardContent>
      </Card>

      {/* Fecha de primera consulta y datos adicionales */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Información de Consulta</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_consultation_date">Fecha de Primera Consulta</Label>
            <Input
              id="first_consultation_date"
              type="date"
              value={formData.first_consultation_date || ""}
              onChange={(e) => handleChange("first_consultation_date", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="information_source">Fuente de Información</Label>
            <Input
              id="information_source"
              value={formData.information_source || ""}
              onChange={(e) => handleChange("information_source", e.target.value)}
              placeholder="Ej: Madre, Padre, Tutor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="0999999999"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* ANAMNESIS - Datos del nacimiento */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Anamnesis - Datos de Nacimiento</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birth_date">Fecha de Nacimiento</Label>
            <Input
              id="birth_date"
              type="date"
              value={formData.birth_date || ""}
              onChange={(e) => handleChange("birth_date", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birth_place">Lugar de Nacimiento</Label>
            <Input
              id="birth_place"
              value={formData.birth_place || ""}
              onChange={(e) => handleChange("birth_place", e.target.value)}
              placeholder="Ciudad, Provincia"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sex">Sexo</Label>
            <Select
              value={formData.sex || ""}
              onValueChange={(value) => handleChange("sex", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Masculino</SelectItem>
                <SelectItem value="F">Femenino</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="origin_place">Lugar de Procedencia</Label>
            <Input
              id="origin_place"
              value={formData.origin_place || ""}
              onChange={(e) => handleChange("origin_place", e.target.value)}
              placeholder="Lugar de procedencia"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="residence_place">Lugar de Residencia</Label>
            <Input
              id="residence_place"
              value={formData.residence_place || ""}
              onChange={(e) => handleChange("residence_place", e.target.value)}
              placeholder="Lugar de residencia actual"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              value={formData.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Dirección completa"
            />
          </div>
        </CardContent>
      </Card>

      {/* Datos del padre */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Datos del Padre</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="father_name">Nombre</Label>
            <Input
              id="father_name"
              value={formData.father_name || ""}
              onChange={(e) => handleChange("father_name", e.target.value)}
              placeholder="Nombre del padre"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="father_age">Edad (años)</Label>
            <Input
              id="father_age"
              value={formData.father_age || ""}
              onChange={(e) => handleChange("father_age", e.target.value)}
              placeholder="Edad"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="father_education">Instrucción</Label>
            <Input
              id="father_education"
              value={formData.father_education || ""}
              onChange={(e) => handleChange("father_education", e.target.value)}
              placeholder="Nivel de instrucción"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="father_occupation">Ocupación</Label>
            <Input
              id="father_occupation"
              value={formData.father_occupation || ""}
              onChange={(e) => handleChange("father_occupation", e.target.value)}
              placeholder="Ocupación"
            />
          </div>
        </CardContent>
      </Card>

      {/* Datos de la madre */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Datos de la Madre</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mother_name">Nombre</Label>
            <Input
              id="mother_name"
              value={formData.mother_name || ""}
              onChange={(e) => handleChange("mother_name", e.target.value)}
              placeholder="Nombre de la madre"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mother_age">Edad (años)</Label>
            <Input
              id="mother_age"
              value={formData.mother_age || ""}
              onChange={(e) => handleChange("mother_age", e.target.value)}
              placeholder="Edad"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mother_education">Instrucción</Label>
            <Input
              id="mother_education"
              value={formData.mother_education || ""}
              onChange={(e) => handleChange("mother_education", e.target.value)}
              placeholder="Nivel de instrucción"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mother_occupation">Ocupación</Label>
            <Input
              id="mother_occupation"
              value={formData.mother_occupation || ""}
              onChange={(e) => handleChange("mother_occupation", e.target.value)}
              placeholder="Ocupación"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Guardando..." : "Guardar Datos del Paciente"}
        </Button>
      </div>
    </form>
  );
};