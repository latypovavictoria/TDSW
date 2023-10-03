import { endpoint } from "@api/fetch";
import { z } from "zod";

const outputSchema = z.object({
  description: z.string(),
  name: z.string(),
  points: z.array(z.number()).length(2),
  town: z.string(),
});

export default (organization_id: number) =>
  endpoint(
    `v2/organizations/get/map/${organization_id}`,
    "GET",
    undefined,
    undefined,
    outputSchema
  );
