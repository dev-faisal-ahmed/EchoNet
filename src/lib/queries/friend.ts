/* 
  Thinking behind this query 

  * Here current user means the user who is currently logged in. and sent the request to get suggested friends

  {email:{_neq:$email}} to get all the user except the current
  
  to prevent getting user who has sent request to current user I used 
    {sentRequests: {receiver: {email: {_eq: $email}}}},
  to prevent getting user who has received request from current user I used 
    {friendRequests: {sender: {email: {_eq: $email}}}}
  
  This how I am getting those user who are not friend of current user or requested by current user or got request by current user
*/

export const GET_SUGGESTED_FRIENDS = `
  query GetSuggestedFriends($email: String!) {
    users(
      where: 
      {email: {_neq: $email}, 
        _not: {
          _or: [
            {sentRequests: {receiver: {email: {_eq: $email}}}}, 
            {friendRequests: {sender: {email: {_eq: $email}}}}
          ]
        }
      }
    ) {
      id
      name
      email
    }
  }
`;

export const ADD_FRIEND = `
  mutation AddFriend($receiverId: uuid!) {
    insert_friends_one(object: {receiverId: $receiverId}) {
      id
    }
  }
`;

export const GET_FRIEND_REQUESTS = `
  query GetFriendRequests($email: String!) {
    friends(
      where: {
        receiver: {email: {_eq: $email}}, 
        status: {_eq: REQUESTED}
      }
    ) {
      id
      sender {
        name
        email
      }
    }
  }
`;

export const GET_SENT_REQUEST = `
  query GetSentRequest($email: String!) {
    friends(
      where: {
        sender: {email: {_eq: $email}}, 
        status: {_eq: REQUESTED}
      }
    ) {
      id
      receiver {
        name
        email
      }
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST = `
  mutation AcceptFriendRequest($requestId: uuid!) {
    update_friends_by_pk(pk_columns: {id: $requestId}) {
      id
    }
  }
`;

export const GET_FRIENDSHIP = `
  query GetFriendShip (
  $receiverEmail:String!, 
  $senderEmail:String!
  ){
    friends_by_pk(
    receiverEmail: $receiverEmail, 
    senderEmail: $senderEmail
    ) {
      senderEmail
    }
  }
`;

export const DELETE_FRIEND_REQUEST = `
  mutation DeleteFriendRequest($id: uuid!) {
    delete_friends_by_pk(id: $id) {
      id
    }
  }
`;

export const GET_MY_FRIENDS = `
  query GetMyFriends {
    friends(where: {status: {_eq: ACCEPTED}}) {
      id
      sender {
        id
        name
        email
      }
      receiver {
        id
        name
        email
      }
    }
  }
`;
