import useAllOrganizations from "@api/hooks/organizations/useAllOrganizations";
import { useMemo } from "react";

export function useTownNamesAndIds() {
  const { data: respData } = useAllOrganizations();

  return useMemo(() => {
    if (!respData) return { townNames: [], townIds: [] };
    const townNames = [] as string[];
    const townIds = [] as number[];

    for (const org of respData.organizations) {
      townNames.push(org.name);
      townIds.push(org.id);
    }

    return { townNames, townIds };
  }, [respData]);
}
