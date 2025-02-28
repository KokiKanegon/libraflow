import "./App.css";
import { useReactiveVar } from "@apollo/client";
import { Label } from "@/components/ui/label.tsx";
import { isLoggedIn } from "@/main";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { typeUserState } from "./types";
import { useLogout } from "./components/logout";

export default function App() {
  const login: typeUserState = useReactiveVar(isLoggedIn);
  const navigate = useNavigate();
  const logout = useLogout();
  return (
    <>
      <div className="flex items-center flex-col gap-4">
        <p className="text-2xl font-bold mb-4">
          {login ? login.user_name : "ゲスト"}さん
        </p>
        <p className="text-2xl font-bold mb-4">ようこそ、ミネルバの森へ</p>
        <img
          src="https://cdn.jalan.jp/jalan/img/6/kuchikomi/4526/KL/07e91_0004526201_1.jpeg"
          alt="ミネルバの森"
          className="w-full h-auto rounded-2xl"
        />
        <Label>画像は武雄市美術館</Label>
        <Label></Label>
      </div>
      <div className="flex place-content-center">
        <div className="flex gap-4">
          <Button
            className="h-16 w-40 "
            onClick={() => {
              navigate("/register/");
            }}
            key="borrow_book"
          >
            本を借りる
          </Button>
          <Button
            className="h-16 w-40"
            onClick={() => {
              navigate("/return/");
            }}
            key="return_book"
          >
            本を返す
          </Button>
          {login === null ? (
            <>
              {" "}
              <Button
                className="h-16 w-40"
                onClick={() => {
                  navigate("/login/");
                }}
                key="login"
              >
                ログインする
              </Button>
            </>
          ) : (
            <>
              {" "}
              <Button className="h-16 w-40" onClick={logout} key="login">
                ログアウトする
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
