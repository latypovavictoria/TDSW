import { ChartData, ChartDataset, ChartOptions } from "chart.js";
import { FC } from "react";
import { Bar, ChartProps } from "react-chartjs-2";
import { useAppSelector } from "../../../redux/hooks";
import { EcgEvent } from "../../../redux/reducers/ecg/EcgEvent";

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

const ECGEvents: FC<Omit<ChartProps<"bar">, "type" | "data" | "options">> = (
  props
) => {
  const eventRecord = useAppSelector((state) => state.ecg.events);
  const sampFreq = useAppSelector((state) => state.ecg.sampFreq);
  const activeEventIndex = useAppSelector(
    (state) => state.ecg.activeEventIndex
  );
  const max = useAppSelector((state) => state.ecg.length);
  const page = useAppSelector((state) => state.ecg.zoom.page);

  if (!eventRecord || Object.keys(eventRecord).length === 0) {
    return <></>;
  }

  const indexToString = (value: number): string => {
    const millis = value * sampFreq;
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);
    if (minutes === 0) {
      return `${seconds}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  };

  const labels = Object.keys(eventRecord);

  const filteredEvents: ChartDataset<"bar">[] = [];

  const offset = new Map<string, number>();
  const remOff = new Map<number, number>();

  Object.values(eventRecord)
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
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        formatter: (value, context) => {
          if (value == null) {
            return "";
          }
          if (context.chart.data.labels)
            return context.chart.data.labels[context.dataIndex];
        },
        labels: {
          value: {
            color: "black",
            anchor: "start",
            align: "end",
          },
        },
      },
    },
    scales: {
      x: {
        min: page * 1000 * 60,
        max: max,
        grid: {
          drawTicks: false,
        },
        ticks: {
          callback: (value) => {
            if (typeof value == "string") {
              value = parseInt(value);
            }
            return indexToString(value);
          },
          color: "rgb(8, 64, 72)",
          // display: false,
          autoSkip: true,
          maxTicksLimit:
            (max * sampFreq) / (page * 2500) >= 1
              ? 300
              : ((max * sampFreq) % (page * 2500)) / 1000,
          // padding: 0,
        },
      },
      y: {
        grid: {
          drawTicks: false,
        },
        ticks: {
          color: "rgba(0, 0, 0, 0)",
          display: false,
        },
      },
    },
  };

  return (
    <div className={props.className}>
      <div
        style={{
          width: `${max / 10}px`,
        }}
        className="pl-7"
      >
        <Bar
          {...props}
          style={{
            backgroundColor: "rgb(8, 64, 72)",
            maxHeight: "5vh",
            marginBottom: "-1rem",
          }}
          data={data}
          options={options}
        ></Bar>
      </div>
    </div>
  );
};

export default ECGEvents;
