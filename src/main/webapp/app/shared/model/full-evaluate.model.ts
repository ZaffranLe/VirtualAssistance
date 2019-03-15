import { ITeacher } from 'app/shared/model//teacher.model';

export interface IFullEvaluate {
  id?: string;
  description?: string;
  teacher?: ITeacher;
}

export const defaultValue: Readonly<IFullEvaluate> = {};
