import { useMemo } from "react";
import { usePatients } from "./usePatients";

export function usePatientById(id: number) {
  const patients = usePatients();

  return useMemo(() => patients.find((p) => p.id === id), [id, patients]);
}
