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
