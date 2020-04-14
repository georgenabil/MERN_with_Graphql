import React from "react";

import Booklist from "./components/booklist";
import Addbook from "./components/addbook";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main" className="App">
        <Booklist />
        <Addbook />
      </div>
    </ApolloProvider>
  );
}

export default App;
