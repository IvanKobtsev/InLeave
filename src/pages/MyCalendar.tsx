import Navbar from "../components/Navbar.tsx";
import PersonalCalendar from "../components/PersonalCalendar.tsx";
import { AbsentData, EAbsentStatus, ERole } from "../types.ts";

export default function MyCalendar() {
  const absents: AbsentData[] = [
    {
      id: "1",
      from: new Date("January 20, 2022 00:00:00"),
      to: new Date("March 5, 2025 00:00:00"),
      status: EAbsentStatus.Rejected,
    },
    // {
    //   id: "2",
    //   from: new Date("February 6, 2025 00:00:00"),
    //   to: new Date("February 6, 2025 00:00:00"),
    //   status: EAbsentStatus.Accepted,
    // },
    // {
    //   id: "3",
    //   from: new Date("February 10, 2025 00:00:00"),
    //   to: new Date("March 14, 2025 00:00:00"),
    //   status: EAbsentStatus.Pending,
    // },
  ];

  return (
    <>
      <Navbar currentRole={ERole.Student} />
      <PersonalCalendar absents={absents} />
    </>
  );
}
