import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem("apiKey");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (apiKey) => {
    localStorage.setItem("apiKey", apiKey);
    setUser(apiKey);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("apiKey");
    setUser(null);
    // navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
