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

import { mockInspectionsGetStatistics } from "@api/v2/inspections/get/statistics";
import { mockInspectionsGetStatisticsWeek } from "@api/v2/inspections/get/statistics/week";

import Mockstore from "utils/stories/Mockstore";

import { useAppDispatch } from "redux/hooks";
import { setOpen } from "redux/reducers/nav/winSlice";

import OverviewStats, { OverviewStatsProps } from "./OverviewStats";

export default {
  name: "OverviewStats",
  component: OverviewStats,
  parameters: {
    mockData: [
      {
        url: "http://localhost:5000/v2/inspections/get/statistics/",
        method: "GET",
        status: 200,
        response: mockInspectionsGetStatistics(),
        delay: 10,
      },
      {
        url: "http://localhost:5000/v2/inspections/get/statistics/week",
        method: "GET",
        status: 200,
        response: mockInspectionsGetStatisticsWeek(),
        delay: 10,
      },
    ],
  },
} as Meta;

export const Default: Story<OverviewStatsProps> = (args) => {
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
  dispatch(setOpen(OverviewStats.block_name));
  return <OverviewStats {...args} />;
};

Default.args = {
  className: "p-4",
};
