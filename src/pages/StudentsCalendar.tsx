import Navbar from "../components/Navbar.tsx";
import CommonCalendar from "../components/CommonCalendar.tsx";
import { EAbsentStatus, ERole, StudentAbsents } from "../types.ts";

export default function StudentsCalendar() {
  const studentsAbsents: StudentAbsents[] = [
    {
      id: "1",
      group: "972301",
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
      group: "972301",
      name: "Фаер Рой Эмблемович",
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
      group: "972301",
      name: "Неприём Неприёмыш Неприёмович",
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
      id: "4",
      group: "972301",
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
      id: "5",
      group: "972301",
      name: "Фаер Рой Эмблемович",
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
      id: "1",
      group: "972301",
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
      group: "972301",
      name: "Фаер Рой Эмблемович",
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
      group: "972301",
      name: "Неприём Неприёмыш Неприёмович",
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
      id: "4",
      group: "972301",
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
      id: "5",
      group: "972301",
      name: "Фаер Рой Эмблемович",
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
      id: "1",
      group: "972301",
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
      group: "972301",
      name: "Фаер Рой Эмблемович",
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
      group: "972301",
      name: "Неприём Неприёмыш Неприёмович",
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
      id: "4",
      group: "972301",
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
      id: "5",
      group: "972301",
      name: "Фаер Рой Эмблемович",
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
      id: "1",
      group: "972301",
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
      group: "972301",
      name: "Фаер Рой Эмблемович",
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
      group: "972301",
      name: "Неприём Неприёмыш Неприёмович",
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
      id: "4",
      group: "972301",
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
      id: "5",
      group: "972301",
      name: "Фаер Рой Эмблемович",
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
  ];

  return (
    <>
      <Navbar currentRole={ERole.Teacher} />
      <CommonCalendar absents={studentsAbsents} />
    </>
  );
}
