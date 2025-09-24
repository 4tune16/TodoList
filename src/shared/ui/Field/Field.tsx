import type { FormEventHandler, Ref } from "react";
import styles from "./Field.module.scss";

const Field = (props: {
  className?: string;
  id: string;
  label: string;
  type?: "text" | "search";
  value?: string;
  onInput: FormEventHandler<HTMLInputElement>;
  ref?: Ref<HTMLInputElement>;
  error?: string;
}) => {
  const {
    className = "",
    id,
    label,
    type = "text",
    value,
    onInput,
    ref,
    error,
  } = props;
  return (
    <div className={`${styles.field} ${className}`}>
      <label
        className={styles.label}
        htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.isInvalid : ""}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        value={value}
        onInput={onInput}
        ref={ref}
      />
      {error && (
        <span
          className={styles.error}
          title={error}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Field;
