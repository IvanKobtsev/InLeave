export interface MouseData {
  position: Vector;
  isDragging: boolean;
  velocity: Vector;
}

export interface Vector {
  x: number;
  y: number;
}

export interface FileData {
  id: string;
  extension: string;
  file: File;
}

export interface AbsentData {
  id: string;
  from: Date;
  to: Date;
  description?: string;
  status: EAbsentStatus;
  documents?: FileData[];
}

export interface StudentAbsents {
  id: string;
  name: string;
  faculty: string;
  group: string;
  absents: AbsentData[];
}

export enum EAbsentStatus {
  Pending,
  Accepted,
  Rejected,
}

export enum ERole {
  Student,
  Teacher,
  Dean,
  Admin,
  None,
}

export enum EError {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export interface LinkData {
  link: string;
  text: string;
}

export interface NotificationData {
  text: string;
  isShown: boolean;
}

export interface Education {
  id: string;
  basis: string;
  faculty: string;
  group: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: ERole[];
  paidEducation?: Education;
  budgetaryEducation?: Education;
}

export interface ErrorData {
  code: number;
  message: string;
}

export type LoginFormValues = {
  email: string;
  password: string;
};

export type MonthData = {
  year: number;
  month: number;
};
