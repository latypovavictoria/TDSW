import { useEffect, useState } from "react";

import useAllOrganizations from "@api/hooks/organizations/useAllOrganizations";
import risks from "@api/v2/organizations/get/risks";

export type Risk = {
  description: string;
  organization: string;
  patient_id: number;
  town: string;
  risk: string;
};

export function useAllRisks() {
  const { data: organizations } = useAllOrganizations();

  const [riskList, setRiskList] = useState<Risk[]>([]);

  useEffect(() => {
    async function fetchRisks() {
      if (!organizations) return [];

      const res = [];

      for (const org of organizations.organizations) {
        const { data } = await risks(org.id);
        if (!data) continue;

        res.push(
          ...data.risks.map((event) => ({
            description: `${event.user?.firstName} ${event.user?.lastName}`,
            organization: org.name,
            patient_id: event.patient_id,
            town: org.town,
            risk: event.risk,
          }))
        );
      }
      return res.reverse();
    }

    fetchRisks().then((res) => {
      setRiskList(res);
    });
  }, [organizations]);

  return riskList;
}
