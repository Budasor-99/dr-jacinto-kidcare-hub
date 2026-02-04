import { useState, useCallback, useEffect, useRef } from "react";

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
}: DraggablePointProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentY, setCurrentY] = useState(cy);
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Reset position when cy prop changes (external update)
  useEffect(() => {
    if (!isDragging) {
      setCurrentY(cy);
    }
  }, [cy, isDragging]);

  // Convert Y pixel position to data value
  const yToValue = useCallback(
    (yPixel: number): number => {
      const [minVal, maxVal] = yDomain;
      // Invert because SVG Y goes down
      const ratio = (yPixel - chartTop) / chartHeight;
      const value = maxVal - ratio * (maxVal - minVal);
      // Clamp to domain
      return Math.max(minVal, Math.min(maxVal, value));
    },
    [chartTop, chartHeight, yDomain]
  );

  // Convert data value to Y pixel position
  const valueToY = useCallback(
    (value: number): number => {
      const [minVal, maxVal] = yDomain;
      const ratio = (maxVal - value) / (maxVal - minVal);
      return chartTop + ratio * chartHeight;
    },
    [chartTop, chartHeight, yDomain]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGCircleElement>) => {
      if (!payload?.controlId || !onValueChange) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDisplayValue(payload.value);

      // Get SVG element for coordinate transformation
      const svg = (e.target as SVGCircleElement).ownerSVGElement;
      if (svg) {
        svgRef.current = svg;
      }
    },
    [payload, onValueChange]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<SVGCircleElement>) => {
      if (!payload?.controlId || !onValueChange) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDisplayValue(payload.value);

      const svg = (e.target as SVGCircleElement).ownerSVGElement;
      if (svg) {
        svgRef.current = svg;
      }
    },
    [payload, onValueChange]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;

      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());

      // Clamp Y within chart bounds
      const clampedY = Math.max(chartTop, Math.min(chartTop + chartHeight, svgP.y));
      setCurrentY(clampedY);
      setDisplayValue(Math.round(yToValue(clampedY) * 100) / 100);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!svgRef.current || e.touches.length === 0) return;

      const touch = e.touches[0];
      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = touch.clientX;
      pt.y = touch.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());

      const clampedY = Math.max(chartTop, Math.min(chartTop + chartHeight, svgP.y));
      setCurrentY(clampedY);
      setDisplayValue(Math.round(yToValue(clampedY) * 100) / 100);
    };

    const handleEnd = () => {
      if (payload?.controlId && onValueChange && displayValue !== null) {
        onValueChange(payload.controlId, displayValue);
      }
      setIsDragging(false);
      setDisplayValue(null);
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
  }, [isDragging, chartTop, chartHeight, yToValue, payload, onValueChange, displayValue]);

  if (!payload?.controlId) {
    // Non-interactive point (reference data)
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={color}
        stroke="#fff"
        strokeWidth={2}
      />
    );
  }

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
            stroke={color}
            strokeWidth={1}
            strokeDasharray="4 2"
            opacity={0.6}
          />
          {/* Value tooltip */}
          <g transform={`translate(${cx + 15}, ${currentY})`}>
            <rect
              x={0}
              y={-12}
              width={60}
              height={24}
              rx={4}
              fill="hsl(var(--background))"
              stroke="hsl(var(--border))"
              strokeWidth={1}
            />
            <text
              x={30}
              y={4}
              textAnchor="middle"
              fontSize={12}
              fontWeight="bold"
              fill={color}
            >
              {displayValue} {unit}
            </text>
          </g>
        </>
      )}

      {/* Drop shadow when dragging */}
      {isDragging && (
        <circle
          cx={cx}
          cy={currentY}
          r={14}
          fill={color}
          opacity={0.2}
        />
      )}

      {/* Main draggable point */}
      <circle
        cx={cx}
        cy={currentY}
        r={isDragging ? 10 : 6}
        fill={color}
        stroke="#fff"
        strokeWidth={2}
        cursor="ns-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          transition: isDragging ? "none" : "r 0.15s ease-out, cy 0.15s ease-out",
          filter: isDragging ? "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" : "none",
        }}
      />

      {/* Drag indicator arrows */}
      {!isDragging && payload?.controlId && (
        <g opacity={0} className="hover-show" style={{ pointerEvents: "none" }}>
          <text
            x={cx}
            y={currentY - 12}
            textAnchor="middle"
            fontSize={10}
            fill={color}
          >
            ▲
          </text>
          <text
            x={cx}
            y={currentY + 16}
            textAnchor="middle"
            fontSize={10}
            fill={color}
          >
            ▼
          </text>
        </g>
      )}
    </g>
  );
};
