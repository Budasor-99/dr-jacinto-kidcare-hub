import { weightForAgeBoys } from "@/lib/growth-data/who-weight-boys";
import { weightForAgeGirls } from "@/lib/growth-data/who-weight-girls";
import { GrowthChartBase, type CurveDefinition } from "./GrowthChartBase";
import type { MedicalControlData } from "./GrowthChartsTab";

interface WeightForAgeChartProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  loading: boolean;
  onUpdateWeight?: (controlId: string, newWeight: number, newMonth?: number) => void;
}

// MSP Ecuador / Dr. Salazar: 5 curves delimiting 6 zones A-F
// Bottom 3 curves computed at -1SD, -2SD, -3SD for even spacing (matching MSP reference chart)
const WEIGHT_CURVES: CurveDefinition[] = [
  { key: "p97", label: "P97", dash: "", width: 1.8 },
  { key: "p50", label: "P50", dash: "", width: 2.8, isBold: true },
  { key: "minus1sd", label: "P3", dash: "8 4", width: 1.5 },
  { key: "minus2sd", label: "-2DE", dash: "4 3", width: 1.2 },
  { key: "minus3sd", label: "-3DE", dash: "2 2", width: 1.0 },
];

// Compute -1SD, -2SD and -3SD using upper half SD for even spacing
// SD ≈ (P97 - P50) / 1.88
const computeWeightExtra = (ref: {
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}) => {
  const sd = (ref.p97 - ref.p50) / 1.88;
  return {
    minus1sd: Math.max(0, ref.p50 - sd),
    minus2sd: Math.max(0, ref.p50 - 2 * sd),
    minus3sd: Math.max(0, ref.p50 - 3 * sd),
  };
};

const WEIGHT_ZONES = [
  { letter: "A", label: "Sobrepeso", upperKey: undefined, lowerKey: "p97" },
  { letter: "B", label: "Normal Alto", upperKey: "p97", lowerKey: "p50" },
  { letter: "C", label: "Normal Bajo", upperKey: "p50", lowerKey: "minus1sd" },
  { letter: "D", label: "Desnutrición G1", upperKey: "minus1sd", lowerKey: "minus2sd" },
  { letter: "E", label: "Desnutrición G2", upperKey: "minus2sd", lowerKey: "minus3sd" },
  { letter: "F", label: "Desnutrición G3", upperKey: "minus3sd", lowerKey: undefined },
];

export const WeightForAgeChart = ({
  controls,
  sex,
  loading,
  onUpdateWeight,
}: WeightForAgeChartProps) => {
  const referenceData = sex === "M" ? weightForAgeBoys : weightForAgeGirls;

  return (
    <GrowthChartBase
      controls={controls}
      sex={sex}
      loading={loading}
      referenceData={referenceData}
      title="Peso para la Edad"
      valueField="weight"
      unit="kg"
      yLabel="Peso (kg)"
      maxMonths={60}
      onUpdateValue={onUpdateWeight}
      xTickInterval={1}
      yMinorInterval={1}
      yTickInterval={2}
      yDomainFixed={[2, 26]}
      labelMonth={42}
      curves={WEIGHT_CURVES}
      measurementType="weight"
      computeExtraFields={computeWeightExtra}
      zoneLabels={WEIGHT_ZONES}
    />
  );
};
