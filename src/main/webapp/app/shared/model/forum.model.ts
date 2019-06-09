import { Moment } from 'moment';
import { IForum } from 'app/shared/model//forum.model';
import { IUser } from './user.model';

export interface IForum {
  id?: number;
  title?: string;
  content?: string;
  createDay?: Moment;
  level?: number;
  forum?: IForum;
  roots?: IForum[];
  user?: IUser;
}

export const defaultValue: Readonly<IForum> = {};
