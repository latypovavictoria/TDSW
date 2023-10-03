import { useMemo } from "react";

import useAllOrganizations from "@api/hooks/organizations/useAllOrganizations";
import { organizationsType } from "@api/schemas";

export type mapDataType = { [key: string]: organizationsType[] };

export function useMapData() {
  const { data: respData } = useAllOrganizations();

  const data = useMemo(() => {
    if (!respData) return {};

    const organizations = respData?.organizations || [];

    return organizations.reduce((acc, org) => {
      if (acc[org.town]) {
        acc[org.town].push(org);
      } else {
        acc[org.town] = [org];
      }
      return acc;
    }, {} as mapDataType);
  }, [respData]);

  return data;
}
