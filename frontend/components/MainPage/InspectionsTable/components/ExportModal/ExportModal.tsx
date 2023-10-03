import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";

import type get from "@api/v2/inspections/get";

import CustomModal from "@components/UI/CustomModal";
import EBox from "@components/UI/EBox";
import UIButton from "@components/UI/Button";

const formats = {
  csv: "text/csv",
  xml: "application/xml",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

const ExportModal = ({
  data,
  show,
  onClose,
}: {
  data: Parameters<typeof get>[0];
  show: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation("inspections");

  const [selectedFormat, setSelectedFormat] =
    useState<keyof typeof formats>("csv");
  const [onlyPage, setOnlyPage] = useState(false);

  const downloadUrl = useMemo(() => {
    const base_url = process.env.NEXT_PUBLIC_API_URL || "localhost:5000";

    const temp = { ...data };
    if (!onlyPage) {
      temp.page = undefined;
      temp.recs_per_page = undefined;
    }

    const params: Record<string, string> = {
      ...JSON.parse(JSON.stringify(temp)),
      output_format: formats[selectedFormat],
    };

    return `${base_url}/v2/inspections/get?${new URLSearchParams(
      params
    ).toString()}`;
  }, [selectedFormat, data, onlyPage]);

  return (
    <CustomModal
      show={show}
      onClose={() => {
        onClose();
      }}
    >
      <EBox
        className="flex max-h-[70vh] flex-col gap-2 p-2"
        bgColor="#002a33"
        header={<div className="p-2">{t("exportInspections")}</div>}
      >
        <div>
          <input
            type="checkbox"
            className="css-checkbox mx-auto"
            id="only_page_checkbox"
            onChange={() => setOnlyPage((p) => !p)}
            checked={onlyPage}
          />
          <label
            htmlFor="only_page_checkbox"
            className="css-label dark-plus-cyan"
          >
            {t("onlyCurrentPage")}
          </label>
        </div>
        <div className="flex flex-row gap-2 p-2">
          <select
            onChange={(e) =>
              setSelectedFormat(e.target.value as keyof typeof formats)
            }
            className="bg-bg-primary p-2 outline-none"
          >
            <option value="csv">CSV</option>
            <option value="xml">XML</option>
            <option value="xlsx">XLSX</option>
          </select>
          <UIButton>
            <a className="p-1" href={downloadUrl} download>
              {t("exportSubmit")}
            </a>
          </UIButton>
        </div>
      </EBox>
    </CustomModal>
  );
};

export default ExportModal;
