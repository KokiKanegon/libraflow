import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useNavigate } from "react-router-dom";

const GET_REPOSITORIES = gql`
  query MyQuery {
    libraflow_t_book {
      id
      book_code
      title
      author
      isbn_code
      m_category_id
      m_storage_location_id
      update_date
      create_date
      _is_delete
      note
      publisher
      publication_date
    }
  }
`;

function BookInfo() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const { loading, error, data } = useQuery(GET_REPOSITORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.libraflow_t_book || data.libraflow_t_book.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Book Information</h1>
      <div className="flex gap-4 mb-4">
        <Input placeholder="Search books..." className="flex-1" />
        <Button>Search</Button>
      </div>
      <ul className="space-y-4">
        {data.libraflow_t_book.map((book) => (
          <li key={book.book_code} className="p-4 border rounded-lg shadow">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-500">Note: {book.note}</p>
            <p className="text-sm text-gray-500">Publisher: {book.publisher}</p>
            <p className="text-sm text-gray-500">
              PublicationDate: {book.publication_date}
            </p>
            <p className="text-sm text-gray-500">ISBN: {book.isbn_code}</p>
            <Button onClick={() => navigate(`/edit/${book.book_code}`)}>
              編集
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookInfo;
