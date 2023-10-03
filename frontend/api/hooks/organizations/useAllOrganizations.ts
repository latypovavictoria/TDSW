import all from "@api/v2/organizations/get/all";
import useSWR, { mutate } from "swr";

const useAllOrganizations = () => {
  const res = useSWR(["organizations/get/all"], (_) => all());

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutateAllOrganizations = () => {
  return mutate(["organizations/get/all"]);
};

export default useAllOrganizations;
