// frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("🟡 Fetching users...");
            console.log("Token:", token);
            
            const res = await axios.get('http://localhost:3000/api/users', {
                headers: { 'x-auth-token': token }
            });
            
            console.log("✅ Users fetched successfully:", res.data);
            setUsers(res.data);
            setError('');
        } catch (err) {
            console.error("🔴 Error fetching users:", err);
            console.error("Error details:", err.response);
            setError(err.response?.data?.message || 'Không thể tải danh sách người dùng.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn XÓA người dùng này không?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/users/${userId}`, {
                    headers: { 'x-auth-token': token }
                });
                alert('Xóa thành công!');
                fetchUsers();
            } catch (err) {
                alert(err.response?.data?.message || 'Xóa thất bại.');
            }
        }
    };

    const handleResetPassword = async (email) => {
        if (window.confirm(`Reset mật khẩu cho ${email}?`)) {
            try {
                const res = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
                alert(res.data.message);
            } catch (err) {
                alert(err.response?.data?.message || 'Gửi email thất bại.');
            }
        }
    };

    if (loading) return <div>Đang tải danh sách người dùng...</div>;
    if (error) return <div style={{ color: 'red' }}>Lỗi: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Quản lý người dùng</h2>
            {users.length === 0 ? (
                <p>Không có người dùng nào.</p>
            ) : (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                            <th style={{ padding: '10px' }}>Tên</th>
                            <th style={{ padding: '10px' }}>Email</th>
                            <th style={{ padding: '10px' }}>Vai trò</th>
                            <th style={{ padding: '10px' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td style={{ padding: '10px' }}>{user.name}</td>
                                <td style={{ padding: '10px' }}>{user.email}</td>
                                <td style={{ padding: '10px' }}>{user.role}</td>
                                <td style={{ padding: '10px' }}>
                                    <button 
                                        onClick={() => handleDelete(user._id)} 
                                        style={{
                                            marginRight: '5px', 
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Xóa
                                    </button>
                                    <button 
                                        onClick={() => handleResetPassword(user.email)}
                                        style={{
                                            backgroundColor: '#ffc107',
                                            color: 'black',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Reset Mật khẩu
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;