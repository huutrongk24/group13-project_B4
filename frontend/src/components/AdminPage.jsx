import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token"); // token lưu sau khi login

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      alert("Bạn không có quyền truy cập!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xóa người dùng này?")) {
      await axios.delete(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-page">
      <h2>Danh sách người dùng (Admin)</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}