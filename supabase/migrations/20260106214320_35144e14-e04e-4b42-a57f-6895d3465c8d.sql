
-- Tabla principal de historias clínicas
CREATE TABLE public.medical_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  
  -- Datos del nacimiento
  birth_weight TEXT,
  birth_length TEXT,
  head_circumference TEXT,
  gestational_weeks TEXT,
  delivery_type TEXT, -- 'normal', 'cesarea'
  apgar_score TEXT,
  
  -- Antecedentes familiares
  family_history TEXT,
  mother_health TEXT,
  father_health TEXT,
  siblings_health TEXT,
  
  -- Antecedentes personales
  allergies TEXT,
  previous_diseases TEXT,
  previous_surgeries TEXT,
  current_medications TEXT,
  
  -- Alimentación
  breastfeeding_duration TEXT,
  formula_feeding TEXT,
  complementary_feeding TEXT,
  current_diet TEXT,
  
  -- Desarrollo psicomotor
  motor_development TEXT,
  language_development TEXT,
  social_development TEXT,
  
  -- Notas generales
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de controles médicos
CREATE TABLE public.medical_controls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  medical_record_id UUID REFERENCES public.medical_records(id) ON DELETE CASCADE NOT NULL,
  
  control_date DATE NOT NULL DEFAULT CURRENT_DATE,
  age_at_control TEXT,
  
  -- Medidas antropométricas
  weight TEXT,
  height TEXT,
  head_circumference TEXT,
  bmi TEXT,
  
  -- Signos vitales
  temperature TEXT,
  heart_rate TEXT,
  respiratory_rate TEXT,
  blood_pressure TEXT,
  
  -- Examen físico
  general_appearance TEXT,
  skin_exam TEXT,
  head_exam TEXT,
  eyes_exam TEXT,
  ears_exam TEXT,
  nose_throat_exam TEXT,
  neck_exam TEXT,
  chest_exam TEXT,
  heart_exam TEXT,
  abdomen_exam TEXT,
  genitourinary_exam TEXT,
  extremities_exam TEXT,
  neurological_exam TEXT,
  
  -- Diagnóstico y plan
  diagnosis TEXT,
  treatment TEXT,
  recommendations TEXT,
  next_appointment DATE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de vacunas
CREATE TABLE public.vaccinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  medical_record_id UUID REFERENCES public.medical_records(id) ON DELETE CASCADE NOT NULL,
  
  vaccine_name TEXT NOT NULL,
  dose_number TEXT,
  application_date DATE NOT NULL,
  lot_number TEXT,
  site TEXT,
  administered_by TEXT,
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaccinations ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - Solo administradores (médico)
CREATE POLICY "Admins can view all medical records"
ON public.medical_records FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create medical records"
ON public.medical_records FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update medical records"
ON public.medical_records FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete medical records"
ON public.medical_records FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all medical controls"
ON public.medical_controls FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create medical controls"
ON public.medical_controls FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update medical controls"
ON public.medical_controls FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete medical controls"
ON public.medical_controls FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all vaccinations"
ON public.vaccinations FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create vaccinations"
ON public.vaccinations FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update vaccinations"
ON public.vaccinations FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete vaccinations"
ON public.vaccinations FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers para updated_at
CREATE TRIGGER update_medical_records_updated_at
BEFORE UPDATE ON public.medical_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_controls_updated_at
BEFORE UPDATE ON public.medical_controls
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vaccinations_updated_at
BEFORE UPDATE ON public.vaccinations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
