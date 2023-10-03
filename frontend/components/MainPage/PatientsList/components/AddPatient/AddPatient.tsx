import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import isOkStatus from "@api/isOkStatus";
import registration from "@api/v2/auth/registration";

import CustomModal from "@components/UI/CustomModal";
import EBox from "@components/UI/EBox";

import styles from "./AddPatient.module.css";

export interface AddPatientProps {
  onClose: () => void;
  onCancel: () => void;
  show: boolean;
}

const AddPatient = ({ onCancel, onClose, show }: AddPatientProps) => {
  const { t } = useTranslation("patients");
  const { t: t_auth } = useTranslation("authorization");

  const [hash, setHash] = useState<string>();

  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    sex: 1,
    birthday: "",
    weight: 0,
    height: 0,
    insure_number: "",
    tid: "",
    patronymic: "",
    organization_hash: "",
  });

  const [attachPatient, setAttachPatient] = useState(true);

  const [number, setNumber] = useState<string>("");
  const [validNumber, setValidNumber] = useState(true);

  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === "") {
      setNumber("");
      setValidNumber(true);
      return;
    }
    if (value[0] === "8") {
      value = "+7" + value.substring(1);
    }
    const res = new AsYouType().input(value);

    setValidNumber(isValidPhoneNumber(res));

    setNumber(res);
  };

  const submit = async () => {
    const patient = newPatient;
    patient.phone = number;
    const res = await registration(patient, "patient");
    if (isOkStatus(res.status)) {
      setHash(res.data?.hash_link);
    }
  };

  return (
    <CustomModal onClose={onClose} show={show}>
      <EBox active>
        <div className="px-2">
          {hash ? (
            <div className="flex flex-col p-2">
              <span>
                {window.location.origin}/auth/confirm/{hash}
              </span>
              <button
                onClick={() => onCancel()}
                className={`ml-auto mt-2 ${styles.button}`}
              >
                {t("confirm")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-4 p-4">
              <div className="col-span-4">
                <span>{t("firstName")}: </span>
                <EBox className="my-3 flex" borderless>
                  <input
                    onChange={(e) => {
                      const curPat = newPatient;
                      curPat.firstName = e.target.value;
                      setNewPatient(curPat);
                    }}
                    className={`${styles.input}`}
                    maxLength={20}
                  />
                </EBox>
              </div>
              <div className="col-span-4">
                <span>{t("lastName")}: </span>
                <EBox className="my-3 flex" borderless>
                  <input
                    onChange={(e) => {
                      const curPat = newPatient;
                      curPat.lastName = e.target.value;
                      setNewPatient(curPat);
                    }}
                    className={`${styles.input}`}
                    maxLength={20}
                  />
                </EBox>
              </div>
              <div className="col-span-4">
                <span>{t("middleName")}: </span>
                <EBox className="my-3 flex" borderless>
                  <input
                    onChange={(e) => {
                      const curPat = newPatient;
                      curPat.patronymic = e.target.value;
                      setNewPatient(curPat);
                    }}
                    className={`${styles.input}`}
                    maxLength={20}
                  />
                </EBox>
              </div>

              <div className="col-span-6">
                <span>{t_auth("fields.phone")}: </span>
                <EBox className="my-3 flex" borderless>
                  <input
                    value={number}
                    onChange={(e) => handleNumber(e)}
                    className={`${styles.input} pb-[6px]`}
                  />
                </EBox>
                {!validNumber && (
                  <span className="mx-auto mb-2 text-red-500">
                    {t_auth("invalid_number")}
                  </span>
                )}
              </div>
              <div className="col-span-6">
                <span>{t("birthdate")}: </span>
                <EBox className="my-3 flex" borderless>
                  <input
                    onChange={(e) => {
                      const curPat = newPatient;
                      curPat.birthday = e.target.value;
                      setNewPatient(curPat);
                    }}
                    type="date"
                    className={`${styles.input}`}
                    maxLength={20}
                  />
                </EBox>
              </div>

              <div className="col-span-6">
                <span>{t("insurance")}: </span>
                <EBox className="my-3 flex" borderless>
                  <input
                    onChange={(e) => {
                      const curPat = newPatient;
                      curPat.insure_number = e.target.value;
                      setNewPatient(curPat);
                    }}
                    className={`${styles.input}`}
                    maxLength={20}
                  />
                </EBox>
              </div>
              <div className="col-span-3">
                <span>{t_auth("fields.organization_hash")}: </span>
                <EBox className="my-3 flex" borderless>
                  <input
                    onChange={(e) => {
                      setNewPatient((p) => {
                        p.organization_hash = e.target.value;
                        return p;
                      });
                    }}
                    className={`${styles.input}`}
                    maxLength={20}
                  />
                </EBox>
              </div>
              <div className="col-span-3">
                <span>{t("filter.tid")}: </span>
                <EBox className="my-3 flex" borderless>
                  <input
                    onChange={(e) => {
                      const curPat = newPatient;
                      curPat.tid = e.target.value;
                      setNewPatient(curPat);
                    }}
                    className={`${styles.input}`}
                    maxLength={20}
                  />
                </EBox>
              </div>

              <div className="col-span-4">
                <span>{t("sex.title")}: </span>
                <EBox className="my-3 flex" borderless>
                  <select
                    onChange={(e) => {
                      const curPat = newPatient;
                      curPat.sex = parseInt(e.target.value);
                      setNewPatient(curPat);
                    }}
                  >
                    <option value={1}>{t("sex.male")}</option>
                    <option value={2}>{t("sex.female")}</option>
                  </select>
                </EBox>
              </div>
              <div className="col-span-4">
                <span>{t("weight")}: </span>
                <EBox className="my-3 flex" borderless>
                  <input
                    onChange={(e) => {
                      const curPat = newPatient;
                      curPat.weight = parseInt(e.target.value);
                      setNewPatient(curPat);
                    }}
                    type="number"
                    maxLength={20}
                    className={`${styles.input}`}
                  />
                </EBox>
              </div>
              <div className="col-span-4">
                <span>{t("height")}: </span>
                <EBox className="my-3 flex" borderless>
                  <input
                    onChange={(e) => {
                      const curPat = newPatient;
                      curPat.height = parseInt(e.target.value);
                      setNewPatient(curPat);
                    }}
                    type="number"
                    maxLength={20}
                    className={`${styles.input}`}
                  />
                </EBox>
              </div>
              <div className="col-span-4">
                <input
                  type="checkbox"
                  className="css-checkbox mx-auto"
                  id="checkbox16"
                  onChange={() => setAttachPatient(!attachPatient)}
                  checked={attachPatient}
                />
                <label
                  htmlFor="checkbox16"
                  className="css-label dark-plus-cyan"
                >
                  {t("attach")}
                </label>
              </div>
              <div className="col-span-4">
                <button
                  onClick={() => onCancel()}
                  className={`${styles.button} ${styles.button_secondary} mx-auto`}
                >
                  {t("cancel")}
                </button>
              </div>
              <div className="col-span-4">
                <button
                  onClick={() => submit()}
                  className={`${styles.button} ml-auto`}
                >
                  {t("confirm")}
                </button>
              </div>
            </div>
          )}
        </div>
      </EBox>
    </CustomModal>
  );
};

export default AddPatient;
