import { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Save } from "lucide-react";
import { formatAgeDisplay } from "@/lib/growth-data/growth-utils";
import { format, addMonths } from "date-fns";
import { es } from "date-fns/locale";
import type { MedicalControlData } from "./GrowthChartsTab";

interface GrowthDataTableProps {
  controls: MedicalControlData[];
  patientBirthDate: string;
  onUpdate: (controlId: string, field: string, value: string) => Promise<void>;
  onDelete: (controlId: string) => Promise<void>;
  loading: boolean;
}

interface EditingCell {
  controlId: string;
  field: string;
  value: string;
}

export const GrowthDataTable = ({
  controls, patientBirthDate, onUpdate, onDelete, loading,
}: GrowthDataTableProps) => {
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const handleStartEdit = (controlId: string, field: string, currentValue: string | null) => {
    setEditingCell({ controlId, field, value: currentValue || "" });
  };

  const handleStartEditAge = (controlId: string, currentAgeMonths: number | undefined) => {
    setEditingCell({
      controlId,
      field: "age_months",
      value: currentAgeMonths !== undefined ? currentAgeMonths.toFixed(1) : "",
    });
  };

  const handleSaveEdit = async () => {
    if (!editingCell) return;
    setSavingId(editingCell.controlId);

    if (editingCell.field === "age_months") {
      // Convert decimal months to a control_date
      const months = parseFloat(editingCell.value);
      if (!isNaN(months) && patientBirthDate) {
        const birthDate = new Date(patientBirthDate);
        const totalDays = Math.round(months * 30.44);
        const newDate = new Date(birthDate);
        newDate.setDate(newDate.getDate() + totalDays);
        const dateStr = newDate.toISOString().split("T")[0];
        await onUpdate(editingCell.controlId, "control_date", dateStr);
      }
    } else {
      await onUpdate(editingCell.controlId, editingCell.field, editingCell.value);
    }

    setEditingCell(null);
    setSavingId(null);
  };

  const handleCancelEdit = () => setEditingCell(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSaveEdit();
    else if (e.key === "Escape") handleCancelEdit();
  };

  const renderEditableCell = (
    control: MedicalControlData,
    field: keyof MedicalControlData,
    value: string | null
  ) => {
    const isEditing = editingCell?.controlId === control.id && editingCell?.field === field;
    if (isEditing) {
      return (
        <div className="flex items-center gap-1">
          <Input
            type={field === "control_date" ? "date" : "text"}
            value={editingCell.value}
            onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
            onKeyDown={handleKeyDown}
            className="h-8 w-20 text-sm"
            autoFocus
          />
          <Button size="icon" variant="ghost" className="h-6 w-6"
            onClick={handleSaveEdit} disabled={savingId === control.id}>
            <Save className="h-3 w-3" />
          </Button>
        </div>
      );
    }
    return (
      <span className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
        onClick={() => handleStartEdit(control.id, field, value)}>
        {value || "-"}
      </span>
    );
  };

  const renderEditableAge = (control: MedicalControlData) => {
    const isEditing = editingCell?.controlId === control.id && editingCell?.field === "age_months";
    if (isEditing) {
      return (
        <div className="flex items-center gap-1">
          <Input
            type="number"
            min={0}
            max={60}
            step={0.1}
            value={editingCell.value}
            onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
            onKeyDown={handleKeyDown}
            className="h-8 w-20 text-sm"
            autoFocus
            placeholder="ej: 3.5"
          />
          <Button size="icon" variant="ghost" className="h-6 w-6"
            onClick={handleSaveEdit} disabled={savingId === control.id}>
            <Save className="h-3 w-3" />
          </Button>
        </div>
      );
    }
    return (
      <span className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
        onClick={() => handleStartEditAge(control.id, control.ageInMonths)}>
        {control.ageInMonths !== undefined ? formatAgeDisplay(control.ageInMonths) : "-"}
      </span>
    );
  };

  if (loading) {
    return <div className="text-center py-4 text-muted-foreground">Cargando mediciones...</div>;
  }

  if (controls.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No hay mediciones registradas. Use el botón "Agregar Medición" para comenzar.
      </div>
    );
  }

  const sortedControls = [...controls].sort(
    (a, b) => new Date(b.control_date).getTime() - new Date(a.control_date).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Fecha</TableHead>
            <TableHead className="w-[100px]">Edad</TableHead>
            <TableHead className="w-[80px]">Peso (kg)</TableHead>
            <TableHead className="w-[80px]">Talla (cm)</TableHead>
            <TableHead className="w-[80px]">P.C. (cm)</TableHead>
            <TableHead className="w-[60px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedControls.map((control) => (
            <TableRow key={control.id}>
              <TableCell className="font-medium">
                {renderEditableCell(control, "control_date", control.control_date)}
                {control.control_date && (
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(control.control_date), "dd MMM yyyy", { locale: es })}
                  </div>
                )}
              </TableCell>
              <TableCell>{renderEditableAge(control)}</TableCell>
              <TableCell>{renderEditableCell(control, "weight", control.weight)}</TableCell>
              <TableCell>{renderEditableCell(control, "height", control.height)}</TableCell>
              <TableCell>{renderEditableCell(control, "head_circumference", control.head_circumference)}</TableCell>
              <TableCell>
                <Button size="icon" variant="ghost"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(control.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-xs text-muted-foreground mt-2">
        * Haga clic en cualquier valor o edad para editarlo. Presione Enter para guardar o Escape para cancelar.
      </p>
    </div>
  );
};
