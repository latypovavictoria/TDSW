import { ChartData, ChartOptions } from "chart.js";
import { useTranslation } from "next-i18next";
import { Scatter } from "react-chartjs-2";

export interface ScatterChartProps {
  data: ChartData<"scatter", { x: string; y: number }[], unknown>;
  options: ChartOptions<"scatter">;
  total_label: string;
  total: number;
}

function ScatterChart(props: ScatterChartProps) {
  const { t } = useTranslation("admin");

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Scatter
        data={props.data}
        options={props.options}
        height={"300%"}
        className="my-1 pr-2 sm:max-w-[70vw] sm:border-r sm:border-r-[#4dffff]"
      />
      <div className="mx-auto flex flex-col">
        <h4 className="mx-auto mt-auto text-center">
          {t(`stat.${props.total_label}`)}
        </h4>
        <h3 className="mx-auto mb-auto mt-2">{props.total}</h3>
      </div>
    </div>
  );
}

export default ScatterChart;
