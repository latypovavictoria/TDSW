import { ChartData, ChartOptions } from "chart.js";
import { useTranslation } from "next-i18next";
import React from "react";
import { Line } from "react-chartjs-2";
import { useAppSelector } from "../../../redux/hooks";

export const HGramChart = () => {
  const storeData = useAppSelector((state) => state.ecg.hgram.data);
  const gates = useAppSelector((state) => state.ecg.hgram.gates);
  const { t } = useTranslation("ecg");

  if (storeData.length == 0) return <span>{t("noData")}</span>;

  const start = gates.reduce((acc, curr) => {
    return Math.min(acc, curr.start);
  }, Number.MAX_SAFE_INTEGER);
  const end = gates.reduce((acc, curr) => {
    return Math.max(acc, curr.end);
  }, Number.MIN_SAFE_INTEGER);

  const labels = [];
  for (let i = start; i <= end; i++) {
    labels.push(i);
  }

  const data: ChartData<"line"> = {
    labels,
    datasets: storeData
      .map((d) => ({
        backgroundColor: "rgb(4, 223, 255)",
        borderColor: "rgb(4, 223, 255)",
        pointRadius: 0,
        pointHitRadius: 0,
        fill: true,
        data: [
          {
            y: d.value,
            x: d.start,
          },
          {
            y: d.value,
            x: d.end,
          },
        ],
      }))
      .concat(
        gates.map((g) => {
          let color;

          switch (g.level) {
            case "danger":
              color = "rgba(255, 31, 138, 0.3)";
              break;
            case "warn":
              color = "rgba(255, 230, 31, 0.3)";
              break;
            case "ok":
              color = "rgb(8, 255, 150, 0.3)";
              break;
            default:
              color = "rgba(0, 0, 0, 0)";
          }

          return {
            backgroundColor: color,
            borderColor: color,
            pointRadius: 0,
            pointHitRadius: 0,
            fill: true,
            data: [
              {
                y: 1.1,
                x: g.start,
              },
              {
                y: 1.1,
                x: g.end,
              },
            ],
          };
        })
      ),
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgb(4, 223, 255)",
          callback: (value: string | number) => {
            if (typeof value === "string") {
              value = parseInt(value);
            }
            if ((value + start) % 100 == 0) {
              return value + start;
            }
            return undefined;
          },
        },
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          color: "rgb(4, 223, 255)",
        },
        grid: {
          color: "rgb(100, 120, 140)",
        },
      },
    },
  };

  return (
    <Line
      style={{
        backgroundColor: "rgb(8, 64, 72)",
        maxHeight: "40vh",
      }}
      data={data}
      options={options}
    />
  );
};
