import { useState, useCallback, useEffect, useRef } from "react";
import {
  getPercentileStatus,
  getRefDataForMonth,
  getStatusColor,
  getStatusBgColor,
  getNutritionalDiagnosis,
  formatAgeDisplay,
  type PercentileStatus,
  type MeasurementType,
  type NutritionalDiagnosis,
} from "@/lib/growth-data/growth-utils";

interface DraggablePointProps {
  cx: number;
  cy: number;
  payload?: {
    controlId: string;
    value: number;
    month: number;
  };
  chartTop: number;
  chartHeight: number;
  chartLeft: number;
  chartWidth: number;
  yDomain: [number, number];
  xDomain: [number, number];
  onValueChange?: (controlId: string, newValue: number, newMonth: number) => void;
  color: string;
  unit: string;
  referenceData?: Array<{ month: number; p3: number; p15: number; p50: number; p85: number; p97: number }>;
  measurementType?: MeasurementType;
}

export const DraggablePoint = ({
  cx,
  cy,
  payload,
  chartTop,
  chartHeight,
  chartLeft,
  chartWidth,
  yDomain,
  xDomain,
  onValueChange,
  color,
  unit,
  referenceData,
  measurementType = "weight",
}: DraggablePointProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentX, setCurrentX] = useState(cx);
  const [currentY, setCurrentY] = useState(cy);
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const [displayMonth, setDisplayMonth] = useState<number | null>(null);
  const [dragStatus, setDragStatus] = useState<{ status: PercentileStatus; percentile: number } | null>(null);
  const [dragDiagnosis, setDragDiagnosis] = useState<NutritionalDiagnosis | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!isDragging) {
      setCurrentX(cx);
      setCurrentY(cy);
    }
  }, [cx, cy, isDragging]);

  const yToValue = useCallback(
    (yPixel: number): number => {
      const [minVal, maxVal] = yDomain;
      const ratio = (yPixel - chartTop) / chartHeight;
      return Math.max(minVal, Math.min(maxVal, maxVal - ratio * (maxVal - minVal)));
    },
    [chartTop, chartHeight, yDomain]
  );

  const xToMonth = useCallback(
    (xPixel: number): number => {
      const [minM, maxM] = xDomain;
      const ratio = (xPixel - chartLeft) / chartWidth;
      return Math.max(minM, Math.min(maxM, minM + ratio * (maxM - minM)));
    },
    [chartLeft, chartWidth, xDomain]
  );

  const computeStatus = useCallback(
    (value: number, month: number) => {
      if (!referenceData) return null;
      const refData = getRefDataForMonth(month, referenceData);
      if (!refData) return null;
      const dx = getNutritionalDiagnosis(value, refData, measurementType);
      setDragDiagnosis(dx);
      return getPercentileStatus(value, refData);
    },
    [referenceData, measurementType]
  );

  const startDrag = useCallback(
    (svg: SVGSVGElement | null) => {
      if (!payload?.controlId || !onValueChange) return;
      setIsDragging(true);
      setDisplayValue(payload.value);
      setDisplayMonth(payload.month);
      const status = computeStatus(payload.value, payload.month);
      if (status) setDragStatus({ status: status.status, percentile: status.percentile });
      if (svg) svgRef.current = svg;
    },
    [payload, onValueChange, computeStatus]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGCircleElement>) => {
      e.preventDefault();
      e.stopPropagation();
      startDrag((e.target as SVGCircleElement).ownerSVGElement);
    },
    [startDrag]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<SVGCircleElement>) => {
      e.preventDefault();
      e.stopPropagation();
      startDrag((e.target as SVGCircleElement).ownerSVGElement);
    },
    [startDrag]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      if (!svgRef.current) return;
      const pt = svgRef.current.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const svgP = pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse());

      const clampedY = Math.max(chartTop, Math.min(chartTop + chartHeight, svgP.y));
      const clampedX = Math.max(chartLeft, Math.min(chartLeft + chartWidth, svgP.x));
      setCurrentY(clampedY);
      setCurrentX(clampedX);

      const newValue = Math.round(yToValue(clampedY) * 100) / 100;
      const newMonth = Math.round(xToMonth(clampedX) * 10) / 10;
      setDisplayValue(newValue);
      setDisplayMonth(newMonth);

      const status = computeStatus(newValue, newMonth);
      if (status) setDragStatus({ status: status.status, percentile: status.percentile });
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleEnd = () => {
      if (payload?.controlId && onValueChange && displayValue !== null && displayMonth !== null) {
        onValueChange(payload.controlId, displayValue, displayMonth);
      }
      setIsDragging(false);
      setDisplayValue(null);
      setDisplayMonth(null);
      setDragStatus(null);
      setDragDiagnosis(null);
      setDragStatus(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, chartTop, chartHeight, chartLeft, chartWidth, yToValue, xToMonth, payload, onValueChange, displayValue, displayMonth, computeStatus]);

  if (!payload?.controlId) {
    return <circle cx={cx} cy={cy} r={5} fill={color} stroke="#fff" strokeWidth={2} />;
  }

  const tooltipBg = isDragging && dragStatus ? getStatusBgColor(dragStatus.status) : "hsl(var(--background))";
  const tooltipBorder = isDragging && dragStatus ? getStatusColor(dragStatus.status) : "hsl(var(--border))";

  return (
    <g>
      {isDragging && (
        <>
          {/* Crosshair lines */}
          <line x1={chartLeft} y1={currentY} x2={currentX} y2={currentY}
            stroke={tooltipBorder} strokeWidth={1} strokeDasharray="4 2" opacity={0.6} />
          <line x1={currentX} y1={chartTop + chartHeight} x2={currentX} y2={currentY}
            stroke={tooltipBorder} strokeWidth={1} strokeDasharray="4 2" opacity={0.6} />

          {/* Tooltip */}
          <g transform={`translate(${currentX + 15}, ${currentY - 15})`}>
            <rect x={0} y={-22} width={120} height={dragDiagnosis ? 68 : 52} rx={6}
              fill={tooltipBg} stroke={tooltipBorder} strokeWidth={1.5} />
            <text x={60} y={-6} textAnchor="middle" fontSize={12} fontWeight="bold"
              fill={dragStatus ? getStatusColor(dragStatus.status) : color}>
              {displayValue} {unit}
            </text>
            <text x={60} y={10} textAnchor="middle" fontSize={10} fill="hsl(var(--muted-foreground))">
              {displayMonth !== null ? formatAgeDisplay(displayMonth) : ""}
            </text>
            {dragStatus && (
              <text x={60} y={24} textAnchor="middle" fontSize={10} fontWeight="600"
                fill={getStatusColor(dragStatus.status)}>
                P{dragStatus.percentile}
              </text>
            )}
            {dragDiagnosis && (
              <text x={60} y={40} textAnchor="middle" fontSize={9} fontWeight="700"
                fill={dragDiagnosis.color}>
                {dragDiagnosis.diagnosis}
              </text>
            )}
          </g>
        </>
      )}

      {isDragging && (
        <circle cx={currentX} cy={currentY} r={14} fill={tooltipBorder} opacity={0.2} />
      )}

      <circle
        cx={currentX}
        cy={currentY}
        r={isDragging ? 10 : 7}
        fill={color}
        stroke="#fff"
        strokeWidth={3}
        cursor="move"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          transition: isDragging ? "none" : "r 0.15s ease-out",
          filter: isDragging ? "drop-shadow(0 2px 6px rgba(0,0,0,0.35))" : "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
        }}
      />

      {!isDragging && payload && (
        <text x={currentX} y={currentY + 20} textAnchor="middle" fontSize={9}
          fill="hsl(var(--muted-foreground))" style={{ pointerEvents: "none" }}>
          {formatAgeDisplay(payload.month)}
        </text>
      )}
    </g>
  );
};
