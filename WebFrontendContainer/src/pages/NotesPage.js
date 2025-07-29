import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NoteList from "../components/NoteList";
import FolderList from "../components/FolderList";
import TagList from "../components/TagList";
import SearchBar from "../components/SearchBar";
import { NoteAPI } from "../services/noteApi";
import { useAuth } from "../components/AuthProvider";

/**
 * PUBLIC_INTERFACE
 * Main Notes dashboard: shows folders, filter/search/tag, and main notes list.
 */
export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [notesData, foldersData, tagsData] = await Promise.all([
        NoteAPI.getNotes(),
        NoteAPI.getFolders(),
        NoteAPI.getTags(),
      ]);
      setNotes(notesData);
      setFolders(foldersData);
      setTags(tagsData);
    } catch (e) {
      // handle
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    // TODO: Listen for websocket real-time updates, for now poll/fetch
    // Optionally: set up websocket here to listen for 'note:updated'
  }, [fetchAll]);

  function handleSearch(text) {
    setSearch(text);
  }

  function handleFolderClick(folderId) {
    setSelectedFolder(folderId);
  }

  function handleTagClick(tag) {
    setSelectedTag(tag);
  }

  function handleSelectNote(noteId) {
    navigate(`/notes/${noteId}`);
  }

  function handleCreateNote() {
    navigate("/notes/new");
  }

  // Filtering logic (simplified)
  const filteredNotes = notes.filter(note =>
    (!selectedFolder || note.folderId === selectedFolder) &&
    (!selectedTag || (note.tags && note.tags.includes(selectedTag))) &&
    (!search || note.title.toLowerCase().includes(search.toLowerCase()) || (note.content && note.content.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <section aria-label="Notes List Section">
      <h1>My Notes</h1>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <aside style={{ minWidth: 180 }}>
          <FolderList
            folders={folders}
            selected={selectedFolder}
            onSelect={handleFolderClick}
          />
          <TagList tags={tags} selected={selectedTag} onSelect={handleTagClick} />
        </aside>
        <section style={{ flex: 1 }}>
          <SearchBar value={search} onChange={handleSearch} />
          <button className="btn" onClick={handleCreateNote}>
            New Note
          </button>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <NoteList notes={filteredNotes} onSelect={handleSelectNote} />
          )}
        </section>
      </div>
    </section>
  );
}
