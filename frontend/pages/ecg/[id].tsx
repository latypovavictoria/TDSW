import { motion } from "framer-motion";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "types";
import { setActiveBlocks, setAvailableBlocks } from "..";
import ECGChart from "../../blocks/ecg_chart";
import ECGStat from "../../blocks/ecg_stat";
import OverviewPatient from "../../components/MainPage/PatientInfo/OverviewPatient/OverviewPatient";
import OverviewRecommendations from "../../components/MainPage/PatientInfo/OverviewRecommendations/OverviewRecommendations";
import OverviewRisks from "../../components/MainPage/PatientInfo/OverviewRisks/OverviewRisks";
import DefaultLayout, { variants } from "../../layouts/default";
import {
  setEvents,
  setFreqPower,
  setHgramData,
  setPage,
  setRythm,
  setScater,
  setStatLoading,
} from "../../redux/reducers/ecg/ecgSlice";
import { store } from "../../redux/store";
import { getEcgInspData } from "../../utils/api/inspection/getEcgInspData";

const fetchStat = async (id: string) => {
  const dispatch = store.dispatch;

  dispatch(setStatLoading(true));
  const resp = await getEcgInspData(parseInt(id));
  dispatch(setPage(0));

  if (resp.data.events) dispatch(setEvents(resp.data.events));

  if (resp.data.graphs?.pie)
    dispatch(
      setFreqPower({
        HF: resp.data.graphs.pie.hf_tp,
        LF: resp.data.graphs.pie.lf_tp,
        VLF: resp.data.graphs.pie.vlf_tp,
      })
    );
  else dispatch(setFreqPower({}));

  if (resp.data.graphs?.hist)
    dispatch(
      setHgramData(
        resp.data.graphs.hist.map((h: { x: number[]; y: number }) => ({
          start: h.x[0],
          end: h.x[1],
          value: h.y,
        }))
      )
    );
  else dispatch(setHgramData([]));

  if (resp.data.graphs?.scatter) dispatch(setScater(resp.data.graphs.scatter));
  else dispatch(setScater([]));

  if (resp.data.graphs?.rhythm) dispatch(setRythm(resp.data.graphs.rhythm));
  else dispatch(setRythm([]));

  dispatch(setStatLoading(false));
};

const ECG: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (typeof id == "string") {
      fetchStat(id);
    }
  }, [id]);

  useEffect(() => {
    setActiveBlocks([
      "OverviewPatient",
      "OverviewRisks",
      "OverviewRecommendations",
      "ecg_chart",
      "ecg_stat",
      "InspectionsTable",
    ]);
    setAvailableBlocks([
      "OverviewPatient",
      "OverviewRisks",
      "OverviewRecommendations",
      "ecg_chart",
      "ecg_stat",
      "InspectionsTable",
    ]);
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="row-span-3 flex flex-col gap-6 pr-[22px]">
        <OverviewPatient />
        <OverviewRecommendations />
        <OverviewRisks />
      </div>
      <div className="col-span-3">
        <ECGChart />
      </div>
      <div className="col-span-3">
        <ECGStat />
      </div>
    </div>
  );
};

ECG.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear", duration: 0.5, delay: 0.25 }}
        style={{ height: "100%" }}
      >
        {page}
      </motion.div>
    </DefaultLayout>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "inspections",
        "patients",
        "stats",
        "authorization",
        "ecg",
        "blocks",
      ])),
    },
  };
}

export default ECG;
