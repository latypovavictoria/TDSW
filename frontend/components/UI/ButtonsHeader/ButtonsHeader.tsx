import EButton, { EButtonProps } from "@components/UI/EButton";

export interface ButtonsHeaderProps {
  title: string;
  buttons: EButtonProps[];
}

export default function ButtonsHeader(props: ButtonsHeaderProps) {
  return (
    <div className="flex flex-row items-center gap-2 p-2">
      <span>{props.title}</span>
      <div className="ml-auto flex flex-row items-center gap-1">
        {props.buttons.map((b, i) => (
          <EButton key={i} {...b} />
        ))}
      </div>
    </div>
  );
}
