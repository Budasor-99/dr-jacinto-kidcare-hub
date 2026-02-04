import { useMemo, useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { weightForAgeBoys } from "@/lib/growth-data/who-weight-boys";
import { weightForAgeGirls } from "@/lib/growth-data/who-weight-girls";
import {
  getChartColors,
  getPercentileStatus,
  getRefDataForMonth,
  getStatusColor,
  getStatusBgColor,
  formatAgeDisplay,
} from "@/lib/growth-data/growth-utils";
import { DraggablePoint } from "./DraggablePoint";
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
  const colors = getChartColors(sex);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ top: 10, height: 300 });

  // Track chart dimensions for coordinate conversion
  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const svg = chartRef.current.querySelector("svg");
        if (svg) {
          // Recharts typically has margins: { top: 10, right: 30, left: 0, bottom: 0 }
          // The actual chart area is within these margins
          const rect = svg.getBoundingClientRect();
          setChartDimensions({
            top: 10, // margin.top
            height: rect.height - 10 - 30, // subtract top and bottom margins
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [loading]);

  // Calculate Y domain based on data
  const yDomain = useMemo(() => {
    const allValues = [
      ...referenceData.map((r) => r.p3),
      ...referenceData.map((r) => r.p97),
      ...controls.filter((c) => c.weight).map((c) => parseFloat(c.weight!)),
    ];
    const min = Math.floor(Math.min(...allValues) - 1);
    const max = Math.ceil(Math.max(...allValues) + 1);
    return [Math.max(0, min), max] as [number, number];
  }, [referenceData, controls]);

  // Prepare chart data combining reference curves with patient data
  const chartData = useMemo(() => {
    return referenceData.map((ref) => {
      const patientPoint = controls.find(
        (c) =>
          c.ageInMonths !== undefined &&
          Math.abs(c.ageInMonths - ref.month) < 0.5 &&
          c.weight
      );

      return {
        month: ref.month,
        p3: ref.p3,
        p15: ref.p15,
        p50: ref.p50,
        p85: ref.p85,
        p97: ref.p97,
        patientWeight: patientPoint ? parseFloat(patientPoint.weight!) : undefined,
        controlId: patientPoint?.id,
      };
    });
  }, [referenceData, controls]);

  // Get patient data points for the interactive line
  const patientPoints = useMemo(() => {
    return controls
      .filter((c) => c.ageInMonths !== undefined && c.weight)
      .map((c) => ({
        month: c.ageInMonths!,
        weight: parseFloat(c.weight!),
        date: c.control_date,
        controlId: c.id,
      }));
  }, [controls]);

  // Calculate latest percentile status
  const latestStatus = useMemo(() => {
    const validControls = controls.filter(
      (c) => c.ageInMonths !== undefined && c.weight
    );
    if (validControls.length === 0) return null;

    const latest = validControls[validControls.length - 1];
    const refData = getRefDataForMonth(latest.ageInMonths!, referenceData);
    if (!refData) return null;

    return getPercentileStatus(parseFloat(latest.weight!), refData);
  }, [controls, referenceData]);

  const handleValueChange = (controlId: string, newValue: number) => {
    if (onUpdateWeight) {
      onUpdateWeight(controlId, newValue);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Cargando datos...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">
            Peso para la Edad ({sex === "M" ? "Niño" : "Niña"})
          </CardTitle>
          {latestStatus && (
            <Badge
              style={{
                backgroundColor: getStatusBgColor(latestStatus.status),
                color: getStatusColor(latestStatus.status),
                borderColor: getStatusColor(latestStatus.status),
              }}
              variant="outline"
            >
              Percentil {latestStatus.percentile} - {latestStatus.label}
            </Badge>
          )}
        </div>
        {onUpdateWeight && patientPoints.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            💡 Arrastra los puntos verticalmente para ajustar el peso
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => `${value}m`}
                label={{ value: "Edad (meses)", position: "bottom", offset: -5 }}
              />
              <YAxis
                label={{ value: "Peso (kg)", angle: -90, position: "insideLeft" }}
                domain={yDomain}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0]?.payload;
                  return (
                    <div className="bg-background border rounded-lg p-3 shadow-lg">
                      <p className="font-medium mb-1">Edad: {formatAgeDisplay(label)}</p>
                      {data.patientWeight !== undefined && (
                        <p className="text-sm" style={{ color: colors.line }}>
                          <strong>Paciente: {data.patientWeight} kg</strong>
                        </p>
                      )}
                      <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        <p>P97: {data.p97} kg</p>
                        <p>P85: {data.p85} kg</p>
                        <p>P50: {data.p50} kg</p>
                        <p>P15: {data.p15} kg</p>
                        <p>P3: {data.p3} kg</p>
                      </div>
                    </div>
                  );
                }}
              />

              {/* Percentile bands */}
              <Area
                type="monotone"
                dataKey="p97"
                fill={colors.p97Fill}
                stroke="none"
                fillOpacity={0.4}
              />
              <Area
                type="monotone"
                dataKey="p85"
                fill={colors.p85Fill}
                stroke="none"
                fillOpacity={0.5}
              />
              <Area
                type="monotone"
                dataKey="p50"
                fill={colors.p50Fill}
                stroke="none"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="p15"
                fill={colors.p15Fill}
                stroke="none"
                fillOpacity={0.5}
              />
              <Area
                type="monotone"
                dataKey="p3"
                fill={colors.p3Fill}
                stroke="none"
                fillOpacity={0.4}
              />

              {/* Reference line P50 */}
              <Line
                type="monotone"
                dataKey="p50"
                stroke={colors.primary}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />

              {/* Patient connected line with draggable points */}
              <Line
                type="monotone"
                data={patientPoints}
                dataKey="weight"
                stroke={colors.line}
                strokeWidth={2}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (!payload || cx === undefined || cy === undefined) return null;
                  return (
                    <DraggablePoint
                      key={payload.controlId}
                      cx={cx}
                      cy={cy}
                      payload={{
                        controlId: payload.controlId,
                        value: payload.weight,
                        month: payload.month,
                      }}
                      chartTop={chartDimensions.top}
                      chartHeight={chartDimensions.height}
                      yDomain={yDomain}
                      onValueChange={onUpdateWeight ? handleValueChange : undefined}
                      color={colors.line}
                      unit="kg"
                    />
                  );
                }}
                activeDot={false}
                connectNulls
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.line }} />
            Paciente
          </span>
          <span className="flex items-center gap-1">
            <div className="w-8 h-0.5" style={{ backgroundColor: colors.primary, borderStyle: "dashed" }} />
            P50
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.p85Fill, opacity: 0.6 }} />
            Percentiles
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
