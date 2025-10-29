// import axios from "axios";
// import { useState } from "react";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post("http://localhost:3000/forgot-password", { email });
//     alert(res.data.message);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Forgot Password</h2>
//       <input type="email" placeholder="Nhập email" onChange={(e) => setEmail(e.target.value)} />
//       <button type="submit">Gửi link reset</button>
//     </form>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/forgot-password", { email });
      setMessage(res.data.message || "Đã gửi email khôi phục mật khẩu");
    } catch (err) {
      setMessage("Lỗi: Email không tồn tại hoặc server lỗi");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", textAlign: "center" }}>
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Gửi yêu cầu
        </button>
      </form>
      <p style={{ marginTop: "10px", color: "green" }}>{message}</p>
    </div>
  );
}