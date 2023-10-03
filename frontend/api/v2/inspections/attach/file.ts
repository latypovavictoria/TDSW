import { endpoint } from "@api/fetch";
import { z } from "zod";

const inputSchema = z.object({
  file: z.string(),
  file_type: z.string().optional(),
  file_hash: z.string().optional(),
});
type inputType = z.infer<typeof inputSchema>;

const file = (inspectionId: number, input: inputType) =>
  endpoint(
    `/v2/inspections/attach/file/${inspectionId}`,
    "POST",
    input,
    inputSchema,
    z.unknown()
  );

export default file;
