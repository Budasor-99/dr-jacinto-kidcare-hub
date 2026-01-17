interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  paternal_surname?: string | null;
  maternal_surname?: string | null;
  first_names?: string | null;
  birth_date?: string | null;
  birth_place?: string | null;
  sex?: string | null;
  address?: string | null;
  residence_place?: string | null;
  origin_place?: string | null;
  first_consultation_date?: string | null;
  history_number?: string | null;
  identification_number?: string | null;
  father_name?: string | null;
  father_age?: string | null;
  father_education?: string | null;
  father_occupation?: string | null;
  mother_name?: string | null;
  mother_age?: string | null;
  mother_education?: string | null;
  mother_occupation?: string | null;
  information_source?: string | null;
}

interface MedicalRecord {
  id: string;
  birth_weight: string | null;
  birth_length: string | null;
  head_circumference: string | null;
  gestational_weeks: string | null;
  delivery_type: string | null;
  apgar_score: string | null;
  birth_place_type?: string | null;
  professional_attention?: string | null;
  birth_order?: string | null;
  family_history: string | null;
  mother_health: string | null;
  father_health: string | null;
  siblings_health: string | null;
  pathological_family_history?: string | null;
  allergies: string | null;
  previous_diseases: string | null;
  previous_surgeries: string | null;
  current_medications: string | null;
  prenatal_history?: string | null;
  postnatal_observations?: string | null;
  breastfeeding_duration: string | null;
  formula_feeding: string | null;
  complementary_feeding: string | null;
  current_diet: string | null;
  motor_development: string | null;
  language_development: string | null;
  social_development: string | null;
  vaccines_received?: string | null;
  personality?: string | null;
  habits?: string | null;
  consultation_reason?: string | null;
  current_illness?: string | null;
  sense_organs?: string | null;
  cardiorespiratory?: string | null;
  gastrointestinal?: string | null;
  genitourinary?: string | null;
  neuromusculoskeletal?: string | null;
  psychological?: string | null;
  // 15 campos de examen físico
  exam_skin?: string | null;
  exam_head?: string | null;
  exam_face_eyes_nose_ears?: string | null;
  exam_mouth?: string | null;
  exam_pharynx?: string | null;
  exam_neck_thyroid?: string | null;
  exam_thorax_lungs?: string | null;
  exam_heart?: string | null;
  exam_abdomen?: string | null;
  exam_genitals?: string | null;
  exam_rectum?: string | null;
  exam_spine?: string | null;
  exam_extremities?: string | null;
  exam_lymph_nodes?: string | null;
  exam_neurological?: string | null;
  initial_physical_exam?: string | null;
  notes: string | null;
}

