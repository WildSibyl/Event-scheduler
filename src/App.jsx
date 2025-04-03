import "./App.css";
import { Home } from "./components/Home";
import Modal from "./components/Modal";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { Login } from "./Pages/Login";
import Signup from "./Pages/Signup";

/* import { useState } from "react";*/
function App() {
  /* const [addOpen, setAddOpen] = useState(false);*/

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
