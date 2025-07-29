import React from "react";

/**
 * PUBLIC_INTERFACE
 * Lists all folders as clickable filters.
 */
export default function FolderList({ folders, selected, onSelect }) {
  return (
    <nav aria-label="Folders" className="folder-list">
      <ul>
        <li>
          <button
            className={selected == null ? "active" : ""}
            aria-pressed={selected == null}
            onClick={() => onSelect(null)}
          >
            All Notes
          </button>
        </li>
        {folders.map(folder => (
          <li key={folder.id}>
            <button
              className={selected === folder.id ? "active" : ""}
              aria-pressed={selected === folder.id}
              onClick={() => onSelect(folder.id)}
            >
              {folder.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
