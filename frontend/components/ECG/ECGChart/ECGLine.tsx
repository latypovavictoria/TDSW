import { ChartData, ChartOptions } from "chart.js";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo } from "react";
import { ChartProps, Line } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setLength,
  setMaxPage,
  setSampFreq,
} from "../../../redux/reducers/ecg/ecgSlice";
import { getEcgInspGraph } from "../../../utils/api/inspection/getEcgInspData";
import useApi from "../../../utils/useApi";

const ECGChartLine: FC<
  Omit<ChartProps<"line">, "type" | "data" | "options">
> = (props) => {
  const sampFreq = useAppSelector((state) => state.ecg.sampFreq);
  const freq = useAppSelector((state) => state.ecg.filter.freq);
  const zoom = useAppSelector((state) => state.ecg.zoom);
  const page = useAppSelector((state) => state.ecg.zoom.page);
  const isoline = useAppSelector((state) => state.ecg.isIsoline);

  const dispatch = useAppDispatch();

  const router = useRouter();
  const { id } = router.query;

  const perPage = (10 * 1000 * 60) / 2;

  const { data: resp, isValidating } = useApi(
    `ecg-${id}`,
    getEcgInspGraph,
    [parseInt(id as string), page, 5 * 1000 * 60, freq, isoline],
    [page, freq, isoline],
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const storeData: number[] = resp?.data.data;
  const points = storeData?.length || 0;

  useEffect(() => {
    dispatch(setLength(points));
  }, [points, dispatch]);

  const newFreq = 1000 / (resp?.data?.response?.frequency || 1000);

  useEffect(() => {
    dispatch(setSampFreq(newFreq));
  }, [newFreq, dispatch]);

  const maxPages = resp?.data?.all_pages;

  useEffect(() => {
    if (maxPages) dispatch(setMaxPage(maxPages));
  }, [maxPages, dispatch]);

  const indexToString = (value: number): string => {
    const millis = value * sampFreq;
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const data: ChartData<"line"> = {
    labels: Array(points)
      .fill(0)
      .map((_, i) => i + page * perPage),
    datasets: [
      {
        label: "DATA",
        data: storeData,
        borderWidth: 1,
        borderColor: "rgb(4, 223, 255)",
        pointRadius: 0,
        pointHitRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: "y",
        },
      },
    },
    scales: {
      x: {
        grid: {
          drawTicks: false,
          // color: "rgb(100, 120, 140)",
          color: (ctx) => {
            const index = ctx.tick.value;
            if (index % 100 === 0) {
              return "rgb(100, 120, 140)";
            }
            if (index % 20 === 0) {
              return "rgba(100, 120, 140, 0.3)";
            }
            return "rgba(100, 120, 140, 0)";
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: (points / 1000) * sampFreq * 10 * 5,
          maxRotation: 0,
          color: "rgb(4, 223, 255)",
          callback: (value, index) => {
            if (index % 500 !== 0) return "";
            if (typeof value == "string") {
              value = parseInt(value);
            }
            return indexToString(value + page * perPage);
          },
        },
      },
      y: {
        min: zoom.lower / 1000,
        max: zoom.upper / 1000,
        grid: {
          drawTicks: false,
          color: (ctx) => {
            const value = ctx.tick.value;
            if (Math.round(value * 10000) % 5 === 0) {
              return "rgb(100, 120, 140)";
            }
            return "rgba(100, 120, 140, 0.3)";
          },
        },
        ticks: {
          stepSize: 0.0001,
          // count: (zoom.upper - zoom.lower) * 10 + 1,
          maxTicksLimit: (zoom.upper - zoom.lower) * 10 + 1,
          color: "rgb(4, 223, 255)",
          callback: (value) => {
            if (typeof value === "string") value = parseFloat(value);
            if (Math.round(value * 10000) % 5 !== 0) {
              return "";
            }
            return `${Math.abs(Math.round(value * 10000) / 10)} mV`;
          },
        },
      },
    },
  };

  const { className, ...rest } = props;

  const maxHeight = useMemo(() => {
    return (zoom.upper - zoom.lower) * 40 + 10;
  }, [zoom.lower, zoom.upper]);

  if (isValidating) return <div>Loading...</div>;

  return (
    <div className={className}>
      <div
        style={{
          width: `${points / 5}px`,
        }}
      >
        <Line
          {...rest}
          style={{
            backgroundColor: "rgb(8, 64, 72)",
            maxHeight: `${maxHeight}px`,
          }}
          data={data}
          options={options}
        ></Line>
      </div>
    </div>
  );
};

export default ECGChartLine;
