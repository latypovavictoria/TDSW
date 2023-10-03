import { generateMock } from "@anatine/zod-mock";
import { endpoint } from "@api/fetch";
import { inspectionStatSchema } from "@api/schemas";

export function mockInspectionsGetStatistics() {
  return {
    status: 200,
    data: generateMock(inspectionStatSchema),
  };
}

export default () =>
  endpoint(
    "/v2/inspections/get/statistics/",
    "GET",
    undefined,
    undefined,
    inspectionStatSchema
  );
