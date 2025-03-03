import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

// クエリ作成
// 画像のアップロード（insert/update）用ミューテーション
const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImage(
    $file_data: bytea!
    $t_book_id: uuid!
    $is_url: boolean!
  ) {
    insert_libraflow_t_book_image(
      objects: [
        { file_data: $file_data, t_book_id: $t_book_id, is_url: $is_url }
      ]
      on_conflict: {
        constraint: t_book_image_t_book_id_key # 正しい制約名を指定
        update_columns: [file_data]
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

const fetchImageAsBase64 = async (imageUrl: string): Promise<string | null> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("画像の取得エラー:", error);
    return null;
  }
};

// 本体処理--------------------------------------------
const ImageUploadTest: React.FC = () => {
  const [form, setForm] = useState({
    bookId: "",
    bookCode: "",
    uploadData: "",
  });
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [uploadImage] = useMutation(UPLOAD_IMAGE_MUTATION);
  const { data, refetch } = useQuery(GET_BOOK_IMAGE_QUERY, {
    variables: { t_book_id: form.bookId },
  });
  const [imageUrl, setImageURL] = useState("");

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

  const uploadData = (flg: boolean) => {
    // GraphQL で画像アップロード
    if (!flg) {
      uploadImage({
        variables: {
          file_data: `\\x${base64ToHex(form.uploadData)}`, // 修正済みのHEX変換
          t_book_id: form.bookId,
          is_url: false,
        },
      });
    } else {
      uploadImage({
        variables: {
          file_data: imageUrl,
          t_book_id: form.bookId,
          is_url: true,
        },
      });
    }
    refetch(); // アップロード後に画像を再取得
  };

  // 画像データが取得できたら Base64 に変換
  const imageSrc = () => {
    return data?.t_book_image[0]?.file_data
      ? hexToBase64(data.t_book_image[0].file_data)
      : "";
  };

  return (
    <div className="flex items-center flex-col">
      <h2 className="m-4">画像アップロードテスト</h2>
      <div>
        <Label>書籍コード</Label>
        <Input
          className="m-4"
          type="text"
          value={form.bookCode}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, bookCode: e.target.value }));
          }}
        />
      </div>
      <div>
        <Label>bookid</Label>
        <Input
          className="m-4"
          type="text"
          value={form.bookId}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, bookId: e.target.value }));
          }}
        />
      </div>
      <input
        className="m-4"
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
      {imageSrc() !== "" && (
        <div>
          <p>アップロードされた画像:</p>
          <img src={imageSrc()} alt="Uploaded" style={{ maxWidth: "300px" }} />
        </div>
      )}

      <div>
        <Label>image URL</Label>
        <Input
          className="m-4"
          type="text"
          value={imageUrl}
          onChange={(e) => {
            setImageURL(e.target.value);
          }}
        />

        {imageUrl !== "" && (
          <div className="flex items-center mx-auto flex-col">
            <p>アップロードされた画像:</p>
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
          </div>
        )}
      </div>
      <div className="flex-col flex">
        <Button
          className="m-2"
          id="saveFileBtn"
          onClick={() => {
            uploadData(false);
          }}
        >
          ファイルを保存
        </Button>

        <Button
          className="m-2"
          id="saveUrlBtn"
          onClick={() => {
            uploadData(true);
          }}
        >
          Google Books のURLを保存
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadTest;
