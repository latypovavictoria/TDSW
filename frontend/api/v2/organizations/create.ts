import { endpoint } from "@api/fetch";
import { organizationsSchema } from "@api/schemas";
import { z } from "zod";

const inputSchema = organizationsSchema.omit({
  id: true,
  schedules: true,
});
type inputType = z.infer<typeof inputSchema>;

export default (data: inputType) =>
  endpoint(
    "/v2/organizations/create",
    "POST",
    data,
    inputSchema,
    organizationsSchema,
    false
  );
