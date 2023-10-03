import bad_guys from "@api/v2/organizations/get/statistics/bad_guys";
import useSWR, { mutate } from "swr";

const useBadGuys = (organizationId: number) => {
  const res = useSWR(
    ["organizations/get/statistics/bad_guys", organizationId],
    (_, id) => bad_guys(id)
  );

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutateBadGuys = (organizationId: number) => {
  return mutate(["organizations/get/statistics/bad_guys", organizationId]);
};

export default useBadGuys;
