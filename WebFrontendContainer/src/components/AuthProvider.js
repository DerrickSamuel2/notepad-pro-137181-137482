import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

/**
 * PUBLIC_INTERFACE
 * Provides authentication state and helpers throughout the app using React context.
 */
export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load current session status/token at mount
  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          setUser(data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  /**
   * PUBLIC_INTERFACE
   * Sign in to the app using credentials, retrieve token, and update state.
   */
  async function login(email, password) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error("Login failed");
    const { token, user } = await response.json();
    localStorage.setItem("token", token);
    setUser(user);
    setIsAuthenticated(true);
  }

  /**
   * PUBLIC_INTERFACE
   * Register a new user via backend API.
   */
  async function register(name, email, password) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    if (!response.ok) throw new Error("Register failed");
    await login(email, password);
  }

  /**
   * PUBLIC_INTERFACE
   * Logout current user and clear session.
   */
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * Custom hook to use Auth context
 */
export function useAuth() {
  return useContext(AuthContext);
}
