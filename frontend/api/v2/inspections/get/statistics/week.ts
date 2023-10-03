import { generateMock } from "@anatine/zod-mock";
import { endpoint } from "@api/fetch";
import { z } from "zod";

const outputSchema = z.object({
  all: z
    .array(
      z.object({
        x: z.string(),
        y: z.number(),
      })
    )
    .length(7)
    .optional(),
  critical: z
    .array(
      z.object({
        x: z.string(),
        y: z.number(),
      })
    )
    .length(7)
    .optional(),
  dangerous: z
    .array(
      z.object({
        x: z.string(),
        y: z.number(),
      })
    )
    .length(7)
    .optional(),
  no_risks: z
    .array(
      z.object({
        x: z.string(),
        y: z.number(),
      })
    )
    .length(7)
    .optional(),
  in_the_queue: z
    .array(
      z.object({
        x: z.string(),
        y: z.number(),
      })
    )
    .length(7)
    .optional(),
});

export function mockInspectionsGetStatisticsWeek() {
  return {
    status: 200,
    data: generateMock(outputSchema),
  };
}

export default () =>
  endpoint(
    "v2/inspections/get/statistics/week",
    "GET",
    undefined,
    undefined,
    outputSchema
  );
