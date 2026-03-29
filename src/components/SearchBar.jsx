// src/components/SearchBar.jsx
import { useState, useRef, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment } from "@mui/material";
import { debounce } from "../utils/helpers";

export default function SearchBar({ value, onChange, placeholder = "Search movies, directors, actors…" }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const debouncedChange = useCallback(
    debounce((val) => onChange(val), 250),
    [onChange]
  );

  const handleChange = (e) => {
    debouncedChange(e.target.value);
  };

  const handleClear = () => {
    if (inputRef.current) inputRef.current.value = "";
    onChange("");
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        background: "var(--bg-card)",
        border: `1px solid ${focused ? "var(--accent-gold)" : "var(--border-subtle)"}`,
        borderRadius: "40px",
        padding: "0 16px",
        gap: 8,
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: focused ? "0 0 0 3px rgba(232,196,74,0.12)" : "none",
        width: "100%",
        maxWidth: 520,
      }}
    >
      <SearchIcon sx={{ fontSize: 18, color: focused ? "var(--accent-gold)" : "var(--text-muted)", transition: "color 0.2s", flexShrink: 0 }} />
      <input
        ref={inputRef}
        defaultValue={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        data-cursor-hover
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "var(--text-primary)",
          fontSize: "0.9rem",
          padding: "11px 0",
          fontFamily: "var(--font-body)",
          cursor: "none",
        }}
      />
      {value && (
        <IconButton
          onClick={handleClear}
          size="small"
          data-cursor-hover
          sx={{
            color: "var(--text-muted)",
            padding: "2px",
            "&:hover": { color: "var(--text-primary)" },
          }}
        >
          <ClearIcon sx={{ fontSize: 16 }} />
        </IconButton>
      )}
    </div>
  );
}
