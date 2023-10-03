import { useMemo } from "react";

import { Risk, useAllRisks } from "./useAllRisks";

const filterByTown = (townName: string) => (e: Risk) =>
  e.organization === townName;

const filterUnique = (events: Risk[]) => (e: Risk, index: number) =>
  events.findIndex((ev) => e.patient_id === ev.patient_id) === index;

export function useFilteredEvents(
  filterActive: boolean,
  activeTown: number | undefined,
  townNames: string[],
  townIds: number[]
) {
  const events = useAllRisks();

  const filteredEvents = useMemo(() => {
    if (!activeTown) return events;
    const townName = townNames[townIds.indexOf(activeTown)];

    let filtered = events;

    filtered = filtered.filter(filterByTown(townName));

    if (filterActive) {
      filtered = filtered.filter(filterUnique(events));
    }

    return filtered;
  }, [events, filterActive, activeTown, townNames, townIds]);

  return filteredEvents;
}
