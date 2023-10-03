import { Args, Meta, Story } from "@storybook/react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";

import { mockInspectionsGet } from "@api/v2/inspections/get";

import { useAppDispatch } from "redux/hooks";
import { setOpen } from "redux/reducers/nav/winSlice";
import { setActivePatient } from "redux/reducers/patients/patientsSlice";

import Mockstore from "utils/stories/Mockstore";

import OverviewPulseGraph from "./OveriewPulseGraph";

export default {
  name: "OverviewPulseGraph",
  component: OverviewPulseGraph,
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
  ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LineController,
    LinearScale,
    Filler
  );

  const dispatch = useAppDispatch();
  dispatch(setOpen(OverviewPulseGraph.block_name));
  dispatch(setActivePatient(1));
  return <OverviewPulseGraph {...args} />;
};

Default.args = {
  className: "p-4",
};
