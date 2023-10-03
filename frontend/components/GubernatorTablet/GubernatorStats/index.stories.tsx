import { Meta, Story } from "@storybook/react";

import { mockInspectionsGetStatistics } from "@api/v2/inspections/get/statistics";
import { mockOrganizationsAll } from "@api/v2/organizations/get/all";

import Mockstore from "utils/stories/Mockstore";
import OpenBlock from "utils/stories/OpenBlock";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";

import GubernatorStats from "./GubernatorStats";
import { mockOrganizationsBadGuys } from "@api/v2/organizations/get/statistics/bad_guys";
import { mockOrganizationsGraphs } from "@api/v2/organizations/get/statistics/graphs";

export default {
  name: "GubernatorStats",
  component: GubernatorStats,
  parameters: {
    mockData: [
      {
        url: "http://localhost:5000/v2/organizations/get/all",
        method: "GET",
        status: 200,
        response: mockOrganizationsAll(),
        delay: 10,
      },
      {
        url: "http://localhost:5000/v2/inspections/get/statistics/",
        method: "GET",
        status: 200,
        response: mockInspectionsGetStatistics(),
        delay: 10,
      },
      {
        url: "http://localhost:5000/v2/organizations/get/statistics/-1/bad_guys",
        method: "GET",
        status: 200,
        response: mockOrganizationsBadGuys(),
        delay: 10,
      },
      {
        url: "http://localhost:5000/v2/organizations/get/statistics/-1/graphs/count_inspections",
        method: "GET",
        status: 200,
        response: mockOrganizationsGraphs(),
        delay: 10,
      },
      {
        url: "http://localhost:5000/v2/organizations/get/statistics/-1/graphs/count_alcohol",
        method: "GET",
        status: 200,
        response: mockOrganizationsGraphs(),
        delay: 10,
      },
      {
        url: "http://localhost:5000/v2/organizations/get/statistics/-1/graphs/count_pressure",
        method: "GET",
        status: 200,
        response: mockOrganizationsGraphs(),
        delay: 10,
      },
    ],
  },
} as Meta;

export const Default: Story = (args) => {
  ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LineController,
    LinearScale,
    Filler,
    BarElement,
    ArcElement
  );

  return (
    <Mockstore>
      <OpenBlock name={GubernatorStats.block_name}>
        <GubernatorStats {...args} />
      </OpenBlock>
    </Mockstore>
  );
};

Default.args = {
  className: "p-4",
};
