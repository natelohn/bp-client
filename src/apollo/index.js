import { ApolloClient, InMemoryCache } from '@apollo/client';

const apoloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export default apoloClient;

