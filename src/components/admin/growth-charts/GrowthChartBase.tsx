import { useMemo, useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";
import {
  ComposedChart,
  Line,
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

export interface CurveDefinition {
  key: string;
  label: string;
  dash: string;
  width: number;
  isBold?: boolean;
}

interface ChartAnnotation {
  x: number;
  yOffset: number;
  text: string;
  fontSize?: number;
}

interface GrowthChartBaseProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  loading: boolean;
  referenceData: Array<{
    month: number;
    p3: number;
    p15: number;
    p50: number;
    p85: number;
    p97: number;
  }>;
  title: string;
  valueField: "weight" | "height" | "head_circumference";
  unit: string;
  yLabel: string;
  maxMonths?: number;
  onUpdateValue?: (controlId: string, newValue: number) => void;
  annotations?: ChartAnnotation[];
  yMinorInterval?: number;
  xTickInterval?: number;
  /** Month at which to render letter labels ON the curves */
  labelMonth?: number;
  /** Custom curve definitions (overrides default A-E) */
  curves?: CurveDefinition[];
  /**
   * "on-curve" = letter labels on the curve at labelMonth (default)
   * "right-numbers" = numeric labels on the right edge of each curve
   */
  labelMode?: "on-curve" | "right-numbers";
  /** Function to compute extra percentile fields from standard ref data */
  computeExtraFields?: (ref: {
    p3: number;
    p15: number;
    p50: number;
    p85: number;
    p97: number;
  }) => Record<string, number>;
}

const DEFAULT_CURVES: CurveDefinition[] = [
  { key: "p97", label: "A", dash: "", width: 1.8 },
  { key: "p85", label: "B", dash: "", width: 1.5 },
  { key: "p50", label: "C", dash: "", width: 2.5, isBold: true },
  { key: "p15", label: "D", dash: "8 4", width: 1.5 },
  { key: "p3", label: "E", dash: "4 3", width: 1.2 },
];

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
  annotations,
  yMinorInterval,
  xTickInterval,
  labelMonth,
  curves,
  labelMode = "on-curve",
  computeExtraFields,
}: GrowthChartBaseProps) => {
  const colors = getChartColors(sex);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({
    top: 10,
    height: 440,
  });
  const [zoomMode, setZoomMode] = useState<"auto" | "full">("auto");

  const activeCurves = curves || DEFAULT_CURVES;

  // Clinical monochrome colors
  const lineColor = "hsl(var(--foreground))";
  const lineFaded = "hsl(var(--muted-foreground))";
  const gridColor = "hsl(var(--border))";

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const svg = chartRef.current.querySelector("svg");
        if (svg) {
          const rect = svg.getBoundingClientRect();
          setChartDimensions({ top: 10, height: rect.height - 60 });
        }
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [loading]);

  const xDomain = useMemo(() => {
    const fullMax = defaultMaxMonths || 60;
    if (zoomMode === "full") return [0, fullMax] as [number, number];
    const patientMaxAge = Math.max(
      0,
      ...controls
        .filter((c) => c.ageInMonths !== undefined && c[valueField])
        .map((c) => c.ageInMonths!)
    );
    if (patientMaxAge === 0)
      return [0, Math.min(24, fullMax)] as [number, number];
    const optimized = Math.min(
      fullMax,
      Math.ceil((patientMaxAge + 6) / 12) * 12
    );
    return [0, Math.max(12, optimized)] as [number, number];
  }, [controls, valueField, zoomMode, defaultMaxMonths]);

  const filteredRefData = useMemo(() => {
    return referenceData.filter(
      (d) => d.month >= xDomain[0] && d.month <= xDomain[1]
    );
  }, [referenceData, xDomain]);

  // Build chart data with optional extra computed fields
  const chartData = useMemo(() => {
    return filteredRefData.map((ref) => {
      const base: Record<string, number> = {
        month: ref.month,
        p3: ref.p3,
        p15: ref.p15,
        p50: ref.p50,
        p85: ref.p85,
        p97: ref.p97,
      };
      if (computeExtraFields) {
        const extra = computeExtraFields(ref);
        Object.assign(base, extra);
      }
      return base;
    });
  }, [filteredRefData, computeExtraFields]);

  const yDomain = useMemo(() => {
    // Collect all values from all active curve keys
    const allCurveKeys = activeCurves.map((c) => c.key);
    const refValues = chartData.flatMap((d) =>
      allCurveKeys.map((k) => d[k]).filter((v) => v !== undefined)
    );
    const patientValues = controls
      .filter(
        (c) =>
          c[valueField] &&
          c.ageInMonths !== undefined &&
          c.ageInMonths <= xDomain[1]
      )
      .map((c) => parseFloat(c[valueField]!));
    const allValues = [...refValues, ...patientValues];
    if (allValues.length === 0) return [0, 20] as [number, number];
    const min = Math.floor(Math.min(...allValues) - 1);
    const max = Math.ceil(Math.max(...allValues) + 1);
    return [Math.max(0, min), max] as [number, number];
  }, [chartData, controls, valueField, xDomain, activeCurves]);

  const effectiveLabelMonth = labelMonth ?? Math.round(xDomain[1] * 0.75);

  const patientPoints = useMemo(() => {
    return controls
      .filter(
        (c) =>
          c.ageInMonths !== undefined &&
          c[valueField] &&
          c.ageInMonths <= xDomain[1]
      )
      .map((c) => ({
        month: c.ageInMonths!,
        value: parseFloat(c[valueField]!),
        date: c.control_date,
        controlId: c.id,
      }));
  }, [controls, valueField, xDomain]);

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

  const monthTicks = useMemo(() => {
    const [min, max] = xDomain;
    let interval = xTickInterval || 1;
    if (!xTickInterval) {
      const range = max - min;
      if (range > 36) interval = 6;
      else if (range > 24) interval = 3;
    }
    const ticks: number[] = [];
    for (let i = min; i <= max; i += interval) ticks.push(i);
    return ticks;
  }, [xDomain, xTickInterval]);

  const yearLines = useMemo(() => {
    const lines: number[] = [];
    for (let y = 12; y <= xDomain[1]; y += 12) lines.push(y);
    return lines;
  }, [xDomain]);

  // ── DOT RENDERERS ───────────────────────────────────────────
  // "on-curve" mode: render letter label at labelMonth position
  const makeOnCurveDot =
    (label: string) =>
    (props: any) => {
      const { cx, cy, payload } = props;
      if (!payload || cx === undefined || cy === undefined) return <g />;
      if (Math.abs(payload.month - effectiveLabelMonth) > 0.5) return <g />;
      return (
        <g>
          <circle cx={cx} cy={cy} r={9} fill="hsl(var(--background))" />
          <text
            x={cx}
            y={cy + 4}
            textAnchor="middle"
            fontSize={12}
            fontWeight="bold"
            fill={lineColor}
            style={{ fontFamily: "serif" }}
          >
            {label}
          </text>
        </g>
      );
    };

  // "right-numbers" mode: render numeric label at the LAST data point (right edge)
  const makeRightLabelDot =
    (label: string) =>
    (props: any) => {
      const { cx, cy, payload, index } = props;
      if (!payload || cx === undefined || cy === undefined) return <g />;
      // Only render on the last data point
      if (index !== chartData.length - 1) return <g />;
      return (
        <g>
          <text
            x={cx + 8}
            y={cy + 4}
            textAnchor="start"
            fontSize={11}
            fontWeight="bold"
            fill={lineColor}
            style={{ fontFamily: "sans-serif" }}
          >
            {label}
          </text>
        </g>
      );
    };

  const getDotRenderer = (curve: CurveDefinition) => {
    if (labelMode === "right-numbers") {
      return makeRightLabelDot(curve.label);
    }
    return makeOnCurveDot(curve.label);
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
    <Card className="border-2">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <CardTitle className="text-base font-bold tracking-wide uppercase">
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
              onClick={() =>
                setZoomMode(zoomMode === "auto" ? "full" : "auto")
              }
              className="h-7 px-2 text-xs"
            >
              {zoomMode === "auto" ? (
                <>
                  <ZoomOut className="h-3 w-3 mr-1" />
                  Completa
                </>
              ) : (
                <>
                  <ZoomIn className="h-3 w-3 mr-1" />
                  Enfocada
                </>
              )}
            </Button>
          </div>
        </div>
        {onUpdateValue && patientPoints.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            💡 Arrastra los puntos verticalmente para ajustar valores
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[550px] w-full" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 10,
                right: labelMode === "right-numbers" ? 35 : 15,
                left: 5,
                bottom: 45,
              }}
            >
              {/* Dense clinical grid */}
              <CartesianGrid
                strokeDasharray="1 3"
                stroke={gridColor}
                strokeOpacity={0.5}
                horizontalCoordinatesGenerator={({ yAxis }) => {
                  if (!yAxis) return [];
                  const { scale, domain } = yAxis as any;
                  if (!scale || !domain) return [];
                  const [minY, maxY] = domain;
                  const coords: number[] = [];
                  const step =
                    yMinorInterval ||
                    (valueField === "weight" ? 0.5 : 1);
                  for (
                    let v = Math.ceil(minY / step) * step;
                    v <= maxY;
                    v += step
                  ) {
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
                  stroke={lineColor}
                  strokeOpacity={0.3}
                  strokeWidth={1.5}
                  strokeDasharray="none"
                >
                  <Label
                    value={
                      YEAR_LABELS[month / 12 - 1] || `${month / 12}° Año`
                    }
                    position="bottom"
                    offset={22}
                    style={{
                      fontSize: "10px",
                      fill: "hsl(var(--muted-foreground))",
                      fontWeight: 700,
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
                tick={{ fontSize: 11, fill: lineColor, fontWeight: 600 }}
                axisLine={{ stroke: lineColor, strokeWidth: 1.5 }}
                tickLine={{ stroke: lineColor }}
              >
                <Label
                  value="Meses"
                  position="bottom"
                  offset={8}
                  style={{
                    fontSize: "12px",
                    fill: lineColor,
                    fontWeight: 700,
                  }}
                />
              </XAxis>

              <YAxis
                domain={yDomain}
                tick={{ fontSize: 11, fill: lineColor, fontWeight: 600 }}
                axisLine={{ stroke: lineColor, strokeWidth: 1.5 }}
                tickLine={{ stroke: lineColor }}
              >
                <Label
                  value={yLabel}
                  angle={-90}
                  position="insideLeft"
                  offset={10}
                  style={{
                    fontSize: "12px",
                    fill: lineColor,
                    fontWeight: 700,
                  }}
                />
              </YAxis>

              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0]?.payload;
                  if (!data) return null;
                  const pp = patientPoints.find(
                    (p) => Math.abs(p.month - label) < 0.5
                  );
                  return (
                    <div className="bg-background border-2 border-foreground/20 rounded-lg p-3 shadow-lg text-xs">
                      <p className="font-bold mb-1 text-sm">
                        Edad: {formatAgeDisplay(label)}
                      </p>
                      {pp && (
                        <p
                          className="text-sm font-bold mb-1"
                          style={{ color: colors.line }}
                        >
                          ● Paciente: {pp.value} {unit}
                        </p>
                      )}
                      <div className="text-muted-foreground space-y-0.5 font-mono">
                        {activeCurves.map((c) => (
                          <p
                            key={c.key}
                            className={
                              c.isBold
                                ? "font-bold text-foreground"
                                : ""
                            }
                          >
                            {c.label}: {data[c.key]?.toFixed(1)} {unit}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                }}
              />

              {/* Percentile curves */}
              {activeCurves.map((curve) => (
                <Line
                  key={curve.key}
                  type="monotone"
                  dataKey={curve.key}
                  stroke={curve.isBold ? lineColor : lineFaded}
                  strokeWidth={curve.width}
                  strokeDasharray={curve.dash || undefined}
                  dot={getDotRenderer(curve)}
                  activeDot={false}
                  isAnimationActive={false}
                />
              ))}

              {/* Patient line with draggable points */}
              <Line
                type="monotone"
                data={patientPoints}
                dataKey="value"
                stroke={colors.line}
                strokeWidth={2.5}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (
                    !payload ||
                    cx === undefined ||
                    cy === undefined
                  )
                    return <g />;
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
                      onValueChange={
                        onUpdateValue ? handleValueChange : undefined
                      }
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

              {/* Custom annotations */}
              {annotations?.map((ann, i) => (
                <ReferenceLine
                  key={`ann-${i}`}
                  x={ann.x}
                  stroke="none"
                  ifOverflow="extendDomain"
                >
                  <Label
                    value={ann.text}
                    position="insideBottom"
                    offset={ann.yOffset || 15}
                    style={{
                      fontSize: ann.fontSize || 11,
                      fontWeight: 700,
                      fill: lineColor,
                      fontStyle: "italic",
                    }}
                  />
                </ReferenceLine>
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-3 text-xs flex-wrap">
          <span
            className="flex items-center gap-1.5 font-semibold"
            style={{ color: colors.line }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors.line }}
            />
            Paciente
          </span>
          {activeCurves.map((c) => (
            <span
              key={c.key}
              className={`flex items-center gap-1 ${c.isBold ? "text-foreground font-bold" : "text-muted-foreground"}`}
            >
              <div
                className="w-5 h-0"
                style={{
                  borderBottom: `${c.width}px ${c.dash ? "dashed" : "solid"} ${c.isBold ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}`,
                }}
              />
              <span className="font-serif font-bold">{c.label}</span>
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
