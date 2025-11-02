// // components/Login.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const { email, password } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

// // Trong hàm onSubmit của Login.jsx

// const onSubmit = async e => {
//     e.preventDefault();
//     try {
//         const res = await axios.post('http://localhost:3000/api/auth/login', formData);
//         localStorage.setItem('token', res.data.token);
//         alert('Đăng nhập thành công!');
//         window.location.href = '/profile';
//     } catch (err) {
//         // In ra toàn bộ đối tượng lỗi để kiểm tra
//         console.error("CHI TIẾT LỖI:", err); 

//         // Kiểm tra và hiển thị thông báo lỗi một cách an toàn
//         const errorMessage = err.response?.data?.message ?? "Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.";
//         alert(`Đăng nhập thất bại: ${errorMessage}`);
//     }
// };

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









// // frontend/src/components/Login.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // 1. Import hook để điều hướng
// import { jwtDecode } from 'jwt-decode';      // 2. Import thư viện giải mã token

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const { email, password } = formData;
//     const navigate = useNavigate(); // Khởi tạo hook

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:3000/api/auth/login', formData);
            
//             // 3. Lưu token vào localStorage
//             const token = res.data.token;
//             localStorage.setItem('token', token);

//             // 4. 🚀 GIẢI MÃ TOKEN VÀ LƯU VAI TRÒ (ROLE)
//             const decodedUser = jwtDecode(token).user; // Giải mã để lấy payload { user: { id, role } }
//             localStorage.setItem('userRole', decodedUser.role); // Lưu role vào localStorage

//             alert('Đăng nhập thành công!');
            
//             // 5. Điều hướng bằng navigate thay vì window.location.href
//             navigate('/profile'); 
            
//         } catch (err) {
//             console.error("CHI TIẾT LỖI:", err);
//             const errorMessage = err.response?.data?.message ?? "Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.";
//             alert(`Đăng nhập thất bại: ${errorMessage}`);
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








// //4
// //frontend/src/components/Login.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// // ✅ 1. Import thêm 'Link' vào đây
// import { useNavigate, Link } from 'react-router-dom'; 
// import { jwtDecode } from 'jwt-decode';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const { email, password } = formData;
//     const navigate = useNavigate();

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:3000/api/auth/login', formData);
            
//             const token = res.data.token;
//             localStorage.setItem('token', token);

//             const decodedUser = jwtDecode(token).user;
//             localStorage.setItem('userRole', decodedUser.role);

//             alert('Đăng nhập thành công!');
            
//             navigate('/profile'); 
            
//         } catch (err) {
//             console.error("CHI TIẾT LỖI:", err);
//             const errorMessage = err.response?.data?.message ?? "Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.";
//             alert(`Đăng nhập thất bại: ${errorMessage}`);
//         }
//     };

//     return (
//         <form onSubmit={onSubmit}>
//             <h2>Đăng Nhập</h2>
//             <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
//             <input type="password" name="password" value={password} onChange={onChange} placeholder="Mật khẩu" required />
//             <button type="submit">Đăng Nhập</button>

//             {/* ✅ 2. THÊM LINK QUÊN MẬT KHẨU Ở ĐÂY */}
//             <div style={{ marginTop: '15px', textAlign: 'center' }}>
//                 <Link to="/forgot-password">Quên mật khẩu?</Link>
//             </div>
//         </form>
//     );
// };

// export default Login;


// frontend/src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // const onSubmit = async e => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post('http://localhost:3000/api/auth/login', formData);
            
    //         console.log("✅ Response từ server:", res.data); // Thêm dòng này để debug
            
    //         const token = res.data.token;
    //         localStorage.setItem('token', token);

    //         // 🔴 SỬA LỖI Ở ĐÂY:
    //         // Backend trả về user data trong response, không cần decode từ token
    //         const decoded = jwtDecode(token);
    //         localStorage.setItem('userRole', decoded.role); // Lấy role từ token
    //         localStorage.setItem('userData', JSON.stringify(res.data.user)); // Lưu user data từ response

    //         alert('Đăng nhập thành công!');
    //         navigate('/profile'); 
            
    //     } catch (err) {
    //         console.error("CHI TIẾT LỖI:", err);
    //         const errorMessage = err.response?.data?.message ?? "Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.";
    //         alert(`Đăng nhập thất bại: ${errorMessage}`);
    //     }
    // };
    // frontend/src/components/Login.jsx
const onSubmit = async e => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:3000/api/auth/login', formData);
        
        console.log("✅ Response từ server:", res.data);

        const token = res.data.token;
        localStorage.setItem('token', token);
        
        // Lưu thông tin user từ response
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        localStorage.setItem('userRole', res.data.user.role);

        alert('Đăng nhập thành công!');
        console.log("🔄 Đang chuyển hướng đến /profile...");
        
        // Chuyển hướng
        navigate('/profile');
        
    } catch (err) {
        console.error("CHI TIẾT LỖI:", err);
        const errorMessage = err.response?.data?.message ?? "Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.";
        alert(`Đăng nhập thất bại: ${errorMessage}`);
    }
};

    return (
        <form onSubmit={onSubmit}>
            <h2>Đăng Nhập</h2>
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Mật khẩu" required />
            <button type="submit">Đăng Nhập</button>

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/forgot-password">Quên mật khẩu?</Link>
            </div>
        </form>
    );
};

export default Login;