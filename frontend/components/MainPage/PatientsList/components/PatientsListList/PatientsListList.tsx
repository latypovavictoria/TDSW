import { useTranslation } from "next-i18next";
import { Dispatch, SetStateAction, useState, useMemo } from "react";
import { warning } from "utils/toast";

import usePatientList from "@api/hooks/patients/usePatientList";
import { filterPatient } from "../../helpers/filterPatient";

import Search from "../Search";
import Patient from "../Patient";

// TODO: Зачем они приходят из мне если функционально используются тут ?
export interface PatientsListListProps {
  setDetachingPatient: Dispatch<SetStateAction<number>>;
}

function PatientsListList(props: PatientsListListProps) {
  const { t } = useTranslation("patients");

  const { data } = usePatientList();
  const [filter, setFilter] = useState<string>("");

  const filteredList = useMemo(() => {
    if (!data) return [];
    return data.result.filter((p) => filterPatient(filter, p.user));
  }, [data, filter]);

  return (
    <>
      <Search
        placeholder={t("search")}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onFocus={() =>
          warning(
            "Функционал находится в активной разработке и может работать нестабильно"
          )
        }
      />
      <div className="z-10 mt-2 flex-grow basis-0 overflow-x-hidden overflow-y-scroll px-1">
        {filteredList.map((_pat) => {
          const patient = _pat.user;
          const inspections_short_info = _pat.inspections_short_info;
          return (
            <Patient
              key={patient.id}
              id={patient.id}
              tid={patient.tid}
              sex={patient.sex}
              firstName={patient.json_data?.firstName}
              lastName={patient.json_data?.lastName}
              inspections_short_info={inspections_short_info}
              DetachPatient={() => {
                props.setDetachingPatient(patient.id);
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default PatientsListList;
