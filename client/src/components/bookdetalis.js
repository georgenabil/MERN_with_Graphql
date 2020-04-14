import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../queries/queries";

function Bookdetalis(props) {
  const Queryvalue = () => {
    const { loading, error, data } = useQuery(getBookQuery, {
      skip: !props.passedbookid,
      variables: { id: props.passedbookid }
    });

    if (loading) return <p>loading</p>;
    if (error) return null;
    if (data) {
      const { book } = data;
      console.log(data);
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre} </p>
          <p>{book.authr.name} </p>
          <ul>
            {book.authr.books.map(bk => (
              <li key={bk.id}>{bk.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return <div>{Queryvalue()}</div>;
}

export default Bookdetalis;
