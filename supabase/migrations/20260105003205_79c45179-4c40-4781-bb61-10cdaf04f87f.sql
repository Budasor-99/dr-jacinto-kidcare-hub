-- Drop the overly permissive INSERT policies
DROP POLICY IF EXISTS "Anyone can create appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anyone can create a patient record" ON public.patients;

-- Create secure INSERT policy for appointments (requires authenticated user with linked patient)
CREATE POLICY "Authenticated users can create appointments"
ON public.appointments
FOR INSERT
TO authenticated
WITH CHECK (
  patient_id IN (
    SELECT id FROM public.patients WHERE user_id = auth.uid()
  )
);

-- Create secure INSERT policy for patients (authenticated users can create their own record)
CREATE POLICY "Authenticated users can create their own patient record"
ON public.patients
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);