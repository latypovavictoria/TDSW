import { useTranslation } from "next-i18next";

import EBox from "@components/UI/EBox";
import { AppBlock } from "types";

import BarStat from "./components/BarStat";
import HighestStat from "./components/HighestStat";
import PieChart from "./components/PieChart";
import ScatterStat from "./components/ScatterStat";

const GubernatorStats: AppBlock = () => {
  const { t } = useTranslation("admin");

  return (
    <EBox
      className="p-4"
      header={<span className="p-4">{t("stats.title")}</span>}
    >
      <div className="mx-4 flex flex-col items-center gap-4 overflow-hidden sm:flex-row sm:justify-between">
        <div>
          <PieChart />
        </div>
        <div>
          <BarStat />
        </div>
        <div>
          <HighestStat />
        </div>
      </div>
      <div className="mt-4 border-t border-t-[#4dffff]">
        <ScatterStat />
      </div>
    </EBox>
  );
};

GubernatorStats.block_name = "GubernatorStats";

export default GubernatorStats;
