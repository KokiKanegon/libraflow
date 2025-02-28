import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "@/main";
import { typeUserState } from "../types";
import { q_GET_USER, q_GET_USER_LOGIN } from "../gql/querys";

const GET_USER = gql(q_GET_USER);
const GET_USER_LOGIN = gql(q_GET_USER_LOGIN);

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [form, setForm] = useState({ userCode: "", pw: "" });
  const navigate = useNavigate();

  // useQuery をコンポーネントのトップレベルで実行
  const { refetch: refetch_user } = useQuery(GET_USER, {
    variables: { user_code: form.userCode },
    skip: !form.userCode, // ユーザーコードが入力されるまでクエリを実行しない
  });

  const { refetch: refetch_login } = useQuery(GET_USER_LOGIN, {
    variables: { user_code: form.userCode, pw: form.pw },
    skip: !form.userCode, // ユーザーコードが入力されるまでクエリを実行しない
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ

    try {
      // ユーザーコード確認
      const userResult = await refetch_user();
      if (!userResult.data || userResult.data.libraflow_m_user.length === 0) {
        alert("登録がないか、ユーザーコードが間違っています");
        return;
      }

      // パスワード確認
      const loginResult = await refetch_login();
      if (!loginResult.data || loginResult.data.libraflow_m_user.length === 0) {
        alert("ログインできません。UserCodeかPasswordが間違っています。");
        return;
      }

      alert("ログインしました。");
      const user = loginResult.data.libraflow_m_user[0];
      const obj: typeUserState = {
        id: user.m_id,
        user_code: user.user_code,
        user_name: user.user_name,
      };

      console.log("ログイン情報:", obj);
      sessionStorage.setItem("login", JSON.stringify(obj));
      isLoggedIn(obj);

      navigate("/home"); // 遷移
    } catch (error) {
      console.error("ログイン中にエラーが発生:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="max-w-md mx-auto my-30">
        <CardHeader>
          <CardTitle className="text-2xl">User Code</CardTitle>
          <CardDescription>
            Enter your user code below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <Label htmlFor="email">User code</Label>
              <Input
                id="email"
                type="string"
                placeholder="enter your code"
                value={form.userCode}
                onChange={(e) => setForm({ ...form, userCode: e.target.value })}
                required
              />
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="rcrs01"
                value={form.pw}
                onChange={(e) => {
                  setForm({ ...form, pw: e.target.value });
                }}
                required
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
