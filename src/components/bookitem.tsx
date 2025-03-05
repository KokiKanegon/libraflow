import { BookProps } from "../types";

const BookItem: React.FC<BookProps> = ({ book }) => {
  // data change
  // HEX を Base64 に変換する関数
  const hexToBase64 = (hexString: string): string => {
    const hex = hexString.replace(/^\\x/, "");
    const bytes = new Uint8Array(
      hex.match(/.{1,2}/g)!.map((bt) => parseInt(bt, 16))
    );
    return `data:image/png;base64,${btoa(String.fromCharCode(...bytes))}`;
  };

  const hexToString = (hex: string): string => {
    const cleanHex = hex.startsWith("\\x") ? hex.slice(2) : hex;

    // HEX → 文字列変換
    return decodeURIComponent(
      cleanHex
        .match(/.{1,2}/g)!
        .map((byte) => String.fromCharCode(parseInt(byte, 16)))
        .join("")
    );
  };

  const isURL = book?.t_book_images[0].is_url;
  const imgSrc = isURL
    ? hexToString(book.t_book_images[0].file_data)
    : hexToBase64(book.t_book_images[0].file_data);

  return (
    <li key={book.id} className="p-4 border rounded-lg shadow w-full mr-2">
      {/* タイトルと編集ボタンを横並びに */}
      <div className="flex  justify-center p-2">
        <h2 className="text-lg font-semibold">{book.title}</h2>
      </div>
      {/* 書影 + 文字情報を2列で表示 */}
      <div className="grid grid-cols-[3fr_7fr] gap-4 items-center">
        {/* 書影（画像がない場合はプレースホルダー） */}
        <div className=" mx-auto w-32 h-40 bg-gray-200 flex items-center justify-center border">
          {imgSrc ? (
            isURL ? (
              <img
                src={imgSrc}
                alt="Book Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={imgSrc}
                alt="Book Cover"
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>

        {/* 文字情報 */}
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <p className="text-gray-600 text-right">Book Code:</p>
          <p className="text-gray-800 text-left">{book.book_code}</p>

          <p className="text-gray-600 text-right">Author:</p>
          <p className="text-gray-800 text-left">{book.author}</p>

          <p className="text-gray-500 text-right">Publisher:</p>
          <p className="text-gray-700 text-left">{book.publisher}</p>

          <p className="text-gray-500 text-right">Publication Date:</p>
          <p className="text-gray-700 text-left">{book.publication_date}</p>

          <p className="text-gray-500 text-right">ISBN:</p>
          <p className="text-gray-700 text-left">{book.isbn_code}</p>

          <p className="text-gray-500 text-right">Note:</p>
          <p className="text-gray-700 text-left">
            {book.note
              ? book.note.toString().slice(0, 100) +
                (book.note.length > 100 ? "..." : "")
              : ""}
          </p>
        </div>
      </div>
    </li>
  );
};

export default BookItem;
