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
  Customized,
} from "recharts";
import {
  getChartColors,
  getPercentileStatus,
  getRefDataForMonth,
  getStatusColor,
  getStatusBgColor,
  getNutritionalDiagnosis,
  formatAgeDisplay,
  type MeasurementType,
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

export interface ZoneLabelDefinition {
  letter: string;
  label: string;
  /** Key of the curve ABOVE the zone (undefined = top of chart) */
  upperKey?: string;
  /** Key of the curve BELOW the zone (undefined = bottom of chart) */
  lowerKey?: string;
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
  onUpdateValue?: (controlId: string, newValue: number, newMonth?: number) => void;
  annotations?: ChartAnnotation[];
  yMinorInterval?: number;
  yTickInterval?: number;
  yDomainFixed?: [number, number];
  xTickInterval?: number;
  labelMonth?: number;
  curves?: CurveDefinition[];
  labelMode?: "on-curve" | "right-numbers";
  measurementType?: MeasurementType;
  computeExtraFields?: (ref: {
    p3: number;
    p15: number;
    p50: number;
    p85: number;
    p97: number;
  }) => Record<string, number>;
  /** Zone labels A-F rendered between curves */
  zoneLabels?: ZoneLabelDefinition[];
}

const DEFAULT_CURVES: CurveDefinition[] = [
  { key: "p97", label: "P97", dash: "", width: 1.8 },
  { key: "p85", label: "P85", dash: "", width: 1.5 },
  { key: "p50", label: "P50", dash: "", width: 2.5, isBold: true },
  { key: "p15", label: "P15", dash: "8 4", width: 1.5 },
  { key: "p3", label: "P3", dash: "4 3", width: 1.2 },
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
  yTickInterval,
  yDomainFixed,
  xTickInterval,
  labelMonth,
  curves,
  labelMode = "on-curve",
  measurementType = "weight",
  computeExtraFields,
  zoneLabels,
}: GrowthChartBaseProps) => {
  const colors = getChartColors(sex);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({
    top: 10,
    height: 440,
    left: 40,
    width: 600,
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
          const plotArea = svg.querySelector(".recharts-cartesian-grid");
          if (plotArea) {
            const plotRect = plotArea.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();
            setChartDimensions({
              top: plotRect.top - svgRect.top,
              height: plotRect.height,
              left: plotRect.left - svgRect.left,
              width: plotRect.width,
            });
          } else {
            const rect = svg.getBoundingClientRect();
            setChartDimensions({ top: 10, height: rect.height - 60, left: 40, width: rect.width - 55 });
          }
        }
      }
    };
    const timer = setTimeout(updateDimensions, 100);
    window.addEventListener("resize", updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateDimensions);
    };
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

  // Build chart data merging reference + patient points into a single array
  const chartData = useMemo(() => {
    const refMap = new Map<number, Record<string, number>>();
    filteredRefData.forEach((ref) => {
      const base: Record<string, number> = {
        month: ref.month,
        p3: ref.p3,
        p15: ref.p15,
        p50: ref.p50,
        p85: ref.p85,
        p97: ref.p97,
      };
      if (computeExtraFields) {
        Object.assign(base, computeExtraFields(ref));
      }
      refMap.set(ref.month, base);
    });

    const validPoints = controls
      .filter(
        (c) =>
          c.ageInMonths !== undefined &&
          c[valueField] &&
          c.ageInMonths >= xDomain[0] &&
          c.ageInMonths <= xDomain[1]
      )
      .map((c) => ({
        month: c.ageInMonths!,
        value: parseFloat(c[valueField]!),
        controlId: c.id,
        date: c.control_date,
      }));

    validPoints.forEach((pt) => {
      const existing = refMap.get(pt.month);
      if (existing) {
        existing.patientValue = pt.value;
        existing.controlId = pt.controlId as any;
        existing.patientDate = pt.date as any;
      } else {
        // Interpolate reference values for fractional months
        const floorMonth = Math.floor(pt.month);
        const ceilMonth = Math.ceil(pt.month);
        const floorData = refMap.get(floorMonth);
        const ceilData = refMap.get(ceilMonth);
        
        const entry: Record<string, any> = { month: pt.month, patientValue: pt.value, controlId: pt.controlId, patientDate: pt.date };
        
        if (floorData && ceilData && floorMonth !== ceilMonth) {
          const fraction = pt.month - floorMonth;
          for (const key of Object.keys(floorData)) {
            if (key !== 'month' && typeof floorData[key] === 'number' && typeof ceilData[key] === 'number') {
              entry[key] = floorData[key] + (ceilData[key] - floorData[key]) * fraction;
            }
          }
        } else if (floorData) {
          for (const key of Object.keys(floorData)) {
            if (key !== 'month') entry[key] = floorData[key];
          }
        }
        
        refMap.set(pt.month, entry);
      }
    });

    return Array.from(refMap.values()).sort((a, b) => a.month - b.month);
  }, [filteredRefData, computeExtraFields, controls, valueField, xDomain]);

  const yDomain = useMemo(() => {
    const fullMax = defaultMaxMonths || 60;
    const isFullRange = xDomain[1] >= fullMax;

    // Use fixed domain only when showing the full range
    if (yDomainFixed && isFullRange) return yDomainFixed;

    // When zoomed in, compute Y domain from visible data for correct proportions
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
    if (allValues.length === 0) return yDomainFixed || ([0, 20] as [number, number]);
    const step = yTickInterval || 1;
    const min = Math.floor(Math.min(...allValues) / step) * step;
    const max = Math.ceil(Math.max(...allValues) / step) * step;
    return [Math.max(0, min - step), max + step] as [number, number];
  }, [chartData, controls, valueField, xDomain, activeCurves, yDomainFixed, yTickInterval, defaultMaxMonths]);

  const effectiveLabelMonth = labelMonth ?? Math.round(xDomain[1] * 0.75);

  const patientPoints = useMemo(() => {
    return chartData.filter((d) => d.patientValue !== undefined);
  }, [chartData]);

  const latestDiagnosis = useMemo(() => {
    const valid = controls.filter(
      (c) => c.ageInMonths !== undefined && c[valueField]
    );
    if (valid.length === 0) return null;
    const latest = valid[valid.length - 1];
    const refData = getRefDataForMonth(latest.ageInMonths!, referenceData);
    if (!refData) return null;
    const pStatus = getPercentileStatus(parseFloat(latest[valueField]!), refData);
    const dx = getNutritionalDiagnosis(parseFloat(latest[valueField]!), refData, measurementType);
    return { ...pStatus, dx };
  }, [controls, referenceData, valueField, measurementType]);

  const handleValueChange = (controlId: string, newValue: number, newMonth?: number) => {
    if (onUpdateValue) onUpdateValue(controlId, newValue, newMonth);
  };

  const monthTicks = useMemo(() => {
    const [min, max] = xDomain;
    const interval = xTickInterval || 1;
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
  // When zoneLabels are provided, don't render letter labels on curves
  const makeOnCurveDot =
    (label: string, hasZones: boolean) =>
    (props: any) => {
      const { cx, cy, payload } = props;
      if (!payload || cx === undefined || cy === undefined) return <g />;
      // If zone labels are provided, skip on-curve labels entirely
      if (hasZones) return <g />;
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

  const makeRightLabelDot =
    (label: string) =>
    (props: any) => {
      const { cx, cy, payload, index } = props;
      if (!payload || cx === undefined || cy === undefined) return <g />;
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
    return makeOnCurveDot(curve.label, !!zoneLabels);
  };

  // ── ZONE LABEL RENDERER (SVG Customized) ────────────────────
  const ZoneLabelsRenderer = useMemo(() => {
    if (!zoneLabels || zoneLabels.length === 0) return null;
    
    // Find the reference data entry closest to labelMonth for positioning
    const refEntry = chartData.find(d => d.month === effectiveLabelMonth) 
      || chartData.reduce((closest, d) => 
          Math.abs(d.month - effectiveLabelMonth) < Math.abs(closest.month - effectiveLabelMonth) ? d : closest
        , chartData[0]);
    
    if (!refEntry) return null;

    return (props: any) => {
      const { xAxisMap, yAxisMap } = props;
      if (!xAxisMap || !yAxisMap) return null;
      const xAxis = Object.values(xAxisMap)[0] as any;
      const yAxis = Object.values(yAxisMap)[0] as any;
      if (!xAxis?.scale || !yAxis?.scale) return null;

      const xPos = xAxis.scale(effectiveLabelMonth);
      const MIN_GAP = 22; // minimum pixels between zone labels

      // First pass: compute raw Y positions
      const rawPositions = zoneLabels.map((zone) => {
        const upperVal = zone.upperKey === undefined 
          ? yDomain[1] 
          : refEntry[zone.upperKey];
        const lowerVal = zone.lowerKey === undefined 
          ? yDomain[0] 
          : refEntry[zone.lowerKey];
        
        if (upperVal === undefined || lowerVal === undefined) return null;
        
        const midVal = (upperVal + lowerVal) / 2;
        const yPos = yAxis.scale(midVal);
        
        if (yPos === undefined || isNaN(yPos)) return null;
        return { zone, yPos };
      }).filter(Boolean) as Array<{ zone: ZoneLabelDefinition; yPos: number }>;

      // Second pass: resolve overlaps (labels are sorted top-to-bottom, yPos increases downward)
      const adjusted = [...rawPositions];
      for (let i = 1; i < adjusted.length; i++) {
        const prev = adjusted[i - 1];
        const curr = adjusted[i];
        if (curr.yPos - prev.yPos < MIN_GAP) {
          curr.yPos = prev.yPos + MIN_GAP;
        }
      }

      return (
        <g>
          {adjusted.map(({ zone, yPos }) => (
            <g key={zone.letter}>
              <rect
                x={xPos - 10}
                y={yPos - 9}
                width={20}
                height={18}
                rx={3}
                fill="hsl(var(--background))"
                fillOpacity={0.85}
              />
              <text
                x={xPos}
                y={yPos + 5}
                textAnchor="middle"
                fontSize={14}
                fontWeight="bold"
                fill={lineColor}
                style={{ fontFamily: "serif" }}
              >
                {zone.letter}
              </text>
            </g>
          ))}
        </g>
      );
    };
  }, [zoneLabels, chartData, effectiveLabelMonth, yDomain, lineColor]);

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
            {latestDiagnosis && (
              <Badge
                style={{
                  backgroundColor: latestDiagnosis.dx.bgColor,
                  color: latestDiagnosis.dx.color,
                  borderColor: latestDiagnosis.dx.color,
                }}
                variant="outline"
              >
                Zona {latestDiagnosis.dx.zone} — {latestDiagnosis.dx.diagnosis}
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
            💡 Arrastra los puntos libremente para ajustar valor y edad
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
              {/* Dense clinical grid — every month vertically, minor intervals horizontally */}
              <CartesianGrid
                strokeDasharray="1 3"
                stroke={gridColor}
                strokeOpacity={0.4}
                verticalCoordinatesGenerator={({ xAxis }) => {
                  if (!xAxis) return [];
                  const { scale, domain } = xAxis as any;
                  if (!scale || !domain) return [];
                  const [minX, maxX] = domain;
                  const coords: number[] = [];
                  for (let m = Math.ceil(minX); m <= maxX; m += 1) {
                    const x = scale(m);
                    if (x !== undefined) coords.push(x);
                  }
                  return coords;
                }}
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
                tickFormatter={(v) => {
                  if (v === 0) return "0";
                  const monthInYear = v % 12;
                  return monthInYear === 0 ? "12" : `${monthInYear}`;
                }}
                tick={{ fontSize: 9, fill: lineColor, fontWeight: 600 }}
                axisLine={{ stroke: lineColor, strokeWidth: 1.5 }}
                tickLine={{ stroke: lineColor }}
              >
                <Label
                  value="EDAD EN MESES"
                  position="bottom"
                  offset={8}
                  style={{
                    fontSize: "11px",
                    fill: lineColor,
                    fontWeight: 700,
                  }}
                />
              </XAxis>

              <YAxis
                domain={yDomain}
                ticks={yTickInterval ? (() => {
                  const ticks: number[] = [];
                  for (let v = yDomain[0]; v <= yDomain[1]; v += yTickInterval) ticks.push(v);
                  return ticks;
                })() : undefined}
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
                  const pp = data.patientValue !== undefined ? data : null;
                  const ppVal = pp?.patientValue;
                  return (
                    <div className="bg-background border-2 border-foreground/20 rounded-lg p-3 shadow-lg text-xs">
                      <p className="font-bold mb-1 text-sm">
                        Edad: {formatAgeDisplay(label)}
                      </p>
                      {ppVal !== undefined && (
                        <p
                          className="text-sm font-bold mb-1"
                          style={{ color: colors.line }}
                        >
                          ● Paciente: {ppVal} {unit}
                        </p>
                      )}
                      <div className="text-muted-foreground space-y-0.5 font-mono">
                        {activeCurves.map((c) => (
                          data[c.key] !== undefined ? (
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
                          ) : null
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

              {/* Patient line */}
              <Line
                type="monotone"
                dataKey="patientValue"
                stroke={colors.line}
                strokeWidth={2.5}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (
                    !payload ||
                    payload.patientValue === undefined ||
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
                        value: payload.patientValue,
                        month: payload.month,
                      }}
                      chartTop={chartDimensions.top}
                      chartHeight={chartDimensions.height}
                      chartLeft={chartDimensions.left}
                      chartWidth={chartDimensions.width}
                      yDomain={yDomain}
                      xDomain={xDomain}
                      onValueChange={
                        onUpdateValue ? handleValueChange : undefined
                      }
                      color={colors.line}
                      unit={unit}
                      referenceData={referenceData}
                      measurementType={measurementType}
                    />
                  );
                }}
                activeDot={false}
                connectNulls
                isAnimationActive={false}
              />

              {/* Zone labels A-F rendered between curves */}
              {ZoneLabelsRenderer && (
                <Customized component={ZoneLabelsRenderer} />
              )}

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
          {zoneLabels ? (
            /* Zone-based legend */
            <>
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
                  {c.label}
                </span>
              ))}
              <span className="text-muted-foreground">|</span>
              {zoneLabels.map((z) => (
                <span key={z.letter} className="text-muted-foreground">
                  <span className="font-serif font-bold">{z.letter}</span>={z.label}
                </span>
              ))}
            </>
          ) : (
            /* Original curve-based legend */
            activeCurves.map((c) => (
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
