import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";

export function useInspType(): [string[], Dispatch<SetStateAction<string[]>>] {
  let initial_type = ["pre-shift", "post-shift"];

  if (typeof window !== "undefined") {
    const item = localStorage.getItem("inspType");
    if (item) {
      const parsed = JSON.parse(item);
      const res = z.array(z.string()).safeParse(parsed);
      if (res.success) {
        initial_type = res.data;
      }
    }
  }

  const [type, setType] = useState<string[]>(initial_type);

  return [type, setType];
}
