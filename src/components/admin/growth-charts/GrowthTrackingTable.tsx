import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  formatAgeDisplay,
  getPercentileStatus,
  getRefDataForMonth,
  getStatusColor,
  getStatusBgColor,
} from "@/lib/growth-data/growth-utils";
import { weightForAgeBoys } from "@/lib/growth-data/who-weight-boys";
import { weightForAgeGirls } from "@/lib/growth-data/who-weight-girls";
import { heightForAgeBoys } from "@/lib/growth-data/who-height-boys";
import { heightForAgeGirls } from "@/lib/growth-data/who-height-girls";
import { headCircumferenceForAgeBoys } from "@/lib/growth-data/who-hc-boys";
import { headCircumferenceForAgeGirls } from "@/lib/growth-data/who-hc-girls";
import type { MedicalControlData } from "./GrowthChartsTab";

interface GrowthTrackingTableProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  observations?: Record<string, string>;
}

const PercentileBadge = ({ value, month, refData }: {
  value: string | null;
  month: number | undefined;
  refData: Array<{ month: number; p3: number; p15: number; p50: number; p85: number; p97: number }>;
}) => {
  if (!value || month === undefined) return <span className="text-muted-foreground">—</span>;
  const ref = getRefDataForMonth(month, refData);
  if (!ref) return <span className="text-muted-foreground">—</span>;
  const status = getPercentileStatus(parseFloat(value), ref);
  return (
    <Badge
      variant="outline"
      className="text-[10px] px-1.5 py-0 font-semibold"
      style={{
        backgroundColor: getStatusBgColor(status.status),
        color: getStatusColor(status.status),
        borderColor: getStatusColor(status.status),
      }}
    >
      P{status.percentile}
    </Badge>
  );
};

export const GrowthTrackingTable = ({
  controls,
  sex,
}: GrowthTrackingTableProps) => {
  const weightRef = sex === "M" ? weightForAgeBoys : weightForAgeGirls;
  const heightRef = sex === "M" ? heightForAgeBoys : heightForAgeGirls;
  const hcRef = sex === "M" ? headCircumferenceForAgeBoys : headCircumferenceForAgeGirls;

  const sorted = [...controls].sort(
    (a, b) => new Date(a.control_date).getTime() - new Date(b.control_date).getTime()
  );

  if (sorted.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        Sin mediciones registradas.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-xs w-[70px]">Edad</TableHead>
            <TableHead className="text-xs w-[90px]">Fecha</TableHead>
            <TableHead className="text-xs text-center w-[60px]">Peso (kg)</TableHead>
            <TableHead className="text-xs text-center w-[40px]">%il</TableHead>
            <TableHead className="text-xs text-center w-[60px]">Talla (cm)</TableHead>
            <TableHead className="text-xs text-center w-[40px]">%il</TableHead>
            <TableHead className="text-xs text-center w-[60px]">P.C. (cm)</TableHead>
            <TableHead className="text-xs text-center w-[40px]">%il</TableHead>
            <TableHead className="text-xs w-[120px]">Observaciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((c) => (
            <TableRow key={c.id} className="text-xs">
              <TableCell className="py-1.5 font-medium">
                {c.ageInMonths !== undefined ? formatAgeDisplay(c.ageInMonths) : "—"}
              </TableCell>
              <TableCell className="py-1.5">
                {format(new Date(c.control_date), "dd/MM/yy", { locale: es })}
              </TableCell>
              <TableCell className="py-1.5 text-center">{c.weight || "—"}</TableCell>
              <TableCell className="py-1.5 text-center">
                <PercentileBadge value={c.weight} month={c.ageInMonths} refData={weightRef} />
              </TableCell>
              <TableCell className="py-1.5 text-center">{c.height || "—"}</TableCell>
              <TableCell className="py-1.5 text-center">
                <PercentileBadge value={c.height} month={c.ageInMonths} refData={heightRef} />
              </TableCell>
              <TableCell className="py-1.5 text-center">{c.head_circumference || "—"}</TableCell>
              <TableCell className="py-1.5 text-center">
                <PercentileBadge value={c.head_circumference} month={c.ageInMonths} refData={hcRef} />
              </TableCell>
              <TableCell className="py-1.5 text-muted-foreground">—</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
