import styles from "../styles/PersonalCalendar.module.scss";
import { getDateDifferenceInDays, getLastDayOfMonth } from "../static.ts";
import { useRef, useState, MouseEvent, WheelEvent } from "react";
import { AbsentData, MouseData } from "../types.ts";
import MonthChanger from "./MonthChanger.tsx";
import DayHeader from "./DayHeader.tsx";

interface PersonalCalendarProps {
  absents: AbsentData[];
}

export default function PersonalCalendar({ absents }: PersonalCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const mouseProps = useRef<MouseData>({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    isDragging: false,
  });

  const startDrag = (event: MouseEvent<HTMLDivElement>) => {
    mouseProps.current.isDragging = true;
    mouseProps.current.position.x = event.pageX - scrollRef.current!.offsetLeft;
  };

  const onDrag = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!mouseProps.current.isDragging) return;

    scrollRef.current!.scrollLeft +=
      (mouseProps.current.position.x -
        event.pageX -
        scrollRef.current!.offsetLeft) *
      10;
    mouseProps.current.position.x = event.pageX - scrollRef.current!.offsetLeft;
  };

  const stopDrag = (_: MouseEvent<HTMLDivElement>) => {
    mouseProps.current.isDragging = false;
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    scrollRef.current!.scrollLeft += event.deltaY * 4;
  };

  const absentStatuses = [
    styles.absentPending,
    styles.absentAccepted,
    styles.absentRejected,
  ];

  return (
    <>
      <div
        ref={scrollRef}
        className={`${styles.PersonalCalendar} ${styles.MyCalendar}`}
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onWheel={handleWheel}
      >
        {Array.from({ length: getLastDayOfMonth(currentDate).getDate() }).map(
          (_, index) => {
            const currentDay = index + 1,
              currentMonth = currentDate.getMonth(),
              currentYear = currentDate.getFullYear();

            let absentBlock = null;

            for (const absent of absents) {
              if (
                absent.from.getDate() === currentDay &&
                absent.from.getMonth() === currentMonth &&
                absent.from.getFullYear() === currentYear
              ) {
                const stylesheet = `#absentBlock_${absent.id} { --percentage: ${(getDateDifferenceInDays(absent.from, absent.to) + 1) * 100}% }`;
                absentBlock = (
                  <>
                    <style>{stylesheet}</style>
                    <div
                      id={`absentBlock_${absent.id}`}
                      className={`${styles.absentBlock} ${absentStatuses[absent.status]}`}
                    ></div>
                  </>
                );
              }
            }

            const weekDay = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              index + 1,
            ).getDay();

            return (
              <div
                key={index}
                className={`${styles.day} ${styles.personalDay}`}
              >
                <DayHeader index={index} currentDate={currentDate} />
                <div
                  className={`${styles.dayBody} ${weekDay === 0 ? styles.weekend : ""}`}
                >
                  {absentBlock}
                </div>
              </div>
            );
          },
        )}
      </div>
      <MonthChanger date={currentDate} dateSetter={setCurrentDate} />
    </>
  );
}
