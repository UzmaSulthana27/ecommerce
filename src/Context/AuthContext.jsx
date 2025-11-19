import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api"; // axios instance (see next)
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // load from localStorage if present (dev). For better security store access token in memory.
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // set axios header when token changes
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken); // dev only
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      // Optionally decode token to get user info or call /me endpoint
      // setUser({ ... })
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("accessToken");
      setUser(null);
    }
    setLoading(false);
  }, [accessToken]);

  const login = (token, userData) => {
    setAccessToken(token);
    if (userData) setUser(userData);
  };

  const logout = async () => {
    try {
      // If backend supports logout endpoint which clears refresh cookie
      await api.post("/auth/logout");
    } catch (err) {
      // ignore
    }
    setAccessToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
