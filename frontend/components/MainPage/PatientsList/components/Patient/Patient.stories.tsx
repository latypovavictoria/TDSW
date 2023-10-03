import { Meta, Story } from "@storybook/react";
import Patient, { PatientProps } from "./Patient";
import Mockstore from "utils/stories/Mockstore";

const meta: Meta = {
  title: "Components/MainPage/PatientsList/Patient",
  component: Patient,
};

export default meta;

export const Default: Story<PatientProps> = (args) => {
  return (
    <Mockstore>
      <Patient {...args} />
    </Mockstore>
  );
};

Default.args = {
  tid: "",
  firstName: "Иван",
  lastName: "Иванов",
  sex: 1,
  inspections_short_info: {
    danger_inspections_count: 0,
    warn_inspections_count: 0,
    ok_inspections_count: 0,
    inspections_count: 0,
  },
  DetachPatient: function (): void {
    throw new Error("Function not implemented.");
  },
};
