import { useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";

import { useAppDispatch } from "redux/hooks";
import { addStroke, removeStroke } from "redux/reducers/canvas/canvSlice";

import EBox, { EBoxProps } from "@components/UI/EBox";

import strokeOnCanvas from "utils/canvas";

export interface DBoxProps extends EBoxProps {
  startPoint?: { x: number; y: number };
}

export default function DBox(props: DBoxProps) {
  const { startPoint, ...eProps } = props;

  const isMobile = !useMediaQuery("(min-width: 640px)");

  const dispatch = useAppDispatch();

  const id = useMemo(() => {
    return Math.random().toString();
  }, []);

  const stroke = useCallback(
    (
      rect: DOMRect | undefined,
      startPoint: { x: number; y: number } | undefined
    ) => {
      if (!startPoint || !rect) return;

      const y1 = (rect.top + rect.bottom) / 2;
      const x1 = rect.left;

      dispatch(removeStroke(`dbox-${id}`));
      dispatch(
        addStroke({
          name: `dbox-${id}`,
          start: startPoint,
          end: { x: x1, y: y1 },
        })
      );
      strokeOnCanvas();
    },
    [dispatch, id]
  );

  useEffect(() => {
    stroke(
      document.getElementById(`dbox-${id}`)?.getBoundingClientRect(),
      startPoint
    );

    return () => {
      dispatch(removeStroke(`dbox-${id}`));
      strokeOnCanvas();
    };
  }, [dispatch, id, startPoint, stroke]);

  const onDrag: DraggableEventHandler = (_, data) => {
    stroke(data.node?.getBoundingClientRect(), startPoint);
  };

  if (isMobile) {
    return <EBox {...eProps} />;
  }

  return (
    <Draggable onDrag={onDrag} handle={".e_header"}>
      <EBox id={`dbox-${id}`} bgColor="#002a33" {...eProps} />
    </Draggable>
  );
}
