import { generateMock } from "@anatine/zod-mock";
import { endpoint } from "@api/fetch";
import { patientSchema } from "@api/schemas";
import { z } from "zod";

const outputSchema = z.object({
  result: z.array(
    z.object({
      user: patientSchema,
      inspections_short_info: z.object({
        danger_inspections_count: z.number(),
        inspections_count: z.number(),
        ok_inspections_count: z.number(),
        warn_inspections_count: z.number(),
      }),
    })
  ),
});

export function mockOrganizationsBadGuys() {
  const mockSchema = z.object({
    result: z.array(
      z.object({
        user: patientSchema.omit({
          inspections: true,
          recommendations: true,
          risks: true,
        }),
        inspections_short_info: z.object({
          danger_inspections_count: z.number(),
          inspections_count: z.number(),
          ok_inspections_count: z.number(),
          warn_inspections_count: z.number(),
        }),
      })
    ),
  });

  return {
    status: 200,
    data: generateMock(mockSchema),
  };
}

const bad_guys = (organization_id: number) =>
  endpoint(
    `v2/organizations/get/statistics/${organization_id}/bad_guys`,
    "GET",
    undefined,
    undefined,
    outputSchema
  );

export default bad_guys;
