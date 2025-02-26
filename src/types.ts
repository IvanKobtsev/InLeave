export interface MouseData {
  position: Vector;
  isDragging: boolean;
  velocity: Vector;
}

export interface Vector {
  x: number;
  y: number;
}

export interface AbsentData {
  id: string;
  from: Date;
  to: Date;
  status: EAbsentStatus;
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
  None
}
