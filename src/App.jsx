import "./App.css";
import { Home } from "./components/Home";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { Login } from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import NewEventForm from "./components/NewEventForm";

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
          {/* Protected Route for Creating Events */}
          <Route
            path="/new-event"
            element={
              <ProtectedRoute>
                <NewEventForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
