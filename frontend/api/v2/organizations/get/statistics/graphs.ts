import { generateMock } from "@anatine/zod-mock";
import { endpoint } from "@api/fetch";
import { z } from "zod";

const outputSchema = z.object({
  result: z.array(
    z.object({
      count: z.number(),
      datetime_created: z.string(),
    })
  ),
});

export function mockOrganizationsGraphs() {
  return {
    status: 200,
    data: generateMock(outputSchema),
  };
}

export type graph_types =
  | "count_inspections"
  | "count_alcohol"
  | "count_pressure";

const graphs = (organization_id: number, graph_type: graph_types) =>
  endpoint(
    `v2/organizations/get/statistics/${organization_id}/graphs/${graph_type}`,
    "GET",
    undefined,
    undefined,
    outputSchema
  );

export default graphs;
