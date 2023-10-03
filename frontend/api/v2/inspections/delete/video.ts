import { endpoint } from "@api/fetch";
import { z } from "zod";

export default (hash: string) =>
  endpoint(
    `v2/inspections/delete/video/${hash}`,
    "DELETE",
    undefined,
    undefined,
    z.any()
  );
