import { z } from "zod";
import { inspectionsType } from "@api/schemas";

export const getDataOfInspection = (
  inspection: inspectionsType
): { value: string; color?: string; bold?: boolean }[] => {
  switch (inspection.inspection_type) {
    case "pre-shift":
    case "post-shift": {
      const insp = inspection;

      const data = z
        .object({
          pressure: z.object({
            first: z.number(),
            second: z.number(),
          }),
          temperature: z.number(),
          alcohol: z.boolean(),
          pulse: z.number(),
        })
        .safeParse(insp.json_data);

      if (data.success)
        return [
          { value: `${data.data.pressure.first}/${data.data.pressure.second}` },
          { value: `${data.data.temperature}` },
          {
            value: `${data.data.alcohol}`,
            color: data.data.alcohol ? "#dc2626" : undefined,
            bold: data.data.alcohol,
          },
          { value: `${data.data.pulse}` },
        ];
      return [];
    }
    case "ecg": {
      return [];
    }

    default:
      if (inspection.json_data)
        return Object.values(inspection.json_data).map((v) => ({ value: v }));
      else return [];
  }
};
