import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import styles from "./Button.module.css";

export type ButtonProps = {
  secondary?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function UIButton({ className, secondary = false, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        secondary ? styles.button_secondary : ""
      } ${className}`}
      {...props}
    />
  );
}

export default UIButton;
