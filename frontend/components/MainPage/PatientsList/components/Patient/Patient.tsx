import { FC } from "react";
import { LinkOffSharp } from "@mui/icons-material";
import classNames from "classnames";
import Image from "next/image";
import mOutline from "@svg/mOutline.svg";
import wOutline from "@svg/wOutline.svg";
import styles from "../../PatientsList.module.css";
import EBox from "@components/UI/EBox";
import { dispatchActivePatient } from "../../helpers/dispatchActivePatient";
import { useAppSelector } from "redux/hooks";

export interface PatientProps {
  tid?: string | null;
  lastName?: string | null;
  firstName?: string | null;
  sex?: number | null;
  id: number;
  inspections_short_info: {
    danger_inspections_count: number;
    warn_inspections_count: number;
    ok_inspections_count: number;
    inspections_count: number;
  };
  DetachPatient: () => void;
}

const Patient: FC<PatientProps> = ({
  lastName,
  firstName,
  tid,
  sex,
  id,
  inspections_short_info,
  DetachPatient,
}) => {
  const patId = useAppSelector((state) => state.patients.currentPatientId);
  const last = lastName ?? "Данные отсутствуют";
  const first = firstName ?? "Данные отсутствуют";
  return (
    <EBox
      notched
      active={patId == id}
      className="mt-1 mb-2 flex cursor-pointer items-center px-4"
      onClick={() => dispatchActivePatient(id)}
    >
      <div className="flex flex-col gap-1">
        <span>
          {last} {first}
        </span>
        {tid && <span className="text-alternate">#{tid}</span>}
      </div>
      <span className="ml-auto">
        <span className="text-green-500">
          {inspections_short_info.ok_inspections_count +
            inspections_short_info.warn_inspections_count}
        </span>
        <span className="mx-1">-</span>
        <span className="text-red-500">
          {inspections_short_info.danger_inspections_count}
        </span>
      </span>

      <span
        className={classNames(
          "ml-3",
          "mt-2",
          "-mb-6",
          "-mt-6",
          styles.icon_allowed
        )}
      >
        <Image
          // width={80}
          // height={130}
          alt="person-icon"
          src={sex == 1 ? mOutline : wOutline}
        />
      </span>

      <span className="ml-2" onClick={DetachPatient}>
        <LinkOffSharp />
      </span>
    </EBox>
  );
};

export default Patient;
