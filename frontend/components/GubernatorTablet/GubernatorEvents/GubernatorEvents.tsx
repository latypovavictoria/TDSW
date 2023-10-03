import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

import EBox from "@components/UI/EBox";

import { useAppDispatch } from "redux/hooks";
import { setActiveTown } from "redux/reducers/adminStat/admStatSlice";
import { setActivePatient } from "redux/reducers/patients/patientsSlice";

import { AppBlock } from "types";

import Event from "./components/Event";
import Header from "./components/Header";

import { useActiveTown } from "./hooks/useActiveTown";
import { useFilteredEvents } from "./hooks/useFilteredRisks";
import { useTownNamesAndIds } from "./hooks/useTownNamesAndIds";
import UIButton from "@components/UI/Button";

const GubernatorEvents: AppBlock = () => {
  const { t } = useTranslation("admin");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [filterActive, setFilterActive] = useState(true);
  const { townNames, townIds } = useTownNamesAndIds();
  const activeTown = useActiveTown(townIds);
  const filteredEvents = useFilteredEvents(
    filterActive,
    activeTown,
    townNames,
    townIds
  );

  const switchPatient = (id: number) => {
    dispatch(setActivePatient(id));
    router.push("/");
  };

  const setTown = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setActiveTown(parseInt(e.target.value)));
  };

  const switchFilter = () => setFilterActive(!filterActive);

  const filterTitle = filterActive
    ? "events.filter.show"
    : "events.filter.hide";

  return (
    <EBox
      header={<Header activeTown={activeTown} setTown={setTown} />}
      className="flex flex-grow flex-col p-4"
    >
      <UIButton secondary className="mt-2" onClick={switchFilter}>
        {t(filterTitle)}
      </UIButton>
      <div className="my-2 flex flex-grow basis-0 flex-col gap-2 overflow-y-auto overflow-x-hidden p-2">
        {filteredEvents.map((e, index) => (
          <Event event={e} switchPatient={switchPatient} key={index} />
        ))}
      </div>
    </EBox>
  );
};

GubernatorEvents.block_name = "GubernatorEvents";

export default GubernatorEvents;
