import { Popover } from "@headlessui/react";


// import {
//   Logout,
//   NotificationImportantOutlined,
//   NotificationsOutlined,
//   Person,
//   Photo,
//   Settings,
//   WarningAmberSharp,
// } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import {
  setAccountType,
  setFirstName,
  setUserId,
} from "redux/reducers/user/userSlice";
import { loadUserFromStorage } from "utils/storageUser";
import EBox from "../components/UI/EBox";
import { AppBlock } from "../types";
import AvatarUpload from "../components/UI/AvatarUpload";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setActivePatient } from "../redux/reducers/patients/patientsSlice";
import { store } from "../redux/store";
import pfp from "../styles/svg/pfpPlusDecor.svg";
import logout from "../api/logout";
import styles from "./main_nav_bar.module.css";

export const dispatchUser = async () => {
  const user = loadUserFromStorage().user;
  if (!user) return;

  const dispatch = store.dispatch;

  dispatch(setUserId(user.user_id));
  dispatch(setAccountType(user.account_type));
  dispatch(setFirstName(user.name));

  if (user.account_type === "patient") {
    dispatch(setActivePatient(user.user_id));
  }
};

const MainNavBar: AppBlock = () => {
  const dispatch = useAppDispatch();

  const name = useAppSelector((state) => state.user.first_name);

  const { t, i18n } = useTranslation("patients");
  const { t: tb } = useTranslation("blocks");
  const { t: tc } = useTranslation("common");

  const active = useAppSelector((state) => state.window.active);
  const errors = useAppSelector((state) => state.notifications.errors);

  const [changingAvatar, setChangingAvatar] = useState(false);

  useEffect(() => {
    dispatchUser();
  }, []);

  return (
    <>
      <EBox className="flex flex-1 px-3 py-3 sm:py-0">
        <span
          onClick={() => {
            dispatch(setActivePatient(-1));
          }}
          className="my-auto hidden cursor-pointer sm:block"
        >
          <Person />
        </span>
        <span className="my-auto ml-2 hidden sm:block">
          {t("title")} {active && `| ${tb(active)}`}
        </span>
        <span className="my-auto ml-2 block sm:hidden">{tc("title")}</span>
        <span className="my-auto ml-auto">
          <select
            onChange={(e) => {
              const locale = e.target.value;
              i18n.changeLanguage(locale);
            }}
            value={i18n.language}
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </span>
        {name ? (
          <>
            <Popover className="relative my-auto ml-2 mr-2 cursor-pointer sm:mr-0">
              <Popover.Button className="border-none outline-none">
                <span>
                  {errors.length === 0 ? (
                    <NotificationsOutlined />
                  ) : (
                    <NotificationImportantOutlined />
                  )}
                </span>
              </Popover.Button>
              <Popover.Panel className="absolute right-0 mt-1 w-max">
                <EBox className="flex flex-col bg-[#002a33] p-3">
                  <div className="max-h-80 overflow-y-auto overflow-x-hidden">
                    {errors.length === 0 && <span>{tc("noErrors")}</span>}
                    {errors.map((err, i) => (
                      <div key={i} className="flex flex-row px-3 py-2">
                        <span className="my-auto mr-2">
                          <WarningAmberSharp />
                        </span>
                        <span>
                          {err.code === 403
                            ? tc("authError")
                            : `${tc("unknownError")}: ${err.msg}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </EBox>
              </Popover.Panel>
            </Popover>
            <span className="my-auto -mr-8 hidden py-2 sm:block">
              <Image alt="profile-picture" src={pfp} height={50} />
            </span>
            <span className="my-auto mr-5">{name}</span>
            <span className="my-auto">
              <Popover className="relative my-auto sm:mr-0">
                <Popover.Button className="cursor-pointer border-none outline-none">
                  <span>
                    <Settings />
                  </span>
                </Popover.Button>
                <Popover.Panel className="absolute -right-3 -m-[1px] mt-8 w-max">
                  <EBox className="flex flex-col gap-2 bg-[#002a33] p-3">
                    <span
                      onClick={() => setChangingAvatar(true)}
                      className="flex cursor-pointer flex-row items-center gap-2"
                    >
                      <span>
                        <Photo />
                      </span>
                      <span>{t("avatar")}</span>
                    </span>
                    <span
                      onClick={() => logout()}
                      className="flex cursor-pointer flex-row items-center gap-2"
                    >
                      <span>
                        <Logout />
                      </span>
                      <span>{t("logout")}</span>
                    </span>
                  </EBox>
                </Popover.Panel>
              </Popover>
            </span>
          </>
        ) : (
          <span className={`my-3 ml-2 mr-5 ${styles.link}`}>
            <NextLink href={"auth/signin"}>{t("signin")}</NextLink>
          </span>
        )}
      </EBox>
      <AvatarUpload
        show={changingAvatar}
        onClose={() => setChangingAvatar(false)}
      />
    </>
  );
};

MainNavBar.block_name = "main_nav_bar";

export default MainNavBar;
