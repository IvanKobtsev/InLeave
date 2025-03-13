import styles from "../styles/PersonalCalendar.module.scss";
import { getLastDayOfMonth } from "../static/functions.ts";
import { useRef, useState, MouseEvent, WheelEvent } from "react";
import {
  AbsentData,
  ERole,
  MouseData,
  StudentAbsents,
} from "../static/types.ts";
import MonthChanger from "./MonthChanger.tsx";
import personalCalendarStyles from "../styles/PersonalCalendar.module.scss";
import AbsentPanel from "./AbsentPanel.tsx";
import CalendarDay from "./CalendarDay.tsx";

interface PersonalCalendarProps {
  student: StudentAbsents;
  currentDate: Date;
  currentDateSetter: (value: ((prevState: Date) => Date) | Date) => void;
}

export default function PersonalCalendar({
  student,
  currentDate,
  currentDateSetter,
}: PersonalCalendarProps) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const mouseProps = useRef<MouseData>({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    isDragging: false,
  });

  const [selectedAbsent, setSelectedAbsent] = useState<AbsentData | null>(null);

  const absentBlockClickHandler = (absentId: string | null) => {
    if (
      hasUnsavedChanges &&
      !confirm(
        "У вас есть несохранённые изменения! Уверены, что хотите закрыть меню?",
      )
    )
      return;

    setHasUnsavedChanges(false);
    for (let i = 0; i < student.absents.length; i++) {
      if (student.absents[i].id === absentId) {
        setSelectedAbsent(structuredClone(student.absents[i]));
        return;
      }
    }
  };

  const startDrag = (event: MouseEvent<HTMLDivElement>) => {
    mouseProps.current.isDragging = true;
    mouseProps.current.position.x = event.pageX - scrollRef.current!.offsetLeft;
  };

  const onDrag = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!mouseProps.current.isDragging) return;

    scrollRef.current!.scrollLeft +=
      (mouseProps.current.position.x -
        (event.pageX - scrollRef.current!.offsetLeft)) *
      10;
    mouseProps.current.position.x = event.pageX - scrollRef.current!.offsetLeft;
  };

  const stopDrag = (_: MouseEvent<HTMLDivElement>) => {
    mouseProps.current.isDragging = false;
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (event.deltaY !== 0) {
      scrollRef.current!.scrollLeft += event.deltaY * 4;
    } else {
      scrollRef.current!.scrollLeft += event.deltaX * 4;
    }
  };

  const deleteAbsent = () => {
    // Send delete request
    for (let i = 0; i < student.absents.length; i++) {
      if (student.absents[i].id === selectedAbsent?.id) {
        student.absents.splice(i, 1);
        setSelectedAbsent(null);
        setHasUnsavedChanges(false);
        return;
      }
    }
  };

  const saveAbsent = () => {
    for (let i = 0; i < student.absents.length; i++) {
      if (student.absents[i].id === selectedAbsent?.id) {
        student.absents[i] = selectedAbsent;
        setHasUnsavedChanges(false);
        return;
      }
    }
  };

  const addAbsent = () => {};

  const closePanel = () => {
    if (
      hasUnsavedChanges &&
      !confirm(
        "У вас есть несохранённые изменения! Уверены, что хотите закрыть меню?",
      )
    )
      return;

    setHasUnsavedChanges(false);
    setSelectedAbsent(null);
  };

  return (
    <div className={styles.PersonalCalendarWrapper}>
      <AbsentPanel
        deleteHandler={deleteAbsent}
        saveHandler={saveAbsent}
        hasUnsavedChanges={hasUnsavedChanges}
        hasUnsavedChangesSetter={setHasUnsavedChanges}
        watchingRole={ERole.Student}
        student={student}
        absent={selectedAbsent}
        handlePanelClose={closePanel}
      />
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
            return (
              <CalendarDay
                key={index}
                index={index}
                currentDate={currentDate}
                student={student}
                selectedAbsent={selectedAbsent}
                absentBlockClickHandler={absentBlockClickHandler}
                addAbsent={addAbsent}
              />
            );
          },
        )}
      </div>
      <div className={personalCalendarStyles.actionButtonsWrapper}>
        <MonthChanger date={currentDate} dateSetter={currentDateSetter} />
      </div>
    </div>
  );
}
