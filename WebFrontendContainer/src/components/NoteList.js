import React from "react";

/**
 * PUBLIC_INTERFACE
 * Lists all notes in a simple, accessible list format.
 */
export default function NoteList({ notes, onSelect }) {
  if (!notes.length) return <div>No notes found.</div>;

  return (
    <ul className="note-list" aria-label="Note List">
      {notes.map(note => (
        <li key={note.id}>
          <button
            className="note-list-item"
            onClick={() => onSelect(note.id)}
            aria-label={`Open note ${note.title}`}
          >
            <strong>{note.title}</strong>
            <div className="note-meta">
              <span>{note.folderName || ""}</span>{" "}
              {note.tags && note.tags.length > 0 && (
                <span>
                  {note.tags.map(tag => (
                    <span key={tag} className="note-tag">
                      {tag}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
