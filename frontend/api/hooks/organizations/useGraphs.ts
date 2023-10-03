import graphs, {
  graph_types,
} from "@api/v2/organizations/get/statistics/graphs";
import useSWR, { mutate } from "swr";

const useGraphs = (organizationId: number, graph_type: graph_types) => {
  const res = useSWR(
    ["organizations/get/statistics/graphs", organizationId, graph_type],
    (_, id, type) => graphs(id, type)
  );

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutateGraphs = (organizationId: number) => {
  return mutate(["organizations/get/statistics/bad_guys", organizationId]);
};

export default useGraphs;
