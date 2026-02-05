import { weightForAgeBoys } from "@/lib/growth-data/who-weight-boys";
import { weightForAgeGirls } from "@/lib/growth-data/who-weight-girls";
import { GrowthChartBase } from "./GrowthChartBase";
import type { MedicalControlData } from "./GrowthChartsTab";

interface WeightForAgeChartProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  loading: boolean;
  onUpdateWeight?: (controlId: string, newWeight: number) => void;
}

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
      labelMonth={45}
    />
  );
};
