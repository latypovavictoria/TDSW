import { useEffect } from "react";

export function useSaveInspType(type: string[]) {
  useEffect(() => {
    localStorage.setItem("inspType", JSON.stringify(type));
  }, [type]);
}
