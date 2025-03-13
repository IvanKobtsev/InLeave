import { apiLink } from "./constants.ts";
import api from "../api.ts";
import { LoginFormValues, MonthData } from "./types.ts";

export const login = async ({ email, password }: LoginFormValues) => {
  const response = await api.post<{ token: string }>("/user/login", {
    email,
    password,
  });
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  if (token === null) {
    return null;
  }

  const { data } = await api.get(`${apiLink}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getUserAbsences = async ({ year, month }: MonthData) => {
  const { data } = await api.get(
    `${apiLink}/teacher/absences?studentId=${"e3969fa7-0cca-417a-9672-9017082bc2ad"}&year=${year}&month=${month}`,
  );

  return data;
};
