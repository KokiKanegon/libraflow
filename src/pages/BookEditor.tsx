import { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { ChangeEventHandler } from "react";
import { Textarea } from "../components/ui/textarea";
import { valueFromAST } from "graphql";
import { Switch } from "../components/ui/switch";
// import { graphql } from "./gql/gql";

const GET_BOOK_BY_CODE = gql(`
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
    libraflow_m_storage_location(order_by: { index: asc }) {
      id
      storage_location_name
      index
    }
    libraflow_m_category {
      id
      category_name
    }
  }
`);

// 画像取得用クエリ
const GET_BOOK_IMAGE_QUERY = gql`
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

const UPDATE_BOOK = gql(`
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
`);

// クエリ作成
// 画像のアップロード（insert/update）用ミューテーション
const UPLOAD_IMAGE_MUTATION = gql`
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

const getData = async (isbn_code: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn_code}&startIndex=0&maxResults=1&key=AIzaSyD2M7ql17oRiu5XUkP5aTPjzOkcuToQHOE`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Oops, something went wrong:", error);
  }
};

// HEX を Base64 に変換する関数
const hexToBase64 = (hexString: string): string => {
  const hex = hexString.replace(/^\\x/, "");
  const bytes = new Uint8Array(
    hex.match(/.{1,2}/g)!.map((bt) => parseInt(bt, 16))
  );
  return `data:image/png;base64,${btoa(String.fromCharCode(...bytes))}`;
};

// Base64 を HEX に変換する関数
const base64ToHex = (base64: string): string => {
  const binary = atob(base64);
  return Array.from(binary)
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
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

function BookEditor() {
  const { book_id_on_url } = useParams();
  const [searchISBNCode, setSearchISBNCode] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [isURL, setIsURL] = useState<boolean>(true);
  const [uploadImage] = useMutation(UPLOAD_IMAGE_MUTATION);

  const [formState, setFormState] = useState({
    id: "",
    title: "",
    author: "",
    book_code: "",
    isbn_code: "",
    m_category_id: "",
    m_storage_location_id: "",
    note: "",
    publisher: "",
    publication_date: "",
  }); // 編集用データ

  let isFirst = true;

  // 書籍データを取得
  const { data, loading, error, refetch } = useQuery(GET_BOOK_BY_CODE, {
    variables: { id: book_id_on_url ?? "" },
  });

  // 書籍データを取得
  const { data: imgData, refetch: refetchImage } = useQuery(
    GET_BOOK_IMAGE_QUERY,
    {
      variables: { t_book_id: formState.id ?? "" },
    }
  );

  const [updateBook, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_BOOK);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    console.log(name, value, formState.book_code);
    setFormState({ ...formState, [name]: value });
  };

  const handleChangeISBN: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setSearchISBNCode(value);
  };

  const clickOnSearchISNBCode: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    try {
      const data_bookinfo = await getData(searchISBNCode.replace(/-/g, ""));
      console.log("検索結果:", data_bookinfo);

      // `data_bookinfo` の中身を確認して適切なデータを取り出す
      if (
        data_bookinfo &&
        data_bookinfo.items &&
        data_bookinfo.items.length > 0
      ) {
        const book = data_bookinfo.items[0].volumeInfo;
        // 📌 Fix: Ensure `yyyy-MM-dd` format by appending "-01" if needed
        let publicationDate = book.publishedDate || "";
        if (/^\d{4}-\d{2}$/.test(publicationDate)) {
          publicationDate += "-01"; // Convert "yyyy-MM" to "yyyy-MM-01"
        }

        setFormState((prev) => ({
          ...prev,
          title: book.title || "",
          author: book.authors ? book.authors.join(", ") : "",
          publisher: book.publisher || "",
          publication_date: publicationDate || "",
          isbn_code: searchISBNCode.replace(/-/g, ""),
          note: book.description,
        }));
        setImgSrc(book.imageLinks.thumbnail);
        console.log("書籍情報が更新されました:", book);
      } else {
        console.warn("書籍情報が見つかりませんでした。");
      }
    } catch (error) {
      console.error("書籍情報の取得に失敗しました:", error);
    }
  };

  const searchThumnail = async (searchISBNCode: string) => {
    const res = await getData(searchISBNCode.replace(/-/g, ""));
    if (res && res.items && res.items.length > 0) {
      const book = res.items[0].volumeInfo;
      book.imageLinks.thumbnail ? setImgSrc(book.imageLinks.thumbnail) : null;
    } else {
      console.log("書籍情報が見つかりませんでした。");
    }
  };

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [form, setForm] = useState({
    id: "",
    uploadData: "",
    bookId: "",
    isURL,
  });
  // ファイル選択処理
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 画像を Base64 に変換
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(",")[1]; // `data:image/png;base64,...` の `,` 以降を取得
      setPreviewSrc(reader.result as string); // プレビュー用
      setForm((prev) => ({
        ...prev,
        uploadData: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };
  const clickOnSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const {
      id,
      title,
      author,
      book_code,
      isbn_code,
      m_category_id,
      m_storage_location_id,
      note,
      publisher,
      publication_date,
    } = formState;

    console.log(formState);

    try {
      updateBook({
        variables: {
          id,
          title,
          author,
          book_code,
          isbn_code,
          m_category_id: m_category_id || null,
          m_storage_location_id: m_storage_location_id || null,
          note,
          publisher,
          publication_date,
        },
      });

      await uploadImage({
        variables: {
          file_data: isURL ? imgSrc : `\\x${base64ToHex(form.uploadData)}`,
          t_book_id: formState.id,
          is_url: isURL,
        },
      });
      alert("Book updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    console.log("preview data");

    console.log(previewSrc);
  }, [previewSrc]);

  useEffect(() => {
    // console.log(data);
    if (data && data.libraflow_t_book.length > 0) {
      setFormState({
        ...data.libraflow_t_book[0],
      });
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    // console.log(data);
    if (isFirst) {
      console.log("B");
      refetchImage();
      console.log(imgData);

      if (imgData && imgData.libraflow_t_book_image.length > 0) {
        console.log("imgData");
        console.log(imgData);

        const form2 = imgData.libraflow_t_book_image[0];
        console.log(form2);

        setForm((prev) => ({
          ...prev,
          id: form2.id,
          uploadData: form2.is_url
            ? hexToString(form2.file_data)
            : hexToBase64(form2.file_data),
          bookId: form2.t_book_id,
          isURL: form2.is_url,
        }));

        if (form2.is_url) {
          setImgSrc(() => {
            return hexToString(form2.file_data);
          });
        } else {
          setPreviewSrc(() => {
            return hexToBase64(form2.file_data);
          });
        }
        isFirst = false;
      }
    }
  }, [imgData]);

  useEffect(() => {
    setIsURL(form.isURL);
  }, [form.isURL]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search and Edit Book</h1>

      {/* 検索の結果 */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && data.libraflow_t_book.length === 0 && <p>No book found.</p>}

      {/* 編集フォーム */}
      {formState && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5 p-4 gap-4">
            <Card>
              <CardHeader className="gap-4">
                <CardTitle className="text-2xl">ISBNで取得</CardTitle>
                <CardDescription>
                  ISBNコードを読み取ってください。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  name="isbn_code"
                  placeholder="input ISBN Code"
                  value={searchISBNCode}
                  onChange={handleChangeISBN}
                  required
                />
                <Button className="m-4" onClick={clickOnSearchISNBCode}>
                  ISBNコードで検索する
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Editor</CardTitle>
                <CardDescription>
                  Enter books infomatino and press bottom button
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Label htmlFor="name">code</Label>
                <Input
                  className="mt-2 mb-2"
                  name="book_code"
                  placeholder="Code"
                  value={formState.book_code}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="name">Title</Label>
                <Input
                  className="mt-2 mb-2"
                  name="title"
                  placeholder="Title"
                  value={formState.title}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="name">Author</Label>
                <Input
                  className="mt-2 mb-2"
                  name="author"
                  placeholder="Author"
                  value={formState.author}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="name">PublicationDate</Label>
                <Input
                  className="mt-2 mb-2"
                  type="date"
                  name="publication_date"
                  placeholder="Publication date"
                  value={formState.publication_date}
                  onChange={handleChange}
                />
                <Label htmlFor="name">Publisher</Label>
                <Input
                  className="mt-2 mb-2"
                  name="publisher"
                  placeholder="Publiser"
                  value={formState.publisher}
                  onChange={handleChange}
                />
                <Label htmlFor="name">ISBNCode</Label>
                <Input
                  className="mt-2 mb-2"
                  name="isbn_code"
                  placeholder="ISBN Code"
                  value={formState.isbn_code}
                  onChange={handleChange}
                />
                {/* カテゴリ選択（プルダウン） */}
                <Label className="mt-2 mb-2" htmlFor="name">
                  category
                </Label>
                <Select
                  value={formState?.m_category_id ?? ""}
                  onValueChange={(value) => {
                    setFormState({ ...formState, m_category_id: value });
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {data?.libraflow_m_category.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={formState?.m_storage_location_id ?? ""}
                  onValueChange={(value: any) => {
                    setFormState({
                      ...formState,
                      m_storage_location_id: value,
                    });
                  }}
                >
                  <Label htmlFor="name">Storage</Label>
                  <SelectTrigger id="storage id">
                    <SelectValue placeholder="Select a Storage location" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {data?.libraflow_m_storage_location.map((storage: any) => {
                      return (
                        <SelectItem key={storage.id} value={storage.id}>
                          {storage.storage_location_name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Label htmlFor="name">Note</Label>
                <Textarea
                  name="note"
                  placeholder="Note"
                  value={formState.note}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFormState({
                      ...formState,
                      note: event.target.value, // ✅ 正しく値を取得
                    });
                  }}
                />
                {/* 書影取得 with GoogleBooksAPI */}
                <Label>書影</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isURL"
                    checked={isURL}
                    onCheckedChange={() => {
                      setIsURL(!isURL);
                    }}
                  />
                  <Label htmlFor="airplane-mode">
                    image use with URL or Upload file
                  </Label>
                </div>
                <div>
                  {isURL ? (
                    <>
                      <Label htmlFor="airplane-mode">Thumnail here</Label>
                      <div>
                        <Input
                          type="text"
                          value={imgSrc}
                          onChange={(e) => setImgSrc(e.target.value)}
                        />
                        <Button
                          onClick={() => {
                            searchThumnail(searchISBNCode);
                          }}
                        >
                          書影検索
                        </Button>
                      </div>
                      <img
                        className="thumbnail to-50%"
                        src={imgSrc}
                        alt="...image not found"
                        width={"50%"}
                      />
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Label htmlFor="airplane-mode">Upload file here </Label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {previewSrc && (
                        <div>
                          <p className="m-4">選択中の画像プレビュー:</p>
                          <img
                            className="m-4"
                            src={previewSrc}
                            alt="Preview"
                            style={{ maxWidth: "300px" }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={updateLoading}
                  onClick={clickOnSubmit}
                >
                  {updateLoading ? "Updating..." : "Update Book"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {updateError && (
            <p className="text-red-500">Error: {updateError.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BookEditor;
