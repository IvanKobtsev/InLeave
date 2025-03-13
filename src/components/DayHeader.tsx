import styles from "../styles/PersonalCalendar.module.scss";
import { addLeadingZero, getDayOfWeekText } from "../static/functions.ts";

interface DayHeaderProps {
  index: number;
  currentDate: Date;
}

export default function DayHeader({ index, currentDate }: DayHeaderProps) {
  const weekDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    index + 1,
  ).getDay();

  return (
    <div
      className={`${styles.dayHeader} ${styles.cellBorders} ${weekDay === 0 ? styles.weekend : ""}`}
    >
      <div className={styles.dayOfMonth}>
        {addLeadingZero(index + 1)}.{addLeadingZero(currentDate.getMonth() + 1)}
      </div>
      <div className={styles.dayOfWeek}>{getDayOfWeekText(weekDay)}</div>
    </div>
  );
}
