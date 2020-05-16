import React from "react";

import Booklist from "./components/booklist";
import Addbook from "./components/addbook";

import ApolloClient, { from } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import { getJwt } from "./helpers/helper";
import Authentication from "./components/Authentication";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  headers: { Authorization: getJwt() },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main" className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>

            <Route path="/books">
              <Booklist />
              <Addbook />
            </Route>

            <Route path="/auth">
              <Authentication>
                <Booklist />
                <Addbook />
              </Authentication>
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
