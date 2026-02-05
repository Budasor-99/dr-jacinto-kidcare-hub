import { heightForAgeBoys } from "@/lib/growth-data/who-height-boys";
import { heightForAgeGirls } from "@/lib/growth-data/who-height-girls";
import { GrowthChartBase, type CurveDefinition } from "./GrowthChartBase";
import type { MedicalControlData } from "./GrowthChartsTab";

interface HeightForAgeChartProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  loading: boolean;
  onUpdateHeight?: (controlId: string, newHeight: number, newMonth?: number) => void;
}

// MSP Ecuador: 6 curves A-F
const HEIGHT_CURVES: CurveDefinition[] = [
  { key: "p97", label: "A", dash: "", width: 1.8 },
  { key: "p85", label: "B", dash: "", width: 1.5 },
  { key: "p50", label: "C", dash: "", width: 2.8, isBold: true },
  { key: "p15", label: "D", dash: "8 4", width: 1.5 },
  { key: "p3", label: "E", dash: "4 3", width: 1.2 },
  { key: "f", label: "F", dash: "2 2", width: 1.0 },
];

// Compute F ≈ -3SD
const computeHeightExtra = (ref: {
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}) => ({
  f: Math.max(0, ref.p3 - (ref.p15 - ref.p3)),
});

export const HeightForAgeChart = ({
  controls,
  sex,
  loading,
  onUpdateHeight,
}: HeightForAgeChartProps) => {
  const referenceData = sex === "M" ? heightForAgeBoys : heightForAgeGirls;

  return (
    <GrowthChartBase
      controls={controls}
      sex={sex}
      loading={loading}
      referenceData={referenceData}
      title="Talla/Longitud para la Edad"
      valueField="height"
      unit="cm"
      yLabel="Talla (cm)"
      maxMonths={60}
      onUpdateValue={onUpdateHeight}
      xTickInterval={6}
      yMinorInterval={1}
      yTickInterval={5}
      yDomainFixed={[44, 120]}
      labelMonth={48}
      curves={HEIGHT_CURVES}
      computeExtraFields={computeHeightExtra}
      annotations={[
        { x: 10, yOffset: 25, text: "Acostado", fontSize: 11 },
        { x: 40, yOffset: 25, text: "De pie", fontSize: 11 },
      ]}
    />
  );
};
