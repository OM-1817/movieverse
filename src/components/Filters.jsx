// src/components/Filters.jsx
import { useState } from "react";
import { Chip, Collapse, IconButton, Tooltip } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import SortIcon from "@mui/icons-material/Sort";

const GENRES = ["All", "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Sci-Fi", "Thriller", "War"];
const YEARS = [
  { label: "Any Year", value: "" },
  { label: "2020+", value: "2020" },
  { label: "2015+", value: "2015" },
  { label: "2010+", value: "2010" },
  { label: "2000+", value: "2000" },
  { label: "1990+", value: "1990" },
];
const RATINGS = [
  { label: "Any Rating", value: "" },
  { label: "9+", value: "9" },
  { label: "8+", value: "8" },
  { label: "7+", value: "7" },
  { label: "6+", value: "6" },
];
const SORT_OPTIONS = [
  { label: "Rating ↓", value: "rating_desc" },
  { label: "Rating ↑", value: "rating_asc" },
  { label: "Newest", value: "year_desc" },
  { label: "Oldest", value: "year_asc" },
  { label: "A → Z", value: "title_az" },
  { label: "Z → A", value: "title_za" },
];

function FilterRow({ label, options, active, onSelect }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;
          const isActive = active === val || (active === "" && val === "") || (active === "All" && lbl === "All");
          return (
            <Chip
              key={val}
              label={lbl}
              size="small"
              onClick={() => onSelect(val)}
              data-cursor-hover
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                height: 28,
                background: isActive ? "rgba(232,196,74,0.2)" : "var(--bg-card)",
                color: isActive ? "var(--accent-gold)" : "var(--text-secondary)",
                border: `1px solid ${isActive ? "rgba(232,196,74,0.5)" : "var(--border-subtle)"}`,
                cursor: "none",
                transition: "all 0.15s",
                "&:hover": {
                  background: isActive ? "rgba(232,196,74,0.25)" : "var(--bg-elevated)",
                  color: "var(--text-primary)",
                },
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Filters({ filters, onFilterChange, sortBy, onSortChange }) {
  const [open, setOpen] = useState(false);
  const hasActiveFilters = filters.genre !== "All" || filters.year || filters.rating;
  const activeCount = [filters.genre !== "All", !!filters.year, !!filters.rating].filter(Boolean).length;

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Tooltip title="Toggle Filters" arrow>
          <IconButton
            onClick={() => setOpen((v) => !v)}
            data-cursor-hover
            sx={{
              border: `1px solid ${open || hasActiveFilters ? "rgba(232,196,74,0.5)" : "var(--border-subtle)"}`,
              color: open || hasActiveFilters ? "var(--accent-gold)" : "var(--text-secondary)",
              borderRadius: "10px",
              padding: "7px 14px",
              gap: 0.8,
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              background: open || hasActiveFilters ? "rgba(232,196,74,0.08)" : "transparent",
              transition: "all 0.2s",
              fontSize: "0.82rem",
              fontWeight: 500,
            }}
          >
            <TuneIcon sx={{ fontSize: 16 }} />
            <span style={{ fontSize: "0.82rem", marginLeft: 4 }}>
              Filters {activeCount > 0 ? `(${activeCount})` : ""}
            </span>
          </IconButton>
        </Tooltip>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {SORT_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              size="small"
              icon={sortBy === opt.value ? <SortIcon style={{ fontSize: 14 }} /> : undefined}
              onClick={() => onSortChange(opt.value)}
              data-cursor-hover
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                height: 28,
                background: sortBy === opt.value ? "rgba(74,158,255,0.15)" : "var(--bg-card)",
                color: sortBy === opt.value ? "var(--accent-blue)" : "var(--text-secondary)",
                border: `1px solid ${sortBy === opt.value ? "rgba(74,158,255,0.4)" : "var(--border-subtle)"}`,
                cursor: "none",
                transition: "all 0.15s",
                "&:hover": { background: "var(--bg-elevated)", color: "var(--text-primary)" },
              }}
            />
          ))}
        </div>
      </div>

      <Collapse in={open}>
        <div
          style={{
            marginTop: 12,
            padding: "16px 20px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <FilterRow
            label="Genre"
            options={GENRES}
            active={filters.genre || "All"}
            onSelect={(v) => onFilterChange({ ...filters, genre: v })}
          />
          <FilterRow
            label="Release Year"
            options={YEARS}
            active={filters.year || ""}
            onSelect={(v) => onFilterChange({ ...filters, year: v })}
          />
          <FilterRow
            label="Min Rating"
            options={RATINGS}
            active={filters.rating || ""}
            onSelect={(v) => onFilterChange({ ...filters, rating: v })}
          />
        </div>
      </Collapse>
    </div>
  );
}
