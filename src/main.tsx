import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import LoginForm from "./LoginPage.tsx";
import Bookinfo from "./BookInfomation.tsx";
import MyPage from "./MyPage.tsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  makeVar,
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookEditor from "./BookEditor.tsx";
import Layout from "./Layout.tsx";
import BookRegister from "./BookRegister.tsx";
import BookReturn from "./BookReturn.tsx";
import { create } from "zustand";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

// 現在のログイン情報を保持するリアクティブ変数。
type UserState = {
  id: string;
  user_code: string;
  user_name: string;
} | null;

const login_str = sessionStorage.getItem("login");
const loginState: UserState = login_str ? JSON.parse(login_str) : null;

export const isLoggedIn = makeVar<UserState>(loginState);
console.log(isLoggedIn);

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter basename="/libraflow">
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/bookinfo" element={<Bookinfo />} />
          <Route path="/edit/:book_code_on_url" element={<BookEditor />} />
          <Route path="/register/" element={<BookRegister />} />
          <Route path="/return/" element={<BookReturn />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/main" element={<App />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </ApolloProvider>
);
