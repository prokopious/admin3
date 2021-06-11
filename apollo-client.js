import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: " https://spl4d65jqrgp7k5a2y7jyzu7xi.appsync-api.us-east-1.amazonaws.com/graphql",
  headers: {
    "X-Api-Key": "da2-toyq2t2uj5e3vnt36nkmpkseeu",
  },
  cache: new InMemoryCache(),
})

export default client
