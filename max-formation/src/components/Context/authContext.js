import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserLogin(!!token);
  }, []);

  const login = () => {
    setUserLogin(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserLogin(false);
  };

  return (
    <AuthContext.Provider value={{ userLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);