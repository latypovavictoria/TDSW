import ecg_averages from "@api/v2/inspections/get/ecg_averages";
import useSWR, { mutate } from "swr";

const useECGAverages = (patientId: number) => {
  const res = useSWR(["/inspections/get/ecg_averages", patientId], (_, id) =>
    ecg_averages(id)
  );

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutateECGAverages = (patientId: number) => {
  return mutate(["/inspections/get/ecg_averages", patientId]);
};

export default useECGAverages;
