import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
// import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  // CardDescription,
  // CardHeader,
  // CardTitle,
} from "./components/ui/card";
import { Label } from "./components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
// import { set } from "react-hook-form";
// import { graphql } from "./gql/gql";

// 検索用クエリ
const testqery = gql(`
  query GetBookByCode {
  libraflow_t_book(where: {book_code: {_eq: "1122"}}) {
    id
  }
}
`);

// ユーザー検索クエリ
const GET_USER = gql(`
  query GetUserByCode($user_code: String!) {
  libraflow_m_user(where: {user_code: {_eq: $user_code}}) {
    id
    user_code
    user_name
  }
}
`);

//
const GET_BOOK_BY_USER = gql(`
query GetBookByUser($user_id: uuid!) {
  libraflow_t_borrow_record(order_by: {borrow_date: desc}, where: {m_user_id: {_eq: $user_id}, return_date: {_is_null: true}}) {
    id
    t_book {
    book_code
    title
    author
    isbn_code
    }
  }
}
`);

const INSERT_REGISTERATION = gql(`
mutation InsertBookRecord(
    $m_user_id: uuid!
    $t_book_id: uuid!
    $borrow_date: date!
  ) {
    insert_libraflow_t_borrow_record(
      objects: [
        {
          m_user_id: $m_user_id
          t_book_id: $t_book_id
          borrow_date: $borrow_date
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`);

export default function BookReturn() {
  const [searchCode, set_searchCode] = useState<string>("");
  const [searchUserCode, set_searchUserCode] = useState<string>("");
  const [book_code_list, set_book_code_list] = useState<string[]>([]); // 書籍コードリスト

  function dateFormat(today: any, format: any) {
    format = format.replace("YYYY", today.getFullYear());
    format = format.replace("MM", ("0" + (today.getMonth() + 1)).slice(-2));
    format = format.replace("DD", ("0" + today.getDate()).slice(-2));
    return format;
  }

  const [formState, setFormState] = useState({
    m_user_id: "",
    borrow_date: dateFormat(new Date(), "YYYY-MM-DD"),
  }); // 編集用データ

  useEffect(() => {
    if (book_code_list) {
      getquery({ variables: { book_codes: book_code_list ?? [] } });
    }
  }, [book_code_list]);

  // 表示用書籍データを取得
  // const [getquery, { data: tableData }] = useLazyQuery(testqery, {
  const [getquery, { data: tableData }] = useLazyQuery(GET_BOOK_BY_USER, {
    onCompleted: (tableData) => {
      console.log(tableData);
    },
  });

  // 表示用書籍データを取得
  const [
    getuserquery,
    // { data: userData, loading: userLoading, error: userError },
    { data: userData },
  ] = useLazyQuery(GET_USER, {
    onCompleted: (userData) => {
      if (userData.libraflow_m_user.length === 0) {
        alert("No user found.");
        set_searchUserCode("");
      } else {
        setFormState((prev) => ({
          ...prev,
          m_user_id: userData.libraflow_m_user[0].id,
        }));
        set_searchUserCode(""); // 入力欄をリセット
      }
    },
  });

  const clickBookSearch = () => {
    if (searchCode) {
      checkquery({ variables: { a: searchCode } });
    }
  };

  const clickUserSearch = () => {
    if (searchUserCode) {
      getuserquery({ variables: { user_code: searchUserCode } });
    }
  };

  const clickDeleteBook: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const value = e.currentTarget.value;
    if (book_code_list.includes(value)) {
      set_book_code_list((prev) => prev.filter((code) => code !== value));
    }
  };

  const [insertRegistration] = useMutation(INSERT_REGISTERATION);

  const clickOnSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    if (tableData?.libraflow_t_book.length === 0) {
      alert("No book selected.");
      return;
    }
    if (!formState.m_user_id) {
      alert("No user selected.");
      return;
    }
    if (!formState.borrow_date) {
      alert("No borrow date selected.");
      return;
    }
    e.preventDefault();

    //貸出中チェック
    for (let i = 0; i < tableData.libraflow_t_book.length; i++) {
      if (tableData.libraflow_t_book[i].t_borrow_records.length > 0) {
        alert(
          `Book ${tableData.libraflow_t_book[i].book_code} is already borrowed.`
        );
        set_book_code_list((prev) =>
          prev.filter(
            (code) => code !== tableData.libraflow_t_book[i].book_code
          )
        );
        return;
      }
    }

    const { m_user_id, borrow_date } = formState;
    let message = "";

    try {
      // Promise.all を使い、すべての非同期処理を並列実行
      const insertions = tableData.libraflow_t_book.map((book: any) =>
        insertRegistration({
          variables: {
            m_user_id: m_user_id,
            borrow_date: borrow_date,
            t_book_id: book.id,
          },
        }).then(() => {
          console.log("Book updated successfully!", book.book_code);
          message = book.book_code; // 最後に登録した book_code をセット
        })
      );

      // すべての insert が完了するまで待機
      await Promise.all(insertions);

      alert(`Book(s) updated successfully! Last updated: ${message}`);
    } catch (err) {
      console.error("Error updating book:", err);
      alert("An error occurred while updating the book.");
    }
  };

  const clickBorrowedList = () => {
    if (!formState.m_user_id) {
      alert("No user selected.");
      return;
    }
    alert(formState.m_user_id);

    getquery({ variables: { m_user_id: formState.m_user_id ?? [] } });
  };

  return (
    <>
      {/* // タイトル表示 */}
      <div>
        <h1> Book Return Page</h1>
        <p> 本を読み取ってください。</p>
      </div>
      {/* // 検索画面（Inputbox and SearchButton） */}

      <Card className="user-card">
        <CardHeader>
          <Label>貸出情報</Label>
          <Input
            placeholder="Search users..."
            className="search-user-box"
            value={searchUserCode}
            onChange={(e) => {
              set_searchUserCode(e.target.value);
            }}
          />
          <Button onClick={clickUserSearch}>Search</Button>
        </CardHeader>

        <CardContent>
          <Label>UserCode</Label>
          <Input
            value={`${userData?.libraflow_m_user[0].user_code || ""}`}
            readOnly
          />
          <Label>UserName</Label>
          <Input
            value={`${userData?.libraflow_m_user[0].user_name || ""}`}
            readOnly
          />
        </CardContent>
      </Card>

      <Button onClick={clickBorrowedList}>貸出中のリストを表示</Button>

      <Card>
        <CardContent>
          <Label>予約候補</Label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>コード</TableHead>
                <TableHead>タイトル</TableHead>
                <TableHead>著者</TableHead>
                <TableHead>ISBNコード</TableHead>
                <TableHead>貸出中</TableHead>
                <TableHead>解除</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData?.libraflow_t_book?.map((book: any) => (
                <TableRow key={book.id}>
                  <TableCell>{book.book_code}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn_code}</TableCell>
                  <TableCell>
                    {/* {book.t_borrow_records[0].m_user.user_name} */}
                  </TableCell>
                  <TableCell>
                    <Button value={book.book_code} onClick={clickDeleteBook}>
                      外す
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* // 貸出冊数の表示 */}
      <Label>現在の冊数：{book_code_list.length ?? 0}冊</Label>
      {/* // 貸出ボタン */}
      <Button onClick={clickOnSubmit}>返却</Button>
    </>
  );
}
