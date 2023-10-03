import EInput from "@components/UI/EInput";
import { ChangeEventHandler, FC, FocusEventHandler } from "react";

export interface SearchProps {
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

const Search: FC<SearchProps> = ({ placeholder, value, onChange, onFocus }) => {
  return (
    <EInput
      noBox
      inputClassName="my-2 max-h-10 border border-[#4dffff] p-2 placeholder:text-[#4dffff]"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};

export default Search;
