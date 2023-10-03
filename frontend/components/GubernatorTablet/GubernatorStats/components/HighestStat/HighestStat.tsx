import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { dispatchActivePatient } from "@components/MainPage/PatientsList/helpers/dispatchActivePatient";

import { useAppSelector } from "redux/hooks";

import { useSlicedBadGuys } from "./hooks/useSlicedBadGuys";

const HighestStat = () => {
  const { t } = useTranslation("admin");

  const orgId = useAppSelector((state) => state.admStat.activeTown);
  const listOfBadGuys = useSlicedBadGuys(orgId);

  const router = useRouter();

  const onClick = (id: number) => () => {
    dispatchActivePatient(id);
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="mb-2 text-lg">{t("high_stat_header")}</span>
      {listOfBadGuys.map((dt) => (
        <div
          key={dt.patient_id}
          className="flex cursor-pointer flex-row gap-1"
          onClick={onClick(dt.patient_id)}
        >
          <span>
            {dt.last_name} {dt.first_name}
          </span>
          {dt.tid ? <span className="text-alternate">#{dt.tid}</span> : ""}
          <span className="ml-auto text-red-500">{dt.danger}</span>
          <span className="text-orange-400">{dt.warning}</span>
        </div>
      ))}
    </div>
  );
};

export default HighestStat;
