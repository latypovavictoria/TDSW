import { useTranslation } from "next-i18next";
import Image from "next/image";

import usePatient from "@api/hooks/patients/usePatient";

import EBox from "@components/UI/EBox";

import { AppBlock } from "types";

import { useAppSelector } from "redux/hooks";

export interface OverviewPatientProps {
  className?: string;
}

const OverviewPatient: AppBlock<OverviewPatientProps> = ({ className }) => {
  const { t } = useTranslation("patients");

  const patId = useAppSelector((state) => state.patients.currentPatientId);
  const { data: patient } = usePatient(patId);

  if (
    !useAppSelector((state) => state.window.open[OverviewPatient.block_name]) ||
    patId === -1 ||
    !patient
  )
    return <></>;

  return (
    <EBox className={`${className} flex flex-col px-4 pt-3`} notched active>
      <div className="flex w-full flex-row justify-between gap-2">
        <div className="flex flex-col">
          <span className="mb-2">
            {patient.user.json_data?.lastName}{" "}
            {patient.user.json_data?.firstName}
          </span>
          <span>
            {t("sex.title")} -{" "}
            {patient.user.sex == 1 ? t("sex.male") : t("sex.female")}
          </span>
          <span>
            {t("birthdate")} - {patient.user.birthday}
          </span>
          <span>
            {t("weight")} - {patient.user.json_data?.weight}
            {t("w_units")}
          </span>
          <span>
            {t("height")} - {patient.user.json_data?.height}
          </span>
          <span>
            {t("insurance")} - {patient.user.insure_number}
          </span>
          <span className="mb-2">
            {t("phone")} - {patient.user.phone}
          </span>
        </div>
        {patient.user.avatar && (
          <EBox borderless className="mb-auto aspect-square w-1/3">
            <Image
              alt={patient.user.json_data?.firstName || undefined}
              src={
                patient.user.avatar.startsWith("http")
                  ? patient.user.avatar
                  : `data:image/png;base64,${
                      patient.user.avatar[0] == "b"
                        ? patient.user.avatar.split("'")[1]
                        : patient.user.avatar.split("'")[0]
                    }`
              }
              className="border border-black"
              layout="fill"
            />
          </EBox>
        )}
      </div>
    </EBox>
  );
};

OverviewPatient.block_name = "OverviewPatient";

export default OverviewPatient;
