import { generateMock } from "@anatine/zod-mock";
import { endpoint } from "@api/fetch";
import { risksSchema } from "@api/schemas";
import { z } from "zod";

const outputSchema = z.object({
  risks: z.array(
    risksSchema.merge(
      z.object({
        user: z
          .object({
            firstName: z.string().nullable().optional(),
            lastName: z.string().nullable().optional(),
            patronymic: z.string().nullable().optional(),
            tid: z.string().nullable().optional(),
          })
          .nullable()
          .optional(),
      })
    )
  ),
});

export function mockRisksGet() {
  return {
    status: 200,
    data: generateMock(outputSchema),
  };
}

const risks = (organizationId: number) =>
  endpoint(
    `/v2/organizations/get/risks/${organizationId}`,
    "GET",
    undefined,
    undefined,
    outputSchema
  );

export default risks;
