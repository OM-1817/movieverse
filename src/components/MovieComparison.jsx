// src/components/MovieComparison.jsx
import { useDispatch, useSelector } from "react-redux";
import { clearCompare, removeFromCompare } from "../store";
import { getRatingColor, getGenreColor, formatRuntime } from "../utils/helpers";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";

function StatBar({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{label}</span>
        <span style={{ fontSize: "0.72rem", color, fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ height: 4, background: "var(--bg-elevated)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 2, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

export default function MovieComparison() {
  const dispatch = useDispatch();
  const compareMovies = useSelector((s) => s.ui.compareMovies);

  if (compareMovies.length === 0) return null;

  const [a, b] = compareMovies;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 900,
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "16px 20px",
        boxShadow: "var(--shadow-hover)",
        minWidth: b ? 560 : 280,
        maxWidth: "90vw",
        transition: "min-width 0.3s ease",
      }}
      className="anim-fade-in-up"
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", color: "var(--text-primary)", letterSpacing: "0.06em" }}>
          MOVIE COMPARISON
        </span>
        <IconButton
          onClick={() => dispatch(clearCompare())}
          size="small"
          data-cursor-hover
          sx={{ color: "var(--text-muted)", width: 28, height: 28, "&:hover": { color: "var(--text-primary)" } }}
        >
          <CloseIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: b ? "1fr auto 1fr" : "1fr", gap: 16, alignItems: "start" }}>
        {compareMovies.map((movie) => (
          <div key={movie.id}>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: 52, height: 78, objectFit: "cover", borderRadius: 6 }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 4 }}>{movie.title}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{movie.year}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 3 }}>
                  <StarIcon sx={{ fontSize: 12, color: getRatingColor(movie.rating) }} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: getRatingColor(movie.rating) }}>{movie.rating}</span>
                </div>
              </div>
              <IconButton
                onClick={() => dispatch(removeFromCompare(movie.id))}
                size="small"
                data-cursor-hover
                sx={{ color: "var(--text-muted)", marginLeft: "auto", width: 24, height: 24, alignSelf: "flex-start", "&:hover": { color: "var(--accent-red)" } }}
              >
                <CloseIcon sx={{ fontSize: 12 }} />
              </IconButton>
            </div>

            <StatBar label="Rating" value={movie.rating} max={10} color={getRatingColor(movie.rating)} />
            <StatBar label="Runtime (min)" value={movie.runtime} max={240} color="var(--accent-blue)" />
            <StatBar label="Year" value={movie.year} max={2024} color="var(--accent-purple)" />

            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
              {movie.genres.slice(0, 3).map((g) => (
                <span key={g} style={{ fontSize: "0.62rem", padding: "2px 6px", borderRadius: 8, background: getGenreColor(g) + "22", color: getGenreColor(g), border: `1px solid ${getGenreColor(g)}33` }}>{g}</span>
              ))}
            </div>
          </div>
        ))}

        {b && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, paddingTop: 4 }}>
            <div style={{ width: 1, flex: 1, background: "var(--border-subtle)" }} />
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600 }}>VS</span>
            <div style={{ width: 1, flex: 1, background: "var(--border-subtle)" }} />
          </div>
        )}

        {!b && (
          <div
            style={{
              border: "2px dashed var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 100,
              color: "var(--text-muted)",
              fontSize: "0.8rem",
              textAlign: "center",
              padding: 12,
            }}
          >
            Click Compare on another movie to compare
          </div>
        )}
      </div>
    </div>
  );
}
