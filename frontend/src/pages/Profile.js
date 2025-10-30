import React, { useEffect, useState } from "react";
import axios from "../api"; // đã cấu hình sẵn baseURL = http://localhost:3000/api
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Lấy thông tin người dùng khi load trang
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setMessage("Lỗi khi lấy thông tin người dùng");
      }
    };
    if (token) fetchProfile();
  }, [token]);

  // Upload avatar lên backend (đưa lên Cloudinary)
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post("/upload-avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser((prev) => ({ ...prev, avatar: res.data.avatar }));
      setMessage("Tải avatar thành công!");
    } catch (err) {
      console.error(err);
      setMessage("Lỗi khi tải avatar lên");
    }
  };

  // Gửi cập nhật thông tin user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "/profile",
        { ...user, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Cập nhật thành công!");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Lỗi khi cập nhật thông tin");
    }
  };

  return (
  <div style={{ maxWidth: "500px", margin: "40px auto" }}>
    <h2>Thông tin cá nhân</h2>
    {message && <p style={{ color: "green" }}>{message}</p>}

    {user.avatar ? (
      <img
        src={user.avatar}
        alt="avatar"
        width="120"
        height="120"
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #ccc",
          marginBottom: "15px",
        }}
      />
    ) : (
      <p>Chưa có ảnh đại diện</p>
    )}

    <div style={{ marginBottom: "15px" }}>
      <label>Chọn ảnh đại diện mới:</label>
      <input type="file" accept="image/*" onChange={handleAvatarUpload} />
    </div>

    <form onSubmit={handleSubmit}>
      <div>
        <label>Tên:</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      <div>
        <label>Mật khẩu mới (tuỳ chọn):</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Cập nhật thông tin</button>
    </form>
  </div>
);
};

export default Profile;