export enum ENotificationType {
  MESSAGE = 'MESSAGE',
  SENT_REQUEST = 'SENT_REQUEST',
  ACCEPT_REQUEST = 'ACCEPT_REQUEST',
}

export interface INotification {
  id: string;
  type: ENotificationType;
  invoker: {
    name: string;
  };
  createdAt: Date;
}
