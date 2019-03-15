import { Moment } from 'moment';
import { ITeacherDocument } from 'app/shared/model//teacher-document.model';

export const enum TeacherLevel {
  TEACHER = 'TEACHER',
  DEAN = 'DEAN',
  HIGHLEVEL = 'HIGHLEVEL'
}

export const enum Status {
  EXIST = 'EXIST',
  DELETED = 'DELETED'
}

export interface ITeacher {
  id?: string;
  identityNumber?: string;
  fullName?: string;
  phone?: string;
  doB?: Moment;
  address?: string;
  email?: string;
  password?: string;
  dataStorage?: number;
  usedStorage?: number;
  level?: TeacherLevel;
  status?: Status;
  avatar?: string;
  teachers?: ITeacherDocument[];
}

export const defaultValue: Readonly<ITeacher> = {};
