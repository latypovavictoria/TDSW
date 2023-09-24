import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <canvas id="dw-canvas" className="absolute top-0 left-0 z-[1]"></canvas>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
