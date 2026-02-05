import { heightForAgeBoys } from "@/lib/growth-data/who-height-boys";
import { heightForAgeGirls } from "@/lib/growth-data/who-height-girls";
import { GrowthChartBase } from "./GrowthChartBase";
import type { MedicalControlData } from "./GrowthChartsTab";

interface HeightForAgeChartProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  loading: boolean;
  onUpdateHeight?: (controlId: string, newHeight: number) => void;
}

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
      title={`Talla/Longitud para la Edad`}
      valueField="height"
      unit="cm"
      yLabel="Centímetros"
      maxMonths={60}
      onUpdateValue={onUpdateHeight}
      useLetterLabels
      xTickInterval={6}
      yMinorInterval={5}
      annotations={[
        { x: 12, y: 25, text: "Acostado", fontSize: 10 },
        { x: 42, y: 25, text: "De pie", fontSize: 10 },
      ]}
    />
  );
};
