import { useTranslation } from "next-i18next";
import { useAppSelector } from "../../../redux/hooks";
import FreqChartGraph from "./PieChartGraph";

const FreqChart = () => {
  const { t } = useTranslation("ecg");

  const loading = useAppSelector((state) => state.ecg.statLoading);
  const stat = useAppSelector((state) => state.ecg.freqPower);

  return (
    <>
      {loading ? (
        <span>{t("loading")}</span>
      ) : (
        <div className="d-flex flex-row">
          <FreqChartGraph />
          {stat.HF && stat.LF && stat.VLF && (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex flex-row justify-content-bewtween">
                <span>HF/LF</span>
                <span className="ml-1">{(stat.HF / stat.LF).toFixed(2)}</span>
              </div>
              <div className="d-flex flex-row justify-content-bewtween mt-1">
                <span>LF/VF</span>
                <span className="ml-1">{(stat.LF / stat.VLF).toFixed(2)}</span>
              </div>
              <div className="d-flex flex-row justify-content-bewtween mt-1">
                <span>HF/VLF</span>
                <span className="ml-1">{(stat.HF / stat.VLF).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FreqChart;
