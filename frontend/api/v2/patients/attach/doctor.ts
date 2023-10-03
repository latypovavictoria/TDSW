import { endpoint } from "@api/fetch";
import { z } from "zod";

const attach = (patient_id: number) =>
  endpoint(
    "v2/patients/attach/doctor/",
    "POST",
    {
      patient_id,
    },
    z.object({
      patient_id: z.number(),
    }),
    z.undefined()
  );

export default attach;
