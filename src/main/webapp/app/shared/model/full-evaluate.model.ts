import { ITeacher } from 'app/shared/model//teacher.model';

export const enum ScoreLadder {
  FAIL = 'FAIL',
  PASS = 'PASS',
  GOOD = 'GOOD',
  EXCELLENT = 'EXCELLENT'
}

export interface IFullEvaluate {
  id?: number;
  description?: string;
  result?: ScoreLadder;
  teacher?: ITeacher;
}

export const defaultValue: Readonly<IFullEvaluate> = {};
