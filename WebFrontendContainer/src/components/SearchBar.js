import React from "react";

/**
 * PUBLIC_INTERFACE
 * Accessible search bar for live filtering notes.
 */
export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      aria-label="Search notes"
      className="search-bar"
      placeholder="Search notes..."
      value={value}
      onChange={e => onChange(e.target.value)}
      autoFocus
    />
  );
}
