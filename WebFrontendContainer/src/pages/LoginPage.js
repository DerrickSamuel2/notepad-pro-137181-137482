import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

/**
 * PUBLIC_INTERFACE
 * Login form page for users.
 */
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-section" aria-label="Login Section">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} aria-label="Login form">
        <label htmlFor="login-email">Email:</label>
        <input
          id="login-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="login-password">Password:</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-large" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/register" aria-label="Register link">Register</Link>
        </p>
        {error && <div className="error-message" role="alert">{error}</div>}
      </form>
    </section>
  );
}
