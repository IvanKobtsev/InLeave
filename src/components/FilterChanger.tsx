import styles from "../styles/FilterChanger.module.scss";
import { useState } from "react";
import FilterDropdown from "./FilterDropdown.tsx";

interface FilterChangerProps {
  groupChoices: Map<string, string[]>;
  facultyChoice: string;
  groupChoice: string;
  setGroupChoice: (value: ((prevState: string) => string) | string) => void;
  setFacultyChoice: (value: ((prevState: string) => string) | string) => void;
}

export default function FilterChanger({
  groupChoices,
  facultyChoice,
  setFacultyChoice,
  groupChoice,
  setGroupChoice,
}: FilterChangerProps) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className={`${styles.FilterChanger} ${isOpened ? styles.opened : ""}`}>
      <button
        className={`${styles.openFilters} ${isOpened ? styles.opened : ""}`}
        onClick={() => setIsOpened(!isOpened)}
      >
        Фильтровать
      </button>
      {isOpened ? (
        <div className={styles.filtersWrapper}>
          <FilterDropdown
            name={"Факультет"}
            choices={Array.from(groupChoices.keys())}
            valueSetter={setFacultyChoice}
            currentChoice={facultyChoice}
          />
          {groupChoices.get(facultyChoice) !== undefined &&
          groupChoices.get(facultyChoice)!.length > 0 ? (
            <FilterDropdown
              name={"Группа"}
              choices={groupChoices.get(facultyChoice)}
              valueSetter={setGroupChoice}
              currentChoice={groupChoice}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
