import { IProofType } from 'app/shared/model//proof-type.model';
import { IAnswer } from 'app/shared/model//answer.model';

export interface IProofs {
  id?: number;
  name?: string;
  url?: string;
  type?: IProofType;
  answers?: IAnswer[];
}

export const defaultValue: Readonly<IProofs> = {};
