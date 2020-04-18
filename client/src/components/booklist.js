import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries/queries";
import Bookdetalis from "./bookdetalis.js";

function Booklist() {
  const [selected, Setselected] = useState(null);

  const { loading, error, data } = useQuery(getBooksQuery);
  var display;
  if (loading) {
    display = <li>the page is loading</li>;
  } else {
    display = data.books.map(book => {
      return (
        <li key={book.id} onClick={e => Setselected(book.id)}>
          {book.name}
        </li>
      );
    });
  }

  return (
    <div>
      <ul id="book-list">{display}</ul>
      <Bookdetalis passedbookid={selected} />
    </div>
  );
}

export default Booklist;
