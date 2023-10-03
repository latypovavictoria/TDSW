import all from "@api/v2/patients/get/all";
import useSWR, { mutate } from "swr";

const useAllPatients = () => {
  const res = useSWR(["/patients/get/all"], (_) => all());

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutateAllPatients = () => mutate(["/patients/get/all"]);

export default useAllPatients;
