-- Crear tabla de pacientes
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(email)
);

-- Habilitar RLS
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para patients
CREATE POLICY "Patients can view their own profile"
ON public.patients
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Patients can update their own profile"
ON public.patients
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create a patient record"
ON public.patients
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all patients"
ON public.patients
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all patients"
ON public.patients
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Agregar columna patient_id a appointments
ALTER TABLE public.appointments
ADD COLUMN patient_id UUID REFERENCES public.patients(id) ON DELETE SET NULL;

-- Trigger para actualizar updated_at en patients
CREATE TRIGGER update_patients_updated_at
BEFORE UPDATE ON public.patients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Permitir a pacientes ver sus propias citas
CREATE POLICY "Patients can view their own appointments"
ON public.appointments
FOR SELECT
USING (
  patient_id IN (
    SELECT id FROM public.patients WHERE user_id = auth.uid()
  )
);

-- Permitir a pacientes cancelar sus propias citas (actualizar status)
CREATE POLICY "Patients can update their own appointments"
ON public.appointments
FOR UPDATE
USING (
  patient_id IN (
    SELECT id FROM public.patients WHERE user_id = auth.uid()
  )
);