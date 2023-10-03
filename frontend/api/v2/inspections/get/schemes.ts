import { endpoint } from "@api/fetch";
import { inspectionsSchemesSchema } from "@api/schemas";
import { z } from "zod";

export default (inspection_type: string) =>
  endpoint(
    `/v2/inspections/get/schemes/${inspection_type}`,
    "GET",
    undefined,
    undefined,
    z.object({
      descriptions: z.array(inspectionsSchemesSchema),
    })
  );
