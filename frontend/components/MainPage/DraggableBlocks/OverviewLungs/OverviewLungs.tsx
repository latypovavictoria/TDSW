import { useTranslation } from "next-i18next";
import { useState } from "react";

import ButtonsHeader from "@components/UI/ButtonsHeader";
import DBox from "@components/UI/DBox/DBox";
import { EButtonProps } from "@components/UI/EButton";

import { AppBlock } from "types";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setClosed } from "redux/reducers/nav/winSlice";

import closeIcon from "@svg/close.svg";
import minimizeIcon from "@svg/minimize.svg";

import { getLungsPosition } from "./helpers/getLungsPosition";

const OverviewLungs: AppBlock = () => {
  const { t } = useTranslation("patients");
  const dispatch = useAppDispatch();

  const [minimized, setMinimized] = useState(false);
  const patId = useAppSelector((state) => state.patients.currentPatientId);

  const lungsPosition = getLungsPosition();

  const closeWindow = () => {
    dispatch(setClosed(OverviewLungs.block_name));
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
    !useAppSelector((state) => state.window.open[OverviewLungs.block_name]) ||
    patId === -1
  )
    return <></>;

  return (
    <DBox
      startPoint={lungsPosition()}
      header={<ButtonsHeader title={t("lungs")} buttons={buttons} />}
      className="p-2"
    >
      <>
        {!minimized && (
          <div className="flex w-full justify-between">
            <span>spO2</span>
            <span>99%</span>
          </div>
        )}
      </>
    </DBox>
  );
};

OverviewLungs.block_name = "OverviewLungs";

export default OverviewLungs;
