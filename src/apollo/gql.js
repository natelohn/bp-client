import { gql } from '@apollo/client';

export const GET_USER_FROM_CONTEXT = gql`
  {
    getUserFromContext {
      id
      challenger {
        id
        username
      }
    }
  }
`

export const USERS_QUERY = gql`
  {
    users {
      id
      challenger {
        id
        username
      }
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
      challengerId
      username
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation Login($phone: String!, $otp: String!){
    login(phone: $phone, otp: $otp){
      accessToken
      userId
      challengerId
      username
    }
  }
`

export const PUSHOFF_QUERY = gql`
  query GetPushOffs($challengerId: String!) {
    getPushOffs(challengerId: $challengerId){
      id
      created
      final
      instigator {
        id
        username
      }
      pending {
        id
        challenger {
          id
          username
        }
      }
      pushes {
        id
        duration
        challenger {
          id
          username
        }
      }
    }
  }
`

export const RESPOND_TO_PUSHOFF = gql`
  mutation RespondToPushOff($input: RespondToPushOffInput!){
    respondToPushOff(input: $input) {
      id
      created
      final
      instigator {
        id
      }
      pushes {
        id
        completed
        duration
        challenger {
          id,
          username
        }
      }
      pending {
        id
        challenger {
          id
          username
        }
      }
    }
  }
`

export const CHALLENGER_DATA = gql`
  query ChallengerData($challengerId: String!) {
    challengerData(challengerId: $challengerId) {
      challengerId
      allChallengers {
        id
        username
        records {
          id
          opponent {
            id
          }
          won
          lost
          draw
        }
        pushes {
          id
          duration
        }
      }
      unavailableChallengerIds
      robos {
        id
        difficulty
        challenger {
          id
          username
        }
      }

    }
  }
`

export const CREATE_PUSHOFF = gql`
  mutation CreatePushOff($input: CreatePushOffInput!){
      createPushOff(input:$input) {
        id
        instigator {
          id
          username
        }
        pushes {
          id
          challenger {
            id
            username
          }
          duration
        }
        pending {
          id
          challenger {
            id
            username
          }
      }
    }
  }
`