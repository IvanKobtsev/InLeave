import { EAbsentStatus, ERole } from "./types.ts";

export const getLastDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getFirstDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth());
};

export const addLeadingZero = (num: number) => {
  return num < 10 ? "0" + num : num;
};

export const getDayOfWeekText = (num: number): string => {
  switch (num) {
    default:
    case 0:
      return "воскресенье";
    case 1:
      return "понедельник";
    case 2:
      return "вторник";
    case 3:
      return "среда";
    case 4:
      return "четверг";
    case 5:
      return "пятница";
    case 6:
      return "суббота";
  }
};

export function getRoleText(role: ERole): string {
  switch (role) {
    case ERole.Admin:
      return "админ";
    case ERole.Dean:
      return "деканат";
    case ERole.Teacher:
      return "преподаватель";
    case ERole.Student:
      return "студент";
    default:
    case ERole.None:
      return "";
  }
}

export function getAbsentStatusText(status: EAbsentStatus): string {
  switch (status) {
    case EAbsentStatus.Accepted:
      return "одобрен";
    case EAbsentStatus.Rejected:
      return "отклонён";
    default:
    case EAbsentStatus.Pending:
      return "на проверке";
  }
}

export function getFullDateText(date: Date): string {
  return `${addLeadingZero(date.getDate())}.${addLeadingZero(date.getMonth() + 1)}.${date.getFullYear()}`;
}

export function getDateDifferenceInDays(date1: Date, date2: Date): number {
  return Math.floor(
    (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24),
  );
}

export function getMonthText(month: number): string {
  switch (month) {
    default:
    case 0:
      return "Январь";
    case 1:
      return "Февраль";
    case 2:
      return "Март";
    case 3:
      return "Апрель";
    case 4:
      return "Май";
    case 5:
      return "Июнь";
    case 6:
      return "Июль";
    case 7:
      return "Август";
    case 8:
      return "Сентябрь";
    case 9:
      return "Октябрь";
    case 10:
      return "Ноябрь";
    case 11:
      return "Декабрь";
  }
}

export function getFileExtension(fileName: string): string {
  return fileName.substring(fileName.lastIndexOf("."));
}

export function getFileCountText(fileCount: number): string {
  if (fileCount === 1) {
    return `${fileCount} файл`;
  } else if (fileCount > 1 && fileCount <= 4) {
    return `${fileCount} файла`;
  }
  return `${fileCount} файлов`;
}

export function downloadFile(file: File) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const stringToEnum = <T extends Record<string, string>>(
  enumObj: T,
  value: string,
): T[keyof T] | undefined => {
  return Object.values(enumObj).includes(value as T[keyof T])
    ? (value as T[keyof T])
    : undefined;
};

export const isUnauthorized = () => {
  return !Boolean(localStorage.getItem("token"));
};
