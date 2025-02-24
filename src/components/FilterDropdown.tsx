import styles from "../styles/Filter.module.scss";

interface FilterDropdownProps {
  name: string;
  choices?: string[];
  valueSetter: (value: ((prevState: string) => string) | string) => void;
  currentChoice?: string;
}

export default function FilterDropdown({
  name,
  choices,
  valueSetter,
  currentChoice,
}: FilterDropdownProps) {
  return (
    <div className={styles.Filter}>
      <div className={styles.name}>{name}</div>
      <select
        className={styles.dropDown}
        onInput={(event) => {
          valueSetter((event.target as HTMLSelectElement).value);
        }}
      >
        <option value={"Не выбрано"}>Не выбрано</option>
        {choices?.map((choice, i) => (
          <option key={i} value={choice} selected={currentChoice === choice}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  );
}
