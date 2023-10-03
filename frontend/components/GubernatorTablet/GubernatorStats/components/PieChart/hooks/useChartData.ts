import useInspectionStatistics from "@api/hooks/inspections/useInspectionStatistics";
import { ChartData, ChartOptions } from "chart.js";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

const blueColor = "rgb(4, 223, 255)";
const yellowColor = "rgb(255, 230, 31)";
const redColor = "rgb(255, 31, 138)";

export function useChartData() {
  const { data: _stats } = useInspectionStatistics();
  const { t } = useTranslation("admin");

  const data: ChartData<"pie"> = useMemo(
    () => ({
      labels: [t("stats.ok"), t("stats.warning"), t("stats.danger")],
      datasets: [
        {
          data: [
            _stats?.ok_inspections_count ?? 0,
            _stats?.warn_inspections_count ?? 0,
            _stats?.danger_inspections_count ?? 0,
          ],
          backgroundColor: [blueColor, yellowColor, redColor],
          hoverBackgroundColor: [blueColor, yellowColor, redColor],
          borderWidth: 0,
          hoverOffset: 0,
        },
      ],
    }),
    [_stats, t]
  );

  const options: ChartOptions<"pie"> = {
    rotation: 90,
    plugins: {
      legend: {
        labels: {
          color: blueColor,
        },
      },
      datalabels: {
        color: "black",
        formatter(value, _) {
          try {
            const new_value = parseFloat(value).toFixed(2);
            return new_value;
          } catch {
            return value;
          }
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return { data, options };
}
