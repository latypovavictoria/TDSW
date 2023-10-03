import list from "@api/v2/inspections/get/video/list";
import useSWR, { mutate } from "swr";

const useInspectionVideos = (inspection_id: number) => {
  const res = useSWR(
    [`/inspections/get/video/${inspection_id}/list`, inspection_id],
    (_, iid) => list(iid)
  );

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutateInspectionVideos = (inspection_id: number) => {
  return mutate([
    `/inspections/get/video/${inspection_id}/list`,
    inspection_id,
  ]);
};

export default useInspectionVideos;
