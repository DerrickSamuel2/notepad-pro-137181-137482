import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

/**
 * PUBLIC_INTERFACE
 * Registration page for new users.
 */
export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (e) {
      setError("Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-section" aria-label="Register Section">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} aria-label="Registration form">
        <label htmlFor="register-name">Name:</label>
        <input
          id="register-name"
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="register-email">Email:</label>
        <input
          id="register-email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="register-password">Password:</label>
        <input
          id="register-password"
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-large" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p>
          Already have an account?{" "}
          <Link to="/login" aria-label="Login link">Login</Link>
        </p>
        {error && <div className="error-message" role="alert">{error}</div>}
      </form>
    </section>
  );
}
