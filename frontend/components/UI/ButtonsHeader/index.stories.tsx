import { Meta, Story } from "@storybook/react";

import ButtonsHeader, { ButtonsHeaderProps } from "./ButtonsHeader";

import close from "@svg/close.svg";
import minimize from "@svg/minimize.svg";

export default {
  component: ButtonsHeader,
} as Meta;

export const Default: Story<ButtonsHeaderProps> = (args) => {
  return <ButtonsHeader {...args} />;
};

Default.args = {
  buttons: [
    {
      Icon: close,
    },
    {
      Icon: minimize,
    },
  ],
  title: "Test Title",
};
