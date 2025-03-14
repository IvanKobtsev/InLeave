import styles from "../styles/PersonalCalendar.module.scss";
import stylesCommon from "../styles/CommonCalendar.module.scss";
import {
  getDateDifferenceInDays,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from "../static/functions.ts";
import { AbsentData } from "../static/types.ts";

interface AbsentBlockProps {
  absent: AbsentData;
  currentDate: Date;
  personal: boolean;
  studentId?: string;
  clickHandler: (absentId: string | null) => void;
  selectedId?: string | undefined;
}

export default function AbsentBlock({
  absent,
  currentDate,
  personal,
  studentId,
  clickHandler,
  selectedId,
}: AbsentBlockProps) {
  let differenceInDays = getDateDifferenceInDays(absent.from, absent.to),
    absentExtraStyle = "";

  const absentStatuses = [
    styles.absentPending,
    styles.absentAccepted,
    styles.absentRejected,
  ];

  const blockId = personal
    ? `absentBlock_${absent.id}`
    : `absentBlock_${studentId}_${absent.id}`;

  const fromInCurrentMonth =
      absent.from.getMonth() === currentDate.getMonth() &&
      absent.from.getFullYear() === currentDate.getFullYear(),
    toInCurrentMonth =
      absent.to.getMonth() === currentDate.getMonth() &&
      absent.to.getFullYear() === currentDate.getFullYear();

  if (!toInCurrentMonth && fromInCurrentMonth) {
    differenceInDays = getDateDifferenceInDays(
      absent.from,
      getLastDayOfMonth(currentDate),
    );
    absentExtraStyle = personal
      ? styles.absentAbruptEnd
      : stylesCommon.absentAbruptEnd;
  } else if (!fromInCurrentMonth && toInCurrentMonth) {
    differenceInDays = getDateDifferenceInDays(
      getFirstDayOfMonth(currentDate),
      absent.to,
    );
    absentExtraStyle = personal
      ? styles.absentAbruptStart
      : stylesCommon.absentAbruptStart;
  } else if (!toInCurrentMonth && !fromInCurrentMonth) {
    differenceInDays = getDateDifferenceInDays(
      getFirstDayOfMonth(currentDate),
      getLastDayOfMonth(currentDate),
    );
    absentExtraStyle = personal
      ? styles.absentAbrupt
      : stylesCommon.absentAbrupt;
  }

  const stylesheet = `#${
    personal
      ? `absentBlock_${absent.id}`
      : `absentBlock_${studentId}_${absent.id}`
  } { --percentage: ${(differenceInDays + 1) * 100}% }`;

  if (personal) {
  }

  let isActive = false;

  if (selectedId === absent.id) {
    isActive = true;
  }

  return (
    <>
      <style>{stylesheet}</style>
      <div
        id={blockId}
        className={`${personal ? styles.absentBlock : stylesCommon.absentBlock} ${absentStatuses[absent.status]} ${absentExtraStyle} ${isActive ? styles.active : ""}`}
        onClick={
          personal
            ? (_) => {
                clickHandler(absent.id);
              }
            : () => {}
        }
      ></div>
    </>
  );
}
