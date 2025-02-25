import styles from "../styles/PersonalCalendar.module.scss";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../static.ts";
import { useRef, useState, MouseEvent, WheelEvent } from "react";
import { AbsentData, MouseData } from "../types.ts";
import MonthChanger from "./MonthChanger.tsx";
import DayHeader from "./DayHeader.tsx";
import personalCalendarStyles from "../styles/PersonalCalendar.module.scss";
import AbsentBlock from "./AbsentBlock.tsx";

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
              currentMonth = currentDate.getMonth();

            let absentBlock = null;

            if (
              index === 0 &&
              absents[0].from < getFirstDayOfMonth(currentDate)
            ) {
              absentBlock = (
                <AbsentBlock
                  absent={absents[0]}
                  currentDate={currentDate}
                  personal={true}
                />
              );
            } else {
              for (const absent of absents) {
                if (
                  absent.from.getDate() === currentDay &&
                  absent.from.getMonth() === currentMonth
                ) {
                  absentBlock = (
                    <AbsentBlock
                      absent={absent}
                      currentDate={currentDate}
                      personal={true}
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
      <div className={personalCalendarStyles.actionButtonsWrapper}>
        <MonthChanger date={currentDate} dateSetter={setCurrentDate} />
      </div>
    </>
  );
}
