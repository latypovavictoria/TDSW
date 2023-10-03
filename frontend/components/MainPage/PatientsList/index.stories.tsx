import { mockPatientsGetAttached } from "@api/v2/patients/get/attached";
import { mockPatientsGetDettached } from "@api/v2/patients/get/dettached";
import { Args, Meta, Story } from "@storybook/react";
import { useAppDispatch } from "redux/hooks";
import { setOpen } from "redux/reducers/nav/winSlice";
import { saveUserToStorage } from "utils/storageUser";
import Mockstore from "utils/stories/Mockstore";
import PatientsList, { PatientsListProps } from "./PatientsList";

export default {
  name: "OverviewStats",
  component: PatientsList,
  parameters: {
    mockData: [
      {
        url: "http://localhost:5000/v2/patients/get/attached/1",
        method: "GET",
        status: 200,
        response: mockPatientsGetAttached(),
        delay: 10,
      },
      {
        url: "http://localhost:5000/v2/patients/get/dettached/1",
        method: "POST",
        status: 200,
        response: mockPatientsGetDettached(),
        delay: 10,
      },
    ],
  },
} as Meta;

export const Default: Story<PatientsListProps> = (args) => {
  return (
    <Mockstore>
      <OpenBlock {...args} />
    </Mockstore>
  );
};

const OpenBlock = (args: Args) => {
  saveUserToStorage({
    account_type: "doctor",
    data_time: "",
    name: "Доктор",
    is_permanent: false,
    refresh_token: "",
    token: "",
    user_id: 1,
    id: 1,
  });

  const dispatch = useAppDispatch();
  dispatch(setOpen(PatientsList.block_name));
  return <PatientsList {...args} />;
};

Default.args = {
  className: "p-4",
};
