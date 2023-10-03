import { ChartData, ChartOptions } from "chart.js";
import Image from "next/image";
import { FC } from "react";
import { Line } from "react-chartjs-2";

import nArrow from "@svg/negative_arrow.svg";
import pArrow from "@svg/positive_arrow.svg";

export interface MiniGraphProps {
  chartData: {
    values: number[];
    min?: number;
    max?: number;
  };
  headValue?: string;
  grow?: boolean;
  className?: string;
  title?: string;
}

const MiniGraph: FC<MiniGraphProps> = ({
  chartData,
  headValue,
  grow,
  title,
  className,
}) => {
  const data: ChartData<"line"> = {
    labels: chartData.values?.map((_, i) => i),
    datasets: [
      {
        label: "first",
        data: chartData.values,

        borderWidth: 1,
        borderColor: grow ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) {
            return undefined;
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(
            0,
            grow ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
          );
          gradient.addColorStop(1, "rgb(0, 42, 51)");
          return gradient;
        },
        pointRadius: 0,
        pointHitRadius: 0,
        fill: "origin",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
        suggestedMax: chartData.max,
        suggestedMin: chartData.min,
      },
      x: {
        display: false,
      },
    },
    aspectRatio: 1,
  };

  return (
    <div className={`relative flex flex-col ${className}`}>
      <span className="absolute mt-6 w-full text-center text-2xl font-bold">
        {headValue}
      </span>

      <span className="w-full truncate text-center">{title}</span>

      <div className="flex border border-[#4dffff]">
        <Line data={data} options={options} />
      </div>

      <span className="mx-auto mt-2">
        <Image src={grow ? pArrow : nArrow} alt="Grow arrow" />
      </span>
    </div>
  );
};

export default MiniGraph;
