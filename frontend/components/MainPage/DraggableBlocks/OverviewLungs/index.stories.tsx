import { Args, Meta, Story } from "@storybook/react";

import { useAppDispatch } from "redux/hooks";
import { setOpen } from "redux/reducers/nav/winSlice";
import { setActivePatient } from "redux/reducers/patients/patientsSlice";

import Mockstore from "utils/stories/Mockstore";

import OverviewLungs from "./OverviewLungs";

export default {
  name: "OverviewLungs",
  component: OverviewLungs,
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
  dispatch(setOpen(OverviewLungs.block_name));
  dispatch(setActivePatient(1));
  return <OverviewLungs {...args} />;
};

Default.args = {
  className: "p-4",
};
