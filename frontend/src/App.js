import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Navbaruser from "./components/templates/Navbaruser";
import Navbarvendor from "./components/templates/Navbarvendor";
import Login from "./components/common/Login";
import Vprofile from "./components/vendors/Vprofile"
import Veditprofile from "./components/vendors/Veditprofile"
import NewItem from "./components/vendors/NewItem"
import Vdashboard from "./components/vendors/Vdashboard"
import Orders from "./components/vendors/Orders"
import Statistics from "./components/vendors/Statistics"
import EditItem from "./components/vendors/EditItem"
import Udashboard from "./components/users/Udashboard"
import Uprofile from "./components/users/Uprofile"
import Ueditprofile from "./components/users/Ueditprofile"
import Uorders from "./components/users/Uorders";
// import { useState } from 'react';
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
      <Navbarvendor />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Layout3 = () => {
  return (
    <div>
      <Navbaruser />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  // const [mainuser, setLoginUser] = useState({})
  // const [mainvendor, setLoginVendor] = useState({})
  // const [logintype, setLoginType] = useState(0)
  // console.log(logintype);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          {/* <Route path="users" element={<UsersList />} /> */}
          <Route path="register" element={<Register />} />
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="login" element={<Login/>} />
        </Route>
        <Route path="/vendor_dashboard" element={<Layout2/>}>
          <Route index element={<Vdashboard/>} />
          <Route path="vendor_profile" element={<Vprofile/>} />
          <Route path="edit_vendor_profile" element={<Veditprofile/>} />
          <Route path="new_item" element={<NewItem/>} />
          <Route path="edit_item" element={<EditItem/>} />
          <Route path="statistics" element={<Statistics/>} />
          <Route path="orders" element={<Orders/>} />
        </Route>
        <Route path="/user_dashboard" element={<Layout3/>}>
          <Route index element={<Udashboard/>} />
          <Route path="user_profile" element={<Uprofile/>} />
          <Route path="edit_user_profile" element={<Ueditprofile/>} />
          <Route path="my_orders" element={<Uorders/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
