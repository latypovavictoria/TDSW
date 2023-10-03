import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import EBox from "../EBox/EBox";

export type EInputProps = {
  inputClassName?: string;
  noBox?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function EInput({ className, inputClassName, noBox, ...props }: EInputProps) {
  if (noBox) {
    return (
      <input
        className={`w-full flex-grow border-none bg-bg-primary text-center text-primary focus:caret-primary focus:outline-none ${inputClassName}`}
        {...props}
      />
    );
  }

  return (
    <EBox borderless className={className}>
      <input
        className={`w-full flex-grow border-none bg-bg-primary text-center text-primary focus:caret-primary focus:outline-none ${inputClassName}`}
        {...props}
      />
    </EBox>
  );
}

export default EInput;
