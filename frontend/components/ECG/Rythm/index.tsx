import { ChartData, ChartOptions } from "chart.js";
import { useTranslation } from "next-i18next";
import { Bar } from "react-chartjs-2";
import { useAppSelector } from "../../../redux/hooks";
import { scrollToIndex } from "../EventNavigator/EventNavigator";

const ECGRythm = () => {
  const { t } = useTranslation("ecg");

  const loading = useAppSelector((state) => state.ecg.statLoading);
  const data = useAppSelector((state) => state.ecg.rythm);

  if (!loading && data.length === 0) {
    return <span>{t("noData")}</span>;
  }

  const chartData: ChartData<"bar"> = {
    labels: Array(data.length)
      .fill(0)
      .map((_, i) => i),
    datasets: [
      {
        label: t("value"),
        data: data.map((d) => d.value),
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        backgroundColor: "rgb(4,223,255)",
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    onClick: (_e, els, _chart) => {
      const el = els[0];
      if (!el) {
        return;
      }
      const index = data[el.index].index;
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
          color: "rgb(4,223,255)",
        },
      },
      y: {
        grid: {
          color: "rgb(100, 120, 140)",
        },
        ticks: {
          color: "rgb(4,223,255)",
        },
      },
    },
  };

  if (loading) {
    return <span>{t("loading")}</span>;
  }

  return (
    <Bar
      style={{
        backgroundColor: "rgb(8, 64, 72)",
        maxHeight: "40vh",
      }}
      data={chartData}
      options={chartOptions}
    />
  );
};

export default ECGRythm;
