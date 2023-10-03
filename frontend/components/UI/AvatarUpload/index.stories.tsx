import { Meta, Story } from "@storybook/react";

import AvatarUpload, { AvatarUploadProps } from "./AvatarUpload";

export default {
  name: "AvatarUpload",
  component: AvatarUpload,
} as Meta;

export const Default: Story<AvatarUploadProps> = (args) => {
  return <AvatarUpload {...args} />;
};
Default.args = {
  show: true,
};
