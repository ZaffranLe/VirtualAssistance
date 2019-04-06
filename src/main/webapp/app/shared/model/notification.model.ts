import { IHeadQuater } from 'app/shared/model//head-quater.model';
import { IDocumentType } from 'app/shared/model//document-type.model';

export const enum Status {
  EXIST = 'EXIST',
  DELETED = 'DELETED'
}

export interface INotification {
  id?: number;
  name?: string;
  description?: string;
  uRL?: string;
  status?: Status;
  headQuater?: IHeadQuater;
  documentTypes?: IDocumentType[];
}

export const defaultValue: Readonly<INotification> = {};
