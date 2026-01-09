-- Add 15 physical exam columns to medical_records table
ALTER TABLE public.medical_records 
  ADD COLUMN IF NOT EXISTS exam_skin TEXT,
  ADD COLUMN IF NOT EXISTS exam_head TEXT,
  ADD COLUMN IF NOT EXISTS exam_face_eyes_nose_ears TEXT,
  ADD COLUMN IF NOT EXISTS exam_mouth TEXT,
  ADD COLUMN IF NOT EXISTS exam_pharynx TEXT,
  ADD COLUMN IF NOT EXISTS exam_neck_thyroid TEXT,
  ADD COLUMN IF NOT EXISTS exam_thorax_lungs TEXT,
  ADD COLUMN IF NOT EXISTS exam_heart TEXT,
  ADD COLUMN IF NOT EXISTS exam_abdomen TEXT,
  ADD COLUMN IF NOT EXISTS exam_genitals TEXT,
  ADD COLUMN IF NOT EXISTS exam_rectum TEXT,
  ADD COLUMN IF NOT EXISTS exam_spine TEXT,
  ADD COLUMN IF NOT EXISTS exam_extremities TEXT,
  ADD COLUMN IF NOT EXISTS exam_lymph_nodes TEXT,
  ADD COLUMN IF NOT EXISTS exam_neurological TEXT;