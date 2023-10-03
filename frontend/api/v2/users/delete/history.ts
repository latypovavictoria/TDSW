import { endpoint } from "@api/fetch";
import { z } from "zod";

const inputSchema = z.object({
  user_id: z.string(),
});
type inputType = z.infer<typeof inputSchema>;

export default (data: inputType) =>
  endpoint(
    `/v2/users/delete/history`,
    "POST",
    data,
    inputSchema,
    z.undefined()
  );
