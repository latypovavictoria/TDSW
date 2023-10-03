import useAllOrganizations from "@api/hooks/organizations/useAllOrganizations";
import { useMemo } from "react";

export function useOrganizations() {
  const { data } = useAllOrganizations();

  return useMemo(() => data?.organizations ?? [], [data]);
}
