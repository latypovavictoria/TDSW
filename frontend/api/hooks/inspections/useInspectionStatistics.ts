import statistics from "@api/v2/inspections/get/statistics";
import useSWR, { mutate } from "swr";

const useInspectionStatistics = () => {
  const res = useSWR(["/inspections/get/statistics"], (_) => statistics());

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutateInspectionStatistics = () => {
  return mutate(["/inspections/get/statistics"]);
};

export default useInspectionStatistics;
