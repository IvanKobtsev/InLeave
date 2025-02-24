import styles from "../styles/CommonCalendar.module.scss";
import personalCalendarStyles from "../styles/PersonalCalendar.module.scss";
import MonthChanger from "./MonthChanger.tsx";
import {
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { getDateDifferenceInDays, getLastDayOfMonth } from "../static.ts";
import { MouseData, StudentAbsents, Vector } from "../types.ts";
import DayHeader from "./DayHeader.tsx";
import FilterChanger from "./FilterChanger.tsx";

interface CommonCalendarProps {
  absents: StudentAbsents[];
}

export default function CommonCalendar({ absents }: CommonCalendarProps) {
  const [currentDate, dateSetter] = useState<Date>(new Date());
  const [isSearching, setIsSearching] = useState(false);
  const scrollRef3 = useRef<HTMLDivElement | null>(null);
  const scrollRef2 = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  const mouseProps = useRef<MouseData>({
    position: { x: 0, y: 0 },
    isDragging: false,
    velocity: { x: 0, y: 0 },
  });
  const [scrolled, setScrolled] = useState<Vector>({ x: 0, y: 0 });
  const [searchString, setSearchString] = useState("");

  const groupChoices = new Map<string, string[]>();
  const [facultyChoice, setFacultyChoice] = useState("Не выбрано");
  const [groupChoice, setGroupChoice] = useState("Не выбрано");

  groupChoices.set(`НОЦ "ВИТШ"`, ["972301", "972302", "972303"]);
  groupChoices.set("ИПМКН", [
    "932301",
    "932302",
    "932303",
    "932304",
    "932401",
    "932402",
    "932403",
    "932404",
  ]);

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
    scrollRef3.current!.scrollTop += mouseProps.current.velocity.y;

    mouseProps.current.position.x = event.pageX - scrollRef.current!.offsetLeft;
    mouseProps.current.position.y = event.pageY - scrollRef.current!.offsetTop;

    setScrolled({
      x: scrollRef.current!.scrollLeft,
      y: scrollRef.current!.scrollTop,
    });
  };

  const stopDrag = (_: MouseEvent<HTMLDivElement>) => {
    mouseProps.current.isDragging = false;
    applyMomentum(mouseProps.current.velocity);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    mouseProps.current.velocity.x = event.deltaX / 10;
    mouseProps.current.velocity.y = event.deltaY / 10;
    scrollRef.current!.scrollTop += mouseProps.current.velocity.y;
    scrollRef.current!.scrollLeft += mouseProps.current.velocity.x;
    scrollRef2.current!.scrollLeft += scrollRef.current!.scrollLeft;
    scrollRef3.current!.scrollTop += scrollRef.current!.scrollTop;

    setScrolled({
      x: scrollRef.current!.scrollLeft,
      y: scrollRef.current!.scrollTop,
    });

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
    scrollRef3.current!.scrollTop = scrollRef.current!.scrollTop;
    mouseProps.current.velocity.x = mouseProps.current.velocity.x * 0.95;
    mouseProps.current.velocity.y = mouseProps.current.velocity.y * 0.95;

    setScrolled({
      x: scrollRef.current!.scrollLeft,
      y: scrollRef.current!.scrollTop,
    });

    setAnimationFrame(
      requestAnimationFrame(() => applyMomentum(mouseProps.current.velocity)),
    );
  };

  useEffect(() => {
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame); // Clean up animation frame
    };
  }, [animationFrame]);

  const filteredAbsents = structuredClone(absents);

  if (isSearching) {
    for (let i = 0; i < filteredAbsents.length; i++) {
      if (
        !filteredAbsents[i].name
          .toLowerCase()
          .includes(searchString.toLowerCase())
      ) {
        filteredAbsents.splice(i--, 1);
      }
    }
  }

  if (facultyChoice !== "Не выбрано") {
    if (groupChoice !== "Не выбрано") {
      for (let i = 0; i < filteredAbsents.length; i++) {
        if (filteredAbsents[i].group !== groupChoice) {
          filteredAbsents.splice(i--, 1);
        }
      }
    } else {
      for (let i = 0; i < filteredAbsents.length; i++) {
        if (filteredAbsents[i].faculty !== facultyChoice) {
          filteredAbsents.splice(i--, 1);
        }
      }
    }
  }

  return (
    <div className={styles.listWrapper}>
      <div
        className={`${styles.listHeader} ${personalCalendarStyles.cellBorders}`}
      >
        {isSearching ? (
          <div className={styles.inputWrapper}>
            <input
              className={styles.searchField}
              placeholder="Введите Ф.И.О. студента"
              onInput={(event: FormEvent<HTMLInputElement>) => {
                setSearchString(event.currentTarget.value as string);
              }}
              value={searchString}
            />
          </div>
        ) : (
          "Список студентов"
        )}
        <button
          className={`${styles.searchButton} ${isSearching ? styles.closeButton : ""}`}
          onClick={() => {
            setIsSearching(!isSearching);
          }}
        ></button>
      </div>
      <div
        className={`${styles.studentsList} ${scrolled.x > 0 ? styles.scrolled : ""}`}
        ref={scrollRef3}
      >
        {filteredAbsents.length === 0 ? (
          <div className={styles.noSuchStudents}>Нет таких студентов!</div>
        ) : (
          filteredAbsents.map((absent, index) => {
            return (
              <div
                key={index}
                className={`${personalCalendarStyles.cellBorders} ${styles.absentListEntry}`}
              >
                <div className={styles.absentName}>{absent.name}</div>
                <div className={styles.absentGroup}>{absent.group}</div>
              </div>
            );
          })
        )}
      </div>
      <div className={styles.calendarWrapper}>
        <div
          ref={scrollRef2}
          className={`${personalCalendarStyles.calendarHeader} ${scrolled.y > 0 ? styles.scrolled : ""}`}
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

              for (const studentAbsents of filteredAbsents) {
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
                  <div
                    className={`${styles.dayBody} ${
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        index + 1,
                      ).getDay() === 0
                        ? personalCalendarStyles.weekend
                        : ""
                    }`}
                  >
                    {absentBlocks}
                  </div>
                </div>
              );
            },
          )}
        </div>
        <FilterChanger
          groupChoices={groupChoices}
          facultyChoice={facultyChoice}
          setFacultyChoice={(
            facultyChoice: string | ((prevState: string) => string),
          ) => {
            setFacultyChoice(facultyChoice);
            setGroupChoice("Не выбрано");
          }}
          groupChoice={groupChoice}
          setGroupChoice={setGroupChoice}
        />
        <MonthChanger date={currentDate} dateSetter={dateSetter} />
      </div>
    </div>
  );
}
