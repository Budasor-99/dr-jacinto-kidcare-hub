-- Allow admins to create patients
CREATE POLICY "Admins can create patients"
ON public.patients
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));