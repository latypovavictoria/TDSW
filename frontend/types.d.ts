import type { FC } from "react";
import type { NextPage } from "next";

export type AppBlock<T = object> = FC<T> & { block_name: block_names };

export type block_names =
  // General
  | "main_nav_bar"
  | "side_bar"
  // Admin Page
  | "GubernatorEvents"
  | "GubernatorMap"
  | "GubernatorStats"
  // ECG Page
  | "ecg_chart"
  | "ecg_stat"
  // Main Page
  | "OverviewPatient"
  | "OverviewRecommendations"
  | "OverviewRisks"
  | "OverviewPulseGraph"
  | "OverviewLungs"
  | "OverviewStress"
  | "OverviewECG"
  | "InspectionsTable"
  | "OverviewStats"
  | "PatientsList";

export type NextPageWithLayout = NextPage & {
  getLayout?: (_: ReactElement) => ReactNode;
};
