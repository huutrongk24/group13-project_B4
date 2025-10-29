import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:3000/reset-password/${token}`, { password });
    alert(res.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input type="password" placeholder="Mật khẩu mới" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Đặt lại mật khẩu</button>
    </form>
  );
}