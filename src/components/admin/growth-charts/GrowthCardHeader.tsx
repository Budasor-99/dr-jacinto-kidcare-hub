import { format } from "date-fns";
import { es } from "date-fns/locale";

interface GrowthCardHeaderProps {
  patientName: string;
  birthDate: string | null;
  sex: "M" | "F";
  latestAgeMonths?: number;
  controlDate?: string;
  pediatrician?: string;
}

export const GrowthCardHeader = ({
  patientName,
  birthDate,
  sex,
  latestAgeMonths,
  controlDate,
  pediatrician,
}: GrowthCardHeaderProps) => {
  const formatAge = (months: number) => {
    const y = Math.floor(months / 12);
    const m = Math.floor(months % 12);
    return y > 0 ? `${y} año(s) ${m} mes(es)` : `${m} mes(es)`;
  };

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
    </div>
  );
};
