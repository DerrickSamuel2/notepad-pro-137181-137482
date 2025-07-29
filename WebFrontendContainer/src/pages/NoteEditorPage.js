import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NoteAPI } from "../services/noteApi";
import { useAuth } from "../components/AuthProvider";

/**
 * PUBLIC_INTERFACE
 * Note editor for creating/editing rich text notes.
 */
export default function NoteEditorPage() {
  const { noteId } = useParams();
  const [note, setNote] = useState({
    title: "",
    content: "",
    folderId: null,
    tags: [],
  });
  const [folders, setFolders] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(!!noteId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const foldersData = await NoteAPI.getFolders();
        setFolders(foldersData);
        const tagsData = await NoteAPI.getTags();
        setTags(tagsData);
        if (noteId !== "new") {
          const noteData = await NoteAPI.getNote(noteId);
          setNote(noteData);
        }
      } catch (e) {
        setError("Failed to load note or folders.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // TODO: Optionally subscribe to websocket updates for this noteId
  }, [noteId]);

  function handleChange(e) {
    setNote(n => ({ ...n, [e.target.name]: e.target.value }));
  }

  function handleTagsChange(e) {
    // Comma-separated tags
    setNote(n => ({
      ...n,
      tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean),
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (noteId === "new") {
        const newNote = await NoteAPI.createNote(note);
        navigate(`/notes/${newNote.id}`);
      } else {
        await NoteAPI.updateNote(noteId, note);
        navigate(`/`);
      }
    } catch (e) {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await NoteAPI.deleteNote(noteId);
      navigate(`/`);
    } catch (e) {
      setError("Delete failed");
    }
  }

  return (
    <section aria-label="Note Editor Section">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSave} aria-label="Note form">
          <label htmlFor="note-title">Title:</label>
          <input
            id="note-title"
            name="title"
            value={note.title}
            required
            onChange={handleChange}
            aria-required="true"
            aria-label="Note title"
          />
          <label htmlFor="note-folder">Folder:</label>
          <select
            id="note-folder"
            name="folderId"
            value={note.folderId || ""}
            onChange={handleChange}
          >
            <option value="">No Folder</option>
            {folders.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          <label htmlFor="note-tags">Tags (comma separated):</label>
          <input
            id="note-tags"
            name="tags"
            value={note.tags.join(", ")}
            onChange={handleTagsChange}
            aria-label="Note tags"
          />
          <label htmlFor="note-content">Content:</label>
          <textarea
            id="note-content"
            name="content"
            value={note.content}
            onChange={handleChange}
            rows={12}
            aria-label="Note content"
          />
          <div style={{ display: "flex", gap: "14px", marginTop: "10px" }}>
            <button type="submit" className="btn" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            {noteId !== "new" && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
          {error && <div className="error-message" role="alert">{error}</div>}
        </form>
      )}
    </section>
  );
}
