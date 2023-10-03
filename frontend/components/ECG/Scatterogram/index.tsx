import { ChartData, ChartOptions } from "chart.js";
import { useTranslation } from "next-i18next";
import { Scatter } from "react-chartjs-2";
import { useAppSelector } from "../../../redux/hooks";
import { scrollToIndex } from "../EventNavigator/EventNavigator";

const ECGScatter = () => {
  const { t } = useTranslation("ecg");

  const loading = useAppSelector((state) => state.ecg.statLoading);
  const data = useAppSelector((state) => state.ecg.scater.data);

  if (!loading && data.length === 0) {
    return <span>{t("noData")}</span>;
  }

  const indexes: number[] = [];

  const chartData: ChartData<"scatter"> = {
    datasets: [
      {
        label: "Scatter",
        data: data.map((d) => {
          indexes.push(d.index);
          return {
            x: d.pos[0],
            y: d.pos[1],
          };
        }),
        backgroundColor: "rgb(4, 223, 255)",
      },
    ],
  };

  const chartOptions: ChartOptions<"scatter"> = {
    onClick: (_e, els, _chart) => {
      const el = els[0];
      if (!el) return;
      const index = indexes[el.index];
      scrollToIndex(index);
    },
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
        grid: {
          color: "rgb(100, 120, 140)",
        },
        ticks: {
          color: "rgb(4, 223, 255)",
        },
      },
      y: {
        grid: {
          color: "rgb(100, 120, 140)",
        },
        ticks: {
          color: "rgb(4, 223, 255)",
        },
      },
    },
  };

  if (loading) {
    return <span>{t("loading")}</span>;
  }

  return (
    <Scatter
      style={{
        backgroundColor: "rgb(8, 64, 72)",
        maxHeight: "40vh",
      }}
      data={chartData}
      options={chartOptions}
    />
  );
};

export default ECGScatter;
