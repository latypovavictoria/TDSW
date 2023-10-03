import { Args, Meta, Story } from "@storybook/react";

import { useAppDispatch } from "redux/hooks";
import { setOpen } from "redux/reducers/nav/winSlice";
import { setActivePatient } from "redux/reducers/patients/patientsSlice";

import Mockstore from "utils/stories/Mockstore";

import { mockInspectionsECGAverages } from "@api/v2/inspections/get/ecg_averages";

import OverviewECG, { OverviewECGProps } from ".";

export default {
  name: "OveriviewECG",
  component: OverviewECG,
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

export const Default: Story<OverviewECGProps> = (args) => {
  return (
    <Mockstore>
      <OpenBlock {...args} />
    </Mockstore>
  );
};

const OpenBlock = (args: Args) => {
  const dispatch = useAppDispatch();
  dispatch(setOpen(OverviewECG.block_name));
  dispatch(setActivePatient(1));
  return <OverviewECG {...args} />;
};

Default.args = {
  className: "p-4",
};
