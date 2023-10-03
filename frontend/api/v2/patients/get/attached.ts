import { generateMock } from "@anatine/zod-mock";
import { endpoint } from "@api/fetch";
import { patientSchema, userSchema } from "@api/schemas";
import { z } from "zod";

const outputSchema = z.object({
  result: z.array(
    z.object({
      inspections_short_info: z.object({
        danger_inspections_count: z.number(),
        warn_inspections_count: z.number(),
        ok_inspections_count: z.number(),
        inspections_count: z.number(),
      }),
      user: patientSchema,
    })
  ),
});

export function mockPatientsGetAttached() {
  const mockSchema = z.object({
    result: z.array(
      z.object({
        inspections_short_info: z.object({
          danger_inspections_count: z.number(),
          warn_inspections_count: z.number(),
          ok_inspections_count: z.number(),
          inspections_count: z.number(),
        }),
        user: userSchema.pick({
          id: true,
          tid: true,
          login: true,
          password: true,
          sex: true,
          account_type: true,
        }),
      })
    ),
  });

  return {
    status: 200,
    data: generateMock(mockSchema),
  };
}

export default (doctor_id: number) =>
  endpoint(
    `v2/patients/get/attached/${doctor_id}`,
    "GET",
    undefined,
    undefined,
    outputSchema
  );
