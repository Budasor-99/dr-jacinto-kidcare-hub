import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { NutritionalDiagnosis } from "@/lib/growth-data/growth-utils";

interface RiskItem {
  label: string;
  diagnosis: NutritionalDiagnosis;
  percentile: number;
}

interface GrowthCardHeaderProps {
  patientName: string;
  birthDate: string | null;
  sex: "M" | "F";
  latestAgeMonths?: number;
  controlDate?: string;
  pediatrician?: string;
  risks?: RiskItem[];
}

export const GrowthCardHeader = ({
  patientName,
  birthDate,
  sex,
  latestAgeMonths,
  controlDate,
  pediatrician,
  risks,
}: GrowthCardHeaderProps) => {
  const formatAge = (months: number) => {
    const y = Math.floor(months / 12);
    const m = Math.floor(months % 12);
    return y > 0 ? `${y} año(s) ${m} mes(es)` : `${m} mes(es)`;
  };

  const activeRisks = risks?.filter(r => r.diagnosis.severity !== "normal") || [];

  return (
    <div className="border rounded-lg p-4 print:p-3 bg-card">
      <div className="text-center mb-3 print:mb-2">
        <h2 className="text-lg font-bold text-foreground print:text-base">
          Ficha de Crecimiento Infantil
        </h2>
        <p className="text-xs text-muted-foreground">
          Basado en estándares de crecimiento de la OMS
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
        <div>
          <span className="text-muted-foreground text-xs">Nombre:</span>
          <p className="font-medium truncate">{patientName}</p>
        </div>
        <div>
          <span className="text-muted-foreground text-xs">Fecha de nacimiento:</span>
          <p className="font-medium">
            {birthDate
              ? format(new Date(birthDate), "dd/MM/yyyy", { locale: es })
              : "—"}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground text-xs">Sexo:</span>
          <p className="font-medium">{sex === "M" ? "Masculino" : "Femenino"}</p>
        </div>
        <div>
          <span className="text-muted-foreground text-xs">Edad:</span>
          <p className="font-medium">
            {latestAgeMonths !== undefined ? formatAge(latestAgeMonths) : "—"}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground text-xs">Fecha de control:</span>
          <p className="font-medium">
            {controlDate
              ? format(new Date(controlDate), "dd/MM/yyyy", { locale: es })
              : "—"}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground text-xs">Pediatra:</span>
          <p className="font-medium">{pediatrician || "—"}</p>
        </div>
      </div>

      {/* Risk alert */}
      {activeRisks.length > 0 && (
        <div className="mt-3 p-3 rounded-md bg-destructive/10 border border-destructive/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
            <span className="text-xs font-semibold text-destructive">Alerta Nutricional</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeRisks.map((r) => (
              <Badge
                key={r.label}
                variant="outline"
                className="text-[11px] py-0.5"
                style={{
                  backgroundColor: r.diagnosis.bgColor,
                  color: r.diagnosis.color,
                  borderColor: r.diagnosis.color,
                }}
              >
                {r.label}: P{r.percentile} — {r.diagnosis.diagnosis}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
