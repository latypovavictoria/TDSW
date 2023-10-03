import { Dialog } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { ChangeEvent, FC, useState } from "react";

import CustomModal from "@components/UI/CustomModal";
import EBox from "@components/UI/EBox";

import EInput from "@components/UI/EInput/EInput";
import _ from "lodash";
import { submitOrganization } from "./helpers/submitOrganization";
import UIButton from "@components/UI/Button";

const fields = ["name", "width", "longitude", "town", "hash"] as const;

export interface CreateOrganizationProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateOrganization: FC<CreateOrganizationProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation("admin");

  const [organization, setOrganization] = useState<
    Partial<{
      name: string;
      width: string;
      longitude: string;
      town: string;
      hash: string;
    }>
  >({});

  const submit = submitOrganization(organization, onSuccess, onClose);

  const setOrganizationField = (field: string, value: string) => {
    setOrganization((prev) => {
      _.set(prev, field, value);
      return prev;
    });
  };

  const onOrganizationFieldChange =
    (f: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setOrganizationField(f, e.target.value);
    };

  return (
    <CustomModal show={open} onClose={onClose}>
      <EBox active className="p-4">
        <Dialog.Title>{t("zone.create")}</Dialog.Title>
        <div className="flex flex-col">
          <table>
            <thead>
              <tr>
                {fields.map((f, i) => (
                  <th className="text-center" key={i}>
                    {t(`zone.${f}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {fields.map((f, i) => (
                  <td key={i}>
                    <EInput
                      className="mx-2"
                      onChange={onOrganizationFieldChange(f)}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div className="mt-3 flex flex-row justify-between">
            <UIButton onClick={onClose} secondary className="p-1">
              {t("cancel")}
            </UIButton>
            <UIButton onClick={submit} className="p-1">
              {t("submit")}
            </UIButton>
          </div>
        </div>
      </EBox>
    </CustomModal>
  );
};

export default CreateOrganization;
