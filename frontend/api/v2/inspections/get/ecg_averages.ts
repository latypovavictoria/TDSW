import { generateMock } from "@anatine/zod-mock";
import { endpoint } from "@api/fetch";
import { z } from "zod";

const outputSchema = z.object({
  hr: z.number().nullable().optional(),
  events: z.boolean().nullable().optional(),
  stress: z.number().nullable().optional(),
  total_power: z.number().nullable().optional(),
});

export function mockInspectionsECGAverages() {
  return {
    status: 200,
    data: generateMock(outputSchema),
  };
}

const ecg_averages = (patientId: number) =>
  endpoint(
    `/v2/inspections/get/ecg_averages/${patientId}/`,
    "GET",
    undefined,
    undefined,
    outputSchema,
    false
  );

export default ecg_averages;
