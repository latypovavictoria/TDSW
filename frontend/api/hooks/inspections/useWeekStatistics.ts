import week from "@api/v2/inspections/get/statistics/week";
import useSWR, { mutate } from "swr";

const useWeekStatistics = () => {
  const res = useSWR(["/inspections/get/statistics/week"], (_) => week());

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutateWeekStatistics = () => {
  return mutate(["/inspections/get/statistics/week"]);
};

export default useWeekStatistics;
