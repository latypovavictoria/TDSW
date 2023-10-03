import { Dialog } from "@headlessui/react";
import _ from "lodash";
import { TFunction, useTranslation } from "next-i18next";
import { FC, useMemo, useState } from "react";

import { Json } from "@api/schemas";
import create from "@api/v2/inspections/create";

import CustomModal from "@components/UI/CustomModal";
import EBox from "@components/UI/EBox";

import readFileAsync from "utils/readFileAsync";

import { Inspection } from "redux/reducers/inspections/inspection.schema";
import UIButton from "@components/UI/Button";
import EInput from "@components/UI/EInput";

export interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  type: string;
  patientId: number;
  fileType?: string;
  tid?: string;
}

const getHeadersOfInspectionType = (type: string, t: TFunction) => {
  switch (type) {
    case "pre-shift":
    case "post-shift":
      return [
        t("pressure.upper"),
        t("pressure.lower"),
        t("temperature"),
        t("intoxication"),
        t("pulse"),
      ];
    case "ecg":
    default:
      return;
  }
};

const CreateInspectionModal: FC<CreateModalProps> = ({
  open,
  type,
  patientId,
  tid,
  onClose,
  fileType,
}) => {
  const { t } = useTranslation("inspections");

  const [inspection, setInspection] = useState<Partial<Inspection>>({});
  const [file, setFile] = useState<File | null>(null);

  const [orgHash, setOrgHash] = useState<string | undefined>();

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const headers = useMemo(() => {
    return getHeadersOfInspectionType(type, t);
  }, [type, t]);

  const awailableFields = useMemo(() => {
    switch (type) {
      case "pre-shift":
      case "post-shift":
        return [
          { field: "pressure.first", type: "number" },
          { field: "pressure.second", type: "number" },
          { field: "temperature", type: "number" },
          { field: "alcohol", type: "checkbox" },
          { field: "pulse", type: "number" },
        ];
      case "ecg":
      default:
        return [];
    }
  }, [type]);

  if (fileType === undefined && type === "ecg") fileType = "edf";

  const submit = async () => {
    if (!tid) return;
    const i = inspection as Inspection;
    i.inspection_type = type;
    i.patient_id = patientId;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (i.json_data as any).alcohol = (i.json_data as any).alcohol === "true";
    const fileString = file && (await readFileAsync(file));
    create({
      inspection_type: type,
      json_data: i.json_data as Json,
      tid,
      file:
        fileType && fileString
          ? {
              file: fileString,
              file_type: fileType,
            }
          : undefined,
      organization_hash: orgHash,
    });
  };

  return (
    <CustomModal show={open} onClose={onClose}>
      <EBox active className="flex flex-col gap-2 px-3 py-2">
        <>
          <Dialog.Title className="text-xl font-semibold">
            {t("createInspection")}
          </Dialog.Title>
          {!!headers &&
            headers.map((header, index) => {
              const type = awailableFields[index].type;
              return (
                <div
                  className="mt-2 flex flex-row gap-2"
                  id={index.toString()}
                  key={index}
                >
                  <span>{header}</span>
                  <EInput
                    className="ml-auto"
                    onChange={(e) => {
                      const i: Partial<Inspection> = inspection;
                      _.set(
                        i,
                        `json_data.${awailableFields[index].field}`,
                        type === "number"
                          ? +e.target.value
                          : type === "checkbox"
                          ? e.target.checked.toString()
                          : e.target.value
                      );
                      setInspection(i);
                    }}
                    type={type}
                  />
                </div>
              );
            })}
          <div className="mt-2 flex flex-row">
            <span>{t("date")}</span>
            <EInput
              className="ml-auto"
              onChange={(e) => {
                const i: Partial<Inspection> = inspection;
                _.set(i, "datetime_created", e.target.value + ":00");
                setInspection(i);
              }}
              type="datetime-local"
            />
          </div>
          <div className="mt-2 flex flex-row">
            <span>{t("organization_hash")}</span>
            <EInput
              className="ml-auto"
              onChange={(e) => {
                setOrgHash(e.target.value);
              }}
            />
          </div>
          {!!fileType && (
            <input
              onChange={(e) => changeFile(e)}
              className="mt-2"
              type="file"
              accept={`.${fileType}`}
            />
          )}
          <div className="mt-2 flex flex-row">
            <UIButton secondary onClick={onClose} className="p-1">
              {t("cancel")}
            </UIButton>
            <UIButton onClick={submit} className="ml-auto p-1">
              {t("submit")}
            </UIButton>
          </div>
        </>
      </EBox>
    </CustomModal>
  );
};

export default CreateInspectionModal;
