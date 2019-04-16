import { ITeacherDocument } from 'app/shared/model//teacher-document.model';
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

export interface IDocument {
  id?: number;
  name?: string;
  description?: string;
  uRL?: string;
  size?: number;
  tag?: string;
  status?: Status;
  isShared?: boolean;
  fileExtension?: Extension;
  authenkey?: string;
  documents?: ITeacherDocument[];
  documentTypes?: IDocumentType[];
}

export const defaultValue: Readonly<IDocument> = {
  isShared: false
};
