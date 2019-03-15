import { IFullEvaluate } from 'app/shared/model//full-evaluate.model';
import { ICritetiaEvaluate } from 'app/shared/model//critetia-evaluate.model';

export const enum ScoreLadder {
  FAIL = 'FAIL',
  PASS = 'PASS',
  GOOD = 'GOOD',
  EXCELLENT = 'EXCELLENT'
}

export interface IAnswer {
  id?: string;
  scoreLadder?: ScoreLadder;
  proof?: string;
  fullEvaluate?: IFullEvaluate;
  critetiaEvaluate?: ICritetiaEvaluate;
}

export const defaultValue: Readonly<IAnswer> = {};
