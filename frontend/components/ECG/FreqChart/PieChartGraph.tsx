import { ChartData, ChartOptions } from "chart.js";
import { useTranslation } from "next-i18next";
import { Pie } from "react-chartjs-2";
import { useAppSelector } from "../../../redux/hooks";

const FreqChartGraph = () => {
  const storeData = useAppSelector((state) => state.ecg.freqPower);
  const { t } = useTranslation("ecg");

  if (!storeData.HF || !storeData.LF || !storeData.VLF)
    return <span>{t("noData")}</span>;

  const data: ChartData<"pie"> = {
    labels: ["HF", "LF", "VLF"],
    datasets: [
      {
        data: [storeData.HF, storeData.LF, storeData.VLF],
        backgroundColor: [
          "rgb(4, 223, 255)",
          "rgb(255, 31, 138)",
          "rgb(255, 230, 31)",
        ],
        hoverBackgroundColor: [
          "rgb(4, 223, 255)",
          "rgb(255, 31, 138)",
          "rgb(255, 230, 31)",
        ],
        borderWidth: 0,
        hoverOffset: 0,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    rotation: 90,
    plugins: {
      legend: {
        labels: {
          color: "rgb(4, 223, 255)",
        },
      },
      datalabels: {
        color: "black",
        formatter(value, _) {
          try {
            value = parseFloat(value).toFixed(2);
          } catch {
            // ignore
          }
          return value;
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Pie
      style={{
        backgroundColor: "rgb(8, 64, 72)",
        maxHeight: "40vh",
      }}
      data={data}
      options={options}
    />
  );
};

export default FreqChartGraph;
