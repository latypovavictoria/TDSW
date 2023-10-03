import UIButton from "@components/UI/Button";
import EInput from "@components/UI/EInput";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "types";
import EBox from "../../../components/UI/EBox";
import AuthLayout from "../../../layouts/auth";
import continueRegistration from "../../../utils/api/user/continueRegistrations";

const ConfirmRegistration: NextPageWithLayout = () => {
  const { t } = useTranslation("authorization");
  const router = useRouter();
  const { hash } = router.query;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const submit = async () => {
    setMsg("");
    const resp = await continueRegistration(username, password, hash as string);
    if (resp.data.status == "error") {
      setMsg(resp.data.msg);
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <EBox
      header={<span className="p-2">{t("register.title")}</span>}
      className="p-2"
    >
      <div className="m-2 flex flex-col gap-2">
        <span>{t("register.login")}: </span>
        <EInput
          className="flex"
          onChange={(e) => setUsername(e.target.value)}
          inputClassName="p-1"
        />
        <span>{t("auth.password")}: </span>
        <EInput
          className="flex"
          onChange={(e) => setPassword(e.target.value)}
          inputClassName="p-1"
        />
        {msg ? <span className="mx-auto text-orange-500">{msg}</span> : <></>}
        <div className="flex">
          <UIButton onClick={() => submit()} className="ml-auto p-1">
            {t("register.register")}
          </UIButton>
        </div>
      </div>
    </EBox>
  );
};

ConfirmRegistration.getLayout = (page: ReactElement) => (
  <AuthLayout>{page}</AuthLayout>
);

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["authorization"])),
    },
  };
}

export default ConfirmRegistration;
