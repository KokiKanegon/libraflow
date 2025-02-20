import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "./main";

// クエリ部分

// 現在のログイン情報を保持するリアクティブ変数。
type UserState = {
  id: string;
  user_code: string;
  user_name: string;
} | null;
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

// 1. ユーザーログイン用クエリ
const GET_USER_LOGIN = gql(`
  query GetUserByCode($user_code: String!, $pw: String!) {
    libraflow_m_user(
      where: {
        _and: [
          { user_code: { _eq: $user_code } }
          { pw: { _eq: $pw } }
        ]
      }
    ) {
      id
      user_code
      user_name
    }
  }
`);

let message = "";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [form, setForm] = useState({
    userCode: "",
    pw: "",
  });

  const navigate = useNavigate();

  // useQuery をコンポーネントのトップレベルで実行
  const {
    data,
    error,
    refetch: refetch_user,
  } = useQuery(GET_USER, {
    variables: { user_code: form.userCode },
    skip: !form.userCode, // ユーザーコードが入力されるまでクエリを実行しない
  });

  const {
    data: login_data,
    error: login_error,
    refetch: refetch_login,
  } = useQuery(GET_USER_LOGIN, {
    variables: { user_code: form.userCode, pw: form.pw },
    skip: !form.userCode, // ユーザーコードが入力されるまでクエリを実行しない
  });

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // デフォルトの送信動作を防ぐ

    await refetch_user().then(async () => {
      console.log(data);

      if (error) {
        alert("GraphQL Error:" + error);
        return;
      }

      if (
        !data ||
        !data.libraflow_m_user ||
        data.libraflow_m_user.length === 0
      ) {
        message = "登録がないか、ユーザーコードが間違っています";
        alert(message);
        return;
      }
      await refetch_login().then(() => {
        if (login_data?.libraflow_m_user.length === 0) {
          alert("パスワードが間違っています。");
          return;
        }

        message = "ログインしました。";

        // アラートが表示された後に画面遷移
        alert(message);
        console.log(login_data);
        const user = login_data?.libraflow_m_user[0];
        const obj: UserState = {
          id: user.m_id,
          user_code: user.user_code,
          user_name: user.user_name,
        };
        //オブジェクトをJSON文字列に変換
        const jsonObj = JSON.stringify(obj);
        sessionStorage.setItem("login", jsonObj);
        console.log(obj);
        isLoggedIn(obj);

        setTimeout(() => {
          navigate("/main/");
        }, 500);
      });
    }); // ユーザーコードがあるかの確認
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">User Code</CardTitle>
          <CardDescription>
            Enter your user code below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">User code</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="10000"
                  value={form.userCode}
                  onChange={(e) =>
                    setForm({ ...form, userCode: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="rcrs01"
                  value={form.pw}
                  onChange={(e) => setForm({ ...form, pw: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" onClick={onSubmit}>
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
