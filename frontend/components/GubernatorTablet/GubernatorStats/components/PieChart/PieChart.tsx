import { Pie } from "react-chartjs-2";

import { useChartData } from "./hooks/useChartData";

const PieChart = () => {
  const { data, options } = useChartData();

  return <Pie style={{ height: "35%" }} data={data} options={options} />;
};

export default PieChart;
