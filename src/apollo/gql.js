import { gql } from '@apollo/client';

export const GET_USER_FROM_CONTEXT = gql`
  {
    getUserFromContext {
      id
      challenger {
        id
      }
    }
  }
`;

export const USERS_QUERY = gql`
  {
    users {
      id
      name
    }
  }
`

export const INIT_VERIFICATION_MUTATION = gql`
  mutation InitiateVerification($signingUp: Boolean!, $phone: String!) {
    initiateVerification(newUser: $signingUp, phone: $phone)
  }
`

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $phone: String!, $otp: String!){
    register(username: $username, phone: $phone, otp: $otp){
      accessToken
      userId
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation Login($phone: String!, $otp: String!){
    login(phone: $phone, otp: $otp){
      accessToken
      userId
    }
  }
`

export const PUSHOFFS_QUERY = gql`
  query GetPushOffs($challengerId: String!) {
    getPushOffs(challengerId: $challengerId){
      id,
      created,
      final,
      instigator {
        id,
        username
      },
      pending {
        challenger {
          id,
          username
        }
      }
      pushes {
        duration,
        challenger {
          id,
          username
        }
      }
    }
  }
`

export const RESPOND_TO_PUSHOFF = gql`
  mutation RespondToPushOff($input: RespondToPushOffInput!){
    respondToPushOff(input: $input) {
      id,
      created,
      final,
      instigator {
        id
      },
      pushes {
        completed,
        duration,
        challenger {
          id,
          username
        }
      },
      pushes {
        challenger {
          id,
          username
        }
      }
      
    }
  }
`