
import type { AppProps } from 'next/app'

import "../styles/globals.css";
import "../styles/index.css";
import "../styles/Roboto/stylesheet.css";

import { store } from '../redux/store';
import { Provider } from "react-redux";
import { NextPageWithLayout } from '../types';
import { SWRConfig } from "swr";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
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
  )
}
