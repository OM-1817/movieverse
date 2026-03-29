// src/components/MovieModal.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedMovie, setSelectedMovie, addToWatchlist, removeFromWatchlist, addToCompare } from "../store";
import { watchlistSystem } from "../systems/watchlistSystem";
import { getRecommendations } from "../engines/recommendationEngine";
import { getRatingColor, getGenreColor, formatRuntime } from "../utils/helpers";
import MOVIES from "../data/movies";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CompareIcon from "@mui/icons-material/Compare";
import { IconButton, Tooltip, Chip } from "@mui/material";
import Link from "next/link";

export default function MovieModal() {
  const dispatch = useDispatch();
  const movie = useSelector((s) => s.ui.selectedMovie);
  const user = useSelector((s) => s.auth.user);
  const watchlistIds = useSelector((s) => s.watchlist.movieIds);
  const [imgError, setImgError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (movie) {
      setImgError(false);
      setTimeout(() => setVisible(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [movie]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!movie) return null;

  const inWatchlist = watchlistIds.includes(movie.id);
  const recommendations = getRecommendations(movie, MOVIES, 6);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => dispatch(clearSelectedMovie()), 250);
  };

  const handleWatchlist = () => {
    if (!user) return;
    if (inWatchlist) {
      watchlistSystem.removeMovie(user.email, movie.id);
      dispatch(removeFromWatchlist(movie.id));
    } else {
      watchlistSystem.addMovie(user.email, movie.id);
      dispatch(addToWatchlist(movie.id));
    }
  };

  const handleCompare = () => {
    dispatch(addToCompare(movie));
    handleClose();
  };

  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div
      className="overlay"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
    >
      <div
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)",
          width: "100%",
          maxWidth: 860,
          maxHeight: "90vh",
          overflowY: "auto",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(20px)",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          position: "relative",
        }}
      >
        {/* Close */}
        <IconButton
          onClick={handleClose}
          data-cursor-hover
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 10,
            background: "rgba(0,0,0,0.5)",
            color: "var(--text-primary)",
            width: 36,
            height: 36,
            backdropFilter: "blur(6px)",
            "&:hover": { background: "rgba(0,0,0,0.8)" },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Hero */}
        <div style={{ display: "flex", gap: 28, padding: "28px 28px 0" }}>
          {/* Poster */}
          <div
            style={{
              flexShrink: 0,
              width: 200,
              height: 300,
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              background: "var(--bg-elevated)",
              boxShadow: "var(--shadow-hover)",
            }}
          >
            {!imgError ? (
              <img
                src={movie.poster}
                alt={movie.title}
                onError={() => setImgError(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", opacity: 0.2 }}>🎬</div>
            )}
          </div>

          {/* Info */}
          <div style={{ flex: 1, paddingTop: 4 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", letterSpacing: "0.05em", marginBottom: 8, color: "var(--text-primary)", lineHeight: 1.1 }}>
              {movie.title}
            </h1>

            {/* Meta row */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <StarIcon sx={{ fontSize: 18, color: getRatingColor(movie.rating) }} />
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: getRatingColor(movie.rating) }}>{movie.rating}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>/10</span>
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{movie.year}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-muted)", fontSize: "0.85rem" }}>
                <AccessTimeIcon sx={{ fontSize: 15 }} />
                {formatRuntime(movie.runtime)}
              </div>
            </div>

            {/* Genres */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {movie.genres.map((g) => (
                <span
                  key={g}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "14px",
                    background: getGenreColor(g) + "22",
                    color: getGenreColor(g),
                    border: `1px solid ${getGenreColor(g)}44`,
                  }}
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Director */}
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Director</span>
              <div>
                <Link href={`/director/${slugify(movie.director)}`} onClick={handleClose} data-cursor-hover>
                  <span style={{ color: "var(--accent-blue)", fontSize: "0.88rem", fontWeight: 500, "&:hover": { textDecoration: "underline" } }}>
                    {movie.director}
                  </span>
                </Link>
              </div>
            </div>

            {/* Actors */}
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Cast</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                {movie.actors.map((actor) => (
                  <Link key={actor} href={`/actor/${slugify(actor)}`} onClick={handleClose} data-cursor-hover>
                    <Chip
                      label={actor}
                      size="small"
                      data-cursor-hover
                      sx={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.72rem",
                        height: 26,
                        background: "var(--bg-elevated)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-subtle)",
                        cursor: "none",
                        "&:hover": { background: "rgba(74,158,255,0.12)", color: "var(--accent-blue)", borderColor: "rgba(74,158,255,0.3)" },
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={handleWatchlist}
                data-cursor-hover
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "9px 18px",
                  borderRadius: "24px",
                  border: "none",
                  background: inWatchlist ? "rgba(232,196,74,0.15)" : "var(--accent-gold)",
                  color: inWatchlist ? "var(--accent-gold)" : "#0a0a0f",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: user ? "none" : "not-allowed",
                  opacity: user ? 1 : 0.5,
                  transition: "all 0.2s",
                  fontFamily: "var(--font-body)",
                }}
              >
                {inWatchlist ? <BookmarkAddedIcon sx={{ fontSize: 16 }} /> : <BookmarkAddIcon sx={{ fontSize: 16 }} />}
                {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>

              <button
                onClick={handleCompare}
                data-cursor-hover
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "9px 18px",
                  borderRadius: "24px",
                  border: "1px solid var(--border-subtle)",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "none",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-blue)"; e.currentTarget.style.color = "var(--accent-blue)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                <CompareIcon sx={{ fontSize: 16 }} /> Compare
              </button>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div style={{ padding: "24px 28px" }}>
          <h3 style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Overview</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.92rem" }}>{movie.overview}</p>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div style={{ padding: "0 28px 28px" }}>
            <div className="section-header" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: "1rem", fontFamily: "var(--font-heading)" }}>You Might Also Like</h3>
              <div className="section-divider" />
            </div>
            <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => dispatch(setSelectedMovie(rec))}
                  data-cursor-hover
                  style={{
                    flexShrink: 0,
                    width: 100,
                    cursor: "none",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ width: "100%", paddingBottom: "150%", position: "relative", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--bg-elevated)" }}>
                    <img
                      src={rec.poster}
                      alt={rec.title}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: 6, lineHeight: 1.3 }}>{rec.title}</p>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>★ {rec.rating}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
