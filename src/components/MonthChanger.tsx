import styles from "../styles/MonthChanger.module.scss";
import { MouseEvent } from "react";
import { getMonthText } from "../static.ts";

interface MonthChangerProps {
  date: Date;
  dateSetter: (value: ((prevState: Date) => Date) | Date) => void;
}

export default function MonthChanger({ date, dateSetter }: MonthChangerProps) {
  const handleLeftClick = (_: MouseEvent<HTMLButtonElement>) => {
    dateSetter(new Date(date.getFullYear(), date.getMonth() - 1));
  };
  const handleRightClick = (_: MouseEvent<HTMLButtonElement>) => {
    dateSetter(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  return (
    <div className={styles.MonthChanger}>
      <button className={styles.leftButton} onClick={handleLeftClick}></button>
      <div className={styles.dateText}>
        <div>{getMonthText(date.getMonth())}</div>{" "}
        <div>{date.getFullYear()}</div>
      </div>
      <button
        className={styles.rightButton}
        onClick={handleRightClick}
      ></button>
    </div>
  );
}
