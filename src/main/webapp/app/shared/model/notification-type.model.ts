export interface INotificationType {
  id?: number;
  content?: string;
  level?: number;
}

export const defaultValue: Readonly<INotificationType> = {};
