import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

// import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Navbaruser from "./components/templates/Navbaruser";
import Navbarvendor from "./components/templates/Navbarvendor";
import Login from "./components/common/Login"
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="users" element={<UsersList />} /> */}
          <Route path="register" element={<Register />} />
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/users" element={<Layout2 />}>
          
        </Route>
        <Route path="/vendors" element={<Layout3 />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
