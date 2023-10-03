import { useTranslation } from "next-i18next";
import { useState } from "react";

import useInspectionStatistics from "@api/hooks/inspections/useInspectionStatistics";
import useWeekStatistics from "@api/hooks/inspections/useWeekStatistics";

import ButtonsHeader from "@components/UI/ButtonsHeader";
import EBox from "@components/UI/EBox";
import { EButtonProps } from "@components/UI/EButton";
import MiniGraph from "@components/UI/MiniGraph";

import { AppBlock } from "types";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setClosed } from "redux/reducers/nav/winSlice";

import closeIcon from "@svg/close.svg";
import minimizeIcon from "@svg/minimize.svg";

import useGraphsData from "./hooks/useGraphsData";
import useSortedWeeklyStats from "./hooks/useSortedWeeklyStats";
import useTotalMax from "./hooks/useTotalMax";

export interface OverviewStatsProps {
  className?: string;
}

const OverviewStats: AppBlock<OverviewStatsProps> = ({ className }) => {
  const { t } = useTranslation("stats");
  const dispatch = useAppDispatch();

  const [minimized, setMinimized] = useState(false);

  const { data: stats } = useInspectionStatistics();
  const { data: weeklyStats } = useWeekStatistics();

  const sortedData = useSortedWeeklyStats(weeklyStats);
  const data = useGraphsData(stats, sortedData, t);
  const totalMax = useTotalMax(data);

  const closeWindow = () => {
    dispatch(setClosed(OverviewStats.block_name));
  };

  const buttons: EButtonProps[] = [
    {
      Icon: minimizeIcon,
      onClick: () => setMinimized(!minimized),
    },
    {
      Icon: closeIcon,
      onClick: () => closeWindow(),
    },
  ];

  if (
    !useAppSelector((state) => state.window.open[OverviewStats.block_name]) ||
    !data
  )
    return <></>;

  return (
    <EBox
      header={ButtonsHeader({ title: t("title"), buttons })}
      className={`${className} w-full p-2`}
    >
      <>
        {!minimized && (
          <div className="grid grid-cols-4 gap-4">
            {data.map((s, index) => (
              <div key={index}>
                <MiniGraph
                  chartData={{
                    values: s.data,
                    min: 0,
                    max: totalMax,
                  }}
                  headValue={s.value.toString()}
                  grow={s.grow}
                  title={s.title}
                  className="max-w-full"
                />
              </div>
            ))}
          </div>
        )}
      </>
    </EBox>
  );
};

OverviewStats.block_name = "OverviewStats";

export default OverviewStats;
