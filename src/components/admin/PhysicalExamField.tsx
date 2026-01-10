import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PhysicalExamFieldProps {
  number: number;
  label: string;
  fieldName: string;
  value: string;
  onChange: (field: string, value: string) => void;
}

export const PhysicalExamField = ({
  number,
  label,
  fieldName,
  value,
  onChange,
}: PhysicalExamFieldProps) => {
  // Normalize value: treat "normal" (any case) as the normal state
  const normalizedValue = value?.toLowerCase().trim() || "";
  const isNormal = normalizedValue === "normal" || normalizedValue === "";
  
  // Use local state to track selection mode independently
  const [mode, setMode] = useState<"normal" | "otro">(
    normalizedValue !== "" && normalizedValue !== "normal" ? "otro" : "normal"
  );

  // Sync mode when value changes externally
  useEffect(() => {
    const normalized = value?.toLowerCase().trim() || "";
    if (normalized === "normal" || normalized === "") {
      setMode("normal");
    } else {
      setMode("otro");
    }
  }, [value]);

  const handleSelectChange = (newValue: "normal" | "otro") => {
    setMode(newValue);
    if (newValue === "normal") {
      onChange(fieldName, "normal");
    } else {
      // Clear value when switching to "otro" so user can type fresh
      onChange(fieldName, "");
    }
  };

  const handleTextChange = (text: string) => {
    onChange(fieldName, text);
  };

  return (
    <div className="space-y-2 border rounded-lg p-3 bg-background">
      <Label className="text-xs font-semibold text-muted-foreground">
        {number}. {label}
      </Label>
      <Select value={mode} onValueChange={handleSelectChange}>
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="otro">Otro</SelectItem>
        </SelectContent>
      </Select>
      {mode === "otro" && (
        <Textarea
          value={value === "normal" ? "" : value}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={`Describir hallazgo en ${label.toLowerCase()}...`}
          rows={2}
          className="text-sm"
        />
      )}
    </div>
  );
};
