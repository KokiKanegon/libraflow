import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter basename="/libraflow">
      <Routes>
        <Route path="/login" element={<>LoginPage</>} />
        <Route path="/main" element={<App />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
