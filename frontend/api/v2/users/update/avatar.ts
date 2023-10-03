import { endpoint } from "@api/fetch";
import { z } from "zod";

const inputSchema = z.object({
  user_id: z.number(),
  password: z.string(),
  avatar: z.string(),
});
type inputType = z.infer<typeof inputSchema>;

export default (data: inputType) =>
  endpoint(`/v2/users/update/avatar`, "POST", data, inputSchema, z.undefined());
