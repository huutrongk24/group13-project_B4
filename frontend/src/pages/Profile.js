import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [password, setPassword] = useState(""); // nếu muốn đổi mật khẩu
  const [message, setMessage] = useState("");

  // Lấy token từ localStorage
  const token = localStorage.getItem("token");

  // Lấy thông tin user khi trang load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setMessage("Lỗi khi lấy thông tin");
      }
    };
    fetchProfile();
  }, [token]);

  // Handle submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "/api/profile",
        { ...user, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Lỗi khi cập nhật");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
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
          <label>Avatar URL:</label>
          <input
            type="text"
            value={user.avatar || ""}
            onChange={(e) => setUser({ ...user, avatar: e.target.value })}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;