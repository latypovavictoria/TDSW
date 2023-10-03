import get from "@api/v2/inspections/get";
import useSWR, { mutate } from "swr";

const useInspectionList = (data: Parameters<typeof get>[0]) => {
  const res = useSWR(
    data.patient_id !== -1 ? ["/inspections/get", data] : null,
    (_, data) => get(data)
  );

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutateInspectionList = (data: Parameters<typeof get>[0]) => {
  return mutate(["/inspections/get", data]);
};

export default useInspectionList;
