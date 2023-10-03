import { Line } from "react-chartjs-2";

export interface GraphProps {
  active: boolean;
  graphData: number[];
}

function Graph({ active, graphData }: GraphProps) {
  if (!active) return <></>;

  return (
    <Line
      data={{
        labels: graphData.map((_, i) => i),
        datasets: [
          {
            data: graphData,
            borderColor: "rgb(4, 223, 255)",
            backgroundColor: "rgb(4, 223, 255)",
            borderWidth: 1,
            pointRadius: 0,
            pointHitRadius: 0,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      }}
      style={{
        backgroundColor: "rgb(0, 42, 51)",
      }}
    />
  );
}

export default Graph;
