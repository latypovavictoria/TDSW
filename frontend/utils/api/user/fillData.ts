import { Patient } from "../patient/patient.schema";
import fetchAPI from "../rep";

const fillPatientData = async (
  data: Partial<Patient> & { login?: string },
  hash: string
) => {
  const resp = await fetchAPI(
    {
      url: `/patients/${hash}/fill_data`,
      method: "post",
      data,
    },
    false
  );
  return resp;
};

export default fillPatientData;
