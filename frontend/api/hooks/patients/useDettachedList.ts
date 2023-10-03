import useSWR, { mutate } from "swr";
import dettached from "@api/v2/patients/get/dettached";
import { loadUserFromStorage } from "utils/storageUser";

const useDettachedList = (data: Parameters<typeof dettached>["1"] = {}) => {
  const user = loadUserFromStorage().user;
  let doctor_id;
  if (user?.account_type === "doctor") {
    doctor_id = user.user_id;
  }

  const res = useSWR(
    doctor_id ? ["/patients/get/dettached", doctor_id, data] : null,
    (_, _doctor_id, _data) => dettached(_doctor_id, _data)
  );

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutateDettachedList = () => {
  const doctor_id = loadUserFromStorage().user?.user_id;
  mutate(["/patients/get/dettached", doctor_id]);
};

export default useDettachedList;
