import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  nextPage,
  prevPage,
  setFilterFreq,
  setIsIsoline,
} from "../../../redux/reducers/ecg/ecgSlice";

export const ECGSettings = () => {
  const { t } = useTranslation("ecg");
  const freq = useAppSelector((state) => state.ecg.filter.freq);
  const isoline = useAppSelector((state) => state.ecg.isIsoline);
  const zoom = useAppSelector((state) => state.ecg.zoom);

  const dispatch = useAppDispatch();

  return (
    <div className="ml-2 flex flex-row items-center gap-1">
      <div className="flex flex-row items-center gap-1">
        <span
          onClick={() => {
            dispatch(prevPage());
          }}
        >
          <KeyboardDoubleArrowLeft />
        </span>
        <span>{zoom.page + 1}</span>
        <span
          onClick={() => {
            dispatch(nextPage());
          }}
        >
          <KeyboardDoubleArrowRight />
        </span>
      </div>
      <span>{t("filter")} </span>
      <select
        onChange={(e) => {
          dispatch(setFilterFreq(parseInt(e.target.value)));
        }}
        defaultValue={freq}
      >
        <option value={35}>35 {t("Hz")}</option>
        <option value={50}>50 {t("Hz")}</option>
      </select>
      <input
        type="checkbox"
        className="css-checkbox"
        id="checkbox16"
        onClick={() => dispatch(setIsIsoline(!isoline))}
        checked={isoline}
      />
      <label htmlFor="checkbox16" className="css-label dark-plus-cyan ml-2">
        {t("isoline")}
      </label>
    </div>
  );
};
