-- Add INSERT policy for user_roles (only admins can assign roles)
CREATE POLICY "Only admins can assign roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add DELETE policy for user_roles (only admins can remove roles)
CREATE POLICY "Only admins can remove roles" 
ON public.user_roles 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));