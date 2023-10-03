import DBox from "@components/UI/DBox/DBox";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import ButtonsHeader from "@components/UI/ButtonsHeader/ButtonsHeader";
import { EButtonProps } from "@components/UI/EButton/EButton";

import type { AppBlock } from "types";

import Graph from "./components/Graph";

import { getHeartPosition } from "./helpers/getHeartPosition";

import useDataWithSocket from "./hooks/useDataWithSocket";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setClosed } from "redux/reducers/nav/winSlice";

import closeIcon from "@svg/close.svg";
import minimizeIcon from "@svg/minimize.svg";
import UIButton from "@components/UI/Button";

export interface OverviewECGProps {
  className?: string;
}

const OverviewECG: AppBlock<OverviewECGProps> = ({ className }) => {
  const { t } = useTranslation("patients");
  const patId = useAppSelector((state) => state.patients.currentPatientId);

  const dispatch = useAppDispatch();
  const [minimized, setMinimized] = useState(false);

  const [active, setActive] = useState(false);

  const { data, graphData } = useDataWithSocket(patId, active);

  const closeWindow = () => {
    dispatch(setClosed(OverviewECG.block_name));
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

  const heartPosition = getHeartPosition();

  if (
    !useAppSelector((state) => state.window.open[OverviewECG.block_name]) ||
    patId == -1
  )
    return <></>;

  return (
    <DBox
      className={`${className} d-flex flex-column p-2`}
      twoCorners
      header={<ButtonsHeader title={t("ecg")} buttons={buttons} />}
      startPoint={heartPosition()}
    >
      <>
        {!minimized && (
          <div className="flex flex-col">
            {active ? (
              <Graph active={active} graphData={graphData} />
            ) : (
              <span className="mx-auto my-3">{t("pickUpNotActive")}</span>
            )}

            <UIButton
              onClick={() => {
                setActive(!active);
              }}
              className="mt-2"
            >
              {t(!active ? "startPickUp" : "stopPickUp")}
            </UIButton>
            <div className="mt-3 flex flex-col px-2">
              <div className="flex flex-row">
                <span className="mr-1">
                  {!active ? t("averagePulse") : t("currentPulse")}
                </span>
                <span className="ml-auto">
                  {data?.hr
                    ? `${Math.round(data.hr)} ${t("bps")}`
                    : t("noData")}
                </span>
              </div>
              <div className="mt-1 flex flex-row">
                <span className="mr-1">{t("arithmiaPresence")}</span>
                <span className="ml-auto">
                  {data?.events !== undefined
                    ? data.events
                      ? t("yes")
                      : t("no")
                    : t("noData")}
                </span>
              </div>
            </div>
          </div>
        )}
      </>
    </DBox>
  );
};

OverviewECG.block_name = "OverviewECG";

export default OverviewECG;
