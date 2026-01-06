-- Agregar campos adicionales a patients según formato MSP Ecuador
ALTER TABLE public.patients
ADD COLUMN IF NOT EXISTS paternal_surname TEXT,
ADD COLUMN IF NOT EXISTS maternal_surname TEXT,
ADD COLUMN IF NOT EXISTS first_names TEXT,
ADD COLUMN IF NOT EXISTS birth_date DATE,
ADD COLUMN IF NOT EXISTS birth_place TEXT,
ADD COLUMN IF NOT EXISTS sex TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS residence_place TEXT,
ADD COLUMN IF NOT EXISTS origin_place TEXT,
ADD COLUMN IF NOT EXISTS first_consultation_date DATE,
ADD COLUMN IF NOT EXISTS history_number TEXT,
ADD COLUMN IF NOT EXISTS father_name TEXT,
ADD COLUMN IF NOT EXISTS father_age TEXT,
ADD COLUMN IF NOT EXISTS father_education TEXT,
ADD COLUMN IF NOT EXISTS father_occupation TEXT,
ADD COLUMN IF NOT EXISTS mother_name TEXT,
ADD COLUMN IF NOT EXISTS mother_age TEXT,
ADD COLUMN IF NOT EXISTS mother_education TEXT,
ADD COLUMN IF NOT EXISTS mother_occupation TEXT,
ADD COLUMN IF NOT EXISTS information_source TEXT;

-- Agregar campos de anamnesis a medical_records
ALTER TABLE public.medical_records
ADD COLUMN IF NOT EXISTS consultation_reason TEXT,
ADD COLUMN IF NOT EXISTS current_illness TEXT,
ADD COLUMN IF NOT EXISTS sense_organs TEXT,
ADD COLUMN IF NOT EXISTS cardiorespiratory TEXT,
ADD COLUMN IF NOT EXISTS gastrointestinal TEXT,
ADD COLUMN IF NOT EXISTS genitourinary TEXT,
ADD COLUMN IF NOT EXISTS neuromusculoskeletal TEXT,
ADD COLUMN IF NOT EXISTS psychological TEXT,
ADD COLUMN IF NOT EXISTS prenatal_history TEXT,
ADD COLUMN IF NOT EXISTS birth_place_type TEXT,
ADD COLUMN IF NOT EXISTS professional_attention TEXT,
ADD COLUMN IF NOT EXISTS birth_order TEXT,
ADD COLUMN IF NOT EXISTS postnatal_observations TEXT,
ADD COLUMN IF NOT EXISTS vaccines_received TEXT,
ADD COLUMN IF NOT EXISTS personality TEXT,
ADD COLUMN IF NOT EXISTS habits TEXT,
ADD COLUMN IF NOT EXISTS pathological_family_history TEXT,
ADD COLUMN IF NOT EXISTS initial_physical_exam TEXT;

-- Agregar campos de notas de evolución a medical_controls
ALTER TABLE public.medical_controls
ADD COLUMN IF NOT EXISTS evolution_notes TEXT,
ADD COLUMN IF NOT EXISTS medical_prescriptions TEXT,
ADD COLUMN IF NOT EXISTS hour TEXT,
ADD COLUMN IF NOT EXISTS nutritional_status TEXT,
ADD COLUMN IF NOT EXISTS visual_acuity TEXT,
ADD COLUMN IF NOT EXISTS auditory_acuity TEXT,
ADD COLUMN IF NOT EXISTS thyroid_exam TEXT,
ADD COLUMN IF NOT EXISTS oral_exam TEXT,
ADD COLUMN IF NOT EXISTS supplementary_food TEXT,
ADD COLUMN IF NOT EXISTS examiner_name TEXT;