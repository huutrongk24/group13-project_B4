// import React, { useState, useEffect } from "react";

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);

//   // Lấy danh sách user từ backend
//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("/api/users");
//       const data = await res.json();
//       setUsers(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Bắt đầu chỉnh sửa user
//   const handleEdit = (user) => {
//     setEditingUser({ ...user, password: "" }); // mặc định password trống
//   };

//   // Lưu thông tin user (cập nhật backend)
//   const handleSave = async (user) => {
//     try {
//       await fetch(`/api/users/${user._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });
//       setEditingUser(null);
//       fetchUsers(); // tải lại danh sách
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Xóa user
//   const handleDelete = async (id) => {
//     if (window.confirm("Bạn có chắc muốn xóa user này?")) {
//       try {
//         await fetch(`/api/users/${id}`, { method: "DELETE" });
//         fetchUsers();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Danh sách User</h2>
//       <ul>
//         {users.map((u) => (
//           <li key={u._id} style={{ marginBottom: "10px" }}>
//             {editingUser && editingUser._id === u._id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editingUser.name}
//                   onChange={(e) =>
//                     setEditingUser({ ...editingUser, name: e.target.value })
//                   }
//                   placeholder="Tên"
//                   style={{ marginRight: "5px" }}
//                 />
//                 <input
//                   type="email"
//                   value={editingUser.email}
//                   onChange={(e) =>
//                     setEditingUser({ ...editingUser, email: e.target.value })
//                   }
//                   placeholder="Email"
//                   style={{ marginRight: "5px" }}
//                 />
//                 <input
//                   type="password"
//                   value={editingUser.password}
//                   onChange={(e) =>
//                     setEditingUser({ ...editingUser, password: e.target.value })
//                   }
//                   placeholder="Mật khẩu mới"
//                   style={{ marginRight: "5px" }}
//                 />
//                 <button onClick={() => handleSave(editingUser)}>💾 Lưu</button>
//                 <button
//                   onClick={() => setEditingUser(null)}
//                   style={{ marginLeft: "5px" }}
//                 >
//                   ❌ Hủy
//                 </button>
//               </>
//             ) : (
//               <>
//                 <strong>{u.name}</strong> - {u.email}
//                 <button
//                 onClick={() => handleEdit(u)}
//                   style={{ marginLeft: "10px" }}
//                 >
//                   ✏ Sửa
//                 </button>
//                 <button
//                   onClick={() => handleDelete(u._id)}
//                   style={{ marginLeft: "5px", color: "red" }}
//                 >
//                   🗑 Xóa
//                 </button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // 🧠 Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users'); // ✅ Sửa route
      setUsers(res.data);
    } catch (err) {
      console.error('❌ Lỗi tải danh sách người dùng:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🗑 Xóa người dùng
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa người dùng này không?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`); // ✅ Sửa route
      setUsers(users.filter(u => u._id !== id));
      alert('✅ Xóa thành công!');
    } catch (err) {
      console.error('❌ Lỗi khi xóa người dùng:', err);
      if (err.response && err.response.status === 404)
        alert('Người dùng không tồn tại!');
      else
        alert('Không thể xóa người dùng!');
    }
  };

  // ✏ Bắt đầu sửa
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  // 💾 Lưu sau khi sửa
  const handleSave = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/users/${id}`, { // ✅ Sửa route
        name: editName,
        email: editEmail,
      });
      setUsers(users.map(u => (u._id === id ? res.data : u)));
      setEditingUser(null);
      alert('✅ Cập nhật thành công!');
    } catch (err) {
      console.error('❌ Lỗi khi cập nhật:', err);
      if (err.response && err.response.status === 404)
        alert('Người dùng không tồn tại!');
      else
        alert('Không thể cập nhật!');
    }
  };

  return (
    <div style={{ width: '500px', margin: 'auto', textAlign: 'left' }}>
      <h2>📋 Danh sách người dùng</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((u) => (
          <li
            key={u._id}
            style={{
              marginBottom: '10px',
              borderBottom: '1px solid #ccc',
              paddingBottom: '6px',
            }}
          >
            {editingUser === u._id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Tên"
                />
                <input
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="Email"
                />
                <button onClick={() => handleSave(u._id)}>💾 Lưu</button>
                <button onClick={() => setEditingUser(null)}>❌ Hủy</button>
              </>
            ) : (
              <>
                <strong>{u.name}</strong> - {u.email}
                <button
                  onClick={() => handleEdit(u)}
                  style={{ marginLeft: '10px' }}
                >
                  ✏ Sửa
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  style={{ marginLeft: '5px', color: 'red' }}
                >
                  🗑 Xóa
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}