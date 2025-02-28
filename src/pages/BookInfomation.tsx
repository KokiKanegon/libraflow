import { gql, useQuery } from "@apollo/client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { q_SEARCH_BOOK } from "../gql/querys";
import { useEffect, useState } from "react";
import BookItem from "../components/bookitem";
import { BookProps } from "../types";

function BookInfo() {
  const navigate = useNavigate();
  const SEARCH_BOOK = gql(q_SEARCH_BOOK);

  // 検索フォームの状態
  const [formState, setFormState] = useState({
    searchCode: "",
    searchWord: "",
  });

  // 書籍検索結果を格納する状態
  const [bookInfoList, setBookInfoList] = useState([]);

  // GraphQL のクエリ
  const { refetch } = useQuery(SEARCH_BOOK, {});

  useEffect(() => {
    handleSearch();
  }, []);

  // 検索ボタンクリック時の処理
  const handleSearch = async () => {
    const { searchCode, searchWord } = formState;

    try {
      const result = await refetch({
        searchCode: searchCode ? `%${searchCode}%` : "%", // 空の場合はすべてに一致
        searchTitle: searchWord ? `%${searchWord}%` : "%", // 空の場合はすべてに一致
      });

      setBookInfoList(result.data?.libraflow_t_book || []); // 結果をセット
    } catch (error) {
      console.error("検索エラー:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Book Information</h1>
      <div className="flex gap-4 mb-10">
        <Input
          placeholder="Book Code"
          className="flex-1"
          id="bookcode"
          value={formState.searchCode}
          onChange={(e) =>
            setFormState({ ...formState, searchCode: e.target.value })
          }
        />
        <Input
          placeholder="Keyword"
          className="flex-1"
          id="title"
          value={formState.searchWord}
          onChange={(e) =>
            setFormState({ ...formState, searchWord: e.target.value })
          }
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <ul className="space-y-4">
        {bookInfoList.map((book: BookProps["book"]) => {
          return (
            <div className="flex justify-between">
              <BookItem key={book.id} book={book} />
              <Button
                className="place-self-center"
                onClick={() => navigate(`/edit/${book.id}`)}
              >
                編集
              </Button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default BookInfo;
