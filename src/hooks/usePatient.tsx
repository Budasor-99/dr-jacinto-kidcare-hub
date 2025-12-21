import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface Patient {
  id: string;
  user_id: string | null;
  name: string;
  phone: string | null;
  email: string;
  created_at: string;
  updated_at: string;
}

interface PatientContextType {
  patient: Patient | null;
  loading: boolean;
  createOrLinkPatient: (data: { name: string; email: string; phone?: string }) => Promise<Patient | null>;
  refetch: () => Promise<void>;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPatient = async () => {
    if (!user) {
      setPatient(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      setPatient(data);
    } catch (error) {
      console.error("Error fetching patient:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [user]);

  const createOrLinkPatient = async (data: { name: string; email: string; phone?: string }) => {
    try {
      // Check if patient with this email already exists
      const { data: existingPatient } = await supabase
        .from("patients")
        .select("*")
        .eq("email", data.email)
        .maybeSingle();

      if (existingPatient) {
        // If user is logged in, link the patient to the user
        if (user && !existingPatient.user_id) {
          const { data: updatedPatient, error } = await supabase
            .from("patients")
            .update({ user_id: user.id, name: data.name, phone: data.phone || existingPatient.phone })
            .eq("id", existingPatient.id)
            .select()
            .single();

          if (error) throw error;
          setPatient(updatedPatient);
          return updatedPatient;
        }
        return existingPatient;
      }

      // Create new patient
      const { data: newPatient, error } = await supabase
        .from("patients")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          user_id: user?.id || null,
        })
        .select()
        .single();

      if (error) throw error;
      setPatient(newPatient);
      return newPatient;
    } catch (error) {
      console.error("Error creating/linking patient:", error);
      return null;
    }
  };

  return (
    <PatientContext.Provider value={{ patient, loading, createOrLinkPatient, refetch: fetchPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
};