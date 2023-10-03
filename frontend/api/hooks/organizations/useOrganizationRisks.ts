import risks from "@api/v2/organizations/get/risks";
import useSWR, { mutate } from "swr";

const useOrganizationRisks = (organizationId: number) => {
  const res = useSWR(["organizations/get/risks", organizationId], (_, id) =>
    risks(id)
  );

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutateOrganizationRisks = (organizationId: number) => {
  return mutate(["organizations/get/risks", organizationId]);
};

export default useOrganizationRisks;
