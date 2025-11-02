// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;





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





// // // frontend/src/App.js
// // cd frontend
// // npm install react-router-dom
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar'; // <-- Import Navbar
// import Login from './components/Login';
// import Signup from './components/Signup';
// //import Profile from './components/Profile';
// // ... import các component khác

// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* <-- Đặt Navbar ở đây để nó luôn hiển thị */}
//       <div className="container">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* <Route path="/profile" element={<Profile />} /> */}
//           {/* Các Route khác */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;






// // // frontend/src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar'; // <-- Import Navbar
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Profile from './components/Profile';
// // ... import các component khác

// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* <-- Đặt Navbar ở đây để nó luôn hiển thị */}
//       <div className="container">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/profile" element={<Profile />} />
//           {/* Các Route khác */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;







// // // frontend/src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar'; // <-- Import Navbar
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Profile from './components/Profile';
// // frontend/src/App.js
// import AdminDashboard from './components/AdminDashboard';

// // ... import các component khác

// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* <-- Đặt Navbar ở đây để nó luôn hiển thị */}
//       <div className="container">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/admin/users" element={<AdminDashboard />} />
//           {/* Các Route khác */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }


// export default App;






//4
// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // <-- Import Navbar
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
// frontend/src/App.js
import AdminDashboard from './components/AdminDashboard';

// ... import các component khác

function App() {
  return (
    <Router>
      <Navbar /> {/* <-- Đặt Navbar ở đây để nó luôn hiển thị */}
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Các Route khác */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;