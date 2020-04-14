import React, { useState } from "react";
import {
  getAUthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

function Addbook() {
  const { loading, error, data } = useQuery(getAUthorsQuery);
  const [addBook, { data1 }] = useMutation(addBookMutation);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorid, setAuthorid] = useState("");

  var Authors;

  if (loading) {
    Authors = <option>the page is loading</option>;
  } else {
    Authors = data.aurths.map(aurth => {
      return (
        <option key={aurth.id} value={aurth.id}>
          {aurth.name}
        </option>
      );
    });
  }

  return (
    <form
      id="add-book"
      onSubmit={e => {
        e.preventDefault();
        addBook({
          variables: { name: name, genre: genre, authorid: authorid },
          refetchQueries: [{ query: getBooksQuery }]
        });
      }}
    >
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={e => setName(e.target.value)} required />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={e => setGenre(e.target.value)} required />
      </div>

      <div className="field">
        <label>Book name:</label>
        <select
          onChange={e => setAuthorid(e.target.value)}
          required
          defaultValue={"DEFAULT"}
        >
          <option value="DEFAULT" disabled hidden>
            choose a Writer
          </option>
          {Authors}
        </select>
      </div>

      <button>+</button>
      <p>{authorid}</p>
    </form>
  );
}

export default Addbook;
