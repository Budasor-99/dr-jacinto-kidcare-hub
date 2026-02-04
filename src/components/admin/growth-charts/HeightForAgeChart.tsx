import { useMemo } from "react";
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
  Scatter,
} from "recharts";
import { heightForAgeBoys } from "@/lib/growth-data/who-height-boys";
import { heightForAgeGirls } from "@/lib/growth-data/who-height-girls";
import {
  getChartColors,
  getPercentileStatus,
  getRefDataForMonth,
  getStatusColor,
  getStatusBgColor,
  formatAgeDisplay,
} from "@/lib/growth-data/growth-utils";
import type { MedicalControlData } from "./GrowthChartsTab";

interface HeightForAgeChartProps {
  controls: MedicalControlData[];
  sex: "M" | "F";
  loading: boolean;
}

export const HeightForAgeChart = ({
  controls,
  sex,
  loading,
}: HeightForAgeChartProps) => {
  const referenceData = sex === "M" ? heightForAgeBoys : heightForAgeGirls;
  const colors = getChartColors(sex);

  const chartData = useMemo(() => {
    return referenceData.map((ref) => {
      const patientPoint = controls.find(
        (c) =>
          c.ageInMonths !== undefined &&
          Math.abs(c.ageInMonths - ref.month) < 0.5 &&
          c.height
      );

      return {
        month: ref.month,
        p3: ref.p3,
        p15: ref.p15,
        p50: ref.p50,
        p85: ref.p85,
        p97: ref.p97,
        patientHeight: patientPoint ? parseFloat(patientPoint.height!) : undefined,
      };
    });
  }, [referenceData, controls]);

  const patientPoints = useMemo(() => {
    return controls
      .filter((c) => c.ageInMonths !== undefined && c.height)
      .map((c) => ({
        month: c.ageInMonths!,
        height: parseFloat(c.height!),
        date: c.control_date,
      }));
  }, [controls]);

  const latestStatus = useMemo(() => {
    const validControls = controls.filter(
      (c) => c.ageInMonths !== undefined && c.height
    );
    if (validControls.length === 0) return null;

    const latest = validControls[validControls.length - 1];
    const refData = getRefDataForMonth(latest.ageInMonths!, referenceData);
    if (!refData) return null;

    return getPercentileStatus(parseFloat(latest.height!), refData);
  }, [controls, referenceData]);

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
            Talla para la Edad ({sex === "M" ? "Niño" : "Niña"})
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
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => `${value}m`}
                label={{ value: "Edad (meses)", position: "bottom", offset: -5 }}
              />
              <YAxis
                label={{ value: "Talla (cm)", angle: -90, position: "insideLeft" }}
                domain={["auto", "auto"]}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0]?.payload;
                  return (
                    <div className="bg-background border rounded-lg p-3 shadow-lg">
                      <p className="font-medium mb-1">Edad: {formatAgeDisplay(label)}</p>
                      {data.patientHeight !== undefined && (
                        <p className="text-sm" style={{ color: colors.line }}>
                          <strong>Paciente: {data.patientHeight} cm</strong>
                        </p>
                      )}
                      <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        <p>P97: {data.p97} cm</p>
                        <p>P85: {data.p85} cm</p>
                        <p>P50: {data.p50} cm</p>
                        <p>P15: {data.p15} cm</p>
                        <p>P3: {data.p3} cm</p>
                      </div>
                    </div>
                  );
                }}
              />

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

              <Line
                type="monotone"
                dataKey="p50"
                stroke={colors.primary}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />

              {patientPoints.length > 0 && (
                <Scatter
                  data={patientPoints}
                  dataKey="height"
                  fill={colors.line}
                  shape="circle"
                  name="Paciente"
                />
              )}

              <Line
                type="monotone"
                data={patientPoints}
                dataKey="height"
                stroke={colors.line}
                strokeWidth={2}
                dot={{ fill: colors.line, strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8 }}
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
