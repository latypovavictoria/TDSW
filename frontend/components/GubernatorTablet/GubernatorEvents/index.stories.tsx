import { Meta, Story } from "@storybook/react";

import { mockOrganizationsAll } from "@api/v2/organizations/get/all";

import Mockstore from "utils/stories/Mockstore";
import OpenBlock from "utils/stories/OpenBlock";

import { mockRisksGet } from "@api/v2/organizations/get/risks";
import GubernatorEvents from "./GubernatorEvents";

export default {
  name: "GubernatorEvents",
  component: GubernatorEvents,
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
        url: "http://localhost:5000/v2/organizations/get/risks/1",
        method: "GET",
        status: 200,
        response: mockRisksGet(),
        delay: 10,
      },
    ],
  },
} as Meta;

export const Default: Story = (args) => {
  return (
    <Mockstore>
      <OpenBlock name={GubernatorEvents.block_name}>
        <div className="flex h-[90vh] flex-row">
          <GubernatorEvents {...args} />
        </div>
      </OpenBlock>
    </Mockstore>
  );
};

Default.args = {
  className: "p-4",
};
