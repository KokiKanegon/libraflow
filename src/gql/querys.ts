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
