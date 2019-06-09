import { IFullEvaluate } from 'app/shared/model//full-evaluate.model';
import { ICriteriaEvaluate } from 'app/shared/model//criteria-evaluate.model';
import { IProofs } from 'app/shared/model//proofs.model';

export const enum ScoreLadder {
  FAIL = 'FAIL',
  PASS = 'PASS',
  GOOD = 'GOOD',
  EXCELLENT = 'EXCELLENT'
}

export interface IAnswer {
  id?: number;
  scoreLadder?: ScoreLadder;
  proof?: string;
  fullEvaluate?: IFullEvaluate;
  criteriaEvaluate?: ICriteriaEvaluate;
  proffs?: IProofs[];
}

export const defaultValue: Readonly<IAnswer> = {};
