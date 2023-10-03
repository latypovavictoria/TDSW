import { endpoint } from "@api/fetch";
import { usersTokensSchema } from "@api/schemas";
import { z } from "zod";

const inputSchema = z.object({
  login: z.string(),
  password: z.string(),
});
type inputType = z.infer<typeof inputSchema>;

const outputSchema = usersTokensSchema.merge(
  z.object({
    name: z.string(),
  })
);

export default (data: inputType) =>
  endpoint("/v2/auth/login", "POST", data, inputSchema, outputSchema);
