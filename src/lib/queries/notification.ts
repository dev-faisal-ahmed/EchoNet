// mutations
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

// queries
export const GET_NOTIFICATIONS = `
  query GetNotification {
    notifications(order_by: {createdAt: desc}) {
      id
      invoker {
        name
      }
      createdAt
      type
    }
  }
`;

export const GET_NOTIFICATIONS_SUBSCRIPTION = `
  subscription GetNotification {
    notifications(order_by: {createdAt: desc}) {
      id
      invoker {
        name
      }
      createdAt
      type
    }
  }
`;
