import React from "react";
import PostList from "./components/PostList";
import CreatePostModal from "./components/CreatePostModal";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
// import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <CreatePostModal />
        <PostList />
      </div>
    </ApolloProvider>
  );
}

export default App;
