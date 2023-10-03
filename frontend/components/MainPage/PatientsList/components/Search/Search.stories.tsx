import { Meta, Story } from "@storybook/react";
import Search, { SearchProps } from "./Search";

const meta: Meta = {
  title: "Components/MainPage/PatientsList/Search",
  component: Search,
};

export default meta;

export const Default: Story<SearchProps> = (args) => {
  return (
    <Search {...args} />
  );
};

Default.args = {
  placeholder: "Поиск",
  value: "",
  onChange: function (): void {
    throw new Error("Function not implemented.");
  },
  onFocus: function (): void {
    throw new Error("Function not implemented.");
  },
};
