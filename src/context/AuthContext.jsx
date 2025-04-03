import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
