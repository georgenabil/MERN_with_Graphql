import { gql } from "apollo-boost";

const getAUthorsQuery = gql`
  {
    aurths {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
      id
    }
  }
`;

const signup = gql`
  query($email: String!, $password: String!, $username: String!) {
    SignIn(email: $email, password: $password, username: $username) {
      token
      userid
    }
  }
`;

const login = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userid
      username
    }
  }
`;

const getuser = gql`
  {
    user {
      username
      email
    }
  }
`;

const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      authr {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export {
  getAUthorsQuery,
  getBooksQuery,
  addBookMutation,
  getBookQuery,
  login,
  signup,
  getuser,
};
