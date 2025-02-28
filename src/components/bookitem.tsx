import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookProps } from "../types";

const BookItem: React.FC<BookProps> = ({ book }) => {
  const navigate = useNavigate();

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
          {book.imageUrl ? (
            <img
              src={book.imageUrl}
              alt="Book Cover"
              className="w-full h-full object-cover"
            />
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

          <p className="text-gray-500 text-right">Note:</p>
          <p className="text-gray-700 text-left">{book.note}</p>

          <p className="text-gray-500 text-right">Publisher:</p>
          <p className="text-gray-700 text-left">{book.publisher}</p>

          <p className="text-gray-500 text-right">Publication Date:</p>
          <p className="text-gray-700 text-left">{book.publication_date}</p>

          <p className="text-gray-500 text-right">ISBN:</p>
          <p className="text-gray-700 text-left">{book.isbn_code}</p>
        </div>
      </div>
    </li>
  );
};

export default BookItem;
