// mutations
export const ADD_POST = `
  mutation AddPost(
    $body: String!
    $imageUrl: String!
    $privacy: POST_PRIVACY_enum!
  ) {
    insert_posts_one(
      object: { body: $body, imageUrl: $imageUrl, privacy: $privacy }
    ) {
      id
    }
  }
`;

export const EDIT_POST = `
  mutation EditPost(
    $id: uuid!
    $body: String!
    $imageUrl: String!
    $privacy: POST_PRIVACY_enum!
  ) {
    update_posts_by_pk(
      pk_columns: { id: $id }
      _set: { body: $body, imageUrl: $imageUrl, privacy: $privacy }
    ) {
      id
    }
  }
`;

export const DELETE_POST = `
  mutation DeletePost($id: uuid!) {
    update_posts_by_pk(pk_columns: { id: $id }, _set: { isDeleted: true }) {
      id
    }
  }
`;

export const DELETE_POST_PERMANENTLY = `
  mutation DeletePostPermanently($postId: uuid!) {
    delete_posts_by_pk(id: $postId) {
      id
    }
  }
`;

export const RESTORE_POST = `
  mutation RestorePost($postId: uuid!) {
    update_posts_by_pk(
      pk_columns: {id: $postId},
      _set: {isDeleted: false}
    ) {
      id
    }
  }
`;

export const DELETE_POST_PERMANENTLY_EVENT = `
  mutation DeletePostPermanently($postId: uuid!) {
    delete_posts(where: {id: {_eq: $postId}, isDeleted: {_eq: true}}) {
      affected_rows
    }
  }
`;

// queries
export const GET_POSTS = `
  query GetPosts {
    posts(where: { isDeleted: { _eq: false } }, order_by: { createdAt: desc }) {
      id
      body
      createdAt
      imageUrl
      privacy
      creator {
        name
        email
      }
    }
  }
`;

export const GET_DELETED_POST = `
  query GetDeletedPost($userId: uuid!) {
    posts(
      where: {
        creatorId: {_eq: $userId}, 
        isDeleted: {_eq: true}
      }, 
      order_by: {createdAt: desc}
    ) {
      id
      body
      createdAt
      imageUrl
      privacy
      creator {
        name
        email
      }
    }
  }
`;

// subscription
export const GET_DELETED_POST_SUBSCRIPTION = `
  subscription GetDeletedPost($userId: uuid!) {
    posts(
      where: {
        creatorId: {_eq: $userId}, 
        isDeleted: {_eq: true}
      }, 
      order_by: {createdAt: desc}
    ) {
      id
      body
      createdAt
      imageUrl
      privacy
      creator {
        name
        email
      }
    }
  }
`;
