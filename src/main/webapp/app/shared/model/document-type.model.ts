import { IDocument } from 'app/shared/model//document.model';

export interface IDocumentType {
  id?: string;
  content?: string;
  documents?: IDocument[];
}

export const defaultValue: Readonly<IDocumentType> = {};
