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
  // Determine if the current value is "normal" or something else
  const isNormal = value.toLowerCase() === "normal" || value === "";
  const selectValue = isNormal ? "normal" : "otro";

  const handleSelectChange = (newValue: string) => {
    if (newValue === "normal") {
      onChange(fieldName, "normal");
    } else {
      // If switching to "otro", clear the field so user can type
      onChange(fieldName, value.toLowerCase() === "normal" ? "" : value);
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
      <Select value={selectValue} onValueChange={handleSelectChange}>
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="otro">Otro</SelectItem>
        </SelectContent>
      </Select>
      {selectValue === "otro" && (
        <Textarea
          value={value}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={`Describir hallazgo en ${label.toLowerCase()}...`}
          rows={2}
          className="text-sm"
        />
      )}
    </div>
  );
};
