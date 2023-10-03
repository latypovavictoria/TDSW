import { z } from "zod";

import { generateMock } from "@anatine/zod-mock";
import { endpoint } from "@api/fetch";
import { organizationsSchema } from "@api/schemas";

export function mockOrganizationsAll() {
  return {
    status: 200,
    data: generateMock(
      z.object({
        organizations: z.array(
          organizationsSchema
            .omit({ schedules: true })
            .merge(z.object({ id: z.literal(1) }))
        ),
      })
    ),
  };
}

const all = () =>
  endpoint(
    "/v2/organizations/get/all",
    "GET",
    undefined,
    undefined,
    z.object({ organizations: z.array(organizationsSchema) })
  );

export default all;
