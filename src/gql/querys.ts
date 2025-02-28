import { gql } from "@apollo/client";

// 1. ユーザー検索クエリ
export const q_GET_USER = `
  query GetUserByCode($user_code: String!) {
  libraflow_m_user(where: {user_code: {_eq: $user_code}}) {
    id
    user_code
    user_name
  }
}
`;

// 2. ユーザーログイン用クエリ
export const q_GET_USER_LOGIN = `
  query GetUserByCode($user_code: String!, $pw: String!) {
    libraflow_m_user(
      where: {
        _and: [
          { user_code: { _eq: $user_code } }
          { pw: { _eq: $pw } }
        ]
      }
    ) {
      id
      user_code
      user_name
    }
  }
`;

// 書籍検索用クエリ (book_code または title の部分一致)
export const q_SEARCH_BOOK = `
  query MyQuery($searchCode: String!,$searchTitle: String!) {
    libraflow_t_book(
      where: {
        _and: [
          { book_code: { _like: $searchCode} },
          { title: { _like: $searchTitle } }
        ]
      }
    ) {
      id
      book_code
      title
      author
      isbn_code
      m_category_id
      m_storage_location_id
      update_date
      create_date
      _is_delete
      note
      publisher
      publication_date
    }
  }
`;
