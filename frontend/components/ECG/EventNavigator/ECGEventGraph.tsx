import { ChartData, ChartDataset, ChartOptions } from "chart.js";
import { FC } from "react";
import { Bar, ChartProps } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { EcgEvent } from "../../../redux/reducers/ecg/EcgEvent";
import { setActiveEventIndex } from "../../../redux/reducers/ecg/ecgSlice";

export const millisToString = (millis: number): string => {
  const totalSeconds = millis / 1000;
  const totalMillis = Math.floor(millis % 1000);
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor(totalSeconds / 60);
  if (minutes === 0) {
    return `${seconds}:${totalMillis.toString().padStart(3, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}:${totalMillis
      .toString()
      .padStart(3, "0")}`;
  }
};

const ECGEventGraph: FC<
  Omit<ChartProps<"bar">, "type" | "data" | "options">
> = (props) => {
  const storeData = useAppSelector((state) => state.ecg);

  const ecgData = { ...storeData };

  const activeEventIndex = useAppSelector(
    (state) => state.ecg.activeEventIndex
  );
  const dispatch = useAppDispatch();

  if (!ecgData.events || Object.keys(ecgData.events).length === 0) {
    return <></>;
  }

  const indexToString = (value: number): string => {
    const millis = value * ecgData.sampFreq;
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);
    if (minutes === 0) {
      return `${seconds}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  };

  const labels = Object.keys(ecgData.events);

  const filteredEvents: ChartDataset<"bar">[] = [];

  const offset = new Map<string, number>();
  const remOff = new Map<number, number>();

  Object.values(ecgData.events)
    .reduce((a, c) => a.concat(c), [] as EcgEvent[])
    .forEach((e, i) => {
      const index = labels.indexOf(e.name);
      const data = new Array<number[] | null>(labels.length).fill(null);
      const off = offset.get(e.name) || 0;
      data[index] = [e.start - off, e.end - off];
      offset.set(e.name, e.end);
      remOff.set(i, off);
      filteredEvents.push({
        label: e.name,
        data: data as unknown as number[],
        stack: "s1",
        backgroundColor: (_ctx, _options) => {
          if (i == activeEventIndex) {
            return "rgb(8, 255, 150)";
          }
          return "rgb(4, 223, 255)";
        },
      });
    });
  const data: ChartData<"bar"> = {
    labels: labels,
    datasets: filteredEvents,
  };

  const options: ChartOptions<"bar"> = {
    animation: false,
    onClick: (_e, els, _chart) => {
      const el = els[0];
      if (!el) return;
      const index = el.datasetIndex;
      dispatch(setActiveEventIndex(index));
    },
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          drawTicks: false,
        },
        max: ecgData.length,
        ticks: {
          callback: (value) => {
            if (typeof value == "string") {
              value = parseInt(value);
            }
            return indexToString(value);
          },
          // display: false,
          color: "rgb(8, 64, 72)",
          autoSkip: true,
          maxTicksLimit: (ecgData.length * ecgData.sampFreq * 2) / 1000,
          padding: 0,
          align: "end",
        },
      },
      y: {
        grid: {
          drawTicks: false,
        },
        ticks: {
          color: "rgb(4, 223, 255)",
        },
      },
    },
  };
  return (
    <Bar
      {...props}
      style={{
        backgroundColor: "rgb(8, 64, 72)",
        maxHeight: "15vh",
      }}
      data={data}
      options={options}
    ></Bar>
  );
};

export default ECGEventGraph;
