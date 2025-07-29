const BASE = process.env.REACT_APP_API_URL;

/**
 * Utility to get the auth token from storage.
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * PUBLIC_INTERFACE
 * NoteAPI: client-side API for notes/folders/tags.
 */
export const NoteAPI = {
  async getNotes() {
    const res = await fetch(`${BASE}/notes`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to fetch notes");
    return await res.json();
  },

  async getNote(noteId) {
    const res = await fetch(`${BASE}/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to fetch note");
    return await res.json();
  },

  async createNote(data) {
    const res = await fetch(`${BASE}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Create note failed");
    return await res.json();
  },

  async updateNote(noteId, data) {
    const res = await fetch(`${BASE}/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Update note failed");
    return await res.json();
  },

  async deleteNote(noteId) {
    const res = await fetch(`${BASE}/notes/${noteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Delete failed");
    return true;
  },

  async getFolders() {
    const res = await fetch(`${BASE}/folders`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to fetch folders");
    return await res.json();
  },

  async getTags() {
    const res = await fetch(`${BASE}/tags`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to fetch tags");
    return await res.json();
  },
};
