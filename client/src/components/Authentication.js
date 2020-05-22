import React, { useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { getuser } from "../queries/queries";
import { useHistory, Redirect } from "react-router-dom";

export default function Authentication(props) {
  const { loading, error, data } = useQuery(getuser);
  const history = useHistory();
  let display;

  if (localStorage.getItem("JWT") == null) {
    sessionStorage.clear();
    display = Redirect("/");
    return <div>{display}</div>;
  }

  if (loading) {
    display = <div>...loading</div>;
  } else {
    if (data) {
      sessionStorage.setItem("currentuser", data.user.username);
      console.log(data);
      display = props.children;
    } else {
      if (error) {
        console.log(error);
      }
      sessionStorage.clear();
      display = Redirect("/");
    }
  }

  return <div>{display}</div>;
}
