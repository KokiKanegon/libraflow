// 現在のログイン情報を保持するリアクティブ変数。
export type typeUserState = {
  id: string;
  user_code: string;
  user_name: string;
} | null;

export type BookProps = {
  book: {
    id: string;
    book_code: string;
    title: string;
    author: string;
    note?: string;
    publisher?: string;
    publication_date?: string;
    isbn_code?: string;
    imageUrl?: string; // 書影のURL（ない場合はプレースホルダー）
  };
};
