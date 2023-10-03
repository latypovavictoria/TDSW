import useGraphs from "@api/hooks/organizations/useGraphs";
import { graph_types } from "@api/v2/organizations/get/statistics/graphs";
import { useMediaQuery } from "@mui/material";
import { ChartData, ChartOptions } from "chart.js";
import { useTranslation } from "next-i18next";

const blueColor = "rgb(4, 223, 255)";
const darkColor = "rgb(40, 60, 80)";

export function useChartData(
  organizationId: number,
  type: graph_types,
  label: string
) {
  const { t } = useTranslation("admin");
  const { data: res } = useGraphs(organizationId, type);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const data: ChartData<"scatter", { x: string; y: number }[], unknown> = {
    datasets: [
      {
        data: (res?.result ?? []).map((dt) => ({
          x: dt.datetime_created,
          y: dt.count,
        })),
        label: t(`stats.${label}`),
        backgroundColor: blueColor,
        borderColor: blueColor,
        showLine: true,
      },
    ],
  };

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    maintainAspectRatio: isMobile,
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          color: blueColor,
        },
        grid: {
          color: darkColor,
        },
      },
      y: {
        ticks: {
          color: blueColor,
        },
        grid: {
          color: darkColor,
        },
      },
    },
  };

  const total = res?.result.reduce((p, c) => p + c.count, 0) ?? 0;

  return { data, options, total };
}
