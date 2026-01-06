import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Save, Trash2, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EvolutionNote {
  id: string;
  medical_record_id: string;
  control_date: string;
  hour: string | null;
  evolution_notes: string | null;
  medical_prescriptions: string | null;
}

interface EvolutionNotesTabProps {
  medicalRecordId: string;
}

export const EvolutionNotesTab = ({ medicalRecordId }: EvolutionNotesTabProps) => {
  const [notes, setNotes] = useState<EvolutionNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from("medical_controls")
        .select("id, medical_record_id, control_date, hour, evolution_notes, medical_prescriptions")
        .eq("medical_record_id", medicalRecordId)
        .order("control_date", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [medicalRecordId]);

  const addNewNote = async () => {
    try {
      const { data, error } = await supabase
        .from("medical_controls")
        .insert({
          medical_record_id: medicalRecordId,
          control_date: new Date().toISOString().split("T")[0],
          hour: new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" }),
        })
        .select("id, medical_record_id, control_date, hour, evolution_notes, medical_prescriptions")
        .single();

      if (error) throw error;
      setNotes([data, ...notes]);
      toast({
        title: "Nota agregada",
        description: "Se ha creado una nueva nota de evolución.",
      });
    } catch (error) {
      console.error("Error creating note:", error);
      toast({
        title: "Error",
        description: "No se pudo crear la nota.",
        variant: "destructive",
      });
    }
  };

  const updateNote = async (note: EvolutionNote) => {
    setSavingId(note.id);
    try {
      const { error } = await supabase
        .from("medical_controls")
        .update({
          control_date: note.control_date,
          hour: note.hour,
          evolution_notes: note.evolution_notes,
          medical_prescriptions: note.medical_prescriptions,
        })
        .eq("id", note.id);

      if (error) throw error;
      toast({
        title: "Guardado",
        description: "La nota ha sido actualizada.",
      });
    } catch (error) {
      console.error("Error updating note:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la nota.",
        variant: "destructive",
      });
    } finally {
      setSavingId(null);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from("medical_controls")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setNotes(notes.filter((n) => n.id !== id));
      toast({
        title: "Eliminado",
        description: "La nota ha sido eliminada.",
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la nota.",
        variant: "destructive",
      });
    }
  };

  const handleNoteChange = (id: string, field: keyof EvolutionNote, value: string) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, [field]: value } : n))
    );
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Cargando notas...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Notas de Evolución y Prescripciones
        </h3>
        <Button onClick={addNewNote} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Nueva Nota
        </Button>
      </div>

      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">
            Las notas de evolución y prescripciones médicas deben coincidir con la fecha y hora en que fueron formuladas.
          </p>
        </CardContent>
      </Card>

      {notes.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No hay notas de evolución registradas. Haga clic en "Nueva Nota" para agregar una.
          </CardContent>
        </Card>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          {/* Header similar al formato del documento */}
          <div className="grid grid-cols-[100px_80px_1fr_1fr] bg-muted/50 border-b">
            <div className="p-3 font-medium border-r text-sm">Fecha</div>
            <div className="p-3 font-medium border-r text-sm">Hora</div>
            <div className="p-3 font-medium border-r text-sm">Notas de Evolución</div>
            <div className="p-3 font-medium text-sm">Prescripciones Médicas</div>
          </div>
          
          {notes.map((note, index) => (
            <div key={note.id} className={`grid grid-cols-[100px_80px_1fr_1fr] ${index !== notes.length - 1 ? 'border-b' : ''}`}>
              <div className="p-2 border-r">
                <Input
                  type="date"
                  value={note.control_date}
                  onChange={(e) => handleNoteChange(note.id, "control_date", e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="p-2 border-r">
                <Input
                  type="time"
                  value={note.hour || ""}
                  onChange={(e) => handleNoteChange(note.id, "hour", e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="p-2 border-r">
                <Textarea
                  value={note.evolution_notes || ""}
                  onChange={(e) => handleNoteChange(note.id, "evolution_notes", e.target.value)}
                  placeholder="Escribir notas de evolución..."
                  className="min-h-[100px] text-sm resize-y"
                />
              </div>
              <div className="p-2">
                <Textarea
                  value={note.medical_prescriptions || ""}
                  onChange={(e) => handleNoteChange(note.id, "medical_prescriptions", e.target.value)}
                  placeholder="Escribir prescripciones médicas..."
                  className="min-h-[100px] text-sm resize-y"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteNote(note.id)}
                    className="h-7 px-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => updateNote(note)}
                    disabled={savingId === note.id}
                    className="h-7 px-2"
                  >
                    <Save className="h-3 w-3 mr-1" />
                    {savingId === note.id ? "..." : "Guardar"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};