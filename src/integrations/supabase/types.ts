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
          blood_pressure: string | null
          bmi: string | null
          chest_exam: string | null
          control_date: string
          created_at: string
          diagnosis: string | null
          ears_exam: string | null
          extremities_exam: string | null
          eyes_exam: string | null
          general_appearance: string | null
          genitourinary_exam: string | null
          head_circumference: string | null
          head_exam: string | null
          heart_exam: string | null
          heart_rate: string | null
          height: string | null
          id: string
          medical_record_id: string
          neck_exam: string | null
          neurological_exam: string | null
          next_appointment: string | null
          nose_throat_exam: string | null
          recommendations: string | null
          respiratory_rate: string | null
          skin_exam: string | null
          temperature: string | null
          treatment: string | null
          updated_at: string
          weight: string | null
        }
        Insert: {
          abdomen_exam?: string | null
          age_at_control?: string | null
          blood_pressure?: string | null
          bmi?: string | null
          chest_exam?: string | null
          control_date?: string
          created_at?: string
          diagnosis?: string | null
          ears_exam?: string | null
          extremities_exam?: string | null
          eyes_exam?: string | null
          general_appearance?: string | null
          genitourinary_exam?: string | null
          head_circumference?: string | null
          head_exam?: string | null
          heart_exam?: string | null
          heart_rate?: string | null
          height?: string | null
          id?: string
          medical_record_id: string
          neck_exam?: string | null
          neurological_exam?: string | null
          next_appointment?: string | null
          nose_throat_exam?: string | null
          recommendations?: string | null
          respiratory_rate?: string | null
          skin_exam?: string | null
          temperature?: string | null
          treatment?: string | null
          updated_at?: string
          weight?: string | null
        }
        Update: {
          abdomen_exam?: string | null
          age_at_control?: string | null
          blood_pressure?: string | null
          bmi?: string | null
          chest_exam?: string | null
          control_date?: string
          created_at?: string
          diagnosis?: string | null
          ears_exam?: string | null
          extremities_exam?: string | null
          eyes_exam?: string | null
          general_appearance?: string | null
          genitourinary_exam?: string | null
          head_circumference?: string | null
          head_exam?: string | null
          heart_exam?: string | null
          heart_rate?: string | null
          height?: string | null
          id?: string
          medical_record_id?: string
          neck_exam?: string | null
          neurological_exam?: string | null
          next_appointment?: string | null
          nose_throat_exam?: string | null
          recommendations?: string | null
          respiratory_rate?: string | null
          skin_exam?: string | null
          temperature?: string | null
          treatment?: string | null
          updated_at?: string
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
          birth_weight: string | null
          breastfeeding_duration: string | null
          complementary_feeding: string | null
          created_at: string
          current_diet: string | null
          current_medications: string | null
          delivery_type: string | null
          family_history: string | null
          father_health: string | null
          formula_feeding: string | null
          gestational_weeks: string | null
          head_circumference: string | null
          id: string
          language_development: string | null
          mother_health: string | null
          motor_development: string | null
          notes: string | null
          patient_id: string
          previous_diseases: string | null
          previous_surgeries: string | null
          siblings_health: string | null
          social_development: string | null
          updated_at: string
        }
        Insert: {
          allergies?: string | null
          apgar_score?: string | null
          birth_length?: string | null
          birth_weight?: string | null
          breastfeeding_duration?: string | null
          complementary_feeding?: string | null
          created_at?: string
          current_diet?: string | null
          current_medications?: string | null
          delivery_type?: string | null
          family_history?: string | null
          father_health?: string | null
          formula_feeding?: string | null
          gestational_weeks?: string | null
          head_circumference?: string | null
          id?: string
          language_development?: string | null
          mother_health?: string | null
          motor_development?: string | null
          notes?: string | null
          patient_id: string
          previous_diseases?: string | null
          previous_surgeries?: string | null
          siblings_health?: string | null
          social_development?: string | null
          updated_at?: string
        }
        Update: {
          allergies?: string | null
          apgar_score?: string | null
          birth_length?: string | null
          birth_weight?: string | null
          breastfeeding_duration?: string | null
          complementary_feeding?: string | null
          created_at?: string
          current_diet?: string | null
          current_medications?: string | null
          delivery_type?: string | null
          family_history?: string | null
          father_health?: string | null
          formula_feeding?: string | null
          gestational_weeks?: string | null
          head_circumference?: string | null
          id?: string
          language_development?: string | null
          mother_health?: string | null
          motor_development?: string | null
          notes?: string | null
          patient_id?: string
          previous_diseases?: string | null
          previous_surgeries?: string | null
          siblings_health?: string | null
          social_development?: string | null
          updated_at?: string
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
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
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
