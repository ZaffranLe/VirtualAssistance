import { IDocument } from 'app/shared/model//document.model';
import { INotification } from 'app/shared/model//notification.model';

export const enum Level {
  LEVEL1 = 'LEVEL1',
  LEVEL2 = 'LEVEL2',
  LEVEL3 = 'LEVEL3'
}

export interface IDocumentType {
  id?: number;
  content?: string;
  level?: Level;
  documents?: IDocument[];
  notifications?: INotification[];
}

export const defaultValue: Readonly<IDocumentType> = {};
