import { Args, Meta, Story } from "@storybook/react";

import { mockInspectionsECGAverages } from "@api/v2/inspections/get/ecg_averages";

import { useAppDispatch } from "redux/hooks";
import { setOpen } from "redux/reducers/nav/winSlice";
import { setActivePatient } from "redux/reducers/patients/patientsSlice";

import Mockstore from "utils/stories/Mockstore";

import OverviewStress from "./OverviewStress";

export default {
  name: "OverviewStress",
  component: OverviewStress,
  parameters: {
    mockData: [
      {
        url: "http://localhost:5000/v2/inspections/get/ecg_averages/1",
        method: "GET",
        status: 200,
        response: mockInspectionsECGAverages(),
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
  dispatch(setOpen(OverviewStress.block_name));
  dispatch(setActivePatient(1));
  return <OverviewStress {...args} />;
};

Default.args = {
  className: "p-4",
};
