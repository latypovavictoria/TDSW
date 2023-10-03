import { useTranslation } from "next-i18next";
import { useState } from "react";

import ButtonsHeader from "@components/UI/ButtonsHeader";
import EBox from "@components/UI/EBox";
import { EButtonProps } from "@components/UI/EButton";

import { AppBlock } from "types";

import { useAppSelector } from "redux/hooks";

import minimizeIcon from "@svg/minimize.svg";

import { useRecommendations } from "./hooks/useRecommendations";
import UIButton from "@components/UI/Button";

export interface OverviewRecommendationsProps {
  className?: string;
}

const OverviewRecommendations: AppBlock<OverviewRecommendationsProps> = ({
  className,
}) => {
  const { t } = useTranslation("patients");

  const [minimized, setMinimized] = useState(true);
  const [group, setGroup] = useState(true);

  const patId = useAppSelector((state) => state.patients.currentPatientId);

  const recs = useRecommendations(patId, group);

  const buttons: EButtonProps[] = [
    {
      Icon: minimizeIcon,
      onClick: () => setMinimized(!minimized),
    },
  ];

  if (
    !useAppSelector(
      (state) => state.window.open[OverviewRecommendations.block_name]
    ) ||
    patId === -1
  )
    return <></>;

  return (
    <EBox
      className={`${className} p-2`}
      noCorners
      active
      header={<ButtonsHeader title={t("recommendations")} buttons={buttons} />}
    >
      <div className="flex flex-col">
        {!minimized && (
          <>
            <div className="flex max-h-[15vh] flex-col overflow-x-hidden overflow-y-scroll px-1">
              <div className="mt-2">
                {recs.map((r, i) => (
                  <div className="mb-2 flex flex-col" key={i}>
                    <span className="mt-1 text-alternate">
                      {new Date(r.datetime_created).toLocaleString()}
                    </span>
                    <span>{r.recommendation}</span>
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

OverviewRecommendations.block_name = "OverviewRecommendations";

export default OverviewRecommendations;
