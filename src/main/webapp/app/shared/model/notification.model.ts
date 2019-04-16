import { IHeadQuater } from 'app/shared/model//head-quater.model';
import { IDocumentType } from 'app/shared/model//document-type.model';

export const enum Status {
  EXIST = 'EXIST',
  DELETED = 'DELETED'
}

export const enum Extension {
  DOCX = 'DOCX',
  PDF = 'PDF',
  MP4 = 'MP4',
  PPTX = 'PPTX',
  JPG = 'JPG',
  PNG = 'PNG',
  DOC = 'DOC',
  PPT = 'PPT',
  OTHER = 'OTHER'
}

export interface INotification {
  id?: number;
  name?: string;
  description?: string;
  uRL?: string;
  status?: Status;
  tag?: string;
  fileExtension?: Extension;
  headQuater?: IHeadQuater;
  documentTypes?: IDocumentType[];
}

export const defaultValue: Readonly<INotification> = {};
