import { useMemo } from "react";

import usePatient from "@api/hooks/patients/usePatient";

import { filterDuplicates } from "../helpers/filterDuplicates";

export function useRisks(patientId: number, group: boolean) {
  const { data: patient } = usePatient(patientId);

  return useMemo(() => {
    if (!patient) return [];
    const res = new Array(...(patient.user?.risks ?? [])).reverse();
    if (group) return filterDuplicates(res);
    return res;
  }, [patient, group]);
}
