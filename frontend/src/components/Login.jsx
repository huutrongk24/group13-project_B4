// // components/Login.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const { email, password } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:3000/api/auth/login', formData);
//             // Lưu token vào localStorage
//             localStorage.setItem('token', res.data.token);
//             alert('Đăng nhập thành công!');
//             // Chuyển hướng đến trang profile hoặc trang chính
//             window.location.href = '/profile'; // Ví dụ chuyển hướng đơn giản
//         } catch (err) {
//             console.error('Lỗi đăng nhập:', err.response.data.message);
//             alert(`Đăng nhập thất bại: ${err.response.data.message}`);
//         }
//     };

//     return (
//         <form onSubmit={onSubmit}>
//             <h2>Đăng Nhập</h2>
//             <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
//             <input type="password" name="password" value={password} onChange={onChange} placeholder="Mật khẩu" required />
//             <button type="submit">Đăng Nhập</button>
//         </form>
//     );
// };

// export default Login;

// const handleLogout = () => {
//     localStorage.removeItem('token');
//     alert('Đã đăng xuất!');
//     window.location.href = '/login';
// };
import React, { useState } from 'react';
import api from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', form);
      localStorage.setItem('token', res.data.token);
      setMsg('Đăng nhập thành công!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Lỗi khi đăng nhập');
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Đăng nhập</h3>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br />
        <input
          placeholder="Mật khẩu"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><br />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}