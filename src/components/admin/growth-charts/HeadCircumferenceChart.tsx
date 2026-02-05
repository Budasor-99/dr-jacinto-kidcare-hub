import { headCircumferenceForAgeBoys } from "@/lib/growth-data/who-hc-boys";
import { headCircumferenceForAgeGirls } from "@/lib/growth-data/who-hc-girls";
import { GrowthChartBase } from "./GrowthChartBase";
import type { MedicalControlData } from "./GrowthChartsTab";

interface HeadCircumferenceChartProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  loading: boolean;
  onUpdateHeadCircumference?: (controlId: string, newHC: number) => void;
}

export const HeadCircumferenceChart = ({
  controls,
  sex,
  loading,
  onUpdateHeadCircumference,
}: HeadCircumferenceChartProps) => {
  const referenceData = sex === "M" ? headCircumferenceForAgeBoys : headCircumferenceForAgeGirls;

  return (
    <GrowthChartBase
      controls={controls}
      sex={sex}
      loading={loading}
      referenceData={referenceData}
      title="Perímetro Cefálico para la Edad"
      valueField="head_circumference"
      unit="cm"
      yLabel="P.C. (cm)"
      maxMonths={36}
      onUpdateValue={onUpdateHeadCircumference}
      useLetterLabels
      xTickInterval={3}
      yMinorInterval={1}
    />
  );
};
