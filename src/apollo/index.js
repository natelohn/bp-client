import { ApolloClient, InMemoryCache } from '@apollo/client';

const appoloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export default appoloClient;

