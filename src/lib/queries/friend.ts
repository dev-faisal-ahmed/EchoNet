/* 
  Thinking behind this query 

  * Here current user means the user who is currently logged in. and sent the request to get suggested friends

  {email:{_neq:$email}} to get all the user except the current
  
  to prevent getting user who has sent request to current user I used 
    {sendRequests: {receiverEmail: {_eq: $email}}}
  to prevent getting user who has received request from current user I used 
    {getRequest:{senderEmail:{_eq:$email}}}
  
  This I am getting those user who are not friend of current user or requested by current user or got request by current user
*/

export const GET_SUGGESTED_FRIENDS = `
  query GetSuggestedFriends($email: String!) {
    users(where: 
      {email: {_neq: $email}, 
        _not: {
          _or: [
            {sendRequests: {receiverEmail: {_eq: $email}}}
            {getRequest:{senderEmail:{_eq:$email}}}
          ]
        }
    }) {
      name
      email
    }
  }
`;
