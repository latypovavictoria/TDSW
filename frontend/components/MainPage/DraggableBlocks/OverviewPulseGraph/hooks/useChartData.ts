import { ChartData, ChartOptions } from "chart.js";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

import useInspectionList from "@api/hooks/inspections/useInspectionList";

import { PulseGraphData } from "redux/reducers/inspections/inspection.schema";

export function useChartData(options: Parameters<typeof useInspectionList>[0]) {
  const { data: insps } = useInspectionList(options);
  const { t } = useTranslation("inspections");

  const data = useMemo(() => {
    const li = insps;
    if (!li) return [];
    if (li.inspection_data_list.length > 0) {
      const ins: PulseGraphData[] = li.inspection_data_list.map((i) => {
        const jd = i.json_data as {
          pulse?: number;
          pressure?: { first?: number; second?: number };
        };
        return {
          date: i.datetime_created_formated,
          pulse: jd.pulse ?? 0,
          pressure: {
            first: jd.pressure?.first ?? 0,
            second: jd.pressure?.second ?? 0,
          },
        };
      });
      return ins.reverse();
    }

    return [];
  }, [insps]);

  const chartData: ChartData<"line"> = useMemo(
    () => ({
      labels: data.map((d) => d.date),
      datasets: [
        {
          label: t("pulse"),
          data: data.map((d) => d.pulse),
          borderColor: "rgb(255, 31, 138)",
          backgroundColor: "rgba(255, 31, 138, 0.5)",
        },
        {
          label: t("pressure.upper"),
          data: data.map((d) => d.pressure.first),
          borderColor: "rgb(255, 230, 31)",
          backgroundColor: "rgba(255, 230, 31, 0.5)",
        },
        {
          label: t("pressure.lower"),
          data: data.map((d) => d.pressure.second),
          borderColor: "rgb(8, 255, 150)",
          backgroundColor: "rgba(8, 255, 150, 0.5)",
        },
      ],
    }),
    [data, t]
  );

  const chartOptions: ChartOptions<"line"> = {
    plugins: {
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };

  return { chartData, chartOptions };
}
