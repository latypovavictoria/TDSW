import { useMediaQuery } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import { useMemo, useState } from "react";

import { useBindWindowsPosition } from "@components/UI/DBox/hooks/useBindWindowsPosition";
import { useGetWindowSize } from "@components/UI/DBox/hooks/useGetWindowSize";
import EBox, { EBoxProps } from "@components/UI/EBox";

export interface DBoxProps extends EBoxProps {
  startPoint?: { x: number; y: number };
}

export default function DBox_egor(props: DBoxProps) {
  const getWindowSize = useGetWindowSize();
  const { innerWidth, innerHeight } = getWindowSize();
  const [, api] = useSpring(() => ({
    x: props.startPoint?.x || 0,
    y: props.startPoint?.y || 0,
  }));

  const [windowSize] = useState({ innerWidth, innerHeight });

  const { cordinates, bindWindowsPosition } = useBindWindowsPosition({
    openPosition: props.startPoint ?? { x: 0, y: 0 },
    api: api,
    windowSize: windowSize,
    size: {
      width: 100,
      height: 100,
    },
  });

  const isMobile = !useMediaQuery("(min-width: 640px)");

  const { ...eProps } = props;

  const id = useMemo(() => {
    return Math.random().toString();
  }, []);

  if (isMobile) {
    return <EBox {...eProps} />;
  }

  return (
    <animated.div
      {...bindWindowsPosition()}
      style={{ x: cordinates.x, y: cordinates.y, touchAction: "none" }}
    >
      <EBox id={`dbox-${id}`} bgColor="#002a33" {...eProps} />
    </animated.div>
    // <Draggable {...bindWindowsPosition()} style={{ x: cordinates.x, y: cordinates.y, touchAction: 'none' }}>
    // </Draggable>
  );
}
