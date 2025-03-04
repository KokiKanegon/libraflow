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

// 書籍情報の取得
export const q_GET_BOOK_BY_CODE = `
  query GetBookByCode($id: uuid!) {
    libraflow_t_book(where: { id: { _eq: $id } }) {
      id
      book_code
      title
      author
      isbn_code
      m_category_id
      m_storage_location_id
      note
      publisher
      publication_date
    }
`;

export const q_GET_PULLDOWN_LIST = `    
  query GetPulldownList {
    libraflow_m_storage_location(order_by: { index: asc }) {
      id
      storage_location_name
      index
    }
    libraflow_m_category {
      id
      category_name
    }
  }`;

export const q_SEARCH_BOOK_WITH_IMAGE = `
  query MyQuery($searchCode: String!, $searchTitle: String!) {
    libraflow_t_book(
      where: {
        _and: [
          { book_code: { _like: $searchCode } },
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
      t_book_images(limit: 1) {
        file_data
        is_url
      }
    }
  }
`;

// 画像取得用クエリ
export const q_GET_BOOK_IMAGE = `
  query GetBookImage($t_book_id: uuid!) {
    libraflow_t_book_image(
      where: { t_book_id: { _eq: $t_book_id } }
      limit: 1
    ) {
      id
      file_data
      t_book_id
      is_url
    }
  }
`;

// 書籍情報アップロード用のクエリ
export const q_UPDATE_BOOK = `
  mutation UpdateBook(
    $id: uuid!
    $title: String
    $author: String
    $book_code : String
    $isbn_code: String
    $m_category_id: uuid
    $m_storage_location_id: uuid
    $note: String
    $publisher: String
    $publication_date: date
  ) {
    update_libraflow_t_book_by_pk(
      pk_columns: { id: $id }
      _set: {
        title: $title
        author: $author
        book_code: $book_code
        isbn_code: $isbn_code
        m_category_id: $m_category_id
        m_storage_location_id: $m_storage_location_id
        note: $note
        publisher: $publisher
        publication_date: $publication_date
      }
    ) {
      id
    }
  }
`;

// 書籍情報挿入用のクエリ
export const q_INSERT_BOOK = `
  mutation InsertBook(
    $id: uuid!
    $title: String!
    $author: String!
    $book_code: String!
    $isbn_code: String!
    $m_category_id: uuid
    $m_storage_location_id: uuid
    $note: String
    $publisher: String!
    $publication_date: date
  ) {
    insert_libraflow_t_book_one(
      object: {
        id: $id
        title: $title
        author: $author
        book_code: $book_code
        isbn_code: $isbn_code
        m_category_id: $m_category_id
        m_storage_location_id: $m_storage_location_id
        note: $note
        publisher: $publisher
        publication_date: $publication_date
      }
    ) {
      id
    }
  }
`;

// 画像のアップロード（insert/update）用ミューテーション
export const q_UPLOAD_IMAGE_MUTATION = `
  mutation UploadImage(
    $file_data: bytea!
    $t_book_id: uuid!
    $is_url: Boolean!
  ) {
    insert_libraflow_t_book_image(
      objects: [
        { file_data: $file_data, t_book_id: $t_book_id, is_url: $is_url }
      ]
      on_conflict: {
        constraint: t_book_image_t_book_id_key
        update_columns: [file_data, is_url]
      }
    ) {
      returning {
        id
        file_data
        t_book_id
      }
    }
  }
`;
