import React, { useState, useCallback } from "react";
import Booklist from "./components/booklist";
import Addbook from "./components/addbook";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import { getJwt } from "./helpers/helper";
import Authentication from "./components/Authentication";
import Navbar from "./components/nabvar";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  headers: { Authorization: getJwt() },
});

function App() {
  const [user, Setuser] = useState(null);

  const setuser = (data) => {
    Setuser(data);
  };
  console.log(user);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar getuser={user} setuser={setuser} />
        <Switch>
          <Route exact path="/">
            <Login setuser={setuser} />
          </Route>

          <Route path="/books">
            <Booklist />
            <Addbook />
          </Route>

          <Route path="/auth">
            <Authentication>
              <div id="main">
                <Booklist />
                <Addbook />
              </div>
            </Authentication>
          </Route>

          <Route path="*">
            <Login />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
