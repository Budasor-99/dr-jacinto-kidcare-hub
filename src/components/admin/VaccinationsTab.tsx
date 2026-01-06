import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Save, Trash2, Syringe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Vaccination {
  id: string;
  medical_record_id: string;
  vaccine_name: string;
  dose_number: string | null;
  application_date: string;
  lot_number: string | null;
  site: string | null;
  administered_by: string | null;
  notes: string | null;
}

interface VaccinationsTabProps {
  medicalRecordId: string;
}

export const VaccinationsTab = ({ medicalRecordId }: VaccinationsTabProps) => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    vaccine_name: "",
    dose_number: "",
    application_date: new Date().toISOString().split("T")[0],
    lot_number: "",
    site: "",
    administered_by: "",
    notes: "",
  });

  const fetchVaccinations = async () => {
    try {
      const { data, error } = await supabase
        .from("vaccinations")
        .select("*")
        .eq("medical_record_id", medicalRecordId)
        .order("application_date", { ascending: true });

      if (error) throw error;
      setVaccinations(data || []);
    } catch (error) {
      console.error("Error fetching vaccinations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccinations();
  }, [medicalRecordId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data, error } = await supabase
        .from("vaccinations")
        .insert({
          medical_record_id: medicalRecordId,
          vaccine_name: formData.vaccine_name.trim(),
          dose_number: formData.dose_number.trim() || null,
          application_date: formData.application_date,
          lot_number: formData.lot_number.trim() || null,
          site: formData.site.trim() || null,
          administered_by: formData.administered_by.trim() || null,
          notes: formData.notes.trim() || null,
        })
        .select()
        .single();

      if (error) throw error;

      setVaccinations([...vaccinations, data]);
      setFormData({
        vaccine_name: "",
        dose_number: "",
        application_date: new Date().toISOString().split("T")[0],
        lot_number: "",
        site: "",
        administered_by: "",
        notes: "",
      });
      setDialogOpen(false);
      toast({
        title: "Vacuna registrada",
        description: "La vacuna ha sido agregada exitosamente.",
      });
    } catch (error) {
      console.error("Error adding vaccination:", error);
      toast({
        title: "Error",
        description: "No se pudo registrar la vacuna.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteVaccination = async (id: string) => {
    try {
      const { error } = await supabase
        .from("vaccinations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setVaccinations(vaccinations.filter((v) => v.id !== id));
      toast({
        title: "Eliminada",
        description: "La vacuna ha sido eliminada.",
      });
    } catch (error) {
      console.error("Error deleting vaccination:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la vacuna.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Cargando vacunas...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Syringe className="h-5 w-5" />
          Registro de Vacunación
        </h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Agregar Vacuna
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Vacuna</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vaccine_name">Vacuna *</Label>
                  <Input
                    id="vaccine_name"
                    value={formData.vaccine_name}
                    onChange={(e) => setFormData({ ...formData, vaccine_name: e.target.value })}
                    placeholder="Ej: BCG, Hepatitis B"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dose_number">Dosis</Label>
                  <Input
                    id="dose_number"
                    value={formData.dose_number}
                    onChange={(e) => setFormData({ ...formData, dose_number: e.target.value })}
                    placeholder="Ej: 1ra, 2da, Refuerzo"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="application_date">Fecha de aplicación *</Label>
                  <Input
                    id="application_date"
                    type="date"
                    value={formData.application_date}
                    onChange={(e) => setFormData({ ...formData, application_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lot_number">Número de lote</Label>
                  <Input
                    id="lot_number"
                    value={formData.lot_number}
                    onChange={(e) => setFormData({ ...formData, lot_number: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site">Sitio de aplicación</Label>
                  <Input
                    id="site"
                    value={formData.site}
                    onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                    placeholder="Ej: Brazo derecho"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="administered_by">Aplicada por</Label>
                  <Input
                    id="administered_by"
                    value={formData.administered_by}
                    onChange={(e) => setFormData({ ...formData, administered_by: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observaciones</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Guardando..." : "Registrar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {vaccinations.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No hay vacunas registradas. Haga clic en "Agregar Vacuna" para registrar una.
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Vacuna</TableHead>
                <TableHead>Dosis</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>Sitio</TableHead>
                <TableHead>Observaciones</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vaccinations.map((vaccination) => (
                <TableRow key={vaccination.id}>
                  <TableCell>
                    {new Date(vaccination.application_date).toLocaleDateString("es-EC")}
                  </TableCell>
                  <TableCell className="font-medium">{vaccination.vaccine_name}</TableCell>
                  <TableCell>{vaccination.dose_number || "-"}</TableCell>
                  <TableCell>{vaccination.lot_number || "-"}</TableCell>
                  <TableCell>{vaccination.site || "-"}</TableCell>
                  <TableCell className="max-w-xs truncate">{vaccination.notes || "-"}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteVaccination(vaccination.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
