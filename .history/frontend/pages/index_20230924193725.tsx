// import HumanModel from "@components/UI/HumanModel";
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement, useEffect } from "react";

// import OverviewECG from "@components/MainPage/DraggableBlocks/OverviewECG";
// import OverviewLungs from "@components/MainPage/DraggableBlocks/OverviewLungs";
// import OverviewPulseGraph from "@components/MainPage/DraggableBlocks/OverviewPulseGraph";
// import OverviewStress from "@components/MainPage/DraggableBlocks/OverviewStress";
// import InspectionsTable from "@components/MainPage/InspectionsTable";
// import OverviewStats from "@components/MainPage/OverviewStats";
// import OverviewPatient from "@components/MainPage/PatientInfo/OverviewPatient";
// import OverviewRecommendations from "@components/MainPage/PatientInfo/OverviewRecommendations";
// import OverviewRisks from "@components/MainPage/PatientInfo/OverviewRisks";
// import PList from "@components/MainPage/PatientsList";

import DefaultLayout, { variants } from "layouts/default";

import { useAppSelector } from "redux/hooks";
import { setAvailable, setList } from "redux/reducers/nav/winSlice";
import { store } from "redux/store";

import type { block_names, NextPageWithLayout } from "types";
import Head from "next/head";
import { useTranslation } from "next-i18next";

export const setActiveBlocks = (blocks: block_names[]) => {
  const dispatch = store.dispatch;
  dispatch(setList(blocks));
};

export const setAvailableBlocks = (blocks: block_names[]) => {
  const dispatch = store.dispatch;
  dispatch(setAvailable(blocks));
};

const Home: NextPageWithLayout = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");

  const { t } = useTranslation("common");

  useEffect(() => {
    setAvailableBlocks([
      "OverviewStats",
      "PatientsList",
      "OverviewPatient",
      "OverviewRisks",
      "OverviewRecommendations",
      "OverviewECG",
      "OverviewPulseGraph",
      "InspectionsTable",
      "OverviewStress",
    ]);

    setActiveBlocks([
      "OverviewStats",
      "PatientsList",
      "OverviewPatient",
      "OverviewRisks",
      "OverviewRecommendations",
      "InspectionsTable",
    ]);

    if (isMobile) {
      setActiveBlocks([
        "OverviewECG",
        "OverviewPulseGraph",
        "OverviewLungs",
        "OverviewStress",
      ]);
    }
  }, [isMobile]);

  const open = useAppSelector((state) => state.window.open);
  const sideOpen = open[OverviewStats.block_name] || open[PList.block_name];

  const patInfo = (
    <>
      <div className="flex flex-col gap-2">
        <OverviewPatient />
        <OverviewRisks />
        <OverviewRecommendations />
      </div>
    </>
  );

  return (
    <>
      <Head>
        <title>{t("page_title", { page: "avatar" })}</title>
      </Head>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-4">
        <div className="flex flex-col gap-4">
          <OverviewStats />
          <PList />
        </div>
        <div className={`sm:col-span-${sideOpen ? 3 : 4} flex flex-col gap-4`}>
          <div
            className={`flex flex-col gap-4 sm:grid ${sideOpen ? "sm:grid-cols-3" : "sm:grid-cols-4"
              } [&>*]:flex-1`}
          >
            {patInfo}
            <div
              className={`hidden sm:block ${sideOpen ? "sm:col-span-1" : "sm:col-span-2"
                }`}
            >
              <HumanModel />
            </div>
            <div className="flex flex-col gap-2 sm:[&>*]:absolute">
              <OverviewStress />
              <OverviewLungs />
              <OverviewECG />
              <OverviewPulseGraph />
            </div>
          </div>
          <div>
            <InspectionsTable />
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => (
  <DefaultLayout>
    <div style={{ height: "100%" }}>
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
    </div>
  </DefaultLayout>
);

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "inspections",
        "patients",
        "stats",
        "authorization",
        "blocks",
      ])),
    },
  };
}

export default Home;
