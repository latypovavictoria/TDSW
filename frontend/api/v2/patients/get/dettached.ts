import { generateMock } from "@anatine/zod-mock";
import { endpoint } from "@api/fetch";
import { patientSchema, userSchema } from "@api/schemas";
import { z } from "zod";

const inputSchema = z.object({
  page: z.number().optional(),
  recs_per_page: z.number().optional(),
});
type inputType = z.infer<typeof inputSchema>;

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

export function mockPatientsGetDettached() {
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

export default (doctor_id: number, data: inputType) =>
  endpoint(
    `v2/patients/get/dettached/${doctor_id}`,
    "POST",
    data,
    inputSchema,
    outputSchema
  );
