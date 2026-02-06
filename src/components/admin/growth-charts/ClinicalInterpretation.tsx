import { useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import {
  getRefDataForMonth,
  getNutritionalDiagnosis,
  getPercentileStatus,
  type MeasurementType,
  type NutritionalDiagnosis,
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

interface DiagnosisResult {
  label: string;
  type: MeasurementType;
  percentile: number;
  diagnosis: NutritionalDiagnosis;
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

  const diagnosisResults = useMemo(() => {
    const valid = controls.filter(c => c.ageInMonths !== undefined);
    if (valid.length === 0) return [];
    const latest = valid[valid.length - 1];
    const month = latest.ageInMonths!;

    const assess = (
      value: string | null,
      ref: typeof weightRef,
      label: string,
      type: MeasurementType
    ): DiagnosisResult | null => {
      if (!value) return null;
      const refData = getRefDataForMonth(month, ref);
      if (!refData) return null;
      const val = parseFloat(value);
      const pStatus = getPercentileStatus(val, refData);
      const dx = getNutritionalDiagnosis(val, refData, type);
      return { label, type, percentile: pStatus.percentile, diagnosis: dx };
    };

    return [
      assess(latest.weight, weightRef, "Peso", "weight"),
      assess(latest.height, heightRef, "Talla", "height"),
      assess(latest.head_circumference, hcRef, "P. Cefálico", "hc"),
    ].filter(Boolean) as DiagnosisResult[];
  }, [controls, sex]);

  const hasRisk = diagnosisResults.some(r => r.diagnosis.severity !== "normal");

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-card">
      <h3 className="text-sm font-semibold text-foreground">
        Interpretación Clínica
      </h3>

      {/* Risk alert */}
      {hasRisk && (
        <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/30">
          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
          <p className="text-xs text-destructive font-medium">
            Se detectaron hallazgos que requieren atención clínica en el último control.
          </p>
        </div>
      )}

      {/* Diagnosis badges */}
      {diagnosisResults.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {diagnosisResults.map((r) => (
            <Badge
              key={r.label}
              variant="outline"
              className="text-xs py-1 px-2"
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
