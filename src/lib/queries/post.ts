export const ADD_POST = `
  mutation AddPost (
    $body: String!, 
    $imageUrl: String!, 
    $privacy: POST_PRIVACY_enum!
  ) {
    insert_posts_one(
      object : {
        body: $body
        imageUrl: $imageUrl
        privacy: $privacy
      }
    ) {
      id
    }
  }
`;

export const GET_POSTS = `
  query GetPosts {
    posts(where: {isDeleted: {_eq: false}}, order_by: {createdAt: desc}) {
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

export const EDIT_POST = `
  mutation EditPost (
    $id: uuid! 
    $body: String!
    $imageUrl: String!
    $privacy: POST_PRIVACY_enum!
  ) {
    update_posts_by_pk(
      pk_columns: {id: $id}
      _set: {
        body: $body
        imageUrl: $imageUrl
        privacy: $privacy
      }
    ) {
      id
    }
  }
`;

export const DELETE_POST = `
  mutation DeletePost($id: uuid!) {
    update_posts_by_pk(
      pk_columns: { id: $id }
      _set: { isDeleted: true }
    ) {
      id
    }
  }
`;
