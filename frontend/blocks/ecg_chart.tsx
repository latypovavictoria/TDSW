import { useTranslation } from "next-i18next";
import EBox from "../components/UI/EBox";
import ECGChartLine from "../components/ECG/ECGChart/ECGLine";
import { ECGSettings } from "../components/ECG/ECGChart/ECGSettings";
import ECGEvents from "../components/ECG/ECGChart/EventChart";
import { AppBlock } from "../types";
import { useAppSelector } from "../redux/hooks";

const ECGChart: AppBlock = () => {
  const { t } = useTranslation("ecg");

  const loading = useAppSelector(
    (state) => state.ecg.dataLoading && state.ecg.statLoading
  );

  return (
    <EBox
      header={<span className="p-2">{t("chart.title")}</span>}
      className="p-4"
    >
      {loading ? (
        <span>{t("loading")}</span>
      ) : (
        <div className="grid grid-flow-row grid-cols-[2rem_1fr] grid-rows-[1fr_1fr_2rem] bg-[#084048]">
          {/* <div className="row-span-2">
            <ECGZoomControls />
          </div> */}
          <div className="overflow-container col-span-2 row-span-2 overflow-x-auto">
            <ECGEvents className="ecg-event-container" />
            <ECGChartLine className="ecg-chart-line" />
          </div>
          <div className="col-span-2">
            <ECGSettings />
          </div>
        </div>
      )}
    </EBox>
  );
};

ECGChart.block_name = "ecg_chart";

export default ECGChart;
