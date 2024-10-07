export enum EPostPrivacy {
  PUBLIC = 'PUBLIC',
  ONLY_ME = 'ONLY_ME',
}

export interface IPost {
  id: string;
  body: string;
  imageUrl: string;
  privacy: EPostPrivacy;
  createdAt: string;
  creator: { name: string; email: string };
}
