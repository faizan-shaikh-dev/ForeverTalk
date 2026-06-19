import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await API.post("/auth/login", { username, password });
      const { token, userId, username: resUsername } = response.data;
      const userData = { token, userId, username: resUsername };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Welcome back to ForeverTalk!");
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid credentials. Please try again.";
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const signUp = async (username, password) => {
    try {
      const response = await API.post("/auth/register", { username, password });
      toast.success("Registration successful! Please log in.");
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed. Try a different username.";
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully.");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
