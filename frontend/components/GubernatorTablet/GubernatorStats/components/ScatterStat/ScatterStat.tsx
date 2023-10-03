import { useAppSelector } from "redux/hooks";

import ScatterChart from "./components/ScatterChart/ScatterChart";

import { useChartData } from "./hooks/useChartData";

const ScatterStat = () => {
  const activeTown = useAppSelector((state) => state.admStat.activeTown);

  const overall_chart = useChartData(
    activeTown ?? -1,
    "count_inspections",
    "overall"
  );

  const alcohol_chart = useChartData(
    activeTown ?? -1,
    "count_alcohol",
    "alcohol"
  );

  const pressure_chart = useChartData(
    activeTown ?? -1,
    "count_pressure",
    "pressure"
  );

  return (
    <div className="d-flex flex-column">
      <ScatterChart total_label="overall_total" {...overall_chart} />

      <ScatterChart total_label="alcohol_total" {...alcohol_chart} />

      <ScatterChart total_label="pressure_total" {...pressure_chart} />
    </div>
  );
};

export default ScatterStat;
