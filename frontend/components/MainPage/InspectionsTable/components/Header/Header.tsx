import {
  KeyboardDoubleArrowLeftSharp,
  KeyboardDoubleArrowRightSharp,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Dispatch, SetStateAction } from "react";

import EButton from "@components/UI/EButton/EButton";

import exportIcon from "@svg/exportIcon.svg";
import plusIcon from "@svg/plusIcon.svg";
import EInput from "@components/UI/EInput";

export interface HeaderProps {
  inspType: string[];
  setInspType: Dispatch<SetStateAction<string[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
  maxPages: number;
  setCreateNew: Dispatch<SetStateAction<boolean>>;
  setExportFile: Dispatch<SetStateAction<boolean>>;
}

function Header({
  inspType,
  setInspType,
  page,
  setPage,
  perPage,
  setPerPage,
  maxPages,
  setCreateNew,
  setExportFile,
}: HeaderProps) {
  const { t } = useTranslation("inspections");

  const changeType = (type: string): void => {
    switch (type) {
      case "pre-shift":
        setInspType(["pre-shift", "post-shift"]);
        return;
      default:
        setInspType([type]);
        return;
    }
  };

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <div className="flex flex-row items-center p-2">
      <span>{t("title")}</span>
      <div className="ml-2 flex flex-1 flex-row">
        <select
          onChange={(e) => changeType(e.target.value)}
          defaultValue={inspType[0]}
        >
          <option value="pre-shift">{t("types.shift")}</option>
          <option value="ecg">{t("types.ecg")}</option>
        </select>

        {!isMobile && (
          <>
            <span className="ml-auto">{t("perPage")}</span>

            <EInput
              noBox
              type="number"
              min={1}
              max={50}
              defaultValue={perPage}
              onChange={(e) => {
                const res = parseInt(e.target.value) || perPage;
                if (res > 0) setPerPage(res);
              }}
              style={{
                maxWidth: "3rem",
              }}
              inputClassName="ml-2"
            />
          </>
        )}

        <span
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
          className="ml-2"
        >
          <KeyboardDoubleArrowLeftSharp />
        </span>

        <EInput
          noBox
          type="number"
          min={1}
          max={99}
          value={page}
          inputClassName="ml-1"
          readOnly
          style={{
            maxWidth: "3rem",
          }}
        />

        <span className="my-auto ml-1">{t("of")}</span>
        <span className="my-auto ml-1">{maxPages}</span>

        <span
          onClick={() => {
            if (page < maxPages) setPage(page + 1);
          }}
          className="ml-2"
        >
          <KeyboardDoubleArrowRightSharp />
        </span>
      </div>
      <div className="ml-2 flex flex-row gap-1">
        <EButton
          Icon={plusIcon}
          onClick={() => {
            setCreateNew(true);
          }}
        />
        <EButton
          Icon={exportIcon}
          onClick={() => {
            setExportFile(true);
          }}
        />
      </div>
    </div>
  );
}

export default Header;
