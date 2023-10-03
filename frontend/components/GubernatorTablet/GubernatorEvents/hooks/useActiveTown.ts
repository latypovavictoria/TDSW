import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setActiveTown } from "redux/reducers/adminStat/admStatSlice";

export function useActiveTown(townIds: number[]) {
  const dispatch = useAppDispatch();
  const activeTown = useAppSelector((state) => state.admStat.activeTown);

  useEffect(() => {
    if (activeTown !== undefined) return;
    dispatch(setActiveTown(townIds[0]));
  }, [townIds, dispatch, activeTown]);

  return activeTown;
}
