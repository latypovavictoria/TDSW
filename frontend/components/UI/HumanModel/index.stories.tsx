import { Args, Meta, Story } from "@storybook/react";

import Mockstore from "utils/stories/Mockstore";

import { useAppDispatch } from "redux/hooks";
import { setActivePatient } from "redux/reducers/patients/patientsSlice";

import HumanModel from "./HumanModel";

export default {
  component: HumanModel,
} as Meta;

export const Default: Story = (args) => {
  return (
    <Mockstore>
      <OpenBlock {...args} />
    </Mockstore>
  );
};

const OpenBlock = (args: Args) => {
  const dispatch = useAppDispatch();
  dispatch(setActivePatient(1));
  return <HumanModel {...args} />;
};

Default.args = {};
