import { mockPatientGet } from "@api/v2/patients/get";
import { Args, Meta, Story } from "@storybook/react";

import { useAppDispatch } from "redux/hooks";
import { setOpen } from "redux/reducers/nav/winSlice";
import { setActivePatient } from "redux/reducers/patients/patientsSlice";

import Mockstore from "utils/stories/Mockstore";

import OverviewRisks from "./OverviewRisks";

export default {
  name: "OverviewRisks",
  component: OverviewRisks,
  parameters: {
    mockData: [
      {
        url: "http://localhost:5000/v2/patients/get/1",
        method: "GET",
        status: 200,
        response: mockPatientGet(),
        delay: 10,
      },
    ],
  },
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
  dispatch(setOpen(OverviewRisks.block_name));
  dispatch(setActivePatient(1));
  return <OverviewRisks {...args} />;
};

Default.args = {
  className: "p-4",
};
