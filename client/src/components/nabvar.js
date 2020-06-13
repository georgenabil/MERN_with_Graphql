import React from "react";
import { currentuser } from "../helpers/helper";
import { useHistory } from "react-router-dom";

export default function Navbar(props) {
  const history = useHistory();
  const user = props.getuser;

  return (
    <div className="navbar">
      <div className="navlogo">
        <span>&#127535;</span>
      </div>
      <div className="sginup">
        <button
          onClick={() => {
            if (user) {
              //logout logic
              sessionStorage.clear();
              localStorage.clear();
              props.setuser(null);
              history.push("/");
            } else {
              sessionStorage.clear();
              localStorage.clear();
              history.push("/");
            }
          }}
        >
          {user ? "Log out" : "Log in"}
        </button>
      </div>
      <div className="userdata">
        <span className={user ? "" : "hidden"}>{user}</span>
      </div>
    </div>
  );
}
