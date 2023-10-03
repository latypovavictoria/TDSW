import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";

import updateAvatar from "@api/v2/users/update/avatar";

import CustomModal from "@components/UI/CustomModal";
import EBox from "@components/UI/EBox";

import readFileAsync from "utils/readFileAsync";
import { loadUserFromStorage } from "utils/storageUser";
import UIButton from "../Button";

export interface AvatarUploadProps {
  show: boolean;
  onClose: () => void;
}

const AvatarUpload = ({ show, ...props }: AvatarUploadProps) => {
  const { t } = useTranslation("common");

  const [avatar, setAvatar] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");

  const onClose = () => {
    setAvatar(null);
    props.onClose();
  };

  const uploadAvatar = async () => {
    if (!avatar) return;

    const user_id = loadUserFromStorage().user?.user_id;
    if (!user_id) return;

    const stringFile = (await readFileAsync(avatar))?.split(",")[1];
    if (!stringFile) return;

    updateAvatar({
      user_id,
      password,
      avatar: stringFile,
    });

    onClose();
  };

  const resetAvatar = () => {
    const user_id = JSON.parse(localStorage.getItem("user") || "{}").user_id;
    if (!user_id) return;

    updateAvatar({
      user_id,
      password,
      avatar: "",
    });
    onClose();
  };

  return (
    <CustomModal show={show} onClose={onClose}>
      <EBox
        className="p-2"
        header={<span className="p-2">{t("changeAvatar")}</span>}
      >
        <div className="m-2 flex flex-col items-center gap-2">
          <input
            accept="image/*"
            type="file"
            onChange={(e) => setAvatar((e.target.files || [null])[0])}
          />

          {avatar && (
            <Image src={URL.createObjectURL(avatar)} alt="Avatar" width={200} />
          )}
          <div className="flex flex-row justify-around gap-2">
            <span>{t("confirmPassword")}</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-row justify-between">
            <UIButton secondary className="p-1" onClick={onClose}>
              {t("cancel")}
            </UIButton>
            <UIButton secondary className="p-1" onClick={resetAvatar}>
              {t("resetAvatar")}
            </UIButton>
            <UIButton className="p-1" onClick={uploadAvatar}>
              {t("confirm")}
            </UIButton>
          </div>
        </div>
      </EBox>
    </CustomModal>
  );
};

export default AvatarUpload;
