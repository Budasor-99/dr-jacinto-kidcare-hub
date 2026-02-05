import { useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
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

interface ClinicalInterpretationProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  evaluation: string;
  onEvaluationChange: (value: string) => void;
  recommendations: string;
  onRecommendationsChange: (value: string) => void;
}

export const ClinicalInterpretation = ({
  controls,
  sex,
  evaluation,
  onEvaluationChange,
  recommendations,
  onRecommendationsChange,
}: ClinicalInterpretationProps) => {
  const weightRef = sex === "M" ? weightForAgeBoys : weightForAgeGirls;
  const heightRef = sex === "M" ? heightForAgeBoys : heightForAgeGirls;
  const hcRef = sex === "M" ? headCircumferenceForAgeBoys : headCircumferenceForAgeGirls;

  // Auto-detect risk from latest control
  const riskAssessment = useMemo(() => {
    const valid = controls.filter(c => c.ageInMonths !== undefined);
    if (valid.length === 0) return null;
    const latest = valid[valid.length - 1];
    const month = latest.ageInMonths!;

    const assess = (value: string | null, ref: typeof weightRef, label: string) => {
      if (!value) return null;
      const refData = getRefDataForMonth(month, ref);
      if (!refData) return null;
      const status = getPercentileStatus(parseFloat(value), refData);
      return { label, ...status };
    };

    return [
      assess(latest.weight, weightRef, "Peso"),
      assess(latest.height, heightRef, "Talla"),
      assess(latest.head_circumference, hcRef, "P. Cefálico"),
    ].filter(Boolean) as Array<{ label: string; status: string; percentile: number }>;
  }, [controls, sex]);

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-card">
      <h3 className="text-sm font-semibold text-foreground">
        Interpretación Clínica
      </h3>

      {/* Auto-detected risk summary */}
      {riskAssessment && riskAssessment.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {riskAssessment.map((r: any) => (
            <Badge
              key={r.label}
              variant="outline"
              className="text-xs"
              style={{
                backgroundColor: getStatusBgColor(r.status),
                color: getStatusColor(r.status),
                borderColor: getStatusColor(r.status),
              }}
            >
              {r.label}: P{r.percentile} — {r.status === "normal" ? "Normal" : r.status === "watch" ? "Vigilar" : "Evaluar"}
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Evaluación del crecimiento / Detección de riesgo nutricional
        </label>
        <Textarea
          value={evaluation}
          onChange={(e) => onEvaluationChange(e.target.value)}
          placeholder="Evaluación clínica del crecimiento, detección de riesgo nutricional o retraso del crecimiento..."
          className="min-h-[80px] text-sm resize-y print:min-h-[60px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Recomendaciones generales
        </label>
        <Textarea
          value={recommendations}
          onChange={(e) => onRecommendationsChange(e.target.value)}
          placeholder="Recomendaciones nutricionales, de seguimiento, derivaciones..."
          className="min-h-[80px] text-sm resize-y print:min-h-[60px]"
        />
      </div>
    </div>
  );
};
