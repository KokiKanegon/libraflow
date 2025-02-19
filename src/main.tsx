import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import LoginPage from "./LoginPage.tsx";
import Bookinfo from "./BookInfomation.tsx";
import MyPage from "./MyPage.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookEditor from "./BookEditor.tsx";
import Layout from "./Layout.tsx";
import BookRegister from "./BookRegister.tsx";
import BookReturn from "./BookReturn.tsx";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter basename="/libraflow">
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
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
