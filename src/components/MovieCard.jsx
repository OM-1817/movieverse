// src/components/MovieCard.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
  setSelectedMovie,
  addRecent,
} from "../store";
import { watchlistSystem } from "../systems/watchlistSystem";
import { recentlyViewedSystem } from "../systems/recentlyViewedSystem";
import { getRatingColor, getGenreColor, truncateText } from "../utils/helpers";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import StarIcon from "@mui/icons-material/Star";
import { Tooltip, IconButton } from "@mui/material";

export default function MovieCard({ movie, index = 0 }) {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const watchlistIds = useSelector((s) => s.watchlist.movieIds);
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const inWatchlist = watchlistIds.includes(movie.id);

  const handleWatchlist = (e) => {
    e.stopPropagation();
    if (!user) return;
    if (inWatchlist) {
      watchlistSystem.removeMovie(user.email, movie.id);
      dispatch(removeFromWatchlist(movie.id));
    } else {
      watchlistSystem.addMovie(user.email, movie.id);
      dispatch(addToWatchlist(movie.id));
    }
  };

  const handleClick = () => {
    dispatch(setSelectedMovie(movie));
    if (user) {
      recentlyViewedSystem.addMovie(user.email, movie.id);
    }
    dispatch(addRecent(movie.id));
  };

  const delay = Math.min(index * 0.04, 0.5);

  return (
    <div
      onClick={handleClick}
      data-cursor-hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--bg-card)",
        border: `1px solid ${isHovered ? "rgba(232,196,74,0.25)" : "var(--border-subtle)"}`,
        cursor: "none",
        transition:
          "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s, box-shadow 0.3s",
        transform: isHovered
          ? "translateY(-6px) scale(1.01)"
          : "translateY(0) scale(1)",
        boxShadow: isHovered ? "var(--shadow-hover)" : "var(--shadow-card)",
        animationDelay: `${delay}s`,
        animationFillMode: "both",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "320px",
      }}
      className="anim-fade-in-up"
    >
      {/* Poster */}
      <div
        style={{
          position: "relative",
          paddingBottom: "150%",
          overflow: "hidden",
          background: "var(--bg-elevated)",
        }}
      >
        {!imgError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            onError={() => setImgError(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              transform: isHovered ? "scale(1.06)" : "scale(1)",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background:
                "linear-gradient(135deg, var(--bg-card), var(--bg-elevated))",
            }}
          >
            <span style={{ fontSize: "3rem", opacity: 0.3 }}>🎬</span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                textAlign: "center",
                padding: "0 12px",
              }}
            >
              {truncateText(movie.title, 30)}
            </span>
          </div>
        )}

        {/* Rating badge */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            display: "flex",
            alignItems: "center",
            gap: 3,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            borderRadius: "12px",
            padding: "3px 8px",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: getRatingColor(movie.rating),
          }}
        >
          <StarIcon
            sx={{ fontSize: 12, color: getRatingColor(movie.rating) }}
          />
          {movie.rating}
        </div>

        {/* Watchlist button */}
        <Tooltip
          title={
            inWatchlist
              ? "Remove from Watchlist"
              : user
                ? "Add to Watchlist"
                : "Sign in to save"
          }
          arrow
        >
          <IconButton
            onClick={handleWatchlist}
            data-cursor-hover
            size="small"
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(6px)",
              color: inWatchlist
                ? "var(--accent-gold)"
                : "rgba(255,255,255,0.6)",
              width: 32,
              height: 32,
              opacity: isHovered ? 1 : 0.85,
              transition: "opacity 0.2s, color 0.2s, transform 0.2s",
              "&:hover": {
                background: "rgba(0,0,0,0.85)",
                transform: "scale(1.15)",
              },
            }}
          >
            {inWatchlist ? (
              <BookmarkAddedIcon sx={{ fontSize: 16 }} />
            ) : (
              <BookmarkAddIcon sx={{ fontSize: 16 }} />
            )}
          </IconButton>
        </Tooltip>

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s",
            display: "flex",
            alignItems: "flex-end",
            padding: "12px",
          }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.4,
            }}
          >
            {truncateText(movie.overview, 90)}
          </p>
        </div>
      </div>

      {/* Info section */}
      <div style={{ padding: "12px" }}>
        <div
          style={{
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 4,
            lineHeight: 1.3,
            fontFamily: "var(--font-heading)",
          }}
        >
          {truncateText(movie.title, 40)}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {movie.year}
          </span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
            {movie.runtime}m
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {movie.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                padding: "2px 7px",
                borderRadius: "10px",
                background: getGenreColor(genre) + "22",
                color: getGenreColor(genre),
                border: `1px solid ${getGenreColor(genre)}44`,
                letterSpacing: "0.02em",
              }}
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
