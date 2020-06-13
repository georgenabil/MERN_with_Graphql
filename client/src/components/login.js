import React, { useRef } from "react";
import { login } from "../queries/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import { useHistory, Redirect } from "react-router-dom";

export default function Login(props) {
  const [LoginExcute, { loading, data }] = useLazyQuery(login, {
    onCompleted: (responses) => {
      console.log("the response is  ", responses);
      if (responses && responses.login.token.length > 6) {
        console.log("waitinnnng");
        localStorage.setItem("JWT", responses.login.token);
        props.setuser(responses.login.username);
        history.push("/books");
      }
    },
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
          LoginExcute({
            variables: {
              email: emailRef.current.value.trim(),
              password: passwordRef.current.value.trim(),
            },
          });
          /*  if (data && data.login.token.length > 6) {
            console.log("waitinnnng");
            localStorage.setItem("JWT", data.login.token);
            props.setuser(data.login.user);
            history.push("/books");
          }*/
        }}
      >
        <div className="forminput">
          <label>email:</label>
          <input type="email" ref={emailRef} required />
        </div>

        <div className="forminput">
          <label>password:</label>
          <input ref={passwordRef} type="password" required />
        </div>
        <div className="formsumbit">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
