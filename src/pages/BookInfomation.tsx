import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { q_SEARCH_BOOK_WITH_IMAGE } from "../gql/querys";
import { useEffect, useState } from "react";
import BookItem from "../components/bookitem";
import { BookProps } from "../types";
import { cartBookId } from "../main";

function BookInfo() {
  const navigate = useNavigate();
  const SEARCH_BOOK_WITH_IMAGE = gql(q_SEARCH_BOOK_WITH_IMAGE);

  // 検索フォームの状態
  const [formState, setFormState] = useState({
    searchCode: "",
    searchWord: "",
  });

  // 書籍検索結果を格納する状態
  const [bookInfoList, setBookInfoList] = useState([]);

  // GraphQL のクエリ
  const { refetch: refetchWithImage } = useQuery(SEARCH_BOOK_WITH_IMAGE, {});

  useEffect(() => {
    handleSearchWithImage();
  }, []);

  const cartBookIds = useReactiveVar(cartBookId); // ReactiveVarの変更を監視

  const addCart = async (id: string) => {
    const obj = [...cartBookIds, id];
    sessionStorage.setItem("cart", JSON.stringify(obj));
    cartBookId(obj); // setterを使う
    console.log(cartBookId());
  };

  const delCart = async (id: string) => {
    const obj = cartBookIds.filter((code) => code !== id);
    sessionStorage.setItem("cart", JSON.stringify(obj));
    cartBookId(obj); // setterを使う
    console.log(cartBookId());
  };
  // 検索ボタンクリック時の処理
  const handleSearchWithImage = async () => {
    const { searchCode, searchWord } = formState;

    try {
      const result = await refetchWithImage({
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
        <Button onClick={handleSearchWithImage}>Search</Button>
      </div>

      <ul className="space-y-4">
        {bookInfoList.map((book: BookProps["book"]) => {
          const isInCart = cartBookId().includes(book.id); // カートにあるかを判定
          const isBorrowed = !!book.t_borrow_records.length; // 貸出中かを判定

          return (
            <div key={book.id} className="flex justify-between">
              <BookItem book={book} />
              <div className="flex flex-col items-center justify-center space-y-2">
                <Button
                  className="place-self-center"
                  onClick={() => navigate(`/edit/${book.id}`)}
                >
                  編集
                </Button>

                {isBorrowed ? (
                  <Button
                    className="place-self-center bg-gray-700 text-white"
                    disabled
                  >
                    貸出中
                  </Button>
                ) : isInCart ? (
                  <Button
                    className="place-self-center bg-red-500 text-white"
                    onClick={() => delCart(book.id)}
                  >
                    Del Cart
                  </Button>
                ) : (
                  <Button
                    className="place-self-center bg-green-500 text-white"
                    onClick={() => addCart(book.id)}
                  >
                    Add Cart
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default BookInfo;
