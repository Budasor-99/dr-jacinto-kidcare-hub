import { differenceInDays } from "date-fns";

// Calculate age in months from birth date to control date
export const calculateAgeInMonths = (birthDate: Date, controlDate: Date): number => {
  const diffDays = differenceInDays(controlDate, birthDate);
  return diffDays / 30.44; // Average days per month
};

// Format age for display
export const formatAgeDisplay = (ageInMonths: number): string => {
  const years = Math.floor(ageInMonths / 12);
  const months = Math.floor(ageInMonths % 12);
  const days = Math.round((ageInMonths % 1) * 30.44);
  
  if (years > 0) {
    return `${years}a ${months}m`;
  }
  return `${months}m ${days}d`;
};

// Get percentile status based on value and reference data
export type PercentileStatus = "normal" | "watch" | "evaluate";

export const getPercentileStatus = (
  value: number,
  referenceData: { p3: number; p15: number; p50: number; p85: number; p97: number }
): { status: PercentileStatus; percentile: number; label: string } => {
  let percentile: number;
  let status: PercentileStatus;

  if (value < referenceData.p3) {
    percentile = Math.round((value / referenceData.p3) * 3);
    status = "evaluate";
  } else if (value < referenceData.p15) {
    percentile = 3 + Math.round(((value - referenceData.p3) / (referenceData.p15 - referenceData.p3)) * 12);
    status = "watch";
  } else if (value < referenceData.p50) {
    percentile = 15 + Math.round(((value - referenceData.p15) / (referenceData.p50 - referenceData.p15)) * 35);
    status = "normal";
  } else if (value < referenceData.p85) {
    percentile = 50 + Math.round(((value - referenceData.p50) / (referenceData.p85 - referenceData.p50)) * 35);
    status = "normal";
  } else if (value < referenceData.p97) {
    percentile = 85 + Math.round(((value - referenceData.p85) / (referenceData.p97 - referenceData.p85)) * 12);
    status = "watch";
  } else {
    percentile = 97 + Math.round(((value - referenceData.p97) / referenceData.p97) * 3);
    status = "evaluate";
  }

  percentile = Math.max(0, Math.min(100, percentile));

  const labels: Record<PercentileStatus, string> = {
    normal: "Normal",
    watch: "Vigilar",
    evaluate: "Evaluar",
  };

  return { status, percentile, label: labels[status] };
};

// Get reference data for a specific month (with interpolation if needed)
export const getRefDataForMonth = (
  month: number,
  data: Array<{ month: number; p3: number; p15: number; p50: number; p85: number; p97: number }>
): { p3: number; p15: number; p50: number; p85: number; p97: number } | null => {
  const floorMonth = Math.floor(month);
  const ceilMonth = Math.ceil(month);
  
  if (floorMonth < 0 || floorMonth > 60) return null;
  
  const floorData = data.find(d => d.month === Math.min(floorMonth, 60));
  const ceilData = data.find(d => d.month === Math.min(ceilMonth, 60));
  
  if (!floorData) return null;
  if (!ceilData || floorMonth === ceilMonth) return floorData;
  
  // Linear interpolation
  const fraction = month - floorMonth;
  return {
    p3: floorData.p3 + (ceilData.p3 - floorData.p3) * fraction,
    p15: floorData.p15 + (ceilData.p15 - floorData.p15) * fraction,
    p50: floorData.p50 + (ceilData.p50 - floorData.p50) * fraction,
    p85: floorData.p85 + (ceilData.p85 - floorData.p85) * fraction,
    p97: floorData.p97 + (ceilData.p97 - floorData.p97) * fraction,
  };
};

// Chart colors based on sex
export const getChartColors = (sex: "M" | "F") => {
  if (sex === "M") {
    return {
      primary: "hsl(210, 100%, 50%)",
      p97Fill: "hsl(210, 100%, 95%)",
      p85Fill: "hsl(210, 100%, 90%)",
      p50Fill: "hsl(210, 100%, 85%)",
      p15Fill: "hsl(210, 100%, 80%)",
      p3Fill: "hsl(210, 100%, 75%)",
      line: "hsl(210, 100%, 40%)",
    };
  }
  return {
    primary: "hsl(330, 80%, 60%)",
    p97Fill: "hsl(330, 100%, 95%)",
    p85Fill: "hsl(330, 100%, 90%)",
    p50Fill: "hsl(330, 100%, 85%)",
    p15Fill: "hsl(330, 100%, 80%)",
    p3Fill: "hsl(330, 100%, 75%)",
    line: "hsl(330, 80%, 45%)",
  };
};

