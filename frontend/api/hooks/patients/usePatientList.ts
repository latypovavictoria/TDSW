import useSWR, { mutate } from "swr";
import attached from "@api/v2/patients/get/attached";
import { loadUserFromStorage } from "utils/storageUser";

const usePatientList = () => {
  const user = loadUserFromStorage().user;
  let doctor_id;
  if (user?.account_type === "doctor") {
    doctor_id = user.user_id;
  }

  const res = useSWR(
    doctor_id ? ["/patients/get/attached", doctor_id] : null,
    (_, doctor_id) => attached(doctor_id)
  );

  return {
    ...res,
    data: res.data?.data,
    status: res.data?.status,
    message: res.data?.message,
  };
};

export const mutatePatientList = () => {
  const doctor_id = loadUserFromStorage().user?.user_id;
  mutate(["/patients/get/attached", doctor_id]);
};

export default usePatientList;
