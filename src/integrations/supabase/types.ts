export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          child_age: string
          child_name: string
          created_at: string
          email: string
          id: string
          parent_name: string
          patient_id: string | null
          phone: string
          reason: string | null
          status: string
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          child_age: string
          child_name: string
          created_at?: string
          email: string
          id?: string
          parent_name: string
          patient_id?: string | null
          phone: string
          reason?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          child_age?: string
          child_name?: string
          created_at?: string
          email?: string
          id?: string
          parent_name?: string
          patient_id?: string | null
          phone?: string
          reason?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_controls: {
        Row: {
          abdomen_exam: string | null
          age_at_control: string | null
          auditory_acuity: string | null
          blood_pressure: string | null
          bmi: string | null
          chest_exam: string | null
          control_date: string
          created_at: string
          diagnosis: string | null
          ears_exam: string | null
          evolution_notes: string | null
          examiner_name: string | null
          extremities_exam: string | null
          eyes_exam: string | null
          general_appearance: string | null
          genitourinary_exam: string | null
          head_circumference: string | null
          head_exam: string | null
          heart_exam: string | null
          heart_rate: string | null
          height: string | null
          hour: string | null
          id: string
          medical_prescriptions: string | null
          medical_record_id: string
          neck_exam: string | null
          neurological_exam: string | null
          next_appointment: string | null
          nose_throat_exam: string | null
          nutritional_status: string | null
          oral_exam: string | null
          recommendations: string | null
          respiratory_rate: string | null
          skin_exam: string | null
          supplementary_food: string | null
          temperature: string | null
          thyroid_exam: string | null
          treatment: string | null
          updated_at: string
          visual_acuity: string | null
          weight: string | null
        }
        Insert: {
          abdomen_exam?: string | null
          age_at_control?: string | null
          auditory_acuity?: string | null
          blood_pressure?: string | null
          bmi?: string | null
          chest_exam?: string | null
          control_date?: string
          created_at?: string
          diagnosis?: string | null
          ears_exam?: string | null
          evolution_notes?: string | null
          examiner_name?: string | null
          extremities_exam?: string | null
          eyes_exam?: string | null
          general_appearance?: string | null
          genitourinary_exam?: string | null
          head_circumference?: string | null
          head_exam?: string | null
          heart_exam?: string | null
          heart_rate?: string | null
          height?: string | null
          hour?: string | null
          id?: string
          medical_prescriptions?: string | null
          medical_record_id: string
          neck_exam?: string | null
          neurological_exam?: string | null
          next_appointment?: string | null
          nose_throat_exam?: string | null
          nutritional_status?: string | null
          oral_exam?: string | null
          recommendations?: string | null
          respiratory_rate?: string | null
          skin_exam?: string | null
          supplementary_food?: string | null
          temperature?: string | null
          thyroid_exam?: string | null
          treatment?: string | null
          updated_at?: string
          visual_acuity?: string | null
          weight?: string | null
        }
        Update: {
          abdomen_exam?: string | null
          age_at_control?: string | null
          auditory_acuity?: string | null
          blood_pressure?: string | null
          bmi?: string | null
          chest_exam?: string | null
          control_date?: string
          created_at?: string
          diagnosis?: string | null
          ears_exam?: string | null
          evolution_notes?: string | null
          examiner_name?: string | null
          extremities_exam?: string | null
          eyes_exam?: string | null
          general_appearance?: string | null
          genitourinary_exam?: string | null
          head_circumference?: string | null
          head_exam?: string | null
          heart_exam?: string | null
          heart_rate?: string | null
          height?: string | null
          hour?: string | null
          id?: string
          medical_prescriptions?: string | null
          medical_record_id?: string
          neck_exam?: string | null
          neurological_exam?: string | null
          next_appointment?: string | null
          nose_throat_exam?: string | null
          nutritional_status?: string | null
          oral_exam?: string | null
          recommendations?: string | null
          respiratory_rate?: string | null
          skin_exam?: string | null
          supplementary_food?: string | null
          temperature?: string | null
          thyroid_exam?: string | null
          treatment?: string | null
          updated_at?: string
          visual_acuity?: string | null
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_controls_medical_record_id_fkey"
            columns: ["medical_record_id"]
            isOneToOne: false
            referencedRelation: "medical_records"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_records: {
        Row: {
          allergies: string | null
          apgar_score: string | null
          birth_length: string | null
          birth_order: string | null
          birth_place_type: string | null
          birth_weight: string | null
          breastfeeding_duration: string | null
          cardiorespiratory: string | null
          complementary_feeding: string | null
          consultation_reason: string | null
          created_at: string
          current_diet: string | null
          current_illness: string | null
          current_medications: string | null
          delivery_type: string | null
          exam_abdomen: string | null
          exam_extremities: string | null
          exam_face_eyes_nose_ears: string | null
          exam_genitals: string | null
          exam_head: string | null
          exam_heart: string | null
          exam_lymph_nodes: string | null
          exam_mouth: string | null
          exam_neck_thyroid: string | null
          exam_neurological: string | null
          exam_pharynx: string | null
          exam_rectum: string | null
          exam_skin: string | null
          exam_spine: string | null
          exam_thorax_lungs: string | null
          family_history: string | null
          father_health: string | null
          formula_feeding: string | null
          gastrointestinal: string | null
          genitourinary: string | null
          gestational_weeks: string | null
          habits: string | null
          head_circumference: string | null
          id: string
          initial_physical_exam: string | null
          language_development: string | null
          mother_health: string | null
          motor_development: string | null
          neuromusculoskeletal: string | null
          notes: string | null
          pathological_family_history: string | null
          patient_id: string
          personality: string | null
          postnatal_observations: string | null
          prenatal_history: string | null
          previous_diseases: string | null
          previous_surgeries: string | null
          professional_attention: string | null
          psychological: string | null
          sense_organs: string | null
          siblings_health: string | null
          social_development: string | null
          updated_at: string
          vaccines_received: string | null
        }
        Insert: {
          allergies?: string | null
          apgar_score?: string | null
          birth_length?: string | null
          birth_order?: string | null
          birth_place_type?: string | null
          birth_weight?: string | null
          breastfeeding_duration?: string | null
          cardiorespiratory?: string | null
          complementary_feeding?: string | null
          consultation_reason?: string | null
          created_at?: string
          current_diet?: string | null
          current_illness?: string | null
          current_medications?: string | null
          delivery_type?: string | null
          exam_abdomen?: string | null
          exam_extremities?: string | null
          exam_face_eyes_nose_ears?: string | null
          exam_genitals?: string | null
          exam_head?: string | null
          exam_heart?: string | null
          exam_lymph_nodes?: string | null
          exam_mouth?: string | null
          exam_neck_thyroid?: string | null
          exam_neurological?: string | null
          exam_pharynx?: string | null
          exam_rectum?: string | null
          exam_skin?: string | null
          exam_spine?: string | null
          exam_thorax_lungs?: string | null
          family_history?: string | null
          father_health?: string | null
          formula_feeding?: string | null
          gastrointestinal?: string | null
          genitourinary?: string | null
          gestational_weeks?: string | null
          habits?: string | null
          head_circumference?: string | null
          id?: string
          initial_physical_exam?: string | null
          language_development?: string | null
          mother_health?: string | null
          motor_development?: string | null
          neuromusculoskeletal?: string | null
          notes?: string | null
          pathological_family_history?: string | null
          patient_id: string
          personality?: string | null
          postnatal_observations?: string | null
          prenatal_history?: string | null
          previous_diseases?: string | null
          previous_surgeries?: string | null
          professional_attention?: string | null
          psychological?: string | null
          sense_organs?: string | null
          siblings_health?: string | null
          social_development?: string | null
          updated_at?: string
          vaccines_received?: string | null
        }
        Update: {
          allergies?: string | null
          apgar_score?: string | null
          birth_length?: string | null
          birth_order?: string | null
          birth_place_type?: string | null
          birth_weight?: string | null
          breastfeeding_duration?: string | null
          cardiorespiratory?: string | null
          complementary_feeding?: string | null
          consultation_reason?: string | null
          created_at?: string
          current_diet?: string | null
          current_illness?: string | null
          current_medications?: string | null
          delivery_type?: string | null
          exam_abdomen?: string | null
          exam_extremities?: string | null
          exam_face_eyes_nose_ears?: string | null
          exam_genitals?: string | null
          exam_head?: string | null
          exam_heart?: string | null
          exam_lymph_nodes?: string | null
          exam_mouth?: string | null
          exam_neck_thyroid?: string | null
          exam_neurological?: string | null
          exam_pharynx?: string | null
          exam_rectum?: string | null
          exam_skin?: string | null
          exam_spine?: string | null
          exam_thorax_lungs?: string | null
          family_history?: string | null
          father_health?: string | null
          formula_feeding?: string | null
          gastrointestinal?: string | null
          genitourinary?: string | null
          gestational_weeks?: string | null
          habits?: string | null
          head_circumference?: string | null
          id?: string
          initial_physical_exam?: string | null
          language_development?: string | null
          mother_health?: string | null
          motor_development?: string | null
          neuromusculoskeletal?: string | null
          notes?: string | null
          pathological_family_history?: string | null
          patient_id?: string
          personality?: string | null
          postnatal_observations?: string | null
          prenatal_history?: string | null
          previous_diseases?: string | null
          previous_surgeries?: string | null
          professional_attention?: string | null
          psychological?: string | null
          sense_organs?: string | null
          siblings_health?: string | null
          social_development?: string | null
          updated_at?: string
          vaccines_received?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          birth_date: string | null
          birth_place: string | null
          created_at: string
          email: string
          father_age: string | null
          father_education: string | null
          father_name: string | null
          father_occupation: string | null
          first_consultation_date: string | null
          first_names: string | null
          history_number: string | null
          id: string
          identification_number: string | null
          information_source: string | null
          maternal_surname: string | null
          mother_age: string | null
          mother_education: string | null
          mother_name: string | null
          mother_occupation: string | null
          name: string
          origin_place: string | null
          paternal_surname: string | null
          phone: string | null
          residence_place: string | null
          sex: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          birth_place?: string | null
          created_at?: string
          email: string
          father_age?: string | null
          father_education?: string | null
          father_name?: string | null
          father_occupation?: string | null
          first_consultation_date?: string | null
          first_names?: string | null
          history_number?: string | null
          id?: string
          identification_number?: string | null
          information_source?: string | null
          maternal_surname?: string | null
          mother_age?: string | null
          mother_education?: string | null
          mother_name?: string | null
          mother_occupation?: string | null
          name: string
          origin_place?: string | null
          paternal_surname?: string | null
          phone?: string | null
          residence_place?: string | null
          sex?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          birth_place?: string | null
          created_at?: string
          email?: string
          father_age?: string | null
          father_education?: string | null
          father_name?: string | null
          father_occupation?: string | null
          first_consultation_date?: string | null
          first_names?: string | null
          history_number?: string | null
          id?: string
          identification_number?: string | null
          information_source?: string | null
          maternal_surname?: string | null
          mother_age?: string | null
          mother_education?: string | null
          mother_name?: string | null
          mother_occupation?: string | null
          name?: string
          origin_place?: string | null
          paternal_surname?: string | null
          phone?: string | null
          residence_place?: string | null
          sex?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vaccinations: {
        Row: {
          administered_by: string | null
          application_date: string
          created_at: string
          dose_number: string | null
          id: string
          lot_number: string | null
          medical_record_id: string
          notes: string | null
          site: string | null
          updated_at: string
          vaccine_name: string
        }
        Insert: {
          administered_by?: string | null
          application_date: string
          created_at?: string
          dose_number?: string | null
          id?: string
          lot_number?: string | null
          medical_record_id: string
          notes?: string | null
          site?: string | null
          updated_at?: string
          vaccine_name: string
        }
        Update: {
          administered_by?: string | null
          application_date?: string
          created_at?: string
          dose_number?: string | null
          id?: string
          lot_number?: string | null
          medical_record_id?: string
          notes?: string | null
          site?: string | null
          updated_at?: string
          vaccine_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "vaccinations_medical_record_id_fkey"
            columns: ["medical_record_id"]
            isOneToOne: false
            referencedRelation: "medical_records"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
