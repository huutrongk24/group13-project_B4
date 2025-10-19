// frontend/src/App.js
import React, { useState } from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import "./App.css";

function App() {
  const [reload, setReload] = useState(false);

  // Khi thêm user xong, kích hoạt reload lại danh sách
  const handleUserAdded = () => {
    setReload(!reload);
  };

  return (
    <div className="App">
      <h1>Quản lý người dùng</h1>
      <AddUser onAdded={handleUserAdded} />
      <UserList key={reload} />
    </div>
  );
}

export default App;