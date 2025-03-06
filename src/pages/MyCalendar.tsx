import Navbar from "../components/Navbar.tsx";
import PersonalCalendar from "../components/PersonalCalendar.tsx";
import { AbsentData, EAbsentStatus, EError, StudentAbsents } from "../types.ts";
import { useUser } from "../components/UserProvider.tsx";
import ErrorPage from "./ErrorPage.tsx";

export default function MyCalendar() {
  const { user } = useUser();

  if (!user) {
    return <ErrorPage code={EError.Unauthorized} />;
  }

  const absents: AbsentData[] = [
    {
      id: "1",
      from: new Date("January 20, 2025 00:00:00"),
      to: new Date("February 5, 2025 00:00:00"),
      description: "Болел",
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
      description: "Была олимпиада fgho gjfdoi jewfpjewp ejfewjfoe",
      status: EAbsentStatus.Pending,
    },
  ];

  const student: StudentAbsents = {
    id: user.id,
    name: user.name,
    faculty: `НОЦ "ВИТШ"`,
    group: "972301",
    absents: absents,
  };

  return (
    <>
      <Navbar />
      <PersonalCalendar student={student} />
    </>
  );
}
