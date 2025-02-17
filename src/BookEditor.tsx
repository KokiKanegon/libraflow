import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useNavigate, useParams } from "react-router-dom";

const GET_BOOK_BY_CODE = gql`
  query GetBookByCode($book_code: String!) {
    libraflow_t_book(where: { book_code: { _eq: $book_code } }) {
      id
      book_code
      title
      author
      isbn_code
      m_category_id
      m_strage_location_id
      note
      publisher
      publication_date
    }
  }
`;

const GET_CATEGORIES = gql`
  query GetCategoryList {
    libraflow_m_category {
      id
      category_name
    }
  }
`;

console.log(GET_CATEGORIES);

const { data } = useQuery(GET_CATEGORIES);

// const {
//   data: categoryData,
//   loading: categoryLoading,
//   error: categoryError,
// } = useQuery(GET_CATEGORIES);

console.log(data);

const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: uuid!
    $title: String
    $author: String
    $isbn_code: String
    $m_category_id: uuid
    $m_strage_location_id: uuid
    $note: String
    $publisher: String
  ) {
    update_libraflow_t_book_by_pk(
      pk_columns: { id: $id }
      _set: {
        title: $title
        author: $author
        isbn_code: $isbn_code
        m_category_id: $m_category_id
        m_strage_location_id: $m_strage_location_id
        note: $note
        publisher: $publisher
      }
    ) {
      id
    }
  }
`;

function BookEditor() {
  const { book_code } = useParams(); // URLから book_code を取得
  const navigate = useNavigate();

  const [searchCode, setSearchCode] = useState("");
  const [formState, setFormState] = useState(null); // 編集用データ

  // 書籍データを取得
  const { data, loading, error, refetch } = useQuery(GET_BOOK_BY_CODE, {
    variables: { book_code },
    skip: !book_code, // book_codeがない場合はクエリをスキップ
  });

  const [updateBook, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_BOOK);

  const handleSearch = () => {
    if (!searchCode.trim()) return;
    refetch(); // 検索を再実行
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const {
      id,
      title,
      author,
      isbn_code,
      m_category_id,
      m_strage_location_id,
    } = formState;

    try {
      await updateBook({
        variables: {
          id,
          title,
          author,
          isbn_code,
          m_category_id: m_category_id || null,
          m_strage_location_id: m_strage_location_id || null,
        },
      });
      alert("Book updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  // データが取得できた場合、フォームデータを初期化
  if (data && data.libraflow_t_book.length > 0 && !formState) {
    setFormState(data.libraflow_t_book[0]);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search and Edit Book</h1>

      {/* 検索フォーム */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Enter Book Code"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* 検索の結果 */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && data.libraflow_t_book.length === 0 && <p>No book found.</p>}

      {/* 編集フォーム */}
      {formState && (
        <form onSubmit={handleUpdate} className="space-y-4">
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

          {/* カテゴリ選択（プルダウン） */}
          <div>
            <label
              htmlFor="m_category_id"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="m_category_id"
              value={formState.m_category_id || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            >
              <option value="">Select a category</option>
              {categoryLoading && <option>Loading...</option>}
              {categoryError && <option>Error loading categories</option>}
              {categoryData &&
                categoryData.libraflow_m_category.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
            </select>
          </div>

          <Input
            name="m_strage_location_id"
            placeholder="Storage Location ID (UUID)"
            value={formState.m_strage_location_id}
            onChange={handleChange}
          />

          <Button type="submit" disabled={updateLoading}>
            {updateLoading ? "Updating..." : "Update Book"}
          </Button>

          {updateError && (
            <p className="text-red-500">Error: {updateError.message}</p>
          )}
        </form>
      )}
    </div>
  );
}

export default BookEditor;
