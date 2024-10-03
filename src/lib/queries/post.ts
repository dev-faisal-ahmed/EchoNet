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
      postId
      createdAt
      creatorEmail
    }
  }
`;

export const GET_POSTS = `
  query GetPosts {
    posts(order_by: {createdAt: desc}) {
      body
      createdAt
      creatorEmail
      imageUrl
      postId
      privacy
      creator {
        name
      }
    }
  }
`;

export const EDIT_POST = `
  mutation EditPost (
    $postId: uuid! 
    $body: String!
    $imageUrl: String!
    $privacy: POST_PRIVACY_enum!
  ) {
    update_posts_by_pk(
      pk_columns: {postId: $postId}
      _set: {
        body: $body
        imageUrl: $imageUrl
        privacy: $privacy
      }
    ) {
      postId
    }
  }
`;
