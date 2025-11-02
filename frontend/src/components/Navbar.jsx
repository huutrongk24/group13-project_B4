// // src/components/Navbar.jsx

// import React from 'react';

// const Navbar = () => {
//   // Lấy token từ localStorage để kiểm tra trạng thái đăng nhập
//   const token = localStorage.getItem('token');

//   // Đây chính là hàm đăng xuất của bạn
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     alert('Đã đăng xuất!');
//     // Chuyển hướng người dùng về trang đăng nhập
//     window.location.href = '/login'; 
//   };

//   return (
//     <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', backgroundColor: '#f0f0f0' }}>
//       <a href="/">Trang chủ</a>
      
//       {/* Sử dụng toán tử 3 ngôi để hiển thị nút bấm tùy theo trạng thái đăng nhập */}
//       {token ? (
//         // Nếu đã có token (đã đăng nhập)
//         <>
//           <a href="/profile">Hồ sơ</a>
//           <button onClick={handleLogout}>Đăng xuất</button>
//         </>
//       ) : (
//         // Nếu chưa có token (chưa đăng nhập)
//         <>
//           <a href="/login">Đăng nhập</a>
//           <a href="/signup">Đăng ký</a>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;








// src/components/Navbar.jsx

import React from 'react';
// 1. Import Link và useNavigate để điều hướng theo chuẩn React
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // 2. Lấy cả token và vai trò của người dùng từ localStorage
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const isLoggedIn = !!token; // Biến boolean để kiểm tra đăng nhập

    // 3. Cập nhật hàm đăng xuất
    const handleLogout = () => {
        // Xóa cả token và vai trò người dùng
        localStorage.removeItem('token');
        localStorage.removeItem('userRole'); // Quan trọng!

        alert('Bạn đã đăng xuất thành công!');
        
        // Dùng navigate để chuyển trang mà không cần tải lại
        navigate('/login');
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: '#333',
            color: 'white'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
                MyApp
            </Link>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* 4. Sử dụng Link thay cho thẻ <a> */}
                {isLoggedIn ? (
                    // Nếu đã đăng nhập
                    <>
                        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
                            Hồ sơ
                        </Link>

                        {/* 🚀 CHỈ HIỂN THỊ LINK NÀY NẾU USER LÀ ADMIN */}
                        {userRole === 'admin' && (
                            <Link to="/admin/users" style={{ color: 'yellow', textDecoration: 'none' }}>
                                Quản lý Users
                            </Link>
                        )}

                        <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    // Nếu chưa đăng nhập
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                            Đăng nhập
                        </Link>
                        <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
                            Đăng ký
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;