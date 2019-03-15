import { ICriteriaType } from 'app/shared/model//criteria-type.model';

export interface ICritetiaEvaluate {
  id?: string;
  content?: string;
  level?: number;
  criteriaType?: ICriteriaType;
}

export const defaultValue: Readonly<ICritetiaEvaluate> = {};
