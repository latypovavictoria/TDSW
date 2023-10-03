import { generateMock } from "@anatine/zod-mock";
import { endpoint } from "@api/fetch";
import { inspectionsSchema, inspectionsSchemesSchema } from "@api/schemas";
import { z } from "zod";

const inputSchema = z
  .object({
    inspection_type: z.string(),

    user_id: z.number().optional(),

    patient_id: z.number().optional(),
    // or
    tid: z.string().optional(),
    organization_id: z.number().optional(),

    inspection_id: z.string().optional(),
    page: z.number().optional(),
    recs_per_page: z.number().optional(),
    except_ids: z.array(z.number()).optional(),

    output_format: z.string().optional(),

    datetime_start: z.string().optional(),
    datetime_end: z.string().optional(),
  })
  .superRefine((arg, ctx) => {
    if (!arg.patient_id && (!arg.tid || !arg.organization_id)) {
      return ctx.addIssue({
        message:
          "Either patient_id or tid and organization_id must be provided",
        path: ["patient_id"],
        code: z.ZodIssueCode.custom,
      });
    }
  });
type inputType = z.infer<typeof inputSchema>;

const outputSchema = z.object({
  all_pages: z.number(),
  inspection_data_list: z.array(inspectionsSchema).default([]),
  scheme: inspectionsSchemesSchema,
});

export function mockInspectionsGet() {
  const mockSchema = z.object({
    all_pages: z.number(),
    inspection_data_list: z.array(
      z.object({
        inspection_data: inspectionsSchema
          .omit({
            json_data: true,
            result: true,
            inspection_type: true,
          })
          .merge(
            z.object({
              json_data: z.object({
                key: z.string(),
              }),
              result: z.object({
                key: z.string(),
              }),
              inspection_type: z.literal("pre-shift"),
            })
          ),
        scheme: inspectionsSchemesSchema
          .omit({
            inspections: true,
            json_data_format: true,
          })
          .merge(
            z.object({
              json_data_format: z.object({
                key: z.string(),
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

export default (data: inputType) => {
  return endpoint(
    "/v2/inspections/get",
    "POST",
    data,
    inputSchema,
    outputSchema
  );
};
