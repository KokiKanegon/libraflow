import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import LoginForm from "./LoginPage.tsx";
import Bookinfo from "./BookInfomation.tsx";
import MyPage from "./MyPage.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
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

type State = {
  user_id: string;
  user_code: string;
  user_name: string;
};

type Action = {
  update_user_id: (firstName: State["user_id"]) => void;
  update_user_code: (firstName: State["user_code"]) => void;
  update_user_name: (firstName: State["user_name"]) => void;
};

export const loginState = create<State & Action>((set) => ({
  user_id: "",
  user_code: "",
  user_name: "",
  update_user_id: (user_id) => set({ user_id }),
  update_user_code: (user_code) => set({ user_code }),
  update_user_name: (user_name) => set({ user_name }),
}));

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
