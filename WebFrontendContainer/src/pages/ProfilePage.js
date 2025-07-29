import React, { useState } from "react";
import { useAuth } from "../components/AuthProvider";

/**
 * PUBLIC_INTERFACE
 * User profile management: view and update basic info.
 */
export default function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState("");

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setUpdated("");
    // Only name for demo, you can extend to email etc.
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      setUpdated("Profile updated!");
      setEditing(false);
      // No context update for brevity
    } catch (e) {
      setError("Unable to update profile.");
    }
  }

  if (!user) return <div>No user data.</div>;

  return (
    <section className="profile-section" aria-label="Profile Section">
      <h1>Profile</h1>
      <form onSubmit={handleSave} aria-label="Profile form">
        <label htmlFor="profile-name">Name:</label>
        <input
          id="profile-name"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={!editing}
        />
        <label>Email:</label>
        <input value={user.email} disabled aria-label="Email (read-only)" />
        {editing ? (
          <button className="btn" type="submit">
            Save
          </button>
        ) : (
          <button className="btn" onClick={(e) => { e.preventDefault(); setEditing(true); }}>
            Edit
          </button>
        )}
      </form>
      {error && <div className="error-message" role="alert">{error}</div>}
      {updated && <div className="success-message" role="status">{updated}</div>}
    </section>
  );
}
