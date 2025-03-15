import CommonCalendar from "../components/CommonCalendar.tsx";
import {
  EAbsentStatus,
  EError,
  ERole,
  StudentAbsents,
} from "../static/types.ts";
import ErrorPage from "./ErrorPage.tsx";
import { useUser } from "../hooks/UserProvider.tsx";
import Loading from "../components/Loading.tsx";
import { isUnauthorized } from "../static/functions.ts";

export default function StudentsCalendar() {
  const { user } = useUser();

  console.log("user by the CALENDAR:", user);

  if (isUnauthorized()) {
    return <ErrorPage code={EError.Unauthorized} />;
  } else if (user === null) {
    return <Loading />;
  }

  if (
    !user.roles.includes(ERole.Teacher) &&
    !user.roles.includes(ERole.Dean) &&
    !user.roles.includes(ERole.Admin)
  ) {
    return <ErrorPage code={EError.Forbidden} />;
  }

  const studentsAbsents: StudentAbsents[] = [
    {
      id: "1",
      group: "972301",
      faculty: `НОЦ "ВИТШ"`,
      name: "Иванов Иван Иванович",
      absents: [
        {
          id: "1",
          from: new Date("January 20, 2025 00:00:00"),
          to: new Date("February 4, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "2",
          from: new Date("February 6, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "3",
          from: new Date("February 10, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
        {
          id: "4",
          from: new Date("February 20, 2025 00:00:00"),
          to: new Date("March 14, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
      ],
    },
    {
      id: "2",
      group: "932301",
      faculty: `ИПМКН`,
      name: "Грезвелг Александр Эмблемович",
      absents: [
        {
          id: "4",
          from: new Date("February 1, 2025 00:00:00"),
          to: new Date("February 5, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "5",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
        {
          id: "6",
          from: new Date("February 13, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
      ],
    },
    {
      id: "3",
      group: "942301",
      faculty: "РФФ",
      name: "Денисов Денис Денисович",
      absents: [
        {
          id: "7",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "8",
          from: new Date("February 4, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "9",
          from: new Date("February 8, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "10",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
      ],
    },
    {
      id: "1",
      group: "972301",
      faculty: `НОЦ "ВИТШ"`,
      name: "Иванов Иван Иванович",
      absents: [
        {
          id: "1",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "2",
          from: new Date("February 6, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "3",
          from: new Date("February 10, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
      ],
    },
    {
      id: "1",
      group: "972301",
      faculty: `НОЦ "ВИТШ"`,
      name: "Иванов Иван Иванович",
      absents: [
        {
          id: "1",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "2",
          from: new Date("February 6, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "3",
          from: new Date("February 10, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
      ],
    },
    {
      id: "2",
      group: "932301",
      faculty: `ИПМКН`,
      name: "Грезвелг Александр Эмблемович",
      absents: [
        {
          id: "4",
          from: new Date("February 1, 2025 00:00:00"),
          to: new Date("February 5, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "5",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
        {
          id: "6",
          from: new Date("February 13, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
      ],
    },
    {
      id: "3",
      group: "942301",
      faculty: "РФФ",
      name: "Денисов Денис Денисович",
      absents: [
        {
          id: "7",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "8",
          from: new Date("February 4, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "9",
          from: new Date("February 8, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "10",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
      ],
    },
    {
      id: "1",
      group: "972301",
      faculty: `НОЦ "ВИТШ"`,
      name: "Иванов Иван Иванович",
      absents: [
        {
          id: "1",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "2",
          from: new Date("February 6, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "3",
          from: new Date("February 10, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
      ],
    },
    {
      id: "2",
      group: "932301",
      faculty: `ИПМКН`,
      name: "Грезвелг Александр Эмблемович",
      absents: [
        {
          id: "4",
          from: new Date("February 1, 2025 00:00:00"),
          to: new Date("February 5, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "5",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
        {
          id: "6",
          from: new Date("February 13, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
      ],
    },
    {
      id: "3",
      group: "942301",
      faculty: "РФФ",
      name: "Денисов Денис Денисович",
      absents: [
        {
          id: "7",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "8",
          from: new Date("February 4, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "9",
          from: new Date("February 8, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "10",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
      ],
    },
    {
      id: "1",
      group: "972301",
      faculty: `НОЦ "ВИТШ"`,
      name: "Иванов Иван Иванович",
      absents: [
        {
          id: "1",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "2",
          from: new Date("February 6, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "3",
          from: new Date("February 10, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
      ],
    },
    {
      id: "2",
      group: "932301",
      faculty: `ИПМКН`,
      name: "Грезвелг Александр Эмблемович",
      absents: [
        {
          id: "4",
          from: new Date("February 1, 2025 00:00:00"),
          to: new Date("February 5, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "5",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
        {
          id: "6",
          from: new Date("February 13, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
      ],
    },
    {
      id: "3",
      group: "942301",
      faculty: "РФФ",
      name: "Денисов Денис Денисович",
      absents: [
        {
          id: "7",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "8",
          from: new Date("February 4, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "9",
          from: new Date("February 8, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "10",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
      ],
    },
    {
      id: "2",
      group: "932301",
      faculty: `ИПМКН`,
      name: "Грезвелг Александр Эмблемович",
      absents: [
        {
          id: "4",
          from: new Date("February 1, 2025 00:00:00"),
          to: new Date("February 5, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "5",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
        {
          id: "6",
          from: new Date("February 13, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
      ],
    },
    {
      id: "3",
      group: "942301",
      faculty: "РФФ",
      name: "Денисов Денис Денисович",
      absents: [
        {
          id: "7",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "8",
          from: new Date("February 4, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "9",
          from: new Date("February 8, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "10",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
      ],
    },
    {
      id: "1",
      group: "972301",
      faculty: `НОЦ "ВИТШ"`,
      name: "Иванов Иван Иванович",
      absents: [
        {
          id: "1",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "2",
          from: new Date("February 6, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "3",
          from: new Date("February 10, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
      ],
    },
    {
      id: "2",
      group: "932301",
      faculty: `ИПМКН`,
      name: "Грезвелг Александр Эмблемович",
      absents: [
        {
          id: "4",
          from: new Date("February 1, 2025 00:00:00"),
          to: new Date("February 5, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "5",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
        {
          id: "6",
          from: new Date("February 13, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
      ],
    },
    {
      id: "3",
      group: "942301",
      faculty: "РФФ",
      name: "Денисов Денис Денисович",
      absents: [
        {
          id: "7",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "8",
          from: new Date("February 4, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "9",
          from: new Date("February 8, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "10",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
      ],
    },
    {
      id: "1",
      group: "972301",
      faculty: `НОЦ "ВИТШ"`,
      name: "Иванов Иван Иванович",
      absents: [
        {
          id: "1",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "2",
          from: new Date("February 6, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "3",
          from: new Date("February 10, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
      ],
    },
    {
      id: "2",
      group: "932301",
      faculty: `ИПМКН`,
      name: "Грезвелг Александр Эмблемович",
      absents: [
        {
          id: "4",
          from: new Date("February 1, 2025 00:00:00"),
          to: new Date("February 5, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
        {
          id: "5",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Pending,
        },
        {
          id: "6",
          from: new Date("February 13, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Accepted,
        },
      ],
    },
    {
      id: "3",
      group: "942301",
      faculty: "РФФ",
      name: "Денисов Денис Денисович",
      absents: [
        {
          id: "7",
          from: new Date("February 2, 2025 00:00:00"),
          to: new Date("February 3, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "8",
          from: new Date("February 4, 2025 00:00:00"),
          to: new Date("February 6, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "9",
          from: new Date("February 8, 2025 00:00:00"),
          to: new Date("February 14, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
        {
          id: "10",
          from: new Date("February 7, 2025 00:00:00"),
          to: new Date("February 7, 2025 00:00:00"),
          status: EAbsentStatus.Rejected,
        },
      ],
    },
  ];

  return (
    <>
      <CommonCalendar absents={studentsAbsents} />
    </>
  );
}
