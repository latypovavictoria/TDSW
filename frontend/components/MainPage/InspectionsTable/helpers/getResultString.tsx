import { z } from "zod";
import { Json } from "@api/schemas";

export function getResultString(resultObject: Json) {
  const schema = z.object({
    result: z.string(),
  });
  const res = schema.safeParse(resultObject);
  if (res.success) {
    return res.data.result;
  } else {
    return "";
  }
}
