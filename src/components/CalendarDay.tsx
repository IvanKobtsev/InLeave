import { getFirstDayOfMonth } from "../static/functions.ts";
import AbsentBlock from "./AbsentBlock.tsx";
import styles from "../styles/PersonalCalendar.module.scss";
import DayHeader from "./DayHeader.tsx";
import { AbsentData, StudentAbsents } from "../static/types.ts";

interface CalendarDayProps {
  index: number;
  currentDate: Date;
  student: StudentAbsents;
  selectedAbsent: AbsentData | null;
  absentBlockClickHandler: (absentId: string | null) => void;
  addAbsent: () => void;
}

export default function CalendarDay({
  index,
  currentDate,
  student,
  selectedAbsent,
  absentBlockClickHandler,
  addAbsent,
}: CalendarDayProps) {
  const currentDay = index + 1,
    currentMonth = currentDate.getMonth();

  let absentBlock = null;

  if (
    index === 0 &&
    student.absents.length > 1 &&
    student.absents[0].from < getFirstDayOfMonth(currentDate)
  ) {
    absentBlock = (
      <AbsentBlock
        absent={student.absents[0]}
        currentDate={currentDate}
        personal={true}
        selectedId={selectedAbsent?.id}
        clickHandler={absentBlockClickHandler}
      />
    );
  } else {
    for (const absent of student.absents) {
      if (
        absent.from.getDate() === currentDay &&
        absent.from.getMonth() === currentMonth
      ) {
        absentBlock = (
          <AbsentBlock
            absent={absent}
            currentDate={currentDate}
            personal={true}
            selectedId={selectedAbsent?.id}
            clickHandler={absentBlockClickHandler}
          />
        );
        break;
      }
    }
  }
  const weekDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    index + 1,
  ).getDay();

  return (
    <div key={index} className={`${styles.day} ${styles.personalDay}`}>
      <DayHeader index={index} currentDate={currentDate} />
      <div
        className={`${styles.dayBody} ${weekDay === 0 ? styles.weekend : ""}`}
      >
        <div className={styles.addAbsent} onClick={() => addAbsent()}></div>
        {absentBlock}
      </div>
    </div>
  );
}
