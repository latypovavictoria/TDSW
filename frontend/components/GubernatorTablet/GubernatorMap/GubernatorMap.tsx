import { useTranslation } from "next-i18next";
import { useState } from "react";

import { mutateAllOrganizations } from "@api/hooks/organizations/useAllOrganizations";

import ButtonsHeader from "@components/UI/ButtonsHeader";
import EBox from "@components/UI/EBox";
import { EButtonProps } from "@components/UI/EButton";

import { AppBlock } from "types";

import plusIcon from "@svg/plusIcon.svg";

import CreateOrganization from "./components/CreateOrganization";
import MapNavigation from "./components/MapNavigation";
import RawMap from "./components/RawMap";

const GubernatorMap: AppBlock = () => {
  const { t } = useTranslation("admin");

  const [addingNew, setAddingNew] = useState(false);

  const buttons: EButtonProps[] = [
    {
      Icon: plusIcon,
      onClick: () => {
        setAddingNew(true);
      },
    },
  ];

  const onClose = () => setAddingNew(false);

  return (
    <EBox
      header={<ButtonsHeader title={t("map.title")} buttons={buttons} />}
      className="p-4"
    >
      <CreateOrganization
        open={addingNew}
        onClose={onClose}
        onSuccess={mutateAllOrganizations}
      />

      <div className="mt-2 flex h-full grid-cols-4 flex-col place-content-stretch justify-items-stretch gap-4 sm:grid sm:grid-flow-row">
        <div className="sm:col-span-3">
          <RawMap />
        </div>
        <div className="flex flex-col">
          <div className="flex-grow basis-0 overflow-y-scroll">
            <MapNavigation />
          </div>
        </div>
      </div>
    </EBox>
  );
};

GubernatorMap.block_name = "GubernatorMap";

export default GubernatorMap;
