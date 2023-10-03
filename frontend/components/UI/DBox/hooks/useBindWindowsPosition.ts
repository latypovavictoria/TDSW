import { SpringRef } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";

interface IUseBindWindowsPosition {
  openPosition: {
    x: number;
    y: number;
  };
  api: SpringRef<{ x: number; y: number }>;
  windowSize: {
    innerWidth: number;
    innerHeight: number;
  };
  size: {
    width: number;
    height: number;
  };
}

export function useBindWindowsPosition({
  openPosition,
  api,
}: IUseBindWindowsPosition) {
  const [cordinates, setCordinates] = useState({
    x: openPosition.x,
    y: openPosition.y,
  });
  // console.log(cordinates);

  const bindWindowsPosition = useDrag(
    (params) => {
      setCordinates({
        x: openPosition.x + params.offset[0],
        y: openPosition.y + params.offset[1],
      });
      api.start({
        x: openPosition.x + params.offset[0],
        y: openPosition.y + params.offset[1],
        immediate: true,
      });
    },
    {
      // bounds: {
      //     left: -openPosition!.x,
      //     right: windowSize.innerWidth - openPosition!.x - size!.width,
      //     top: -openPosition!.y,
      //     bottom: windowSize.innerHeight - openPosition!.y - size!.height
      // }
    }
  );
  return { cordinates, bindWindowsPosition };
}
