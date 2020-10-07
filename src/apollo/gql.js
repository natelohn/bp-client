import { gql } from '@apollo/client';

export const USER_ID_QUERY = gql`
  {
    getUserId
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
  mutation Register($name: String!, $phone: String!, $key: String!){
    register(name: $name, phone: $phone, key: $key){
      accessToken
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation Login($phone: String!, $key: String!){
    login(phone: $phone, key: $key){
      accessToken
    }
  }
`