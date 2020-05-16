import React, { useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { getuser } from "../queries/queries";
import { getJwt } from "../helpers/helper";
import { useHistory, Redirect } from "react-router-dom";

export default function Authentication(props) {
  const { loading, error, data } = useQuery(getuser);
  const history = useHistory();
  let display;

  if (loading) {
    display = <div>...loading</div>;
  } else {
    if (data) {
      console.log(data);
      display = props.children;
    } else {
      display = Redirect("/");
    }
  }

  return <div>{display}</div>;
}
