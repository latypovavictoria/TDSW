import { Bar } from "react-chartjs-2";
import { useChartData } from "./hooks/useChartData";
import { useOrganizations } from "./hooks/useOrganizations";

const BarStat = () => {
  const organizations = useOrganizations();

  const { data, options } = useChartData(organizations);

  return <Bar data={data} height={"300%"} width={"400%"} options={options} />;
};

export default BarStat;
