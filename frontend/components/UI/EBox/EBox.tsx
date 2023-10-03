import styles from "./index.module.css";

export interface EBoxProps {
  children?: JSX.Element[] | JSX.Element | string;
  header?: JSX.Element[] | JSX.Element | string;

  className?: string;
  id?: string;

  notched?: boolean;
  active?: boolean;
  borderless?: boolean;
  noCorners?: boolean;
  twoCorners?: boolean;
  bgColor?: string;

  onClick?: () => void;
}

export default function EBox(props: EBoxProps) {
  const {
    notched = false,
    active = false,
    borderless = false,
    noCorners = false,
    twoCorners = false,
    header,
    className,
    children,
    onClick,
    id,
    bgColor,
    // Необходимо для работы react-draggable
    ...rest
  } = props;

  const cornerBox = !noCorners && (
    <div
      className={`absolute inset-0 -z-10 -m-[2px] ${styles.outer_box} ${
        notched ? styles.outer_box_notched : ""
      } ${twoCorners ? styles.outer_box_two_corners : ""}`}
    ></div>
  );

  const headerBox = header && (
    <div className="e_header z-20 bg-[#084048]">{header}</div>
  );

  return (
    <div
      className={`relative ${!borderless ? "border" : ""} ${
        bgColor ? `bg-[${bgColor}]` : active ? "bg-[#000a17]" : "bg-[#00000020]"
      } z-10 border-[#4dffff] ${className}`}
      onClick={onClick}
      id={id}
      {...rest}
    >
      {headerBox}
      {children}
      {cornerBox}
    </div>
  );
}