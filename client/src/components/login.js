import React, { useState, Component } from "react";
import { login, signup } from "../queries/queries";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useHistory, Redirect } from "react-router-dom";

export default function Login() {
  const [email, Setemail] = useState(null);
  const [password, Setpassword] = useState(null);
  const [LoginExcute, { loading, error, data }] = useLazyQuery(login);

  const history = useHistory();

  return (
    <div>
      <div className="logo">
        <span style={{ fontSize: "100px" }}>&#127535;</span>
      </div>
      <form
        id="Login"
        onSubmit={(e) => {
          e.preventDefault();
          LoginExcute({ variables: { email, password } });
          if (data && data.login.token.length > 6) {
            localStorage.setItem("JWT", data.login.token);
            history.push("/auth");
          }
          if (error) {
            console.log(error);
          }
        }}
      >
        <div className="forminput">
          <label>email:</label>
          <input
            type="email"
            onChange={(e) => Setemail(e.target.value)}
            required
          />
        </div>

        <div className="forminput">
          <label>password:</label>
          <input
            type="password"
            onChange={(e) => Setpassword(e.target.value)}
            required
          />
        </div>
        <div className="formsumbit">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
