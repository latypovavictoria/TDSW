import { Meta, Story } from "@storybook/react";

import EBox, { EBoxProps } from "./EBox";

export default {
  name: "EBox",
  component: EBox,
} as Meta;

export const Default: Story<EBoxProps> = (args) => {
  return <EBox {...args} />;
};

Default.args = {
  className: "p-4",
  children: <h1>Hello world</h1>,
};
