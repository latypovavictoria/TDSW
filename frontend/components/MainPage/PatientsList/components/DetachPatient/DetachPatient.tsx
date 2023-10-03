import { useTranslation } from "next-i18next";

import CustomModal from "@components/UI/CustomModal";
import EBox from "@components/UI/EBox";
import UIButton from "@components/UI/Button";

export interface DetachPatientProps {
  onClose: () => void;
  onSubmit: () => void;
  show: boolean;
}

function DetachPatient({ onClose, onSubmit, show }: DetachPatientProps) {
  const { t } = useTranslation("patients");

  return (
    <CustomModal show={show} onClose={onClose}>
      <EBox active className="p-2">
        <span className="text-xl">{t("detach_patient_text")}</span>
        <div className="mt-2 flex flex-row">
          <UIButton onClick={onClose}>{t("cancel")}</UIButton>
          <UIButton onClick={onSubmit}>{t("confirm")}</UIButton>
        </div>
      </EBox>
    </CustomModal>
  );
}

export default DetachPatient;
