import { ICriteriaType } from 'app/shared/model//criteria-type.model';

export interface ICriteriaEvaluate {
  id?: number;
  content?: string;
  level?: number;
  pass?: string;
  good?: string;
  excellent?: string;
  criteriaType?: ICriteriaType;
}

export const defaultValue: Readonly<ICriteriaEvaluate> = {};
