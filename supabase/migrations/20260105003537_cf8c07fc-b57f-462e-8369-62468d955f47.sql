-- Drop and recreate policies with proper role restriction (authenticated only)

-- PATIENTS TABLE
DROP POLICY IF EXISTS "Admins can view all patients" ON public.patients;
DROP POLICY IF EXISTS "Admins can update all patients" ON public.patients;
DROP POLICY IF EXISTS "Patients can view their own profile" ON public.patients;
DROP POLICY IF EXISTS "Patients can update their own profile" ON public.patients;

CREATE POLICY "Admins can view all patients"
ON public.patients
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update all patients"
ON public.patients
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Patients can view their own profile"
ON public.patients
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Patients can update their own profile"
ON public.patients
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- APPOINTMENTS TABLE
DROP POLICY IF EXISTS "Patients can view their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Patients can update their own appointments" ON public.appointments;

CREATE POLICY "Patients can view their own appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid()));

CREATE POLICY "Patients can update their own appointments"
ON public.appointments
FOR UPDATE
TO authenticated
USING (patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid()));