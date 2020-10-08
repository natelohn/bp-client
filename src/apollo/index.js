import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const jwt = await SecureStore.getItemAsync('jwt'); // TODO: GET USER TOKEN FROM CONTEXT?
  return {
    headers: {
      ...headers,
      authorization: jwt ? `bearer ${jwt}` : "",
    }
  }
});

const apoloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default apoloClient;