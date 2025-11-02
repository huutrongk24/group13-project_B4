
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // 🧠 Lấy danh sách người dùng
  // UserList.jsx - sửa hàm fetchUsers
const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    console.log('🟡 Token:', token);
    
    const res = await axios.get('http://localhost:3000/api/users', {
      headers: {
        'x-auth-token': token
      }
    });
    
    console.log('✅ Users data received:', res.data);
    setUsers(res.data);
  } catch (err) {
    console.error('❌ Lỗi tải danh sách người dùng:', err);
    console.error('Error response:', err.response?.data);
    
    if (err.response?.status === 403) {
      alert('Bạn không có quyền admin để truy cập trang này!');
    }
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
