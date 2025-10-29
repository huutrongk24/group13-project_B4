import axios from "axios";
import { useState } from "react";

export default function UploadAvatar() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await axios.post("http://localhost:3000/upload-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert(res.data.message);
  };

  return (
    <form onSubmit={handleUpload}>
      <h2>Upload Avatar</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Tải lên</button>
    </form>
  );
}