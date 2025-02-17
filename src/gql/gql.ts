/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetBookByCode($book_code: String!) {\n    libraflow_t_book(where: { book_code: { _eq: $book_code } }) {\n      id\n      book_code\n      title\n      author\n      isbn_code\n      m_category_id\n      m_storage_location_id\n      note\n      publisher\n      publication_date\n    }\n    libraflow_m_storage_location(order_by: { index: asc }) {\n      id\n      storage_location_name\n      index\n    }\n    libraflow_m_category {\n      id\n      category_name\n    }\n  }\n": typeof types.GetBookByCodeDocument,
    "\n  mutation UpdateBook(\n    $id: uuid!\n    $title: String\n    $author: String\n    $isbn_code: String\n    $m_category_id: uuid\n    $m_storage_location_id: uuid\n    $note: String\n    $publisher: String\n    $publication_date: timestamptz\n  ) {\n    update_libraflow_t_book_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        title: $title\n        author: $author\n        isbn_code: $isbn_code\n        m_category_id: $m_category_id\n        m_storage_location_id: $m_storage_location_id\n        note: $note\n        publisher: $publisher\n        publication_date: $publication_date\n      }\n    ) {\n      id\n    }\n  }\n": typeof types.UpdateBookDocument,
    "\n  query MyQuery {\n    libraflow_t_book {\n      id\n      book_code\n      title\n      author\n      isbn_code\n      m_category_id\n      m_storage_location_id\n      update_date\n      create_date\n      _is_delete\n      note\n      publisher\n      publication_date\n    }\n  }\n": typeof types.MyQueryDocument,
};
const documents: Documents = {
    "\n  query GetBookByCode($book_code: String!) {\n    libraflow_t_book(where: { book_code: { _eq: $book_code } }) {\n      id\n      book_code\n      title\n      author\n      isbn_code\n      m_category_id\n      m_storage_location_id\n      note\n      publisher\n      publication_date\n    }\n    libraflow_m_storage_location(order_by: { index: asc }) {\n      id\n      storage_location_name\n      index\n    }\n    libraflow_m_category {\n      id\n      category_name\n    }\n  }\n": types.GetBookByCodeDocument,
    "\n  mutation UpdateBook(\n    $id: uuid!\n    $title: String\n    $author: String\n    $isbn_code: String\n    $m_category_id: uuid\n    $m_storage_location_id: uuid\n    $note: String\n    $publisher: String\n    $publication_date: timestamptz\n  ) {\n    update_libraflow_t_book_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        title: $title\n        author: $author\n        isbn_code: $isbn_code\n        m_category_id: $m_category_id\n        m_storage_location_id: $m_storage_location_id\n        note: $note\n        publisher: $publisher\n        publication_date: $publication_date\n      }\n    ) {\n      id\n    }\n  }\n": types.UpdateBookDocument,
    "\n  query MyQuery {\n    libraflow_t_book {\n      id\n      book_code\n      title\n      author\n      isbn_code\n      m_category_id\n      m_storage_location_id\n      update_date\n      create_date\n      _is_delete\n      note\n      publisher\n      publication_date\n    }\n  }\n": types.MyQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookByCode($book_code: String!) {\n    libraflow_t_book(where: { book_code: { _eq: $book_code } }) {\n      id\n      book_code\n      title\n      author\n      isbn_code\n      m_category_id\n      m_storage_location_id\n      note\n      publisher\n      publication_date\n    }\n    libraflow_m_storage_location(order_by: { index: asc }) {\n      id\n      storage_location_name\n      index\n    }\n    libraflow_m_category {\n      id\n      category_name\n    }\n  }\n"): (typeof documents)["\n  query GetBookByCode($book_code: String!) {\n    libraflow_t_book(where: { book_code: { _eq: $book_code } }) {\n      id\n      book_code\n      title\n      author\n      isbn_code\n      m_category_id\n      m_storage_location_id\n      note\n      publisher\n      publication_date\n    }\n    libraflow_m_storage_location(order_by: { index: asc }) {\n      id\n      storage_location_name\n      index\n    }\n    libraflow_m_category {\n      id\n      category_name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateBook(\n    $id: uuid!\n    $title: String\n    $author: String\n    $isbn_code: String\n    $m_category_id: uuid\n    $m_storage_location_id: uuid\n    $note: String\n    $publisher: String\n    $publication_date: timestamptz\n  ) {\n    update_libraflow_t_book_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        title: $title\n        author: $author\n        isbn_code: $isbn_code\n        m_category_id: $m_category_id\n        m_storage_location_id: $m_storage_location_id\n        note: $note\n        publisher: $publisher\n        publication_date: $publication_date\n      }\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBook(\n    $id: uuid!\n    $title: String\n    $author: String\n    $isbn_code: String\n    $m_category_id: uuid\n    $m_storage_location_id: uuid\n    $note: String\n    $publisher: String\n    $publication_date: timestamptz\n  ) {\n    update_libraflow_t_book_by_pk(\n      pk_columns: { id: $id }\n      _set: {\n        title: $title\n        author: $author\n        isbn_code: $isbn_code\n        m_category_id: $m_category_id\n        m_storage_location_id: $m_storage_location_id\n        note: $note\n        publisher: $publisher\n        publication_date: $publication_date\n      }\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyQuery {\n    libraflow_t_book {\n      id\n      book_code\n      title\n      author\n      isbn_code\n      m_category_id\n      m_storage_location_id\n      update_date\n      create_date\n      _is_delete\n      note\n      publisher\n      publication_date\n    }\n  }\n"): (typeof documents)["\n  query MyQuery {\n    libraflow_t_book {\n      id\n      book_code\n      title\n      author\n      isbn_code\n      m_category_id\n      m_storage_location_id\n      update_date\n      create_date\n      _is_delete\n      note\n      publisher\n      publication_date\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;