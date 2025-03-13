import PersonalCalendar from "../components/PersonalCalendar.tsx";
import { AbsentData, EError, ERole, StudentAbsents } from "../static/types.ts";
import { useUser } from "../hooks/UserProvider.tsx";
import ErrorPage from "./ErrorPage.tsx";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getUserAbsences } from "../static/fetches.ts";

export default function MyCalendar() {
  const { user } = useUser();

  if (!user) {
    return <ErrorPage code={EError.Unauthorized} />;
  }

  if (!user.roles.includes(ERole.Student)) {
    return <ErrorPage code={EError.Forbidden} />;
  }

  const [student, setStudent] = useState<StudentAbsents>({
    id: user.id,
    name: user.name,
    faculty: `НОЦ "ВИТШ"`,
    group: "972301",
    absents: [],
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  const absentsMutation = useMutation({
    mutationFn: getUserAbsences,
    onSuccess: (data: AbsentData[]) => {
      console.log(data);

      data.forEach((absent: AbsentData) => {
        absent.from = new Date(absent.from);
        absent.to = new Date(absent.to);
      });

      setStudent({ ...student, absents: data });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    absentsMutation.mutate({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
    });
  }, []);

  return (
    <>
      <PersonalCalendar
        student={student}
        currentDate={currentDate}
        currentDateSetter={setCurrentDate}
      />
    </>
  );
}
