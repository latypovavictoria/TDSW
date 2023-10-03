import { endpoint } from "@api/fetch";
import { z } from "zod";

const inputSchema = z.object({
  login: z.string(),
  password: z.string(),
  new_password: z.string(),
});
type inputType = z.infer<typeof inputSchema>;

export default (data: inputType) =>
  endpoint(
    "v2/users/update/password",
    "POST",
    data,
    inputSchema,
    z.undefined()
  );
