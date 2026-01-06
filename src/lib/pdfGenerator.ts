interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

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

interface MedicalControl {
  id: string;
  control_date: string;
  age_at_control: string | null;
  weight: string | null;
  height: string | null;
  head_circumference: string | null;
  diagnosis: string | null;
  treatment: string | null;
  recommendations: string | null;
}

interface Vaccination {
  id: string;
  vaccine_name: string;
  dose_number: string | null;
  application_date: string;
  lot_number: string | null;
}

export const generateMedicalRecordPDF = (
  patient: Patient,
  record: MedicalRecord,
  controls: MedicalControl[],
  vaccinations: Vaccination[]
) => {
  // Create HTML content for PDF
  const content = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Historia Clínica - ${patient.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; padding: 20px; }
    .header { text-align: center; border-bottom: 2px solid #0ea5e9; padding-bottom: 15px; margin-bottom: 20px; }
    .header h1 { color: #0ea5e9; font-size: 18px; margin-bottom: 5px; }
    .header p { color: #666; font-size: 10px; }
    .section { margin-bottom: 20px; }
    .section-title { background: #0ea5e9; color: white; padding: 8px 12px; font-size: 14px; margin-bottom: 10px; }
    .field { margin-bottom: 8px; }
    .field-label { font-weight: bold; color: #333; }
    .field-value { color: #555; }
    .grid { display: flex; flex-wrap: wrap; gap: 15px; }
    .grid-item { flex: 1 1 45%; min-width: 200px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 11px; }
    th { background: #f5f5f5; font-weight: bold; }
    .footer { margin-top: 30px; text-align: center; color: #999; font-size: 10px; border-top: 1px solid #ddd; padding-top: 15px; }
    @media print {
      body { padding: 0; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>HISTORIA CLÍNICA PEDIÁTRICA</h1>
    <p>Dr. Jacinto Salazar Vargas - Pediatra</p>
    <p>Generado el: ${new Date().toLocaleDateString("es-EC")}</p>
  </div>

  <div class="section">
    <div class="section-title">DATOS DEL PACIENTE</div>
    <div class="grid">
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Nombre:</span>
          <span class="field-value">${patient.name}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Correo:</span>
          <span class="field-value">${patient.email}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Teléfono:</span>
          <span class="field-value">${patient.phone || "No registrado"}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">DATOS DEL NACIMIENTO</div>
    <div class="grid">
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Peso al nacer:</span>
          <span class="field-value">${record.birth_weight || "-"} g</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Talla al nacer:</span>
          <span class="field-value">${record.birth_length || "-"} cm</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Perímetro cefálico:</span>
          <span class="field-value">${record.head_circumference || "-"} cm</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Semanas de gestación:</span>
          <span class="field-value">${record.gestational_weeks || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Tipo de parto:</span>
          <span class="field-value">${record.delivery_type === "normal" ? "Parto normal" : record.delivery_type === "cesarea" ? "Cesárea" : "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">APGAR:</span>
          <span class="field-value">${record.apgar_score || "-"}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">ANTECEDENTES FAMILIARES</div>
    <div class="grid">
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Salud de la madre:</span>
          <span class="field-value">${record.mother_health || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Salud del padre:</span>
          <span class="field-value">${record.father_health || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Salud de hermanos:</span>
          <span class="field-value">${record.siblings_health || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Historia familiar:</span>
          <span class="field-value">${record.family_history || "-"}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">ANTECEDENTES PERSONALES</div>
    <div class="grid">
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Alergias:</span>
          <span class="field-value">${record.allergies || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Enfermedades previas:</span>
          <span class="field-value">${record.previous_diseases || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Cirugías previas:</span>
          <span class="field-value">${record.previous_surgeries || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Medicamentos actuales:</span>
          <span class="field-value">${record.current_medications || "-"}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">ALIMENTACIÓN</div>
    <div class="grid">
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Lactancia materna:</span>
          <span class="field-value">${record.breastfeeding_duration || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Fórmula:</span>
          <span class="field-value">${record.formula_feeding || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Alimentación complementaria:</span>
          <span class="field-value">${record.complementary_feeding || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Dieta actual:</span>
          <span class="field-value">${record.current_diet || "-"}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">DESARROLLO PSICOMOTOR</div>
    <div class="grid">
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Desarrollo motor:</span>
          <span class="field-value">${record.motor_development || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Desarrollo del lenguaje:</span>
          <span class="field-value">${record.language_development || "-"}</span>
        </div>
      </div>
      <div class="grid-item">
        <div class="field">
          <span class="field-label">Desarrollo social:</span>
          <span class="field-value">${record.social_development || "-"}</span>
        </div>
      </div>
    </div>
  </div>

  ${record.notes ? `
  <div class="section">
    <div class="section-title">NOTAS GENERALES</div>
    <p>${record.notes}</p>
  </div>
  ` : ""}

  ${controls.length > 0 ? `
  <div class="section">
    <div class="section-title">CONTROLES MÉDICOS</div>
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Edad</th>
          <th>Peso</th>
          <th>Talla</th>
          <th>Diagnóstico</th>
          <th>Tratamiento</th>
        </tr>
      </thead>
      <tbody>
        ${controls.map(c => `
          <tr>
            <td>${new Date(c.control_date).toLocaleDateString("es-EC")}</td>
            <td>${c.age_at_control || "-"}</td>
            <td>${c.weight || "-"}</td>
            <td>${c.height || "-"}</td>
            <td>${c.diagnosis || "-"}</td>
            <td>${c.treatment || "-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>
  ` : ""}

  ${vaccinations.length > 0 ? `
  <div class="section">
    <div class="section-title">REGISTRO DE VACUNACIÓN</div>
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Vacuna</th>
          <th>Dosis</th>
          <th>Lote</th>
        </tr>
      </thead>
      <tbody>
        ${vaccinations.map(v => `
          <tr>
            <td>${new Date(v.application_date).toLocaleDateString("es-EC")}</td>
            <td>${v.vaccine_name}</td>
            <td>${v.dose_number || "-"}</td>
            <td>${v.lot_number || "-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>
  ` : ""}

  <div class="footer">
    <p>Documento confidencial - Solo para uso médico</p>
    <p>Dr. Jacinto Salazar Vargas - Pediatra</p>
  </div>
</body>
</html>
  `;

  // Open in new window for printing/saving as PDF
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  }
};
