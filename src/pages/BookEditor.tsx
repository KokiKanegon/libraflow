import { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
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
import { Switch } from "../components/ui/switch";
import {
  q_GET_BOOK_BY_CODE,
  q_GET_BOOK_IMAGE,
  q_INSERT_BOOK,
  q_UPDATE_BOOK,
  q_UPLOAD_IMAGE_MUTATION,
} from "../gql/querys";
import { UUIDTypes, v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
// import { valueFromAST } from "graphql";
// import { graphql } from "./gql/gql";

const GET_BOOK_BY_CODE = gql(q_GET_BOOK_BY_CODE);
const GET_BOOK_IMAGE = gql(q_GET_BOOK_IMAGE);
const UPDATE_BOOK = gql(q_UPDATE_BOOK);
const INSERT_BOOK = gql(q_INSERT_BOOK);
const UPLOAD_IMAGE_MUTATION = gql(q_UPLOAD_IMAGE_MUTATION);

const getGoogleBooksData = async (isbn_code: string) => {
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
  const navigate = useNavigate();

  const { book_id_on_url } = useParams();
  const [searchISBNCode, setSearchISBNCode] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [isURL, setIsURL] = useState<boolean>(true);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const [formBook, setFormBook] = useState<{
    id: string;
    title: string;
    author: string;
    book_code: string;
    isbn_code: string;
    m_category_id: string | null;
    m_storage_location_id: string | null;
    note: string;
    publisher: string;
    publication_date: string;
  }>({
    id: "",
    title: "",
    author: "",
    book_code: "",
    isbn_code: "",
    m_category_id: null,
    m_storage_location_id: null,
    note: "",
    publisher: "",
    publication_date: "",
  });

  const [formImage, setFormImage] = useState({
    id: "",
    uploadData: "",
    bookId: "",
    isURL: false,
  });

  // 初回レンダ時の処理用
  let isFirst = true;

  // 書籍データを取得
  const { data, loading, error } = useQuery(GET_BOOK_BY_CODE, {
    variables: { id: book_id_on_url ?? "" },
  });
  // フォームのアップデート処理
  useEffect(() => {
    if (data && data.libraflow_t_book.length > 0) {
      setFormBook({
        ...data.libraflow_t_book[0],
      });
    }
  }, [data]);

  // 書籍の画像データを取得
  const { data: imgData, refetch: refetchImage } = useQuery(GET_BOOK_IMAGE, {
    variables: { t_book_id: formBook.id ?? "" },
  });

  // 書き出し処理
  const [uploadImage] = useMutation(UPLOAD_IMAGE_MUTATION);
  const [updateBook, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_BOOK);
  const [createBook] = useMutation(INSERT_BOOK);
  // 書籍情報のフォーム管理
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormBook({ ...formBook, [name]: value });
  };

  // ISBNコード検索用のフォーム管理
  const handleChangeISBN: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSearchISBNCode(value);
  };

  // ISBNコード検索
  const clickOnSearchISNBCode = async (isThumnail: boolean, code: string) => {
    try {
      const data_bookinfo = await getGoogleBooksData(code.replace(/-/g, ""));

      const book = data_bookinfo?.items?.[0]?.volumeInfo;
      if (!book) {
        console.warn("書籍情報が見つかりませんでした。");
        return;
      }

      if (isThumnail) {
        book.imageLinks.thumbnail ? setImgSrc(book.imageLinks.thumbnail) : null;
        return;
      }
      // 📌 Fix: Ensure `yyyy-MM-dd` format by appending "-01" if needed
      let publicationDate = book.publishedDate || "";
      if (/^\d{4}-\d{2}$/.test(publicationDate)) {
        publicationDate += "-01"; // Convert "yyyy-MM" to "yyyy-MM-01"
      }

      setFormBook((prev) => ({
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
    } catch (error) {
      console.error("書籍情報の取得に失敗しました:", error);
    }
  };

  // ファイルの選択・アップロード処理
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
      setFormImage((prev) => ({
        ...prev,
        uploadData: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  // この制御をうまくやる方法を知りたい
  useEffect(() => {
    if (isFirst) {
      refetchImage();

      if (imgData && imgData.libraflow_t_book_image.length > 0) {
        const form2 = imgData.libraflow_t_book_image[0];

        setFormImage((prev) => ({
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

  // これ無くしたい
  useEffect(() => {
    setIsURL(formImage.isURL);
    console.log(formImage);
  }, [formImage.isURL]);

  const clickOnSubmit: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      await Promise.all([
        updateBook({
          variables: { ...formBook },
        }),
        uploadImage({
          variables: {
            file_data: isURL
              ? imgSrc
              : `\\x${base64ToHex(formImage.uploadData)}`,
            t_book_id: formBook.id,
            is_url: isURL,
          },
        }),
      ]);
      alert("Book updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const pageInit = () => {
    navigate(`/edit/new_book`);
    setFormBook({
      id: "",
      title: "",
      author: "",
      book_code: "",
      isbn_code: "",
      m_category_id: null,
      m_storage_location_id: null,
      note: "",
      publisher: "",
      publication_date: "",
    });
    setFormImage({
      id: "",
      uploadData: "",
      bookId: "",
      isURL: false,
    });
    setImgSrc("");
  };

  const clickOnCreate = async () => {
    const newBookId = uuidv4(); // 事前に UUID を生成
    console.log("Generated UUID:", newBookId);

    setFormBook((prev) => ({ ...prev, id: newBookId }));

    console.log({ ...formBook, id: newBookId });

    // createBook の実行
    await createBook({
      variables: { ...formBook, id: newBookId },
    });

    console.log("Book created");

    console.log(formImage);

    // 画像アップロードの実行
    await uploadImage({
      variables: {
        file_data: isURL ? imgSrc : `\\x${base64ToHex(formImage.uploadData)}`,
        t_book_id: newBookId, // 事前に生成した UUID を使用
        is_url: isURL,
      },
    });

    alert("Book created successfully!");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search and Edit Book</h1>

      <Button
        onClick={() => {
          pageInit();
        }}
      >
        New book register
      </Button>

      <Button
        onClick={() => {
          navigate("/bookinfo/");
        }}
      >
        Back book info
      </Button>

      {/* 編集フォーム */}
      {formBook && (
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
                <Button
                  className="m-4"
                  onClick={() => {
                    clickOnSearchISNBCode(false, searchISBNCode);
                  }}
                >
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
                  value={formBook.book_code}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="name">Title</Label>
                <Input
                  className="mt-2 mb-2"
                  name="title"
                  placeholder="Title"
                  value={formBook.title}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="name">Author</Label>
                <Input
                  className="mt-2 mb-2"
                  name="author"
                  placeholder="Author"
                  value={formBook.author}
                  onChange={handleChange}
                  required
                />
                <Label htmlFor="name">PublicationDate</Label>
                <Input
                  className="mt-2 mb-2"
                  type="date"
                  name="publication_date"
                  placeholder="Publication date"
                  value={formBook.publication_date}
                  onChange={handleChange}
                />
                <Label htmlFor="name">Publisher</Label>
                <Input
                  className="mt-2 mb-2"
                  name="publisher"
                  placeholder="Publiser"
                  value={formBook.publisher}
                  onChange={handleChange}
                />
                <Label htmlFor="name">ISBNCode</Label>
                <Input
                  className="mt-2 mb-2"
                  name="isbn_code"
                  placeholder="ISBN Code"
                  value={formBook.isbn_code}
                  onChange={handleChange}
                />
                {/* カテゴリ選択（プルダウン） */}
                <Label className="mt-2 mb-2" htmlFor="name">
                  category
                </Label>
                <Select
                  value={formBook?.m_category_id ?? ""}
                  onValueChange={(value) => {
                    setFormBook({ ...formBook, m_category_id: value });
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
                  value={formBook?.m_storage_location_id ?? ""}
                  onValueChange={(value: any) => {
                    setFormBook({
                      ...formBook,
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
                  value={formBook.note}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFormBook({
                      ...formBook,
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
                            clickOnSearchISNBCode(true, formBook.isbn_code);
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
                  Update Book
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    clickOnCreate();
                  }}
                >
                  Creat new book data
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
