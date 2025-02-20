import { FormEventHandler, useCallback, useEffect, useState } from "react";
import {
  gql,
  useQuery,
  useMutation,
  useLazyQuery,
  useReactiveVar,
} from "@apollo/client";
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
import { Checkbox } from "./components/ui/checkbox";
import { isLoggedIn } from "./main";
import { useNavigate } from "react-router-dom";
// import { graphql } from "./gql/gql";

// クエリ部分
// 1. ユーザー検索クエリ
const GET_USER = gql(`
  query GetUserByCode($user_code: String!) {
  libraflow_m_user(where: {user_code: {_eq: $user_code}}) {
    id
    user_code
    user_name
  }
}
`);

// 2. 貸出中の本の表示
const GET_REGISTER_BY_USER = gql(`
  query GetBookByUser($m_user_id: uuid!) {
    libraflow_t_borrow_record(order_by: {borrow_date: asc}, where: {m_user_id: {_eq: $m_user_id}, return_date: {_is_null: true}}) {
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

// 3. 返却機能（Update）
const RETURN_BOOK = gql(`
  mutation ReturnBook(
      $id: [uuid!]
      $return_date: date!
    ) {
      update_libraflow_t_borrow_record(
        where: {
          id: {_in: $id}}, 
          _set: {return_date: $return_date}
        ) {
    returning {
      id
    }
  }
}
  `);

// function dateFormat -> change date format
function dateFormat(today: any, format: any) {
  format = format.replace("YYYY", today.getFullYear());
  format = format.replace("MM", ("0" + (today.getMonth() + 1)).slice(-2));
  format = format.replace("DD", ("0" + today.getDate()).slice(-2));
  return format;
}

export default function BookReturn() {
  const navigate = useNavigate();
  // 管理するステート
  // 1. ユーザーコード
  const [searchUserCode, set_searchUserCode] = useState<string>("");

  // 2. 貸出中の本のコードリスト
  // const [borrow_id_list, set_borrow_id_list] = useState<string[]>([]); // 書籍コードリスト

  // 3. 返却予定の本のリスト
  const [return_id_list, set_return_id_list] = useState<string[]>([]); // 書籍コードリスト

  // 4. ユーザーコードと返却日
  const [formState, setFormState] = useState({
    m_user_id: "",
    return_date: dateFormat(new Date(), "YYYY-MM-DD"),
  });

  // 現在のログイン情報を保持するリアクティブ変数。
  type UserState = {
    id: string;
    user_code: string;
    user_name: string;
  } | null;

  const login: UserState = useReactiveVar(isLoggedIn);
  useEffect(() => {
    if (login) {
      getuserquery({ variables: { user_code: login.user_code } });
    }
  }, []);

  useEffect(() => {
    if (formState.m_user_id) {
      getquery({ variables: { m_user_id: formState.m_user_id ?? [] } });
    }
  }, [formState.m_user_id]);

  useEffect(() => {
    if (return_id_list) {
      console.log(return_id_list);
    }
  }, [return_id_list]);

  // function部分
  // 1. ユーザー検索
  const clickUserSearch = () => {
    if (searchUserCode) {
      getuserquery({ variables: { user_code: searchUserCode } });
      if (userData) {
        setFormState((prev) => ({
          ...prev,
          m_user_id: userData.libraflow_m_user[0].id,
        }));
      }
    }
  };

  const [getuserquery, { data: userData }] = useLazyQuery(GET_USER, {
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

  // 2. 貸出中の本の表示
  // const [getquery, { data: tableData }] = useLazyQuery(testqery, {
  const [getquery, { data: tableData }] = useLazyQuery(GET_REGISTER_BY_USER, {
    onCompleted: (tableData) => {
      console.log(tableData);
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });

  // 3. 返却機能（Update）
  const [returnRegistration] = useMutation(RETURN_BOOK);

  const clickOnSubmit: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    if (return_id_list.length === 0) {
      alert("No book selected.");
      return;
    }
    if (!formState.m_user_id) {
      alert("No user selected.");
      return;
    }
    if (!formState.return_date) {
      alert("No return date selected.");
      return;
    }

    const { m_user_id, return_date } = formState;
    let message = "";

    try {
      return_id_list.map((return_id_record) => {
        returnRegistration({
          variables: {
            id: return_id_record,
            return_date: return_date,
          },
        }).then(() => {
          console.log("Book updated successfully!", return_id_record);
          message = return_id_record; // 最後に登録した book_code をセット
        });
      });
      // すべての insert が完了するまで待機
      await Promise.all(return_id_list);

      alert(`Book(s) updated successfully! Last updated:`);
      setFormState((prev) => ({
        ...prev,
        m_user_id: userData.libraflow_m_user[0].id,
      }));

      navigate(0);
    } catch (err) {
      console.error("Error updating book:", err);
      alert("An error occurred while updating the book.");
    }
  };

  return (
    // 画面周り
    <>
      {/* // タイトル表示 */}
      <div>
        <h1> Book Return Page</h1>
        <p> ユーザー情報を入力してください</p>
      </div>
      {/* // 1. ユーザー検索 */}
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

      {/* ; // 2. 貸出中の本の表示（返却するものにチェックボックスをつけてそれで返却を制御する） */}
      <Card>
        <CardContent>
          <Label>予約候補</Label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>選択</TableHead>
                <TableHead>コード</TableHead>
                <TableHead>タイトル</TableHead>
                <TableHead>著者</TableHead>
                <TableHead>ISBNコード</TableHead>
                <TableHead>貸出中</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData?.libraflow_t_borrow_record?.map((book: any) => (
                <TableRow key={book.id}>
                  <TableCell key={book.id}>
                    <Checkbox
                      id={book.id}
                      onCheckedChange={(e) => {
                        if (e) {
                          set_return_id_list((prev) => [...prev, book.id]);
                        } else {
                          set_return_id_list((prev) =>
                            prev.filter((id) => id !== book.id)
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{book.t_book.book_code}</TableCell>
                  <TableCell>{book.t_book.title}</TableCell>
                  <TableCell>{book.t_book.author}</TableCell>
                  <TableCell>{book.t_book.isbn_code}</TableCell>
                  <TableCell>
                    {/* {book.t_borrow_records[0].m_user.user_name} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* // 3. 返却ボタン（返却処理を実行　返却日は指定） */}
      <Card>
        <CardContent>
          <Label>返却日</Label>
          <Input
            type="date"
            value={formState.return_date}
            onChange={(e) => {
              setFormState((prev) => ({
                ...prev,
                return_date: e.target.value,
              }));
            }}
          />
          {/* // 貸出冊数の表示 */}
          <Label>現在の冊数：{return_id_list.length ?? 0}冊</Label>
          {/* // 貸出ボタン */}
          <Button onClick={clickOnSubmit}>返却</Button>
        </CardContent>
      </Card>
    </>
  );
}
