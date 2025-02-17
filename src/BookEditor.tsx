import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useNavigate, useParams, useSubmit } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Label } from "./components/ui/label";
import { ChangeEventHandler } from "react";
import { Textarea } from "./components/ui/textarea";
import { graphql } from "./gql/gql";

const GET_BOOK_BY_CODE = gql(`
  query GetBookByCode($book_code: String!) {
    libraflow_t_book(where: { book_code: { _eq: $book_code } }) {
      id
      book_code
      title
      author
      isbn_code
      m_category_id
      m_storage_location_id
      note
      publisher
      publication_date
    }
    libraflow_m_storage_location(order_by: { index: asc }) {
      id
      storage_location_name
      index
    }
    libraflow_m_category {
      id
      category_name
    }
  }
`);

const UPDATE_BOOK = gql(`
  mutation UpdateBook(
    $id: uuid!
    $title: String
    $author: String
    $book_code : String
    $isbn_code: String
    $m_category_id: uuid
    $m_storage_location_id: uuid
    $note: String
    $publisher: String
    $publication_date: timestamptz
  ) {
    update_libraflow_t_book_by_pk(
      pk_columns: { id: $id }
      _set: {
        title: $title
        author: $author
        book_code: $book_code
        isbn_code: $isbn_code
        m_category_id: $m_category_id
        m_storage_location_id: $m_storage_location_id
        note: $note
        publisher: $publisher
        publication_date: $publication_date
      }
    ) {
      id
    }
  }
`);

function BookEditor() {
  const { book_code } = useParams(); // URLから book_code を取得
  const [searchCode, setSearchCode] = useState("");
  const [formState, setFormState] = useState({
    id: "",
    title: "",
    author: "",
    book_code: "",
    isbn_code: "",
    m_category_id: "",
    m_storage_location_id: "",
    note: "",
    publisher: "",
    publication_date: "",
  }); // 編集用データ

  // 書籍データを取得
  const { data, loading, error, refetch } = useQuery(GET_BOOK_BY_CODE, {
    variables: { book_code: book_code ?? "" },
    skip: !book_code, // book_codeがない場合はクエリをスキップ
  });

  // const { data: categoryData, loading: categoryLoading } =
  //   useQuery(GET_CATEGORIES);
  // const { data: storageData, loading: storageLoading } = useQuery(GET_STORAGE);

  const [updateBook, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_BOOK);

  const handleSearch = () => {
    if (!searchCode.trim()) return;
    refetch(); // 検索を再実行
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const clickOnSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const {
      id,
      title,
      author,
      book_code,
      isbn_code,
      m_category_id,
      m_storage_location_id,
      note,
      publisher,
      publication_date,
    } = formState;

    const formatDate = (timestamp: string) => {
      return new Date(timestamp).toISOString().slice(0, 10); // YYYY-MM-DD形式に変換
    };

    const [formState, setFormState] = useState({
      publication_date: formatDate(data.libraflow_t_book[0].publication_date), // 初期値を変換して設定
    });

    try {
      updateBook({
        variables: {
          id,
          title,
          author,
          book_code,
          isbn_code,
          m_category_id: m_category_id || null,
          m_storage_location_id: m_storage_location_id || null,
          note,
          publisher,
          publication_date,
        },
      });
      alert("Book updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(data);
    if (data && data.libraflow_t_book.length > 0) {
      setFormState({
        ...data.libraflow_t_book[0],
      });
    }
  }, [data]);

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  // どれかがloadingなら、ローディング表示
  if (loading) {
    return <p className="text-center text-xl font-bold">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search and Edit Book</h1>

      {/* 検索フォーム */}
      {/* <div className="flex gap-4 mb-4">
        <Input
          placeholder="Enter Book Code"
          value={searchCode}
          onChange={(e) => {
            setSearchCode(e.target.value);
          }}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div> */}

      {/* 検索の結果 */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && data.libraflow_t_book.length === 0 && <p>No book found.</p>}

      {/* 編集フォーム */}
      {formState && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Editor</CardTitle>
                <CardDescription>
                  Enter books infomatino and press bottom button
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Label htmlFor="name">code</Label>
                <Input
                  name="code"
                  placeholder="Code"
                  value={formState.book_code}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="name">Title</Label>
                <Input
                  name="title"
                  placeholder="Title"
                  value={formState.title}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="name">Author</Label>
                <Input
                  name="author"
                  placeholder="Author"
                  value={formState.author}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="name">PublicationDate</Label>
                <Input
                  type="date"
                  name="publication_date"
                  placeholder="Publication date"
                  value={formState.publication_date}
                  onChange={handleChange}
                />
                {formState.publication_date}
                <Label htmlFor="name">Publisher</Label>
                <Input
                  name="publisher"
                  placeholder="Publiser"
                  value={formState.publisher}
                  onChange={handleChange}
                />
                <Label htmlFor="name">ISBNCode</Label>
                <Input
                  name="isbn_code"
                  placeholder="ISBN Code"
                  value={formState.isbn_code}
                  onChange={handleChange}
                />
                {/* カテゴリ選択（プルダウン） */}
                <Label htmlFor="name">category</Label>
                <Select
                  value={formState?.m_category_id ?? ""}
                  onValueChange={(value) => {
                    setFormState({ ...formState, m_category_id: value });
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {data?.libraflow_m_category.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={formState?.m_storage_location_id ?? ""}
                  onValueChange={(value: any) => {
                    setFormState({
                      ...formState,
                      m_storage_location_id: value,
                    });
                  }}
                >
                  <Label htmlFor="name">Storage</Label>
                  <SelectTrigger id="storage id">
                    <SelectValue placeholder="Select a Storage location" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {data?.libraflow_m_storage_location.map((storage: any) => {
                      return (
                        <SelectItem key={storage.id} value={storage.id}>
                          {storage.storage_location_name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Label htmlFor="name">Note</Label>
                <Textarea
                  name="note"
                  placeholder="Note"
                  value={formState.note}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFormState({
                      ...formState,
                      note: event.target.value, // ✅ 正しく値を取得
                    });
                  }}
                />
                <Button
                  type="submit"
                  disabled={updateLoading}
                  onClick={clickOnSubmit}
                >
                  {updateLoading ? "Updating..." : "Update Book"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {updateError && (
            <p className="text-red-500">Error: {updateError.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BookEditor;
