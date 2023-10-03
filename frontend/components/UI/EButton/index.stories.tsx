import { Meta, Story } from "@storybook/react";

import EButton, { EButtonProps } from "./EButton";

import closeIcon from "@svg/close.svg";
import exportIcon from "@svg/exportIcon.svg";
import linkIcon from "@svg/linkIcon.svg";
import minimizeIcon from "@svg/minimize.svg";
import plusIcon from "@svg/plusIcon.svg";

export default {
  name: "EButton",
  component: EButton,
} as Meta;

export const Default: Story<EButtonProps> = (args) => {
  return <EButton {...args} />;
};
Default.args = {
  Icon: closeIcon,
  onClick: () => {
    alert("click");
  },
};

export const minimize: Story<EButtonProps> = (args) => {
  return <EButton {...args} />;
};
minimize.args = {
  Icon: minimizeIcon,
  onClick: () => {
    alert("click");
  },
};

export const plus: Story<EButtonProps> = (args) => {
  return <EButton {...args} />;
};
plus.args = {
  Icon: plusIcon,
  onClick: () => {
    alert("click");
  },
};

export const exportBtn: Story<EButtonProps> = (args) => {
  return <EButton {...args} />;
};
exportBtn.args = {
  Icon: exportIcon,
  onClick: () => {
    alert("click");
  },
};

export const close: Story<EButtonProps> = (args) => {
  return <EButton {...args} />;
};
close.args = {
  Icon: closeIcon,
  onClick: () => {
    alert("click");
  },
};

export const link: Story<EButtonProps> = (args) => {
  return <EButton {...args} />;
};
link.args = {
  Icon: linkIcon,
  onClick: () => {
    alert("click");
  },
};
