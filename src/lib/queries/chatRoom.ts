export const CHAT_ROOM_EXISTS = `
  query FindChatRoom($user1Id: uuid!, $user2Id: uuid!) {
    chat_rooms(
      where: {
        _or: [
          {user1Id: {_eq: $user1Id}, user2Id: {_eq: $user2Id}}, 
          {user1Id: {_eq: $user2Id}, user2Id: {_eq: $user1Id}}
        ]
      }
    ) {
      id
    }
  }
`;

export const CREATE_CHAT_ROOM = `
  mutation CreateChatRoom($user1Id: uuid!, $user2Id: uuid!) {
    insert_chat_rooms_one(object: {user1Id: $user1Id, user2Id: $user2Id}) {
      id
    }
  }
`;
