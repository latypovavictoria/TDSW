import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { setPage } from "../../../redux/reducers/ecg/ecgSlice";
import { store } from "../../../redux/store";
import ECGEventGraph from "./ECGEventGraph";
import ECGEventControls from "./EventControls";

export const scrollToIndex = (index: number) => {
  const overflowDiv = document.getElementsByClassName("overflow-container")[0];
  const width = overflowDiv.getBoundingClientRect().width;
  const page = Math.floor(index / 60000);
  store.dispatch(setPage(page));
  overflowDiv.scrollLeft = Math.max((index % 60000) / 10 - width / 4, 0);
};

const ECGEventNavigator = () => {
  const { t } = useTranslation("ecg");

  const activeEventIndex = useAppSelector(
    (state) => state.ecg.activeEventIndex
  );

  const loading = useAppSelector((state) => state.ecg.statLoading);
  const events = useAppSelector((state) => state.ecg.events);

  useEffect(() => {
    if (loading || Object.keys(events).length === 0) {
      return;
    }

    try {
      const reducedEvents = Object.values(events).reduce(
        (acc, cur) => acc.concat(cur),
        []
      );
      const start = reducedEvents[activeEventIndex].start;
      scrollToIndex(start);
    } catch (e) {
      return;
    }
  }, [loading, activeEventIndex, events]);

  if (!loading && (!events || Object.keys(events).length === 0)) {
    return <span>{t("noData")}</span>;
  }

  return (
    <>
      {loading ? (
        <span>{t("loading")}</span>
      ) : (
        <>
          <ECGEventControls />
          <ECGEventGraph />
        </>
      )}
    </>
  );
};

export default ECGEventNavigator;
