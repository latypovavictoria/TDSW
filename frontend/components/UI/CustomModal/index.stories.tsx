import { Meta, Story } from "@storybook/react";
import * as React from "react";

import EBox from "@components/UI/EBox";
import CustomModal, { CustomModalProps } from "./CustomModal";

export default {
  name: "CustomModal",
  component: CustomModal,
} as Meta;

export const Default: Story<CustomModalProps> = (args) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <EBox onClick={() => setIsModalOpen(true)} className="cursor-pointer p-4">
        Open Modal
      </EBox>
      <CustomModal
        {...args}
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

Default.args = {
  children: (
    <EBox className="p-4" active>
      Custom modal 📖
    </EBox>
  ),
};
