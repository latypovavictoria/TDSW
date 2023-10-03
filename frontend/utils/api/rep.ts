import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import { i18n } from "next-i18next";
import Router from "next/router";
import { addError } from "../../redux/reducers/notifications/notSlice";
import { store } from "../../redux/store";
import { error } from "../toast";

/**
 * @deprecated Use `api` folder
 */
const fetchAPI = async (
  data: AxiosRequestConfig,
  checkAuthorization: boolean = true
) => {
  data.url =
    (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000" + "/") +
    data.url;
  data.withCredentials = true;
  if (data.method === "GET" || data.method === "get") {
    data.headers = {
      "Content-Type": null,
    };
  }
  if (data.data) data.data.lang = i18n?.language;

  try {
    const rep = await axios(data);

    if (rep.status === 401) {
      Router.push("/auth/signin");
      error(i18n?.t("error.unauthorized", { ns: "common" }) || "Unauthorized");
      return {} as AxiosPromise<any>;
    }

    if (rep.status === 403) {
      Router.push("/");
      error(i18n?.t("error.noAccess", { ns: "common" }) || "No access");
      return {} as AxiosPromise<any>;
    }

    if (rep.data.status && rep.data.status === "error") {
      const err = {
        status: "error",
        msg: (rep.data.msg || rep.data.message) as string,
        code: undefined,
      };
      store.dispatch(addError(err));

      return {
        data: err,
      };
    }

    if (typeof rep.data === "string") {
      try {
        rep.data = rep.data.replaceAll("NaN", "0");
        rep.data = JSON.parse(rep.data);
      } catch (e) {
        const err = {
          status: "error",
          msg: "NaN in response",
          code: undefined,
        };
        store.dispatch(addError(err));

        return {
          data: err,
        };
      }
    }

    return rep;
  } catch (error) {
    const err = error as AxiosError;
    const e = {
      code: err.response?.status,
      status: "error",
      msg: err.message,
    };
    store.dispatch(addError(e));

    return {
      data: e,
    };
  }
};

export default fetchAPI;
