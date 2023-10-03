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

export function mockPatientsGetAll() {
  const mockSchema = z.object({
    result: z.array(
      z.object({
        inspections_short_info: z.object({
          danger_inspections_count: z.number(),
          warn_inspections_count: z.number(),
          ok_inspections_count: z.number(),
          inspections_count: z.number(),
        }),
        user: userSchema
          .pick({
            id: true,
            tid: true,
            login: true,
            password: true,
            sex: true,
            account_type: true,
            json_data: true,
          })
          .merge(
            z.object({
              json_data: z.object({
                firstName: z.string().nullable().optional(),
                lastName: z.string().nullable().optional(),
                patronymic: z.string().nullable().optional(),
                weight: z.number().nullable().optional(),
                height: z.number().nullable().optional(),
              }),
            })
          ),
      })
    ),
  });

  return {
    status: 200,
    data: generateMock(mockSchema),
  };
}

export default () =>
  endpoint("v2/patient/get/all", "GET", undefined, undefined, outputSchema);
