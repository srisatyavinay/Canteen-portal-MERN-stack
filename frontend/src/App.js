import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

// import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Navbaruser from "./components/templates/Navbaruser";
import Navbarvendor from "./components/templates/Navbarvendor";
import Login from "./components/common/Login"
import { useState } from 'react';
// import Profile from "./components/users/Profile";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Layout2 = () => {
  return (
    <div>
      <Navbaruser />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Layout3 = () => {
  return (
    <div>
      <Navbarvendor />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  const [mainuser, setLoginUser] = useState({})
  const [mainvendor, setLoginVendor] = useState({})
  const [logintype, setLoginType] = useState(0)
  console.log(logintype);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout logintype={logintype}/>}>
          <Route path="/" element={<Home logintype={logintype}/>} />
          {/* <Route path="users" element={<UsersList />} /> */}
          <Route path="register" element={<Register />} />
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="login" element={<Login setLoginUser={setLoginUser} setLoginVendor={setLoginVendor} setLoginType={setLoginType} />} />
        </Route>
        <Route path="/vendor_dashboard" element={<Layout3 logintype={logintype} setLoginVendor={setLoginVendor} setLoginType={setLoginType}/>}>

        </Route>
        <Route path="/user_dashboard" element={<Layout3 logintype={logintype} setLoginVendor={setLoginVendor} setLoginType={setLoginType}/>}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
