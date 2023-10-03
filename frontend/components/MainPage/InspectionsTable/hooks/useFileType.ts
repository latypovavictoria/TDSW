import { useMemo } from "react";

export function useFileType(inspType: string[]): string | undefined {
  return useMemo(() => {
    if (inspType[0] === "ecg") return "edf";
  }, [inspType]);
}
