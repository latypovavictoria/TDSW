import useSWR, { mutate } from "swr";
import get from "@api/v2/patients/get";

const usePatient = (patient_id: number) => {
  const res = useSWR(
    patient_id !== -1 ? ["/patients/get", patient_id] : null,
    (_, patient_id) => get(patient_id)
  );

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutatePatient = (patient_id: number) =>
  mutate(["/patients/get", patient_id]);

export default usePatient;
