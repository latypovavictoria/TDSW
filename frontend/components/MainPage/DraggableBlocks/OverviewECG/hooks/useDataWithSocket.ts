import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import useECGAverages, {
  mutateECGAverages,
} from "@api/hooks/inspections/useECGAverages";

const socket =
  process.env.NEXT_PUBLIC_SOCKET_ENABLE == "true"
    ? io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:10000")
    : null;

function useDataWithSocket(patId: number, active: boolean) {
  const { data: _data } = useECGAverages(patId);

  const [data, setData] = useState(_data);
  const [graphData, setGraphData] = useState<number[]>([]);

  useEffect(() => {
    setData(_data);
  }, [_data, setData]);

  useEffect(() => {
    if (!socket) return;

    if (active) {
      socket.on("ecg_data", (data) => {
        setGraphData((gData) => {
          let res = gData.concat(data);
          if (res.length > 100) res = res.slice(res.length - 100);
          return res;
        });
      });

      socket.on("ecg_analytics", (data) => {
        setData((d) => {
          const res = {
            ...d,
            hr: data.current_pulse,
            events: data.arrhytmia,
          };
          return res;
        });
      });
    } else {
      setGraphData([]);

      socket.off("ecg_data");
      socket.off("ecg_analytics");

      mutateECGAverages(patId);
    }

    return () => {
      socket.off("ecg_data");
      socket.off("ecg_analytics");
    };
  }, [active, setGraphData, setData, patId]);

  return { data, graphData };
}

export default useDataWithSocket;
