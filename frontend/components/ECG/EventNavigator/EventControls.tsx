import {
  KeyboardDoubleArrowLeftSharp,
  KeyboardDoubleArrowRightSharp,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setActiveEventIndex } from "../../../redux/reducers/ecg/ecgSlice";

const ECGEventControls = () => {
  const dispatch = useAppDispatch();
  const activeEventIndex = useAppSelector(
    (state) => state.ecg.activeEventIndex
  );
  const maxEventIndex = useAppSelector((state) => {
    return state.ecg.events
      ? Object.values(state.ecg.events).reduce(
          (acc, cur) => acc + cur.length,
          0
        )
      : 0;
  });

  const prev = () => {
    if (activeEventIndex > 0) {
      dispatch(setActiveEventIndex(activeEventIndex - 1));
    }
  };

  const next = () => {
    if (activeEventIndex < maxEventIndex - 1) {
      dispatch(setActiveEventIndex(activeEventIndex + 1));
    }
  };

  return (
    <div className="bg-[rgb(8,64,72)] pl-20">
      <span onClick={() => prev()}>
        <KeyboardDoubleArrowLeftSharp />
      </span>
      <span onClick={() => next()}>
        <KeyboardDoubleArrowRightSharp />
      </span>
    </div>
  );
};

export default ECGEventControls;
