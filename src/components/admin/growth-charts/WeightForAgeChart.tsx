import { weightForAgeBoys } from "@/lib/growth-data/who-weight-boys";
import { weightForAgeGirls } from "@/lib/growth-data/who-weight-girls";
import { GrowthChartBase, type CurveDefinition } from "./GrowthChartBase";
import type { MedicalControlData } from "./GrowthChartsTab";

interface WeightForAgeChartProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  loading: boolean;
  onUpdateWeight?: (controlId: string, newWeight: number) => void;
}

// MSP Ecuador: 6 curves A-F
// A=P97, B=P85, C=P50(bold), D=P15(dashed), E=P3(dashed), F≈-3SD(dotted)
const WEIGHT_CURVES: CurveDefinition[] = [
  { key: "p97", label: "A", dash: "", width: 1.8 },
  { key: "p85", label: "B", dash: "", width: 1.5 },
  { key: "p50", label: "C", dash: "", width: 2.8, isBold: true },
  { key: "p15", label: "D", dash: "8 4", width: 1.5 },
  { key: "p3", label: "E", dash: "4 3", width: 1.2 },
  { key: "f", label: "F", dash: "2 2", width: 1.0 },
];

// Compute F ≈ -3SD (estimated as P3 - (P15 - P3))
const computeWeightExtra = (ref: {
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}) => ({
  f: Math.max(0, ref.p3 - (ref.p15 - ref.p3)),
});

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
      yLabel="Peso en Kilogramos"
      maxMonths={60}
      onUpdateValue={onUpdateWeight}
      xTickInterval={6}
      yMinorInterval={0.5}
      labelMonth={42}
      curves={WEIGHT_CURVES}
      computeExtraFields={computeWeightExtra}
    />
  );
};
