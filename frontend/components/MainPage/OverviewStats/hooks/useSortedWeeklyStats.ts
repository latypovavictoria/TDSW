import { useMemo } from "react";

import type useWeekStatistics from "@api/hooks/inspections/useWeekStatistics";

export default function useSortedWeeklyStats(
  stats: ReturnType<typeof useWeekStatistics>["data"]
) {
  return useMemo(() => {
    const newStats = {
      all: stats?.all || [],
      no_risks: stats?.no_risks || [],
      dangerous: stats?.dangerous || [],
      critical: stats?.critical || [],
    };

    const maxLen = Math.max(
      newStats.all.length,
      newStats.no_risks.length,
      newStats.dangerous.length,
      newStats.critical.length
    );

    for (let i = 0; i < maxLen; i++) {
      if (!newStats.all[i]) newStats.all[i] = { x: "", y: 0 };
      if (!newStats.no_risks[i]) newStats.no_risks[i] = { x: "", y: 0 };
      if (!newStats.dangerous[i]) newStats.dangerous[i] = { x: "", y: 0 };
      if (!newStats.critical[i]) newStats.critical[i] = { x: "", y: 0 };
    }

    newStats.all.sort((a, b) => {
      const dateA = new Date(a.x);
      const dateB = new Date(b.x);
      return dateA.getTime() - dateB.getTime();
    });
    newStats.no_risks.sort((a, b) => {
      const dateA = new Date(a.x);
      const dateB = new Date(b.x);
      return dateA.getTime() - dateB.getTime();
    });
    newStats.dangerous.sort((a, b) => {
      const dateA = new Date(a.x);
      const dateB = new Date(b.x);
      return dateA.getTime() - dateB.getTime();
    });
    newStats.critical.sort((a, b) => {
      const dateA = new Date(a.x);
      const dateB = new Date(b.x);
      return dateA.getTime() - dateB.getTime();
    });

    return newStats;
  }, [stats]);
}
