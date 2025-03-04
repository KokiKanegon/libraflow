// 現在のログイン情報を保持するリアクティブ変数。
export type typeUserState = {
  id: string;
  user_code: string;
  user_name: string;
} | null;

// カートに追加された本の型
export type CartItem = {
  id: string;
  book_code: string;
  title?: string;
  author?: string;
  isbn_code?: string;
};

// カートの型（配列）
export type Cart = CartItem[];

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
    t_book_images: [
      {
        file_data: string; // 書影のURL（ない場合はプレースホルダー）
        is_url: boolean;
      }
    ];
  };
};
