import React from "react";
import { currentuser } from "../helpers/helper";
import { useHistory, Redirect } from "react-router-dom";

export default function Navbar() {
  const style = {
    fontSize: "35px",
    margin: "160px",
  };

  const history = useHistory();

  return (
    <div className="navbar">
      <div className="navlogo">
        <span style={style}>&#127535;</span>
      </div>
      <div className="sginup">
        <button
          onClick={() => {
            if (currentuser()) {
              sessionStorage.clear();
              localStorage.clear();
            } else {
              console.log("pushedddddddddddddddddddddddd");
              history.replace("/");
            }
          }}
        >
          {currentuser() ? "Log out" : "Log in"}
        </button>
      </div>
      <div className="userdata">
        <span className={currentuser() ? "" : "hidden"}>{currentuser()}</span>
      </div>
    </div>
  );
}
