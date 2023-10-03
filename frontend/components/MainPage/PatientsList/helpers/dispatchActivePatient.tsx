import OverviewECG from "@components/MainPage/DraggableBlocks/OverviewECG";
import OverviewLungs from "../../DraggableBlocks/OverviewLungs/OverviewLungs";
import PulseGraph from "../../DraggableBlocks/OverviewPulseGraph/OveriewPulseGraph";
import OverviewStress from "../../DraggableBlocks/OverviewStress/OverviewStress";
import { setClosed } from "../../../../redux/reducers/nav/winSlice";
import { setActivePatient } from "../../../../redux/reducers/patients/patientsSlice";
import { store } from "../../../../redux/store";

export const dispatchActivePatient = async (id: number) => {
  const dispatch = store.dispatch;

  dispatch(setActivePatient(id));
  dispatch(setClosed(OverviewLungs.block_name));
  dispatch(setClosed(OverviewECG.block_name));
  dispatch(setClosed(PulseGraph.block_name));
  dispatch(setClosed(OverviewStress.block_name));
};
