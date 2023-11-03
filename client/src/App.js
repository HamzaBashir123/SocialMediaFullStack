import { AuthContext } from "./context/AuthContext.js";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Register from "./pages/register/Register.jsx";

import React, { useContext } from "react";
import { Route, Routes ,useNavigate} from "react-router-dom";


function App() {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Register />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/login" element={user ? navigate ('/') :<Login />} />
      <Route path="/register" element={ user ? navigate ('/') : <Register />} />
    </Routes>
  );
}

export default App;
