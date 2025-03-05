import { createRoot } from "react-dom/client";
import Home from "./pages/Home.js";
import LoginForm from "./pages/LoginPage";
import Bookinfo from "./pages/BookInfomation";
import MyPage from "./pages/MyPage";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  makeVar,
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookEditor from "./pages/BookEditor.js";
import Layout from "./Layout";
import BookRegister from "./pages/BookRegister.js";
import BookReturn from "./pages/BookReturn.js";
import Settings from "./pages/Settings.js";
import { typeUserState } from "./types.ts";
import ImageUploadTest from "./pages/ImageUploadTest.tsx";

const client = new ApolloClient({
  uri: "http://localhost:9090/v1/graphql",
  cache: new InMemoryCache(),
});

const login_str = sessionStorage.getItem("login");
const loginState: typeUserState = login_str ? JSON.parse(login_str) : null;
export const isLoggedIn = makeVar<typeUserState>(loginState);

const cart_str = sessionStorage.getItem("cart");
const cartState: string[] | null = cart_str ? JSON.parse(cart_str) : null;
export const cartBookId = makeVar<string[]>(cartState ?? []);

//都度のrerenderをストップするためのif文
const rootElement = document.getElementById("root");
if (rootElement !== null && rootElement.childNodes.length === 0) {
  createRoot(rootElement!).render(
    <ApolloProvider client={client}>
      <BrowserRouter basename="/libraflow">
        <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/bookinfo" element={<Bookinfo />} />
            <Route path="/edit/:book_id_on_url" element={<BookEditor />} />
            <Route path="/newbook/" element={<BookEditor />} />
            <Route path="/register/" element={<BookRegister />} />
            <Route path="/return/" element={<BookReturn />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/imgtest" element={<ImageUploadTest />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  );
}
