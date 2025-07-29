import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

/**
 * Accessible navigation bar for Notepad Pro
 */
// PUBLIC_INTERFACE
export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div>
        <Link to="/" className="navbar-brand" aria-label="Notepad Pro Home">
          <strong>Notepad Pro</strong>
        </Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/" aria-label="Notes">Notes</Link>
            <Link to="/profile" aria-label="Profile">Profile</Link>
            <span aria-label="Current user" className="navbar-user">
              {user?.name || user?.email}
            </span>
            <button className="btn btn-nav" onClick={handleLogout} aria-label="Logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" aria-label="Login">Login</Link>
            <Link to="/register" aria-label="Register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
