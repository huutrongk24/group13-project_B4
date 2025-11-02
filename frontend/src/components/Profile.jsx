

// frontend/src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // State cho avatar
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                alert('Vui lòng đăng nhập để truy cập trang này.');
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get('http://localhost:3000/api/users/profile', {
                    headers: { 'x-auth-token': token }
                });
                console.log("✅ Profile data từ API:", res.data);
                setUser(res.data);
                setName(res.data.name || '');
                
                // Nếu có avatar, tạo preview URL
                if (res.data.avatar) {
                    setPreviewUrl(`http://localhost:3000${res.data.avatar}`);
                }
            } catch (err) {
                console.error('Lỗi lấy profile từ API:', err);
                // Fallback: sử dụng data từ localStorage
                const userData = localStorage.getItem('userData');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                    setName(parsedUser.name || '');
                } else {
                    setError('Không thể tải thông tin người dùng.');
                }
            }
        };
        fetchProfile();
    }, [navigate]);

    // Xử lý khi chọn file
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Tạo preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // Upload avatar
    const handleAvatarUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Vui lòng chọn file ảnh!');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.put('http://localhost:3000/api/users/profile/avatar', 
                formData, 
                {
                    headers: {
                        'x-auth-token': token,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            
            alert(res.data.message);
            // Cập nhật user với avatar mới
            setUser(prev => ({ 
                ...prev, 
                avatar: res.data.avatarUrl 
            }));
            // Cập nhật preview URL
            setPreviewUrl(`http://localhost:3000${res.data.avatarUrl}`);
            
            // Reset file input
            setFile(null);
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';
            
        } catch (err) {
            console.error('Lỗi upload avatar:', err);
            alert('Upload thất bại: ' + (err.response?.data?.message || 'Lỗi server'));
        } finally {
            setUploading(false);
        }
    };

    // Cập nhật tên
    const handleNameUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.put('http://localhost:3000/api/users/profile', 
                { name }, 
                {
                    headers: { 'x-auth-token': token }
                }
            );
            setUser(res.data);
            // Cập nhật localStorage
            localStorage.setItem('userData', JSON.stringify(res.data));
            alert('Cập nhật tên thành công!');
        } catch (err) {
            console.error('Lỗi cập nhật tên:', err);
            alert('Cập nhật tên thất bại: ' + (err.response?.data?.message || 'Lỗi server'));
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!user) return <div>Không có thông tin người dùng.</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Trang Cá Nhân</h2>
            
            {/* Phần Avatar */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ 
                    width: '150px', 
                    height: '150px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    border: '3px solid #ddd',
                    backgroundColor: '#f5f5f5',
                    margin: '0 auto 15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img 
                        src={previewUrl || (user.avatar ? `http://localhost:3000${user.avatar}` : '/default-avatar.png')} 
                        alt="Avatar" 
                        width="150" 
                        height="150"
                        style={{ 
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%'
                        }}
                        onError={(e) => {
                            e.target.src = '/default-avatar.png';
                        }}
                    />
                </div>
                
                <form onSubmit={handleAvatarUpload} style={{ marginTop: '15px' }}>
                    <div>
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            accept="image/*"
                            style={{ margin: '10px 0' }}
                            disabled={uploading}
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={uploading || !file}
                        style={{ 
                            padding: '8px 16px',
                            backgroundColor: uploading ? '#ccc' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: uploading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {uploading ? 'Đang tải lên...' : 'Tải lên Avatar'}
                    </button>
                </form>
            </div>

            {/* Thông tin user */}
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                <p><strong>ID:</strong> {user.id || user._id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Vai trò:</strong> {user.role}</p>
            </div>

            {/* Form cập nhật tên */}
            <form onSubmit={handleNameUpdate} style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label><strong>Tên:</strong></label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                        placeholder="Nhập tên của bạn"
                        style={{ 
                            marginLeft: '10px', 
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            width: '200px'
                        }}
                    />
                </div>
                <button 
                    type="submit"
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Cập nhật tên
                </button>
            </form>

            {/* Nút đăng xuất */}
            <button 
                onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userData');
                    localStorage.removeItem('userRole');
                    navigate('/login');
                }}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                }}
            >
                Đăng xuất
            </button>
        </div>
    );
};

export default Profile;