import styles from "../styles/CommonCalendar.module.scss";
import personalCalendarStyles from "../styles/PersonalCalendar.module.scss";
import MonthChanger from "./MonthChanger.tsx";
import { MouseEvent, useEffect, useRef, useState, WheelEvent } from "react";
import { getDateDifferenceInDays, getLastDayOfMonth } from "../static.ts";
import { MouseData, StudentAbsents, Vector } from "../types.ts";
import DayHeader from "./DayHeader.tsx";

interface CommonCalendarProps {
  absents: StudentAbsents[];
}

export default function CommonCalendar({ absents }: CommonCalendarProps) {
  const [currentDate, dateSetter] = useState<Date>(new Date());
  const scrollRef2 = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  const mouseProps = useRef<MouseData>({
    position: { x: 0, y: 0 },
    isDragging: false,
    velocity: { x: 0, y: 0 },
  });

  const startDrag = (event: MouseEvent<HTMLDivElement>) => {
    mouseProps.current.isDragging = true;
    mouseProps.current.position.x = event.pageX - scrollRef.current!.offsetLeft;
    mouseProps.current.position.y = event.pageY - scrollRef.current!.offsetTop;
  };

  const onDrag = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!mouseProps.current.isDragging) return;

    mouseProps.current.velocity.x =
      mouseProps.current.position.x -
      (event.pageX - scrollRef.current!.offsetLeft);

    mouseProps.current.velocity.y =
      mouseProps.current.position.y -
      (event.pageY - scrollRef.current!.offsetTop);

    scrollRef.current!.scrollLeft += mouseProps.current.velocity.x;
    scrollRef.current!.scrollTop += mouseProps.current.velocity.y;

    scrollRef2.current!.scrollLeft += mouseProps.current.velocity.x;
    // scrollRef.current!.scrollTop +=
    //   (mouseProps.current.position.y - event.pageY - scrollRef.current!.offsetTop) * 10;

    mouseProps.current.position.x = event.pageX - scrollRef.current!.offsetLeft;
    mouseProps.current.position.y = event.pageY - scrollRef.current!.offsetTop;
    // mouseProps.current.position.y = event.pageY - scrollRef.current!.offsetTop;

    // console.log(mouseProps.current.position);
    console.log(mouseProps.current.velocity);
  };

  const stopDrag = (_: MouseEvent<HTMLDivElement>) => {
    mouseProps.current.isDragging = false;
    applyMomentum(mouseProps.current.velocity);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    scrollRef.current!.scrollTop += event.deltaY / 10;
    mouseProps.current.velocity.y = event.deltaY / 10;
    applyMomentum(mouseProps.current.velocity);
  };

  const absentStatuses = [
    personalCalendarStyles.absentPending,
    personalCalendarStyles.absentAccepted,
    personalCalendarStyles.absentRejected,
  ];

  const applyMomentum = (currentVelocity: Vector) => {
    if (Math.abs(currentVelocity.x) < 0.1 && Math.abs(currentVelocity.y) < 0.1)
      return;
    scrollRef.current!.scrollLeft += currentVelocity.x;
    scrollRef.current!.scrollTop += currentVelocity.y;
    scrollRef2.current!.scrollLeft = scrollRef.current!.scrollLeft;
    mouseProps.current.velocity.x = mouseProps.current.velocity.x * 0.95;
    mouseProps.current.velocity.y = mouseProps.current.velocity.y * 0.95;
    setAnimationFrame(
      requestAnimationFrame(() => applyMomentum(mouseProps.current.velocity)),
    );
  };

  useEffect(() => {
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame); // Clean up animation frame
    };
  }, [animationFrame]);

  return (
    <>
      <div
        ref={scrollRef2}
        className={`${personalCalendarStyles.calendarHeader} ${scrollRef.current !== null && scrollRef.current.scrollTop < 0 ? styles.scrolled : ""}`}
      >
        {Array.from({ length: getLastDayOfMonth(currentDate).getDate() }).map(
          (_, index) => (
            <DayHeader key={index} index={index} currentDate={currentDate} />
          ),
        )}
      </div>
      <div
        ref={scrollRef}
        className={`${styles.CommonCalendar} ${personalCalendarStyles.PersonalCalendar}`}
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

            let absentBlocks = null,
              absentBlock = null;

            for (const studentAbsents of absents) {
              absentBlock = null;

              for (const absent of studentAbsents.absents) {
                if (
                  absent.from.getDate() === currentDay &&
                  absent.from.getMonth() === currentMonth &&
                  absent.from.getFullYear() === currentYear
                ) {
                  const stylesheet = `#absentBlock_${studentAbsents.id}_${absent.id} { --percentage: ${(getDateDifferenceInDays(absent.from, absent.to) + 1) * 100}% }`;
                  absentBlock = (
                    <>
                      <style>{stylesheet}</style>
                      <div
                        id={`absentBlock_${studentAbsents.id}_${absent.id}`}
                        className={`${styles.absentBlock} ${absentStatuses[absent.status]}`}
                      ></div>
                    </>
                  );
                }
              }

              absentBlocks = (
                <>
                  {absentBlocks}
                  <div className={personalCalendarStyles.absentCell}>
                    {absentBlock}
                  </div>
                </>
              );
            }

            return (
              <div key={index} className={personalCalendarStyles.day}>
                <div className={styles.dayBody}>{absentBlocks}</div>
              </div>
            );
          },
        )}
      </div>
      <MonthChanger date={currentDate} dateSetter={dateSetter} />
    </>
  );
}
