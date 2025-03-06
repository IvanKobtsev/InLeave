import styles from "../styles/ToggleableTextInput.module.scss";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface ToggleableTextInputProps {
  labelText: string;
  propName: string;
  registerProps: UseFormRegister<FieldValues>;
}

export default function ToggleableTextInput({
  labelText,
  propName,
  registerProps,
}: ToggleableTextInputProps) {
  return (
    <div className={styles.ToggleableTextInput}>
      <span className={styles.label}>{labelText}</span>
      <div className={styles.inputWrapper}>
        <input
          disabled={true}
          className={styles.input}
          {...registerProps(propName)}
        />
      </div>
    </div>
  );
}
