import styles from "../styles/PersonalCalendar.module.scss";
import { addLeadingZero, getDayOfWeekText } from "../static.ts";

interface DayHeaderProps {
  index: number;
  currentDate: Date;
}

export default function DayHeader({ index, currentDate }: DayHeaderProps) {
  return (
    <div className={styles.dayHeader}>
      <div className={styles.dayOfMonth}>
        {addLeadingZero(index + 1)}.{addLeadingZero(currentDate.getMonth() + 1)}
      </div>
      <div className={styles.dayOfWeek}>
        {getDayOfWeekText(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            index + 1,
          ).getDay(),
        )}
      </div>
    </div>
  );
}
