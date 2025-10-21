// // frontend/src/App.js
// import React, { useState } from "react";
// import UserList from "./components/UserList";
// import AddUser from "./components/AddUser";
// import "./App.css";

// function App() {
//   const [reload, setReload] = useState(false);

//   // Khi thêm user xong, kích hoạt reload lại danh sách
//   const handleUserAdded = () => {
//     setReload(!reload);
//   };

//   return (
//     <div className="App">
//       <h1>Quản lý người dùng</h1>
//       <AddUser onAdded={handleUserAdded} />
//       <UserList key={reload} />
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import UserList from './components/UserList';
import AddUser from './components/AddUser';

function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h2>Group 13 - Authentication Demo</h2>
        <nav>
          <Link to="/signup" style={{ marginRight: 10 }}>Đăng ký</Link>
          <Link to="/login" style={{ marginRight: 10 }}>Đăng nhập</Link>
          <Link to="/users">Danh sách User</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/add" element={<AddUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;