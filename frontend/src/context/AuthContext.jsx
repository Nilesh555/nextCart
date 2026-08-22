import { createContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { formToJSON } from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    getProfile()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Profile error:", error);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};