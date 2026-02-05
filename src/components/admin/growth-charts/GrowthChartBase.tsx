import { useMemo, useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";
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

interface GrowthChartBaseProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  loading: boolean;
  referenceData: Array<{ month: number; p3: number; p15: number; p50: number; p85: number; p97: number }>;
  title: string;
  valueField: "weight" | "height" | "head_circumference";
  unit: string;
  yLabel: string;
  maxMonths?: number;
  onUpdateValue?: (controlId: string, newValue: number) => void;
}

// Year labels for the X-axis grouping
const YEAR_LABELS = ["1er Año", "2do Año", "3er Año", "4to Año", "5to Año"];

export const GrowthChartBase = ({
  controls,
  sex,
  loading,
  referenceData,
  title,
  valueField,
  unit,
  yLabel,
  maxMonths: defaultMaxMonths,
  onUpdateValue,
}: GrowthChartBaseProps) => {
  const colors = getChartColors(sex);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ top: 10, height: 440 });
  const [zoomMode, setZoomMode] = useState<"auto" | "full">("auto");

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const svg = chartRef.current.querySelector("svg");
        if (svg) {
          const rect = svg.getBoundingClientRect();
          setChartDimensions({
            top: 10,
            height: rect.height - 10 - 50,
          });
        }
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [loading]);

  // Calculate optimal X range based on patient data
  const xDomain = useMemo(() => {
    const fullMax = defaultMaxMonths || 60;
    if (zoomMode === "full") return [0, fullMax] as [number, number];

    const patientMaxAge = Math.max(
      0,
      ...controls
        .filter((c) => c.ageInMonths !== undefined && c[valueField])
        .map((c) => c.ageInMonths!)
    );

    if (patientMaxAge === 0) return [0, Math.min(24, fullMax)] as [number, number];

    // Round up to next 12-month period + 6 months buffer
    const optimized = Math.min(fullMax, Math.ceil((patientMaxAge + 6) / 12) * 12);
    return [0, Math.max(12, optimized)] as [number, number];
  }, [controls, valueField, zoomMode, defaultMaxMonths]);

  // Filter reference data to visible range
  const filteredRefData = useMemo(() => {
    return referenceData.filter((d) => d.month >= xDomain[0] && d.month <= xDomain[1]);
  }, [referenceData, xDomain]);

  const yDomain = useMemo(() => {
    const refValues = filteredRefData.flatMap((r) => [r.p3, r.p97]);
    const patientValues = controls
      .filter((c) => c[valueField] && c.ageInMonths !== undefined && c.ageInMonths <= xDomain[1])
      .map((c) => parseFloat(c[valueField]!));
    const allValues = [...refValues, ...patientValues];
    if (allValues.length === 0) return [0, 20] as [number, number];
    const min = Math.floor(Math.min(...allValues) - 1);
    const max = Math.ceil(Math.max(...allValues) + 1);
    return [Math.max(0, min), max] as [number, number];
  }, [filteredRefData, controls, valueField, xDomain]);

  // Chart data: reference curves
  const chartData = useMemo(() => {
    return filteredRefData.map((ref) => ({
      month: ref.month,
      p3: ref.p3,
      p15: ref.p15,
      p50: ref.p50,
      p85: ref.p85,
      p97: ref.p97,
    }));
  }, [filteredRefData]);

  // Patient data points
  const patientPoints = useMemo(() => {
    return controls
      .filter((c) => c.ageInMonths !== undefined && c[valueField] && c.ageInMonths <= xDomain[1])
      .map((c) => ({
        month: c.ageInMonths!,
        value: parseFloat(c[valueField]!),
        date: c.control_date,
        controlId: c.id,
      }));
  }, [controls, valueField, xDomain]);

  // Latest percentile status
  const latestStatus = useMemo(() => {
    const valid = controls.filter(
      (c) => c.ageInMonths !== undefined && c[valueField]
    );
    if (valid.length === 0) return null;
    const latest = valid[valid.length - 1];
    const refData = getRefDataForMonth(latest.ageInMonths!, referenceData);
    if (!refData) return null;
    return getPercentileStatus(parseFloat(latest[valueField]!), refData);
  }, [controls, referenceData, valueField]);

  const handleValueChange = (controlId: string, newValue: number) => {
    if (onUpdateValue) onUpdateValue(controlId, newValue);
  };

  // Generate month ticks
  const monthTicks = useMemo(() => {
    const [min, max] = xDomain;
    const range = max - min;
    let interval = 1;
    if (range > 36) interval = 3;
    else if (range > 24) interval = 2;

    const ticks: number[] = [];
    for (let i = min; i <= max; i += interval) {
      ticks.push(i);
    }
    return ticks;
  }, [xDomain]);

  // Year reference lines
  const yearLines = useMemo(() => {
    const lines: number[] = [];
    for (let y = 12; y <= xDomain[1]; y += 12) {
      lines.push(y);
    }
    return lines;
  }, [xDomain]);

  // Percentile line colors
  const percentileLineColor = sex === "M" ? "hsl(210, 60%, 55%)" : "hsl(330, 60%, 55%)";
  const percentileLineFaded = sex === "M" ? "hsl(210, 40%, 70%)" : "hsl(330, 40%, 70%)";

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
        <div className="flex justify-between items-center flex-wrap gap-2">
          <CardTitle className="text-base">
            {title} ({sex === "M" ? "Niño" : "Niña"})
          </CardTitle>
          <div className="flex items-center gap-2">
            {latestStatus && (
              <Badge
                style={{
                  backgroundColor: getStatusBgColor(latestStatus.status),
                  color: getStatusColor(latestStatus.status),
                  borderColor: getStatusColor(latestStatus.status),
                }}
                variant="outline"
              >
                P{latestStatus.percentile} - {latestStatus.label}
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoomMode(zoomMode === "auto" ? "full" : "auto")}
              className="h-7 px-2 text-xs"
            >
              {zoomMode === "auto" ? (
                <><ZoomOut className="h-3 w-3 mr-1" />Completa</>
              ) : (
                <><ZoomIn className="h-3 w-3 mr-1" />Enfocada</>
              )}
            </Button>
          </div>
        </div>
        {onUpdateValue && patientPoints.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            💡 Arrastra los puntos verticalmente para ajustar
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 50, left: 5, bottom: 40 }}
            >
              {/* Dense medical grid */}
              <CartesianGrid
                strokeDasharray="1 3"
                stroke="hsl(var(--border))"
                strokeOpacity={0.4}
                horizontalCoordinatesGenerator={({ yAxis }) => {
                  if (!yAxis) return [];
                  const { scale, domain } = yAxis as any;
                  if (!scale || !domain) return [];
                  const [minY, maxY] = domain;
                  const coords: number[] = [];
                  const step = valueField === "weight" ? 0.5 : 1;
                  for (let v = Math.ceil(minY / step) * step; v <= maxY; v += step) {
                    const y = scale(v);
                    if (y !== undefined) coords.push(y);
                  }
                  return coords;
                }}
              />

              {/* Year separator lines */}
              {yearLines.map((month) => (
                <ReferenceLine
                  key={`year-${month}`}
                  x={month}
                  stroke="hsl(var(--foreground))"
                  strokeOpacity={0.25}
                  strokeWidth={1.5}
                  strokeDasharray="none"
                >
                  <Label
                    value={YEAR_LABELS[month / 12 - 1] || `${month / 12}° Año`}
                    position="bottom"
                    offset={20}
                    style={{
                      fontSize: "10px",
                      fill: "hsl(var(--muted-foreground))",
                      fontWeight: 600,
                    }}
                  />
                </ReferenceLine>
              ))}

              <XAxis
                dataKey="month"
                type="number"
                domain={xDomain}
                ticks={monthTicks}
                tickFormatter={(v) => `${v}`}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
              >
                <Label
                  value="Edad (meses)"
                  position="bottom"
                  offset={5}
                  style={{ fontSize: "11px", fill: "hsl(var(--muted-foreground))" }}
                />
              </XAxis>

              <YAxis
                domain={yDomain}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
              >
                <Label
                  value={yLabel}
                  angle={-90}
                  position="insideLeft"
                  offset={10}
                  style={{ fontSize: "11px", fill: "hsl(var(--muted-foreground))" }}
                />
              </YAxis>

              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0]?.payload;
                  if (!data) return null;
                  // Find matching patient point
                  const pp = patientPoints.find(
                    (p) => Math.abs(p.month - label) < 0.5
                  );
                  return (
                    <div className="bg-background border rounded-lg p-3 shadow-lg text-xs">
                      <p className="font-medium mb-1 text-sm">
                        Edad: {formatAgeDisplay(label)}
                      </p>
                      {pp && (
                        <p className="text-sm font-bold mb-1" style={{ color: colors.line }}>
                          Paciente: {pp.value} {unit}
                        </p>
                      )}
                      <div className="text-muted-foreground space-y-0.5">
                        <p>P97: {data.p97} {unit}</p>
                        <p>P85: {data.p85} {unit}</p>
                        <p className="font-semibold">P50: {data.p50} {unit}</p>
                        <p>P15: {data.p15} {unit}</p>
                        <p>P3: {data.p3} {unit}</p>
                      </div>
                    </div>
                  );
                }}
              />

              {/* Normal zone shading P15-P85 */}
              <Area
                type="monotone"
                dataKey="p85"
                fill={colors.p85Fill}
                stroke="none"
                fillOpacity={0.25}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="p15"
                fill="hsl(var(--background))"
                stroke="none"
                fillOpacity={1}
                isAnimationActive={false}
              />

              {/* Percentile lines with different dash patterns */}
              <Line
                type="monotone"
                dataKey="p97"
                stroke={percentileLineFaded}
                strokeWidth={1}
                strokeDasharray="2 3"
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="p85"
                stroke={percentileLineFaded}
                strokeWidth={1}
                strokeDasharray="6 3"
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="p50"
                stroke={percentileLineColor}
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="p15"
                stroke={percentileLineFaded}
                strokeWidth={1}
                strokeDasharray="6 3"
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="p3"
                stroke={percentileLineFaded}
                strokeWidth={1}
                strokeDasharray="2 3"
                dot={false}
                isAnimationActive={false}
              />

              {/* Patient connected line with draggable points */}
              <Line
                type="monotone"
                data={patientPoints}
                dataKey="value"
                stroke={colors.line}
                strokeWidth={2.5}
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
                        value: payload.value,
                        month: payload.month,
                      }}
                      chartTop={chartDimensions.top}
                      chartHeight={chartDimensions.height}
                      yDomain={yDomain}
                      onValueChange={onUpdateValue ? handleValueChange : undefined}
                      color={colors.line}
                      unit={unit}
                      referenceData={referenceData}
                    />
                  );
                }}
                activeDot={false}
                connectNulls
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with percentile labels */}
        <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.line }} />
            Paciente
          </span>
          <span className="flex items-center gap-1">
            <div className="w-5 h-0.5 border-b-2" style={{ borderColor: percentileLineColor }} />
            P50
          </span>
          <span className="flex items-center gap-1">
            <div className="w-5 h-0.5 border-b border-dashed" style={{ borderColor: percentileLineFaded }} />
            P15 / P85
          </span>
          <span className="flex items-center gap-1">
            <div className="w-5 h-0.5 border-b border-dotted" style={{ borderColor: percentileLineFaded }} />
            P3 / P97
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.p85Fill, opacity: 0.3 }} />
            Zona Normal
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
