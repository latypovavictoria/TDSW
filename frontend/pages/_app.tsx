import { YMaps } from "@pbe/react-yandex-maps";
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart as ChartJS,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  SubTitle,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { enableMapSet } from "immer";
import "material-design-icons/iconfont/material-icons.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Particles from "react-tsparticles";
import { SWRConfig } from "swr";
import { loadFull } from "tsparticles";
import { Engine, ISourceOptions } from "tsparticles-engine";
import { NextPageWithLayout } from "types";
import { store } from "../redux/store";
import "../styles/globals.css";
import "../styles/index.css";
import "../styles/Roboto/stylesheet.css";

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  ChartDataLabels
);

if (typeof window !== "undefined") {
  (async () => {
    const { default: zoomPlugin } = await import("chartjs-plugin-zoom");
    ChartJS.register(zoomPlugin);
  })();
}

enableMapSet();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const particlesInit = async (main: Engine) => {
  await loadFull(main);
};
const particlesOptions: ISourceOptions = {
  background: {
    color: {
      value: "#0e2a33",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.05,
        size: 100,
      },
      push: {
        quantity: 10,
      },
      repulse: {
        distance: 200,
        duration: 0.7,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 50,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 1,
    },
  },
  detectRetina: true,
};

function MyApp({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <div className="relative mx-auto max-w-[2000px]">
      <Provider store={store}>
        <SWRConfig>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
          />
          <YMaps>
            <>{getLayout(<Component {...pageProps} />)}</>
          </YMaps>
        </SWRConfig>
      </Provider>
      <ToastContainer
        className="absolute top-0 right-0 z-50 p-4"
        draggable={false}
        closeOnClick
        transition={Zoom}
        closeButton={false}
        hideProgressBar
      />
    </div>
  );
}

export default appWithTranslation(MyApp);
