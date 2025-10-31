import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
const [authData, setAuthData] = useState(() => {
  const savedUser = localStorage.getItem("bwf-user");
  return savedUser ? JSON.parse(savedUser) : null;
});

  // 🔹 Funkcja ustawiająca usera (i zapisująca w localStorage)
  const setAuth = (newUser) => {
    if (newUser) {
      localStorage.setItem("bwf-user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("bwf-user");
    }
    setAuthData(newUser);
  };

  return (
    <AuthContext.Provider value={{ authData, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
