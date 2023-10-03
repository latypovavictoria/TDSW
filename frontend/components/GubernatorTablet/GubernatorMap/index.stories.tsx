import { YMaps } from "@pbe/react-yandex-maps";
import { Meta, Story } from "@storybook/react";

import { mockOrganizationsAll } from "@api/v2/organizations/get/all";

import Mockstore from "utils/stories/Mockstore";
import OpenBlock from "utils/stories/OpenBlock";

import GubernatorMap from "./GubernatorMap";

export default {
  name: "GubernatorMap",
  component: GubernatorMap,
  parameters: {
    mockData: [
      {
        url: "http://localhost:5000/v2/organizations/get/all",
        method: "GET",
        status: 200,
        response: mockOrganizationsAll(),
        delay: 10,
      },
    ],
  },
} as Meta;

export const Default: Story = (args) => {
  return (
    <Mockstore>
      <OpenBlock name={GubernatorMap.block_name}>
        <YMaps>
          <GubernatorMap {...args} />
        </YMaps>
      </OpenBlock>
    </Mockstore>
  );
};

Default.args = {
  className: "p-4",
};
