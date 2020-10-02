import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  {
    users {
      id
      name
    }
  }
`

export const INIT_VERIFICATION_QUERY = gql`
  query InitiateVerification($signingUp: Boolean!, $phone: String!) {
    initiateVerification(newUser: $signingUp, phone: $phone)
  }
`