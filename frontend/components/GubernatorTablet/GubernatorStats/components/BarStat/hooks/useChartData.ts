import type { ChartData, ChartOptions } from "chart.js";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import type { useOrganizations } from "./useOrganizations";

const backgroundColor = "rgb(4, 223, 255)";

export function useChartData(
  organizations: ReturnType<typeof useOrganizations>
) {
  const { t } = useTranslation("admin");

  return useMemo(() => {
    const data: ChartData<"bar"> = {
      labels: Object.keys(organizations),
      datasets: [
        {
          label: t("stats.factories"),
          data: Object.values(organizations).map((t) => t.length),
          backgroundColor,
        },
      ],
    };

    const options: ChartOptions<"bar"> = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return { data, options };
  }, [organizations, t]);
}
