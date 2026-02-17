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

// MSP Ecuador / Dr. Salazar: 5 curves delimiting 6 zones A-F
const HEIGHT_CURVES: CurveDefinition[] = [
  { key: "p97", label: "P97", dash: "", width: 1.8 },
  { key: "p50", label: "P50", dash: "", width: 2.8, isBold: true },
  { key: "p3", label: "P3", dash: "8 4", width: 1.5 },
  { key: "minus2sd", label: "-2DE", dash: "4 3", width: 1.2 },
  { key: "minus3sd", label: "-3DE", dash: "2 2", width: 1.0 },
];

// Compute -2SD and -3SD
// 1 SD ≈ (P97 - P3) / 3.76  (full spread gives visible zone separation)
const computeHeightExtra = (ref: {
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}) => {
  const sd = (ref.p97 - ref.p3) / 3.76;
  return {
    minus2sd: Math.max(0, ref.p50 - 2 * sd),
    minus3sd: Math.max(0, ref.p50 - 3 * sd),
  };
};

const HEIGHT_ZONES = [
  { letter: "A", label: "Talla Alta", upperKey: undefined, lowerKey: "p97" },
  { letter: "B", label: "Normal Alto", upperKey: "p97", lowerKey: "p50" },
  { letter: "C", label: "Normal Bajo", upperKey: "p50", lowerKey: "p3" },
  { letter: "D", label: "Riesgo T. Baja", upperKey: "p3", lowerKey: "minus2sd" },
  { letter: "E", label: "Talla Baja G2", upperKey: "minus2sd", lowerKey: "minus3sd" },
  { letter: "F", label: "Talla Baja G3", upperKey: "minus3sd", lowerKey: undefined },
];

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
      measurementType="height"
      computeExtraFields={computeHeightExtra}
      zoneLabels={HEIGHT_ZONES}
      annotations={[
        { x: 10, yOffset: 25, text: "Acostado", fontSize: 11 },
        { x: 40, yOffset: 25, text: "De pie", fontSize: 11 },
      ]}
    />
  );
};
