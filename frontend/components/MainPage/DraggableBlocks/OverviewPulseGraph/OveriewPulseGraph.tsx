import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Line } from "react-chartjs-2";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setClosed } from "redux/reducers/nav/winSlice";

import { AppBlock } from "types";

import ButtonsHeader from "@components/UI/ButtonsHeader";
import DBox from "@components/UI/DBox/DBox";
import { EButtonProps } from "@components/UI/EButton";

import closeIcon from "@svg/close.svg";
import minimizeIcon from "@svg/minimize.svg";

import { useChartData } from "./hooks/useChartData";

const OverviewPulseGraph: AppBlock = () => {
  const { t } = useTranslation("inspections");

  const patId = useAppSelector((state) => state.patients.currentPatientId);
  const dispatch = useAppDispatch();

  const { chartData, chartOptions } = useChartData({
    patient_id: patId,
    inspection_type: "pre-shift",
    page: 1,
    recs_per_page: 10,
  });

  const [minimized, setMinimized] = useState(false);

  const buttons: EButtonProps[] = [
    {
      Icon: minimizeIcon,
      onClick: () => setMinimized(!minimized),
    },
    {
      Icon: closeIcon,
      onClick: () => dispatch(setClosed(OverviewPulseGraph.block_name)),
    },
  ];

  if (
    !useAppSelector(
      (state) => state.window.open[OverviewPulseGraph.block_name]
    ) ||
    patId === -1
  )
    return <></>;

  return (
    <DBox
      twoCorners
      className="p-2"
      header={<ButtonsHeader title={t("pGraph.title")} buttons={buttons} />}
    >
      <>
        {!minimized && (
          <Line
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            data={chartData}
            options={chartOptions}
          />
        )}
      </>
    </DBox>
  );
};

OverviewPulseGraph.block_name = "OverviewPulseGraph";

export default OverviewPulseGraph;
