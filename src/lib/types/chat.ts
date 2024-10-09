export interface IChatLink {
  id: string;
  user1: {
    id: string;
    name: string;
  };
  user2: {
    id: string;
    name: string;
  };
  messages: {
    body: string;
    sender: {
      name: string;
    };
    createdAt: Date;
  }[];
}

export interface IMessage {
  id: string;
  body: string;
  imageUrl: string;
  sender: {
    name: string;
    id: string;
  };
  createdAt: Date;
}
