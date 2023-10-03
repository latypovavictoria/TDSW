import { motion } from "framer-motion";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement, useEffect } from "react";

import GubernatorStats from "@components/GubernatorTablet/GubernatorStats";
import GubernatorEvents from "@components/GubernatorTablet/GubernatorEvents";
import GubernatorMap from "@components/GubernatorTablet/GubernatorMap";

import { NextPageWithLayout } from "types";

import DefaultLayout, { variants } from "layouts/default";

import { setActiveBlocks, setAvailableBlocks } from ".";
import OverviewStats from "@components/MainPage/OverviewStats";
import Head from "next/head";
import { useTranslation } from "next-i18next";

const AdminBoard: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  useEffect(() => {
    setActiveBlocks([
      "GubernatorMap",
      "GubernatorEvents",
      "GubernatorStats",
      "OverviewStats",
    ]);
    setAvailableBlocks([
      "OverviewStats",
      "GubernatorMap",
      "GubernatorEvents",
      "GubernatorStats",
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>{t("page_title", { page: "admBoard" })}</title>
      </Head>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="sm:col-span-3">
          <GubernatorMap />
        </div>
        <div className="flex flex-col gap-2">
          <OverviewStats />
          <GubernatorEvents />
        </div>
        <div className="sm:col-span-4">
          <GubernatorStats />
        </div>
      </div>
    </>
  );
};

AdminBoard.getLayout = (page: ReactElement) => {
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

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "patients",
        "inspections",
        "admin",
        "stats",
        "blocks",
      ])),
    },
  };
}

export default AdminBoard;
