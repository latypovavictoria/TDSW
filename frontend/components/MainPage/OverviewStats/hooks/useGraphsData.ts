import type { TFunction } from "next-i18next";
import { useMemo } from "react";

import type useInspectionStatistics from "@api/hooks/inspections/useInspectionStatistics";

import type useSortedWeeklyStats from "./useSortedWeeklyStats";

export default function useGraphsData(
  stats: ReturnType<typeof useInspectionStatistics>["data"],
  sortedData: ReturnType<typeof useSortedWeeklyStats>,
  t: TFunction
) {
  return useMemo(() => {
    if (!stats) return [];
    return [
      {
        data: sortedData.all.map((s) => s.y),
        value: stats.inspections_count,
        grow: (sortedData.all.at(-1)?.y || 0) > (sortedData.all.at(-2)?.y || 0),
        title: t("header_all", { ns: "stats" }),
      },
      {
        data: sortedData.no_risks.map((s) => s.y),
        value: stats.ok_inspections_count,
        grow:
          (sortedData.no_risks.at(-1)?.y || 0) >
          (sortedData.no_risks.at(-2)?.y || 0),
        title: t("header_ok", { ns: "stats" }),
      },
      {
        data: sortedData.dangerous.map((s) => s.y),
        value: stats.warn_inspections_count,
        grow:
          (sortedData.dangerous.at(-1)?.y || 0) >
          (sortedData.dangerous.at(-2)?.y || 0),
        title: t("header_warning", { ns: "stats" }),
      },
      {
        data: sortedData.critical.map((s) => s.y),
        value: stats.danger_inspections_count,
        grow:
          (sortedData.critical.at(-1)?.y || 0) >
          (sortedData.critical.at(-2)?.y || 0),
        title: t("header_danger", { ns: "stats" }),
      },
    ];
  }, [stats, sortedData, t]);
}
