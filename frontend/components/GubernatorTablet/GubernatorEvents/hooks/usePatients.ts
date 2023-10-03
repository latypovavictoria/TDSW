import useAllPatients from "@api/hooks/patients/useAllPatients";
import { useMemo } from "react";

export function usePatients() {
  const { data } = useAllPatients();

  return useMemo(() => data?.result.map((r) => r.user) ?? [], [data]);
}
