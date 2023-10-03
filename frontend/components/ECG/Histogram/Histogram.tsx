import { useTranslation } from "next-i18next";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { HGramChart } from "./HGramChart";

const Histogram = () => {
  const { t } = useTranslation("ecg");

  const loading = useAppSelector((state) => state.ecg.statLoading);

  if (loading) {
    return <span>{t("loading")}</span>;
  }

  return <HGramChart />;
};

export default Histogram;
