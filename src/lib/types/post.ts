enum EPostPrivacy {
  PUBLIC = 'PUBLIC',
  ONLY_ME = 'ONLY_ME',
}

export interface IPost {
  postId: string;
  creatorEmail: string;
  body: string;
  imageUrl: string;
  privacy: EPostPrivacy;
  createdAt: string;
  creator: { name: string };
}
