import { useTranslation } from "next-i18next";
import { useState } from "react";

import dettach from "@api/v2/patients/dettach/doctor";
import { mutatePatientList } from "@api/hooks/patients/usePatientList";

import EBox from "@components/UI/EBox";
import { EButtonProps } from "@components/UI/EButton";
import ButtonsHeader from "@components/UI/ButtonsHeader";

import { AppBlock } from "types";

import PatientsListList from "./components/PatientsListList";
import AddPatient from "./components/AddPatient";
import DetachPatient from "./components/DetachPatient";
import AttachPatient from "./components/AttachPatient";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setClosed } from "../../../redux/reducers/nav/winSlice";

import closeIcon from "@svg/close.svg";
import linkIcon from "@svg/linkIcon.svg";
import minimizeIcon from "@svg/minimize.svg";
import plusIcon from "@svg/plusIcon.svg";

type modes = "list" | "attach";

export interface PatientsListProps {
  className?: string;
}

const PatientsList: AppBlock<PatientsListProps> = ({ className }) => {
  const { t } = useTranslation("patients");
  const dispatch = useAppDispatch();

  const [minimized, setMinimized] = useState(false);

  const windowClose = () => {
    dispatch(setClosed(PatientsList.block_name));
  };

  const [addingNew, setAddingNew] = useState(false);
  const [detachingPatient, setDetachingPatient] = useState(-1);
  const [mode, setMode] = useState<modes>("list");

  if (!useAppSelector((state) => state.window.open[PatientsList.block_name]))
    return <></>;

  const buttons: EButtonProps[] = [
    {
      Icon: plusIcon,
      onClick: () => {
        setAddingNew(true);
      },
    },
    {
      Icon: linkIcon,
      onClick: () => {
        setMode("attach");
      },
    },
    {
      Icon: minimizeIcon,
      onClick: () => setMinimized(!minimized),
    },
    {
      Icon: closeIcon,
      onClick: () => windowClose(),
    },
  ];

  return (
    <>
      <AddPatient
        onCancel={() => {
          setAddingNew(false);
          mutatePatientList();
        }}
        onClose={() => setAddingNew(false)}
        show={addingNew}
      />

      <DetachPatient
        onClose={() => setDetachingPatient(-1)}
        onSubmit={async () => {
          await dettach(detachingPatient);
          mutatePatientList();
          setDetachingPatient(-1);
        }}
        show={detachingPatient !== -1}
      />

      <EBox
        header={ButtonsHeader({
          title: mode != "list" ? t("a_title") : t("s_title"),
          buttons: buttons,
        })}
        className={`${className} z-10 flex flex-col p-2 ${
          !minimized ? "flex-grow" : ""
        }`}
      >
        <div
          className={`flex flex-grow flex-col ${
            !minimized ? "min-h-[50vh]" : ""
          }`}
        >
          {minimized ? (
            <></>
          ) : mode === "list" ? (
            <PatientsListList setDetachingPatient={setDetachingPatient} />
          ) : mode === "attach" ? (
            <AttachPatient
              onCancel={() => {
                mutatePatientList();
                setMode("list");
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </EBox>
    </>
  );
};

PatientsList.block_name = "PatientsList";

export default PatientsList;
