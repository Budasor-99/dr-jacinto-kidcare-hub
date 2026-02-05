import { headCircumferenceForAgeBoys } from "@/lib/growth-data/who-hc-boys";
import { headCircumferenceForAgeGirls } from "@/lib/growth-data/who-hc-girls";
import { GrowthChartBase, type CurveDefinition } from "./GrowthChartBase";
import type { MedicalControlData } from "./GrowthChartsTab";

interface HeadCircumferenceChartProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  loading: boolean;
  onUpdateHeadCircumference?: (controlId: string, newHC: number, newMonth?: number) => void;
}

// MSP Ecuador P.C.: 7 curves with NUMERIC labels on the right side
// Mapped from our data: P97→95, P85→90, P75(computed)→75, P50→50,
// P25(computed)→25, P15→10, P3→5
const HC_CURVES: CurveDefinition[] = [
  { key: "p97", label: "95", dash: "", width: 1.3 },
  { key: "p85", label: "90", dash: "", width: 1.1 },
  { key: "p75", label: "75", dash: "", width: 1.0 },
  { key: "p50", label: "50", dash: "", width: 1.8, isBold: true },
  { key: "p25", label: "25", dash: "", width: 1.0 },
  { key: "p15", label: "10", dash: "", width: 1.1 },
  { key: "p3", label: "5", dash: "", width: 1.3 },
];

// Compute interpolated P25 and P75
const computeHCExtra = (ref: {
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}) => ({
  p25: ref.p15 + (ref.p50 - ref.p15) * 0.286,
  p75: ref.p50 + (ref.p85 - ref.p50) * 0.714,
});

export const HeadCircumferenceChart = ({
  controls,
  sex,
  loading,
  onUpdateHeadCircumference,
}: HeadCircumferenceChartProps) => {
  const referenceData =
    sex === "M" ? headCircumferenceForAgeBoys : headCircumferenceForAgeGirls;

  return (
    <GrowthChartBase
      controls={controls}
      sex={sex}
      loading={loading}
      referenceData={referenceData}
      title="Circunferencia Cefálica para la Edad"
      valueField="head_circumference"
      unit="cm"
      yLabel="P.C. (cm)"
      maxMonths={24}
      onUpdateValue={onUpdateHeadCircumference}
      xTickInterval={3}
      yMinorInterval={0.5}
      yTickInterval={1}
      yDomainFixed={[30, 54]}
      curves={HC_CURVES}
      labelMode="right-numbers"
      computeExtraFields={computeHCExtra}
    />
  );
};
