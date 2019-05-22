import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import { ApolloProvider } from "react-apollo-hooks";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
// import { InMemoryCache } from "apollo-cache-inmemory";

import { resolvers } from "./resolvers/resolvers";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  resolvers
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
