export const INSERT_NOTIFICATION = `
  mutation InsertNotification(
    $invokerId: uuid!, 
    $receiverId: uuid!, 
    $type: NOTIFICATION_TYPE_enum!
  ) {
    insert_notifications_one(
      object: {
        invokerId: $invokerId, 
        receiverId: $receiverId, 
        type: $type
      }
    ) {
      id
      invoker {
        name
      }
      receiver {
        name
        email
      }
      createdAt
    }
  }
`;
