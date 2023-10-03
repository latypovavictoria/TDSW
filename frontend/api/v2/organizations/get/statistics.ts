import { endpoint } from "@api/fetch";
import { z } from "zod";

const outputSchema = z.object({
  danger_inspections_count: z.number(),
  warn_inspections_count: z.number(),
  ok_inspections_count: z.number(),
  inscpetions_count: z.number(),
});

export default (organization_id: number) =>
  endpoint(
    `/v2/organizations/get/statistics/${organization_id}`,
    "GET",
    undefined,
    undefined,
    outputSchema
  );
