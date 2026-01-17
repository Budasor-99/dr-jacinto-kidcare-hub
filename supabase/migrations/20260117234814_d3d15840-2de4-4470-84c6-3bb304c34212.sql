-- Add identification_number column for CI (Cédula de Identificación) to patients table
ALTER TABLE public.patients ADD COLUMN identification_number TEXT;