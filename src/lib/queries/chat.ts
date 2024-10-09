// chat room related queries
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

export const GET_MY_CHATS = `
  query GetMyChats($userId: uuid!) {
    chat_rooms(where: {_or: [{user1Id: {_eq: $userId}}, {user2Id: {_eq: $userId}}]}) {
      id
      user1 {
        id
        name
      }
      user2 {
        id
        name
      }
      messages(order_by: {createdAt: desc} limit: 1) {
        body
        sender {
          name
        }
        createdAt
      }
    }
  }
`;

// message related queries
export const SEND_MESSAGE = `
  mutation SendMessage(
    $chatRoomId: uuid!, 
    $body: String!, 
    $imageUrl: String!
  ) {
    insert_messages_one(
      object: {
        chatRoomId: $chatRoomId, 
        body: $body, 
        imageUrl: $imageUrl
      }
    ) {
      id
    }
  }
`;

export const GET_MESSAGES = `
  query GetMessages($chatRoomId: uuid!) {
    messages(where: {chatRoomId: {_eq: $chatRoomId}}) {
      id
      body
      imageUrl
      sender {
        name
        id
      }
      createdAt
    }
  }
`;
