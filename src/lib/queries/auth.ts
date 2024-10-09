export const SING_UP_MUTATION = `
  mutation InsertUser($name: String!, $email: String!, $password: String!) {
    insert_users_one(
      object: { name: $name, email: $email, password: $password }
    ) {
      email
      password
    }
  }
`;

export const SINGUP_ACTION = `
  mutation sign_up(
    $name: String!
    $email: String!
    $password: String!
    $apiSecret: String!
  ) {
    SignupAction(
      name: $name
      email: $email
      password: $password
      apiSecret: $apiSecret
    ) {
      success
      message
    }
  }
`;

export const GET_USER_BY_EMAIL = `
  query GetUserByEmail($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
      email
      name
      password
    }
  }
`;
