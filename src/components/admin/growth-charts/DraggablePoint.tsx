import { useState, useCallback, useEffect, useRef } from "react";
import {
  getPercentileStatus,
  getRefDataForMonth,
  getStatusColor,
  getStatusBgColor,
  formatAgeDisplay,
  type PercentileStatus,
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
  yDomain: [number, number];
  onValueChange?: (controlId: string, newValue: number) => void;
  color: string;
  unit: string;
  referenceData?: Array<{ month: number; p3: number; p15: number; p50: number; p85: number; p97: number }>;
}

export const DraggablePoint = ({
  cx,
  cy,
  payload,
  chartTop,
  chartHeight,
  yDomain,
  onValueChange,
  color,
  unit,
  referenceData,
}: DraggablePointProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentY, setCurrentY] = useState(cy);
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const [dragStatus, setDragStatus] = useState<{ status: PercentileStatus; percentile: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!isDragging) setCurrentY(cy);
  }, [cy, isDragging]);

  const yToValue = useCallback(
    (yPixel: number): number => {
      const [minVal, maxVal] = yDomain;
      const ratio = (yPixel - chartTop) / chartHeight;
      const value = maxVal - ratio * (maxVal - minVal);
      return Math.max(minVal, Math.min(maxVal, value));
    },
    [chartTop, chartHeight, yDomain]
  );

  // Compute percentile status for a given value
  const computeStatus = useCallback(
    (value: number) => {
      if (!referenceData || !payload) return null;
      const refData = getRefDataForMonth(payload.month, referenceData);
      if (!refData) return null;
      return getPercentileStatus(value, refData);
    },
    [referenceData, payload]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGCircleElement>) => {
      if (!payload?.controlId || !onValueChange) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDisplayValue(payload.value);
      const status = computeStatus(payload.value);
      if (status) setDragStatus({ status: status.status, percentile: status.percentile });

      const svg = (e.target as SVGCircleElement).ownerSVGElement;
      if (svg) svgRef.current = svg;
    },
    [payload, onValueChange, computeStatus]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<SVGCircleElement>) => {
      if (!payload?.controlId || !onValueChange) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDisplayValue(payload.value);
      const status = computeStatus(payload.value);
      if (status) setDragStatus({ status: status.status, percentile: status.percentile });

      const svg = (e.target as SVGCircleElement).ownerSVGElement;
      if (svg) svgRef.current = svg;
    },
    [payload, onValueChange, computeStatus]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      if (!svgRef.current) return;
      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
      const clampedY = Math.max(chartTop, Math.min(chartTop + chartHeight, svgP.y));
      setCurrentY(clampedY);
      const newValue = Math.round(yToValue(clampedY) * 100) / 100;
      setDisplayValue(newValue);
      const status = computeStatus(newValue);
      if (status) setDragStatus({ status: status.status, percentile: status.percentile });
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleEnd = () => {
      if (payload?.controlId && onValueChange && displayValue !== null) {
        onValueChange(payload.controlId, displayValue);
      }
      setIsDragging(false);
      setDisplayValue(null);
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
  }, [isDragging, chartTop, chartHeight, yToValue, payload, onValueChange, displayValue, computeStatus]);

  if (!payload?.controlId) {
    return (
      <circle cx={cx} cy={cy} r={5} fill={color} stroke="#fff" strokeWidth={2} />
    );
  }

  // Status-based colors for tooltip
  const tooltipBg = isDragging && dragStatus
    ? getStatusBgColor(dragStatus.status)
    : "hsl(var(--background))";
  const tooltipBorder = isDragging && dragStatus
    ? getStatusColor(dragStatus.status)
    : "hsl(var(--border))";

  return (
    <g>
      {/* Horizontal guide line while dragging */}
      {isDragging && (
        <>
          <line
            x1={0}
            y1={currentY}
            x2={cx}
            y2={currentY}
            stroke={tooltipBorder}
            strokeWidth={1}
            strokeDasharray="4 2"
            opacity={0.6}
          />
          {/* Enhanced tooltip with percentile */}
          <g transform={`translate(${cx + 15}, ${currentY})`}>
            <rect
              x={0}
              y={-20}
              width={90}
              height={40}
              rx={6}
              fill={tooltipBg}
              stroke={tooltipBorder}
              strokeWidth={1.5}
            />
            <text
              x={45}
              y={-4}
              textAnchor="middle"
              fontSize={12}
              fontWeight="bold"
              fill={dragStatus ? getStatusColor(dragStatus.status) : color}
            >
              {displayValue} {unit}
            </text>
            {dragStatus && (
              <text
                x={45}
                y={12}
                textAnchor="middle"
                fontSize={10}
                fontWeight="600"
                fill={getStatusColor(dragStatus.status)}
              >
                P{dragStatus.percentile}
              </text>
            )}
          </g>
        </>
      )}

      {/* Drop shadow when dragging */}
      {isDragging && (
        <circle cx={cx} cy={currentY} r={14} fill={tooltipBorder} opacity={0.2} />
      )}

      {/* Main draggable point */}
      <circle
        cx={cx}
        cy={currentY}
        r={isDragging ? 10 : 7}
        fill={color}
        stroke="#fff"
        strokeWidth={3}
        cursor="ns-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          transition: isDragging ? "none" : "r 0.15s ease-out, cy 0.15s ease-out",
          filter: isDragging ? "drop-shadow(0 2px 6px rgba(0,0,0,0.35))" : "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
        }}
      />

      {/* Age label below point when not dragging */}
      {!isDragging && payload && (
        <text
          x={cx}
          y={currentY + 20}
          textAnchor="middle"
          fontSize={9}
          fill="hsl(var(--muted-foreground))"
          style={{ pointerEvents: "none" }}
        >
          {formatAgeDisplay(payload.month)}
        </text>
      )}
    </g>
  );
};
