import { useTranslation } from "next-i18next";
import { useState } from "react";

import ButtonsHeader from "@components/UI/ButtonsHeader";
import EBox from "@components/UI/EBox";
import { EButtonProps } from "@components/UI/EButton";

import { useAppSelector } from "redux/hooks";

import { AppBlock } from "types";

import minimizeIcon from "@svg/minimize.svg";

import { useRisks } from "./hooks/useRisks";
import UIButton from "@components/UI/Button";

export interface OverviewRisksProps {
  className?: string;
}

const OverviewRisks: AppBlock<OverviewRisksProps> = ({ className }) => {
  const { t } = useTranslation("patients");

  const [minimized, setMinimized] = useState(true);
  const [group, setGroup] = useState(true);

  const patId = useAppSelector((state) => state.patients.currentPatientId);

  const risks = useRisks(patId, group);

  const buttons: EButtonProps[] = [
    {
      Icon: minimizeIcon,
      onClick: () => setMinimized(!minimized),
    },
  ];

  if (
    !useAppSelector((state) => state.window.open[OverviewRisks.block_name]) ||
    patId === -1
  )
    return <></>;

  return (
    <EBox
      className={`${className} p-2`}
      noCorners
      active
      header={<ButtonsHeader title={t("risks")} buttons={buttons} />}
    >
      <div className="flex flex-col">
        {!minimized && (
          <>
            <div className="flex max-h-[15vh] flex-col overflow-x-hidden overflow-y-scroll px-1">
              <div className="mt-2">
                {risks.map((r, i) => (
                  <div className="mb-2 flex flex-col" key={i}>
                    <span className="mt-1 text-alternate">
                      {new Date(r.datetime_created).toLocaleString()}
                    </span>
                    <span>{r.risk}</span>
                  </div>
                ))}
              </div>
            </div>
            <UIButton
              onClick={() => setGroup((p) => !p)}
              secondary={group}
              className="my-2 p-1"
            >
              {t(`group.${group ? "on" : "off"}`)}
            </UIButton>
          </>
        )}
      </div>
    </EBox>
  );
};

OverviewRisks.block_name = "OverviewRisks";

export default OverviewRisks;
