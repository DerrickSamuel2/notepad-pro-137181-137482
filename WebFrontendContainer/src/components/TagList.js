import React from "react";

/**
 * PUBLIC_INTERFACE
 * Lists all tags as clickable filters.
 */
export default function TagList({ tags, selected, onSelect }) {
  return (
    <div className="tag-list" aria-label="Tags">
      <span>
        <button
          className={selected == null ? "active" : ""}
          aria-pressed={selected == null}
          onClick={() => onSelect(null)}
        >
          All Tags
        </button>
      </span>
      {tags.map(tag => (
        <span key={tag}>
          <button
            className={selected === tag ? "active" : ""}
            aria-pressed={selected === tag}
            onClick={() => onSelect(tag)}
          >
            {tag}
          </button>
        </span>
      ))}
    </div>
  );
}
