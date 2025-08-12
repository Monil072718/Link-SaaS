import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "/api/graphql", // We’ll create this route later
  cache: new InMemoryCache(),
});
