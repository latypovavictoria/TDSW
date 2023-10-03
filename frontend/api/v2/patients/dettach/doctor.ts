import { endpoint } from "@api/fetch";
import { z } from "zod";

export default (patient_id: number) =>
  endpoint(
    `v2/patients/dettach/doctor/`,
    "POST",
    {
      patient_id,
    },
    z.object({
      patient_id: z.number(),
    }),
    z.undefined()
  );
