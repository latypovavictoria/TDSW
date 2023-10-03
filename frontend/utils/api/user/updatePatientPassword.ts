import fetchAPI from "../rep";

const updatePatientPassword = async (
  login: string,
  oldPassword: string,
  newPassword: string
) => {
  const resp = await fetchAPI(
    {
      url: "/change_patient_password",
      method: "post",
      data: {
        login,
        password: oldPassword,
        new_password: newPassword,
      },
    },
    false
  );
  return resp;
};

export default updatePatientPassword;
