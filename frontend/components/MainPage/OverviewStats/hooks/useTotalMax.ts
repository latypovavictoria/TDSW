import { useMemo } from "react";

import type useGraphsData from "./useGraphsData";

export default function useTotalMax(data: ReturnType<typeof useGraphsData>) {
  return useMemo(() => {
    return Math.max(
      ...data.reduce((acc, cur) => acc.concat(cur.data), [] as number[])
    );
  }, [data]);
}
