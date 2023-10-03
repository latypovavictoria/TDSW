import { Args, Meta, Story } from "@storybook/react";

import { mockInspectionsGet } from "@api/v2/inspections/get";

import Mockstore from "utils/stories/Mockstore";

import { useAppDispatch } from "redux/hooks";
import { setOpen } from "redux/reducers/nav/winSlice";
import { setActivePatient } from "redux/reducers/patients/patientsSlice";

import InspectionsTable from "./InspectionsTable";

export default {
  name: "InspectionsTable",
  component: InspectionsTable,
  parameters: {
    mockData: [
      {
        url: "http://localhost:5000/v2/inspections/get",
        method: "POST",
        status: 200,
        response: mockInspectionsGet(),
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
  dispatch(setOpen(InspectionsTable.block_name));
  dispatch(setActivePatient(1));
  return <InspectionsTable {...args} />;
};

Default.args = {
  className: "p-4",
};
