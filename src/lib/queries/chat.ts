// ------------ mutations ------------ \\

// chat room
export const CREATE_CHAT_ROOM = `
  mutation CreateChatRoom($user1Id: uuid!, $user2Id: uuid!) {
    insert_chat_rooms_one(object: { user1Id: $user1Id, user2Id: $user2Id }) {
      id
    }
  }
`;

// message
export const SEND_MESSAGE = `
  mutation SendMessage($chatRoomId: uuid!, $body: String!, $imageUrl: String!) {
    insert_messages_one(
      object: { chatRoomId: $chatRoomId, body: $body, imageUrl: $imageUrl }
    ) {
      id
    }
  }
`;

// ------------ query ------------ \\

// chat room
export const CHAT_ROOM_EXISTS = `
  query FindChatRoom($user1Id: uuid!, $user2Id: uuid!) {
    chat_rooms(
      where: {
        _or: [
          { user1Id: { _eq: $user1Id }, user2Id: { _eq: $user2Id } }
          { user1Id: { _eq: $user2Id }, user2Id: { _eq: $user1Id } }
        ]
      }
    ) {
      id
    }
  }
`;

export const GET_MY_CHATS = `
  query GetMyChats($userId: uuid!) {
    chat_rooms(
      where: {
        _or: [{ user1Id: { _eq: $userId } }, { user2Id: { _eq: $userId } }]
      }
    ) {
      id
      user1 {
        id
        name
      }
      user2 {
        id
        name
      }
      messages(order_by: { createdAt: desc }, limit: 1) {
        body
        sender {
          name
        }
        createdAt
      }
    }
  }
`;

export const GET_CHAT_ROOM_INFO = `
  query GetChatRoomInfoById($id: uuid!) {
    chat_rooms_by_pk(id: $id) {
      user1 {
        id
        name
        email
      }
      user2 {
        id
        name
        email
      }
    }
  }
`;

// messages
export const GET_MESSAGES = `
  query GetMessages(
    $chatRoomId: uuid!, 
    $limit: Int!, 
    $offset: Int!
  ) {
    messages(
      where: {chatRoomId: {_eq: $chatRoomId}}, 
      order_by: {createdAt: desc}, 
      limit: $limit, 
      offset: $offset
    ) {
      id
      body
      imageUrl
      sender {
        name
        id
      }
      createdAt
    }
      
    messages_aggregate(
      where: {chatRoomId: {_eq: $chatRoomId}}
    ) {
      aggregate {
        count
      }
    }
  }
`;

// this query will be used to get total messages count
export const GET_MESSAGE_COUNT = `
  query GetMessagesCount($chatRoomId: uuid!) {
    messages_aggregate(where: {chatRoomId: {_eq: $chatRoomId}}) {
      aggregate {
        count
      }
    }
  }
`;

// subscriptions
export const GET_MESSAGES_SUBSCRIPTION = `
  subscription GetMessages(
    $chatRoomId: uuid!, 
    $limit: Int!, 
    $offset: Int!
  ) {
    messages(
      where: {chatRoomId: {_eq: $chatRoomId}}, 
      order_by: {createdAt: desc}, 
      limit: $limit, 
      offset: $offset
    ) {
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

export const GET_CHAT_ROOM_SUBSCRIPTION = `
  subscription GetMyChats($userId: uuid!) {
    chat_rooms(
      where: {
        _or: [{ user1Id: { _eq: $userId } }, { user2Id: { _eq: $userId } }]
      }
    ) {
      id
      user1 {
        id
        name
      }
      user2 {
        id
        name
      }
      messages(order_by: { createdAt: desc }, limit: 1) {
        body
        sender {
          name
        }
        createdAt
      }
    }
  }
`;
