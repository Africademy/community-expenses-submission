import ApolloClient, { Operation } from "apollo-boost";

const uri =
  process.env.REACT_APP_GRAPHQL_URL || "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri,
  request: (operation: Operation) => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_authToken")}`
      }
    });
  }
});

export default client;