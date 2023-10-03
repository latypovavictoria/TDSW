import isOkStatus from "@api/isOkStatus";
import signin from "@api/v2/auth/login";
import UIButton from "@components/UI/Button";
import EInput from "@components/UI/EInput";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "types";
import { saveUserToStorage } from "utils/storageUser";
import EBox from "../../components/UI/EBox";
import AuthLayout from "../../layouts/auth";
import fetchAPI from "../../utils/api/rep";

const SignIn: NextPageWithLayout = () => {
  const { t, i18n } = useTranslation("authorization");
  const { t: tc } = useTranslation("common");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>();

  const [version, setVersion] = useState("");

  useEffect(() => {
    const getVersion = async () => {
      const ver = await fetchAPI({ method: "GET", url: "/ping" }, false);
      setVersion(ver.data?.version);
    };

    getVersion();
  }, []);

  const router = useRouter();
  const submit = async () => {
    setMsg(undefined);

    const resp = await signin({
      login: username,
      password: password,
    });
    if (!isOkStatus(resp.status)) {
      setMsg(resp.message);
      return;
    }

    const user = resp.data;
    if (!user) {
      return;
    }

    const res = saveUserToStorage(user);
    // Планшет губернатора временно отключен

    // if (user.account_type === "supervisor")
    //   router.push("/admBoard", undefined, {
    //     locale: i18n.language,
    //   });
    // else
    if (!res.error) {
      router.push("/", undefined, {
        locale: i18n.language,
      });
    } else {
      setMsg(res.message);
    }
  };
  return (
    <>
      <Head>
        <title>{tc("page_title", { page: "signin" })}</title>
      </Head>
      <div className="flex flex-col">
        <EBox
          header={<div className="p-2">{t("auth.title")}</div>}
          className="mx-auto mt-5 flex flex-col gap-3 p-4"
        >
          <span>{t("auth.login")}: </span>
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
            type="password"
          />
          {msg ? <span className="text-danger mx-auto">{msg}</span> : <></>}
          <div className="flex justify-between">
            <UIButton secondary className="p-1">
              <NextLink href="/auth/register">{t("register.title")}</NextLink>
            </UIButton>
            <UIButton onClick={() => submit()} className="p-1">
              {t("auth.signin")}
            </UIButton>
          </div>
        </EBox>
        <span className="mx-auto mt-1">v{version}</span>
      </div>
    </>
  );
};

SignIn.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["authorization", "common"])),
    },
  };
}

export default SignIn;
