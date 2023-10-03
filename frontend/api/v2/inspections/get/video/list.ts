import { endpoint } from "@api/fetch";
import { z } from "zod";

const outputSchema = z.object({
  videos: z.array(
    z.object({
      file: z.string(),
      file_hash: z.string(),
      file_type: z.string(),
      id: z.number(),
      inspection_id: z.number(),
    })
  ),
});

export default (inspectionId: number) =>
  endpoint(
    `v2/inspections/get/video/${inspectionId}/list`,
    "GET",
    undefined,
    undefined,
    outputSchema
  );
