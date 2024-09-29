export const SING_UP_MUTATION = `
  mutation InsertUser($name: String!, $email: String!, $password: String!) {
    insert_users_one(object: {name: $name, email: $email, password: $password}) {
      email
      password
  }
}
`;
