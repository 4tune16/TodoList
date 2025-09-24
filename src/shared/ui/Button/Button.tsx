import type { ComponentProps } from "react";
import styles from "./Button.module.scss";

/* type ButttonProps = {
  children: string;
  className?: string;
  type?: "button" | "submit";
}; */

const Button = ({
  children,
  className = "",
  type = "button",
  onClick,
  disabled,
  ...restProps
}: ComponentProps<"button">) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...restProps}>
      {children}
    </button>
  );
};

export default Button;
