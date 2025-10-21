// // components/Signup.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const Signup = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const { name, email, password } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:3000/api/auth/signup', formData);
//             console.log('Đăng ký thành công!', res.data);
//             // Có thể chuyển hướng người dùng tới trang đăng nhập
//         } catch (err) {
//             console.error('Lỗi đăng ký:', err.response.data.message);
//             alert(`Đăng ký thất bại: ${err.response.data.message}`);
//         }
//     };

//     return (
//         <form onSubmit={onSubmit}>
//             <h2>Đăng Ký</h2>
//             <input type="text" name="name" value={name} onChange={onChange} placeholder="Tên" required />
//             <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
//             <input type="password" name="password" value={password} onChange={onChange} placeholder="Mật khẩu" required />
//             <button type="submit">Đăng Ký</button>
//         </form>
//     );
// };

// export default Signup;
import React, { useState } from 'react';
import api from '../api';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/signup', form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Lỗi khi đăng ký');
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Đăng ký tài khoản</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tên"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br />
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
        <button type="submit">Đăng ký</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}