// Nutritional diagnosis types
export type MeasurementType = "weight" | "height" | "hc";
export type DiagnosisSeverity = "obese" | "overweight" | "normal" | "mild" | "moderate" | "severe" | "tall" | "short_risk" | "short" | "macro" | "micro";

export interface NutritionalDiagnosis {
  diagnosis: string;
  severity: DiagnosisSeverity;
  color: string;
  bgColor: string;
}

export const getNutritionalDiagnosis = (
  value: number,
  referenceData: { p3: number; p15: number; p50: number; p85: number; p97: number },
  type: MeasurementType
): NutritionalDiagnosis => {
  if (type === "weight") {
    // Estimate -3SD as p3 * 0.85 (approximation)
    const minus3SD = referenceData.p3 * 0.85;
    if (value > referenceData.p97) return { diagnosis: "Obesidad", severity: "obese", color: "hsl(0, 84%, 40%)", bgColor: "hsl(0, 84%, 95%)" };
    if (value > referenceData.p85) return { diagnosis: "Sobrepeso", severity: "overweight", color: "hsl(25, 95%, 45%)", bgColor: "hsl(25, 95%, 95%)" };
    if (value >= referenceData.p15) return { diagnosis: "Normal", severity: "normal", color: "hsl(142, 76%, 36%)", bgColor: "hsl(142, 76%, 95%)" };
    if (value >= referenceData.p3) return { diagnosis: "Desnutrición Grado 1", severity: "mild", color: "hsl(45, 93%, 40%)", bgColor: "hsl(45, 93%, 95%)" };
    if (value >= minus3SD) return { diagnosis: "Desnutrición Grado 2", severity: "moderate", color: "hsl(25, 95%, 45%)", bgColor: "hsl(25, 95%, 95%)" };
    return { diagnosis: "Desnutrición Grado 3", severity: "severe", color: "hsl(0, 84%, 40%)", bgColor: "hsl(0, 84%, 95%)" };
  }

  if (type === "height") {
    if (value > referenceData.p97) return { diagnosis: "Talla Alta", severity: "tall", color: "hsl(210, 100%, 45%)", bgColor: "hsl(210, 100%, 95%)" };
    if (value >= referenceData.p15) return { diagnosis: "Normal", severity: "normal", color: "hsl(142, 76%, 36%)", bgColor: "hsl(142, 76%, 95%)" };
    if (value >= referenceData.p3) return { diagnosis: "Riesgo Talla Baja", severity: "short_risk", color: "hsl(45, 93%, 40%)", bgColor: "hsl(45, 93%, 95%)" };
    return { diagnosis: "Talla Baja", severity: "short", color: "hsl(0, 84%, 40%)", bgColor: "hsl(0, 84%, 95%)" };
  }

  // HC
  if (value > referenceData.p97) return { diagnosis: "Macrocefalia", severity: "macro", color: "hsl(0, 84%, 40%)", bgColor: "hsl(0, 84%, 95%)" };
  if (value >= referenceData.p3) return { diagnosis: "Normal", severity: "normal", color: "hsl(142, 76%, 36%)", bgColor: "hsl(142, 76%, 95%)" };
  return { diagnosis: "Microcefalia", severity: "micro", color: "hsl(0, 84%, 40%)", bgColor: "hsl(0, 84%, 95%)" };
};

// Status colors
export const getStatusColor = (status: PercentileStatus): string => {
  const colors: Record<PercentileStatus, string> = {
    normal: "hsl(142, 76%, 36%)",
    watch: "hsl(45, 93%, 47%)",
    evaluate: "hsl(0, 84%, 60%)",
  };
  return colors[status];
};

export const getStatusBgColor = (status: PercentileStatus): string => {
  const colors: Record<PercentileStatus, string> = {
    normal: "hsl(142, 76%, 95%)",
    watch: "hsl(45, 93%, 95%)",
    evaluate: "hsl(0, 84%, 95%)",
  };
  return colors[status];
};
