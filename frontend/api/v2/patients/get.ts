import { generateMock } from "@anatine/zod-mock";
import { endpoint } from "@api/fetch";
import { patientSchema, userSchema } from "@api/schemas";
import { z } from "zod";

const outpuSchema = z.object({
  inspections_short_info: z.object({
    danger_inspections_count: z.number(),
    warn_inspections_count: z.number(),
    ok_inspections_count: z.number(),
    inspections_count: z.number(),
  }),
  user: patientSchema,
});

export function mockPatientGet() {
  const mockSchema = z.object({
    inspections_short_info: z.object({
      danger_inspections_count: z.number(),
      warn_inspections_count: z.number(),
      ok_inspections_count: z.number(),
      inspections_count: z.number(),
    }),
    user: userSchema
      .partial({
        tid: true,
        login: true,
        password: true,
      })
      .omit({
        inspections: true,
      }),
  });

  return {
    status: 200,
    data: generateMock(mockSchema),
  };
}

export default (patient_id: number) =>
  endpoint(
    `v2/patients/get/${patient_id}`,
    "GET",
    undefined,
    undefined,
    outpuSchema
  );
