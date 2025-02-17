import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

const ADD_BOOK = gql`
  mutation AddBook(
    $book_code: String!
    $title: String!
    $author: String!
    $isbn_code: String
    $m_category_id: uuid
    $m_strage_location_id: uuid
  ) {
    insert_libraflow_t_book_one(
      object: {
        book_code: $book_code
        title: $title
        author: $author
        isbn_code: $isbn_code
        m_category_id: $m_category_id
        m_strage_location_id: $m_strage_location_id
      }
    ) {
      id
    }
  }
`;

function DataRegister() {
  const [formState, setFormState] = useState({
    book_code: "",
    title: "",
    author: "",
    isbn_code: "",
    m_category_id: "",
    m_strage_location_id: "",
  });

  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      alert("Book registered successfully!");
      setFormState({
        book_code: "",
        title: "",
        author: "",
        isbn_code: "",
        m_category_id: "",
        m_strage_location_id: "",
      });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { m_category_id, m_strage_location_id, ...rest } = formState;

    addBook({
      variables: {
        ...rest,
        m_category_id: m_category_id ? parseInt(m_category_id) : null,
        m_strage_location_id: m_strage_location_id
          ? parseInt(m_strage_location_id)
          : null,
      },
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Register New Book</h1>
      {loading && <p>Registering book...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="book_code"
          placeholder="Book Code"
          value={formState.book_code}
          onChange={handleChange}
          required
        />
        <Input
          name="title"
          placeholder="Title"
          value={formState.title}
          onChange={handleChange}
          required
        />
        <Input
          name="author"
          placeholder="Author"
          value={formState.author}
          onChange={handleChange}
          required
        />
        <Input
          name="isbn_code"
          placeholder="ISBN Code"
          value={formState.isbn_code}
          onChange={handleChange}
        />
        <Input
          name="m_category_id"
          placeholder="Category ID"
          value={formState.m_category_id}
          onChange={handleChange}
        />
        <Input
          name="m_strage_location_id"
          placeholder="Storage Location ID"
          value={formState.m_strage_location_id}
          onChange={handleChange}
        />
        <Button type="submit">Register Book</Button>
      </form>
    </div>
  );
}

export default DataRegister;
