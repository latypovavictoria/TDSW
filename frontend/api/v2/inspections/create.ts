import { endpoint } from "@api/fetch";
import { filesSchema, hasOrganizationId, jsonSchema } from "@api/schemas";
import { z } from "zod";

const inputSchema = z
  .object({
    inspection_type: z.string(),
    json_data: jsonSchema,
    tid: z.string(),
    organization_id: z.string().optional(),
    organization_hash: z.string().optional(),
    file: z
      .object({
        file: z.string(),
        file_type: z.string(),
        file_hash: z.string().optional(),
      })
      .optional(),
    comments: z.string().optional(),
    complaints: z.string().optional(),
  })
  .superRefine(hasOrganizationId);
type inputType = z.infer<typeof inputSchema>;

const outputSchema = z.object({
  inspection_id: z.string(),
  ai_result: z.string().optional(),
  file: filesSchema.optional(),
});

export default (data: inputType) =>
  endpoint("/v2/inspections/create", "POST", data, inputSchema, outputSchema);
