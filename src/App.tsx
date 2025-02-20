import { useReactiveVar } from "@apollo/client";
import "./App.css";
import { Label } from "@/components/ui/label.tsx";
import { isLoggedIn } from "@/main";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function App() {
  const login = useReactiveVar(isLoggedIn);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center flex-col gap-4">
        <p className="text-2xl font-bold mb-4">
          {login?.user_name ?? "ゲスト"}さん
        </p>
        <p className="text-2xl font-bold mb-4">ようこそ、ミネルバの森へ</p>
        <img
          src="https://cdn.jalan.jp/jalan/img/6/kuchikomi/4526/KL/07e91_0004526201_1.jpeg"
          alt="ミネルバの森"
          className="w-full h-auto"
        />
        <Label>画像は武雄市美術館</Label>
        <Label></Label>
      </div>
      <div className="flex  items-center flex-col gap-4">
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
      </div>
    </>
  );
}
