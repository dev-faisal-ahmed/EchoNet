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
