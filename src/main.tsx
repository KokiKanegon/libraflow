import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import LoginPage from "./LoginPage.tsx";
import Bookinfo from "./BookInfomation.tsx";
import CardWithForm from "./TestPage.tsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookRegister from "./BookRegister.tsx";
import BookEditor from "./BookEditor.tsx";
import { SidebarInset } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/app-sidebar.tsx";
import Layout from "./layout.tsx";

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
          <Route path="/edit/:book_code" element={<BookEditor />} />
          <Route path="/testpage" element={<CardWithForm />} />
          <Route path="/main" element={<App />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </ApolloProvider>
);
