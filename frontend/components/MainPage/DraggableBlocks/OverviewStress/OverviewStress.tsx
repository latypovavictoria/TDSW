import { useTranslation } from "next-i18next";
import { useState } from "react";

import useECGAverages from "@api/hooks/inspections/useECGAverages";

import { AppBlock } from "types";

import ButtonsHeader from "@components/UI/ButtonsHeader";
import { EButtonProps } from "@components/UI/EButton";

import DBox from "@components/UI/DBox/DBox";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setClosed } from "redux/reducers/nav/winSlice";

import closeIcon from "@svg/close.svg";
import minimizeIcon from "@svg/minimize.svg";

import Progress from "./components/Progress";

import { getBrainPosition } from "./helpers/getBrainPosition";

const OverviewStress: AppBlock = () => {
  const { t } = useTranslation("patients");
  const { t: tb } = useTranslation("blocks");

  const dispatch = useAppDispatch();
  const [minimized, setMinimized] = useState(false);
  const patId = useAppSelector((state) => state.patients.currentPatientId);

  const { data, isValidating } = useECGAverages(patId);

  const closeWindow = () => {
    dispatch(setClosed(OverviewStress.block_name));
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

  const brainPosition = getBrainPosition();

  if (
    !useAppSelector((state) => state.window.open[OverviewStress.block_name]) ||
    patId == -1
  )
    return <></>;
  return (
    <DBox
      header={<ButtonsHeader title={tb("stress_stat")} buttons={buttons} />}
      twoCorners
      startPoint={brainPosition()}
      className="p-2"
    >
      <>
        {!minimized && (
          <div className="flex flex-col px-2">
            {isValidating && <div className="text-center">{t("loading")}</div>}
            {!isValidating && !data && (
              <div className="text-center">{t("noData")}</div>
            )}
            {data && (
              <>
                <div className="flex flex-row gap-2">
                  <span>{t("averageStress")}</span>
                  <Progress value={data.stress} />
                </div>
                <div className="mt-1 flex flex-row gap-2">
                  <span>{t("averageStamina")}</span>
                  <Progress value={data.total_power} />
                </div>
              </>
            )}
          </div>
        )}
      </>
    </DBox>
  );
};

OverviewStress.block_name = "OverviewStress";

export default OverviewStress;
