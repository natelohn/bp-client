import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AsyncStorage } from 'react-native';


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const jwt = await AsyncStorage.getItem('jwt');
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