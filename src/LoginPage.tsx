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
import { loginState } from "./main";

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
  const { data, error, loading, refetch } = useQuery(GET_USER, {
    variables: { user_code: form.userCode },
    skip: !form.userCode, // ユーザーコードが入力されるまでクエリを実行しない
  });

  const user_id = loginState((state) => state.user_id);
  const user_code = loginState((state) => state.user_code);
  const user_name = loginState((state) => state.user_name);
  const update_user_id = loginState((state) => state.update_user_id);
  const update_user_code = loginState((state) => state.update_user_code);
  const update_user_name = loginState((state) => state.update_user_name);

  if (
    message !== "ログインしました" &&
    user_id !== "" &&
    user_code !== "" &&
    user_name !== ""
  ) {
    alert("既にログインしています。");
    navigate("/main/");
  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // デフォルトの送信動作を防ぐ

    refetch(); // クエリを再実行

    if (loading) {
      alert("データを取得中です。しばらくお待ちください。");
      return;
    }

    if (error) {
      console.error("GraphQL Error:", error);
      alert("データの取得に失敗しました。");
      return;
    }

    if (!data || !data.libraflow_m_user || data.libraflow_m_user.length === 0) {
      message = "登録がないか、ユーザーコードが間違っています";
      alert(message);
      return;
    }

    if (form.pw !== "rcrs01") {
      message = "パスワードが間違っています。";
      alert(message);
      return;
    }

    message = "ログインしました。";

    // アラートが表示された後に画面遷移
    alert(message);

    update_user_id(data.libraflow_m_user[0].id);
    update_user_code(data.libraflow_m_user[0].user_code);
    update_user_name(data.libraflow_m_user[0].user_name);

    setTimeout(() => {
      navigate("/main/");
    }, 500);
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
