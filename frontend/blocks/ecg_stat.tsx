import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";
import EBox from "../components/UI/EBox";
import { AppBlock } from "../types";
import ECGEventNavigator from "../components/ECG/EventNavigator/EventNavigator";
import FreqChart from "../components/ECG/FreqChart/FreqChart";
import Histogram from "../components/ECG/Histogram/Histogram";
import ECGRythm from "../components/ECG/Rythm";
import ECGScatter from "../components/ECG/Scatterogram";

const stats = ["en", "sp", "ci", "rh", "sg"] as const;
type statTypes = (typeof stats)[number];

const ECGStat: AppBlock = () => {
  const { t } = useTranslation("ecg");

  const [type, setType] = useState<statTypes>("en");

  const content = useMemo(() => {
    switch (type) {
      case "en":
        return <ECGEventNavigator />;
      case "sp":
        return <FreqChart />;
      case "ci":
        return <Histogram />;
      case "rh":
        return <ECGRythm />;
      case "sg":
        return <ECGScatter />;
    }
  }, [type]);

  return (
    <EBox
      className="p-4"
      header={
        <div className="flex flex-row items-center gap-2 p-2">
          {stats.map((s, i) => (
            <div
              className={`p-1 ${type === s ? "bg-[#001f2a]" : ""}`}
              key={i}
              onClick={() => setType(s)}
            >
              {t(`stat.${s}`)}
            </div>
          ))}
        </div>
      }
    >
      {content}
    </EBox>
  );
};

ECGStat.block_name = "ecg_stat";

export default ECGStat;
