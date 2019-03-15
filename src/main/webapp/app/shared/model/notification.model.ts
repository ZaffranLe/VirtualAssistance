import { IHeadQuater } from 'app/shared/model//head-quater.model';
import { INotificationType } from 'app/shared/model//notification-type.model';

export const enum Status {
  EXIST = 'EXIST',
  DELETED = 'DELETED'
}

export interface INotification {
  id?: string;
  name?: string;
  description?: string;
  uRL?: string;
  status?: Status;
  headQuater?: IHeadQuater;
  notificationType?: INotificationType;
}

export const defaultValue: Readonly<INotification> = {};
