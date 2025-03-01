import Navbar from "../components/Navbar.tsx";
import PersonalCalendar from "../components/PersonalCalendar.tsx";
import { AbsentData, EAbsentStatus, ERole, StudentAbsents } from "../types.ts";

export default function MyCalendar() {
  const absents: AbsentData[] = [
    {
      id: "1",
      from: new Date("January 20, 2025 00:00:00"),
      to: new Date("February 5, 2025 00:00:00"),
      status: EAbsentStatus.Rejected,
    },
    {
      id: "2",
      from: new Date("February 7, 2025 00:00:00"),
      to: new Date("February 7, 2025 00:00:00"),
      status: EAbsentStatus.Accepted,
    },
    {
      id: "3",
      from: new Date("February 10, 2025 00:00:00"),
      to: new Date("March 14, 2025 00:00:00"),
      status: EAbsentStatus.Pending,
    },
  ];

  const student: StudentAbsents = {
    id: "1",
    name: "Иванов Иван Иванович",
    faculty: "НОЦ ВИТШ",
    group: "972301",
    absents: absents,
  };

  return (
    <>
      <Navbar currentRole={ERole.Student} />
      <PersonalCalendar student={student} />
    </>
  );
}