interface MedicalControl {
  id: string;
  control_date: string;
  hour?: string | null;
  age_at_control: string | null;
  weight: string | null;
  height: string | null;
  head_circumference: string | null;
  temperature?: string | null;
  nutritional_status?: string | null;
  diagnosis: string | null;
  treatment: string | null;
  recommendations: string | null;
  evolution_notes?: string | null;
  medical_prescriptions?: string | null;
  examiner_name?: string | null;
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
  const getPatientName = () => {
    if (patient.paternal_surname || patient.first_names) {
      return `${patient.paternal_surname || ""} ${patient.maternal_surname || ""} ${patient.first_names || ""}`.trim();
    }
    return patient.name;
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString("es-EC");
    } catch {
      return dateStr;
    }
  };

  const content = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Historia Clínica - ${getPatientName()}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 11px; line-height: 1.4; padding: 15px; }
    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 15px; }
    .header h1 { font-size: 14px; margin-bottom: 3px; letter-spacing: 1px; }
    .header h2 { font-size: 12px; font-weight: normal; }
    .header p { font-size: 9px; color: #666; }
    .patient-header { display: flex; justify-content: space-between; border: 1px solid #333; padding: 8px; margin-bottom: 10px; background: #f9f9f9; }
    .section { margin-bottom: 12px; border: 1px solid #ddd; }
    .section-title { background: #333; color: white; padding: 5px 10px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
    .section-content { padding: 10px; }
    .field-row { display: flex; flex-wrap: wrap; margin-bottom: 5px; }
    .field { flex: 1; min-width: 180px; margin-right: 10px; margin-bottom: 5px; }
    .field-label { font-weight: bold; font-size: 10px; color: #333; }
    .field-value { font-size: 10px; border-bottom: 1px dotted #999; min-height: 14px; padding-left: 3px; }
    .field-full { width: 100%; margin-right: 0; }
    table { width: 100%; border-collapse: collapse; font-size: 9px; }
    th, td { border: 1px solid #333; padding: 4px; text-align: left; }
    th { background: #eee; font-weight: bold; }
    .two-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .three-cols { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
    .four-cols { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; }
    .footer { margin-top: 20px; text-align: center; font-size: 9px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
    .sub-section { margin-top: 10px; padding-top: 8px; border-top: 1px dashed #ccc; }
    .sub-title { font-weight: bold; font-size: 10px; margin-bottom: 5px; color: #555; }
    @media print {
      body { padding: 10px; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>MINISTERIO DE SALUD PÚBLICA DEL ECUADOR</h1>
    <h2>HISTORIA CLÍNICA - ATENCIÓN INFANTIL, PREESCOLAR Y ESCOLAR</h2>
    <p>HCU – Form.028/02 | Dr. Jacinto Salazar Vargas - Pediatra</p>
  </div>

  <div class="patient-header">
    <div>
      <strong>APELLIDO PATERNO:</strong> ${patient.paternal_surname || "-"} &nbsp;&nbsp;
      <strong>MATERNO:</strong> ${patient.maternal_surname || "-"} &nbsp;&nbsp;
      <strong>NOMBRES:</strong> ${patient.first_names || patient.name || "-"}
    </div>
    <div>
      <strong>CI:</strong> ${patient.identification_number || "-"} &nbsp;&nbsp;
      <strong>N° HISTORIA CLÍNICA:</strong> ${patient.history_number || "-"}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Datos del Paciente</div>
    <div class="section-content">
      <div class="four-cols">
        <div class="field">
          <div class="field-label">Fecha de Primera Consulta:</div>
          <div class="field-value">${formatDate(patient.first_consultation_date)}</div>
        </div>
        <div class="field">
          <div class="field-label">Fecha de Nacimiento:</div>
          <div class="field-value">${formatDate(patient.birth_date)}</div>
        </div>
        <div class="field">
          <div class="field-label">Sexo:</div>
          <div class="field-value">${patient.sex === "M" ? "Masculino" : patient.sex === "F" ? "Femenino" : "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">Lugar de Nacimiento:</div>
          <div class="field-value">${patient.birth_place || "-"}</div>
        </div>
      </div>
      <div class="three-cols">
        <div class="field">
          <div class="field-label">Lugar de Procedencia:</div>
          <div class="field-value">${patient.origin_place || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">Lugar de Residencia:</div>
          <div class="field-value">${patient.residence_place || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">Fuente de Información:</div>
          <div class="field-value">${patient.information_source || "-"}</div>
        </div>
      </div>
      <div class="field field-full">
        <div class="field-label">Dirección:</div>
        <div class="field-value">${patient.address || "-"}</div>
      </div>
      <div class="two-cols">
        <div class="field">
          <div class="field-label">Teléfono:</div>
          <div class="field-value">${patient.phone || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">Correo Electrónico:</div>
          <div class="field-value">${patient.email || "-"}</div>
        </div>
      </div>

      <div class="sub-section">
        <div class="sub-title">Datos del Padre:</div>
        <div class="four-cols">
          <div class="field">
            <div class="field-label">Nombre:</div>
            <div class="field-value">${patient.father_name || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Edad:</div>
            <div class="field-value">${patient.father_age || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Instrucción:</div>
            <div class="field-value">${patient.father_education || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Ocupación:</div>
            <div class="field-value">${patient.father_occupation || "-"}</div>
          </div>
        </div>
      </div>

      <div class="sub-section">
        <div class="sub-title">Datos de la Madre:</div>
        <div class="four-cols">
          <div class="field">
            <div class="field-label">Nombre:</div>
            <div class="field-value">${patient.mother_name || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Edad:</div>
            <div class="field-value">${patient.mother_age || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Instrucción:</div>
            <div class="field-value">${patient.mother_education || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Ocupación:</div>
            <div class="field-value">${patient.mother_occupation || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Anamnesis - Motivo de Consulta</div>
    <div class="section-content">
      <div class="field field-full">
        <div class="field-label">Motivo de Consulta:</div>
        <div class="field-value">${record.consultation_reason || "-"}</div>
      </div>
      <div class="field field-full">
        <div class="field-label">Enfermedad Actual:</div>
        <div class="field-value">${record.current_illness || "-"}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Interrogatorio por Aparatos y Sistemas</div>
    <div class="section-content">
      <div class="two-cols">
        <div class="field">
          <div class="field-label">1. Órganos de los sentidos:</div>
          <div class="field-value">${record.sense_organs || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">2. Cardiorespiratorio:</div>
          <div class="field-value">${record.cardiorespiratory || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">3. Gastrointestinal:</div>
          <div class="field-value">${record.gastrointestinal || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">4. Genitourinario:</div>
          <div class="field-value">${record.genitourinary || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">5. Neuromusculoesquelético:</div>
          <div class="field-value">${record.neuromusculoskeletal || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">6. Psicológico:</div>
          <div class="field-value">${record.psychological || "-"}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Antecedentes Personales</div>
    <div class="section-content">
      <div class="sub-title">Periodo Prenatal:</div>
      <div class="field field-full">
        <div class="field-value">${record.prenatal_history || "-"}</div>
      </div>

      <div class="sub-section">
        <div class="sub-title">Periodo Natal:</div>
        <div class="four-cols">
          <div class="field">
            <div class="field-label">Lugar:</div>
            <div class="field-value">${record.birth_place_type === "establecimiento" ? "Establecimiento" : record.birth_place_type === "domicilio" ? "Domicilio" : "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Atención Profesional:</div>
            <div class="field-value">${record.professional_attention || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Edad Gestacional:</div>
            <div class="field-value">${record.gestational_weeks || "-"} sem</div>
          </div>
          <div class="field">
            <div class="field-label">Tipo de Parto:</div>
            <div class="field-value">${record.delivery_type === "normal" ? "Normal" : record.delivery_type === "cesarea" ? "Cesárea" : "-"}</div>
          </div>
        </div>
        <div class="four-cols">
          <div class="field">
            <div class="field-label">APGAR 1°-5°:</div>
            <div class="field-value">${record.apgar_score || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Peso:</div>
            <div class="field-value">${record.birth_weight || "-"} g</div>
          </div>
          <div class="field">
            <div class="field-label">Talla:</div>
            <div class="field-value">${record.birth_length || "-"} cm</div>
          </div>
          <div class="field">
            <div class="field-label">P. Cefálico:</div>
            <div class="field-value">${record.head_circumference || "-"} cm</div>
          </div>
        </div>
        <div class="field">
          <div class="field-label">N° Orden de Nacimiento:</div>
          <div class="field-value">${record.birth_order || "-"}</div>
        </div>
      </div>

      <div class="sub-section">
        <div class="sub-title">Periodo Posnatal:</div>
        <div class="three-cols">
          <div class="field">
            <div class="field-label">Lactancia Materna:</div>
            <div class="field-value">${record.breastfeeding_duration || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Alimentación Suplementaria:</div>
            <div class="field-value">${record.formula_feeding || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Alimentación Complementaria:</div>
            <div class="field-value">${record.complementary_feeding || "-"}</div>
          </div>
        </div>
        <div class="two-cols">
          <div class="field">
            <div class="field-label">Vacunas Recibidas:</div>
            <div class="field-value">${record.vaccines_received || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Desarrollo Psicomotor:</div>
            <div class="field-value">${record.motor_development || "-"}</div>
          </div>
        </div>
        <div class="two-cols">
          <div class="field">
            <div class="field-label">Personalidad:</div>
            <div class="field-value">${record.personality || "-"}</div>
          </div>
          <div class="field">
            <div class="field-label">Hábitos:</div>
            <div class="field-value">${record.habits || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Antecedentes Patológicos</div>
    <div class="section-content">
      <div class="field field-full">
        <div class="field-label">Enfermedades (edad, diagnóstico, complicaciones):</div>
        <div class="field-value">${record.previous_diseases || "-"}</div>
      </div>
      <div class="field field-full">
        <div class="field-label">Intervenciones Quirúrgicas:</div>
        <div class="field-value">${record.previous_surgeries || "-"}</div>
      </div>
      <div class="field field-full">
        <div class="field-label">Accidentes, Lesiones, Alergias:</div>
        <div class="field-value">${record.allergies || "-"}</div>
      </div>
      <div class="field field-full">
        <div class="field-label">Medicamentos Actuales:</div>
        <div class="field-value">${record.current_medications || "-"}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Antecedentes Patológicos Familiares</div>
    <div class="section-content">
      <div class="two-cols">
        <div class="field">
          <div class="field-label">Salud de la Madre:</div>
          <div class="field-value">${record.mother_health || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">Salud del Padre:</div>
          <div class="field-value">${record.father_health || "-"}</div>
        </div>
      </div>
      <div class="two-cols">
        <div class="field">
          <div class="field-label">Salud de Hermanos:</div>
          <div class="field-value">${record.siblings_health || "-"}</div>
        </div>
        <div class="field">
          <div class="field-label">Antecedentes Familiares:</div>
          <div class="field-value">${record.pathological_family_history || record.family_history || "-"}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Examen Físico General Inicial</div>
    <div class="section-content">
      <div class="two-cols">
        <div class="field">
          <div class="field-label">1.- Piel:</div>
          <div class="field-value">${record.exam_skin || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">2.- Cabeza:</div>
          <div class="field-value">${record.exam_head || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">3.- Cara/ojos/nariz/oídos:</div>
          <div class="field-value">${record.exam_face_eyes_nose_ears || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">4.- Boca:</div>
          <div class="field-value">${record.exam_mouth || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">5.- Faringe:</div>
          <div class="field-value">${record.exam_pharynx || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">6.- Cuello/tiroides:</div>
          <div class="field-value">${record.exam_neck_thyroid || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">7.- Tórax/pulmones:</div>
          <div class="field-value">${record.exam_thorax_lungs || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">8.- Corazón:</div>
          <div class="field-value">${record.exam_heart || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">9.- Abdomen:</div>
          <div class="field-value">${record.exam_abdomen || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">10.- Genitales:</div>
          <div class="field-value">${record.exam_genitals || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">11.- Recto/ano:</div>
          <div class="field-value">${record.exam_rectum || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">12.- Columna vertebral:</div>
          <div class="field-value">${record.exam_spine || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">13.- Extremidades/caderas:</div>
          <div class="field-value">${record.exam_extremities || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">14.- Ganglios Linfáticos:</div>
          <div class="field-value">${record.exam_lymph_nodes || "normal"}</div>
        </div>
        <div class="field">
          <div class="field-label">15.- Examen neurológico:</div>
          <div class="field-value">${record.exam_neurological || "normal"}</div>
        </div>
      </div>
    </div>
  </div>

  ${controls.length > 0 ? `
  <div class="section">
    <div class="section-title">Control Infantil</div>
    <div class="section-content">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Edad</th>
            <th>Peso</th>
            <th>Talla</th>
            <th>P. Cefálico</th>
            <th>Temp.</th>
            <th>Est. Nutricional</th>
            <th>Diagnóstico</th>
            <th>Examinador</th>
          </tr>
        </thead>
        <tbody>
          ${controls.map(c => `
            <tr>
              <td>${formatDate(c.control_date)}</td>
              <td>${c.hour || "-"}</td>
              <td>${c.age_at_control || "-"}</td>
              <td>${c.weight || "-"}</td>
              <td>${c.height || "-"}</td>
              <td>${c.head_circumference || "-"}</td>
              <td>${c.temperature || "-"}</td>
              <td>${c.nutritional_status || "-"}</td>
              <td>${c.diagnosis || "-"}</td>
              <td>${c.examiner_name || "-"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Notas de Evolución y Prescripciones Médicas</div>
    <div class="section-content">
      <table>
        <thead>
          <tr>
            <th style="width: 80px;">Fecha</th>
            <th style="width: 60px;">Hora</th>
            <th>Notas de Evolución</th>
            <th>Prescripciones Médicas</th>
          </tr>
        </thead>
        <tbody>
          ${controls.filter(c => c.evolution_notes || c.medical_prescriptions).map(c => `
            <tr>
              <td>${formatDate(c.control_date)}</td>
              <td>${c.hour || "-"}</td>
              <td style="white-space: pre-wrap;">${c.evolution_notes || "-"}</td>
              <td style="white-space: pre-wrap;">${c.medical_prescriptions || "-"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  </div>
  ` : ""}

  ${vaccinations.length > 0 ? `
  <div class="section">
    <div class="section-title">Inmunización</div>
    <div class="section-content">
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
              <td>${formatDate(v.application_date)}</td>
              <td>${v.vaccine_name}</td>
              <td>${v.dose_number || "-"}</td>
              <td>${v.lot_number || "-"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  </div>
  ` : ""}

  ${record.notes ? `
  <div class="section">
    <div class="section-title">Notas Generales</div>
    <div class="section-content">
      <div class="field-value" style="white-space: pre-wrap;">${record.notes}</div>
    </div>
  </div>
  ` : ""}

  <div class="footer">
    <p>M.S.P. HCU – Form. 028/02 | Documento confidencial - Solo para uso médico</p>
    <p>Dr. Jacinto Salazar Vargas - Pediatra | Generado el: ${new Date().toLocaleDateString("es-EC")}</p>
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