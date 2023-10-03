import { Icon } from "@iconify/react";
import { toast, ToastContentProps } from "react-toastify";
import EBox from "../components/UI/EBox";

const infoBox = (message: string) => (props: ToastContentProps<unknown>) =>
  (
    <EBox
      className="bg-[#002b34] p-2 flex flex-row items-center gap-2"
      onClick={props.closeToast}
    >
      <>
        <Icon icon="material-symbols:info-outline" fontSize="32px" />
        {message}
      </>
    </EBox>
  );

const successBox = (message: string) => (props: ToastContentProps<unknown>) =>
  (
    <EBox
      className="bg-[#002b34] p-2 border-green-500 flex flex-row gap-2 items-center"
      onClick={props.closeToast}
    >
      <>
        <Icon
          icon="material-symbols:check-small"
          fontSize="32px"
          className="text-green-500"
        />
        {message}
      </>
    </EBox>
  );

const warningBox = (message: string) => (props: ToastContentProps<unknown>) =>
  (
    <EBox
      className="bg-[#002b34] p-2 border-orange-500 flex flex-row gap-2 items-center"
      onClick={props.closeToast}
    >
      <>
        <Icon
          icon="material-symbols:warning-outline"
          fontSize="32px"
          className="text-orange-500"
        />
        {message}
      </>
    </EBox>
  );

const errorBox = (message: string) => (props: ToastContentProps<unknown>) =>
  (
    <EBox
      className="bg-[#002b34] p-2 border-red-500 flex flex-row gap-2 items-center"
      onClick={props.closeToast}
    >
      <>
        <Icon
          icon="material-symbols:close"
          fontSize="32px"
          className="text-red-500"
        />
        {message}
      </>
    </EBox>
  );

export const info = (message: string) => {
  return toast(infoBox(message));
};

export const success = (message: string) => {
  return toast(successBox(message));
};

export const warning = (message: string) => {
  return toast(warningBox(message));
};

export const error = (message: string) => {
  return toast(errorBox(message));
};
