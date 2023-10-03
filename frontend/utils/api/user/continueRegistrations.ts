import fillPatientData from "./fillData";
import updatePatientPassword from "./updatePatientPassword";

const continueRegistration = async (
  login: string,
  password: string,
  hash: string
) => {
  const fillResp = await fillPatientData({ login }, hash);
  if (fillResp.data.status === "error") {
    return {
      data: {
        status: "error",
        msg: fillResp.data.msg,
      },
    };
  }

  const passResp = await updatePatientPassword(login, "123456", password);
  if (passResp.data.status === "error") {
    return {
      data: {
        status: "error",
        msg: passResp.data.msg,
      },
    };
  }

  return {
    data: {
      status: "success",
      msg: "",
    },
  };
};

export default continueRegistration;
