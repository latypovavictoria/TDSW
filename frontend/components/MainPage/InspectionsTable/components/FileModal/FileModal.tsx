import { Dialog } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import attachFile from "@api/v2/inspections/attach/file";

import CustomModal from "@components/UI/CustomModal";
import EBox from "@components/UI/EBox";

import readFileAsync from "utils/readFileAsync";
import UIButton from "@components/UI/Button";

export interface FileModalProps {
  id: number;
  open: boolean;
  onClose: () => void;
  fileType: string | undefined;
}

function FileModal({ id, open, onClose, fileType }: FileModalProps) {
  const { t } = useTranslation("inspections");

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;

    setStatus("loading");
    const fileString = await readFileAsync(file);

    if (!fileString) {
      setStatus("error");
      return;
    }

    await attachFile(id, {
      file: fileString,
      file_type: fileType,
    });
    setStatus("success");
  };

  return (
    <CustomModal show={open} onClose={() => onClose()}>
      <EBox active>
        <Dialog.Title>{t("fileModalHeader")}</Dialog.Title>
        <div className="flex flex-col">
          <UIButton secondary>
            <a
              href={(
                process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
              ).concat(`/inspections/${id}/download_file`)}
              target="_blank"
              rel="noreferrer"
            >
              {t("fileDownload")}
            </a>
          </UIButton>
          <input
            onChange={(e) => changeFile(e)}
            className="mt-2"
            type="file"
            accept={`.${fileType}`}
          />
          <div className="flex flex-row justify-center">
            {status !== "idle" && <span className="italic">{t(status)}</span>}
          </div>
          <UIButton onClick={() => uploadFile()} className="mt-2">
            {t("fileUpload")}
          </UIButton>
        </div>
      </EBox>
    </CustomModal>
  );
}

export default FileModal;
