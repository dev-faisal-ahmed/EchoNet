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
