import useBadGuys from "@api/hooks/organizations/useBadGuys";
import { useMemo } from "react";

export function useSlicedBadGuys(orgId: number | undefined) {
  const { data } = useBadGuys(orgId ?? -1);

  const res = useMemo(() => {
    if (!data) return [];
    return data.result.slice(0, 5).map((_p) => {
      const p = _p.user;
      return {
        patient_id: p.id,
        warning: _p.inspections_short_info.warn_inspections_count,
        danger: _p.inspections_short_info.danger_inspections_count,
        first_name: p.json_data?.firstName ?? "",
        last_name: p.json_data?.lastName ?? "",
        tid: p.tid,
      };
    });
  }, [data]);

  return res;
}
