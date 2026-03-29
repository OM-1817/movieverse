// src/components/MovieBattle.jsx
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../store";
import MOVIES from "../data/movies";
import { getRatingColor, getGenreColor, shuffle } from "../utils/helpers";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function pickTwo(pool) {
  const shuffled = shuffle(pool);
  return [shuffled[0], shuffled[1]];
}

function BattleCard({ movie, onVote, side, isWinner, isLoser, hasVoted }) {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        transition: "transform 0.4s ease, opacity 0.4s ease",
        transform: isWinner ? "scale(1.04)" : isLoser ? "scale(0.94)" : "scale(1)",
        opacity: isLoser ? 0.45 : 1,
      }}
    >
      {/* Poster */}
      <div
        onClick={() => !hasVoted && onVote(movie)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor-hover
        style={{
          width: "100%",
          maxWidth: 220,
          position: "relative",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          cursor: hasVoted ? "default" : "none",
          border: `2px solid ${
            isWinner
              ? "var(--accent-gold)"
              : hovered && !hasVoted
              ? "rgba(255,255,255,0.2)"
              : "var(--border-subtle)"
          }`,
          boxShadow: isWinner
            ? "0 0 32px rgba(232,196,74,0.3)"
            : hovered && !hasVoted
            ? "var(--shadow-hover)"
            : "var(--shadow-card)",
          transition: "border-color 0.25s, box-shadow 0.25s",
        }}
      >
        <div style={{ paddingBottom: "145%", position: "relative", background: "var(--bg-elevated)" }}>
          <img
            src={movie.poster}
            alt={movie.title}
            onError={(e) => { e.target.style.display = "none"; }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s",
              transform: hovered && !hasVoted ? "scale(1.05)" : "scale(1)",
            }}
          />

          {/* Vote overlay */}
          {!hasVoted && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.2s",
              }}
            >
              <div
                style={{
                  padding: "10px 22px",
                  borderRadius: "24px",
                  background: "var(--accent-gold)",
                  color: "#0a0a0f",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.04em",
                }}
              >
                Vote →
              </div>
            </div>
          )}

          {/* Winner crown */}
          {isWinner && (
            <div
              className="anim-scale-in"
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "2rem",
                filter: "drop-shadow(0 0 8px rgba(232,196,74,0.6))",
              }}
            >
              👑
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{ textAlign: "center", padding: "14px 8px 0", width: "100%", maxWidth: 220 }}>
        <button
          onClick={() => dispatch(setSelectedMovie(movie))}
          data-cursor-hover
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            fontFamily: "var(--font-heading)",
            fontSize: "1rem",
            color: "var(--text-primary)",
            marginBottom: 6,
            lineHeight: 1.3,
            transition: "color 0.2s",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
        >
          {movie.title}
        </button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <StarIcon sx={{ fontSize: 14, color: getRatingColor(movie.rating) }} />
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: getRatingColor(movie.rating) }}>
            {movie.rating}
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{movie.year}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4, marginTop: 8 }}>
          {movie.genres.slice(0, 2).map((g) => (
            <span
              key={g}
              style={{
                fontSize: "0.63rem",
                padding: "2px 7px",
                borderRadius: 8,
                background: getGenreColor(g) + "22",
                color: getGenreColor(g),
                border: `1px solid ${getGenreColor(g)}33`,
              }}
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MovieBattle() {
  const [pool] = useState(() => shuffle(MOVIES));
  const [poolIdx, setPoolIdx] = useState(2);
  const [pair, setPair] = useState(() => [pool[0], pool[1]]);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({});   // movieId → wins
  const [round, setRound] = useState(1);
  const [history, setHistory] = useState([]);  // array of winner ids
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleVote = useCallback(
    (movie) => {
      setWinner(movie);
      setScores((prev) => ({ ...prev, [movie.id]: (prev[movie.id] || 0) + 1 }));
      setHistory((prev) => [...prev, movie.id]);

      setTimeout(() => {
        const nextIdx = poolIdx < pool.length ? poolIdx : 0;
        const nextMovie = pool[nextIdx % pool.length];
        // New pair: winner vs next challenger
        setPair([movie, nextMovie]);
        setPoolIdx(nextIdx + 1);
        setRound((r) => r + 1);
        setWinner(null);
      }, 900);
    },
    [pool, poolIdx]
  );

  const handleReset = () => {
    setPoolIdx(2);
    setPair([pool[0], pool[1]]);
    setWinner(null);
    setScores({});
    setHistory([]);
    setRound(1);
    setShowLeaderboard(false);
  };

  // Top 5 by wins
  const leaderboard = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, wins]) => ({ movie: MOVIES.find((m) => m.id === Number(id)), wins }))
    .filter((e) => e.movie);

  const [movieA, movieB] = pair;
  const loser = winner ? (winner.id === movieA.id ? movieB : movieA) : null;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: "2.8rem", marginBottom: 10 }}>⚔️</div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            letterSpacing: "0.1em",
            marginBottom: 8,
          }}
        >
          MOVIE BATTLE ARENA
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
          Pick your champion. Winners keep fighting. Round{" "}
          <strong style={{ color: "var(--accent-gold)" }}>{round}</strong>
        </p>
      </div>

      {/* Battle Stage */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)",
          padding: "32px 24px",
          marginBottom: 24,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
          <BattleCard
            movie={movieA}
            onVote={handleVote}
            side="left"
            isWinner={winner?.id === movieA.id}
            isLoser={loser?.id === movieA.id}
            hasVoted={!!winner}
          />

          {/* VS divider */}
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "80px",
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                opacity: 0.4,
              }}
            >
              VS
            </div>
            <div
              style={{
                width: 1,
                height: 60,
                background: "var(--border-subtle)",
              }}
            />
          </div>

          <BattleCard
            movie={movieB}
            onVote={handleVote}
            side="right"
            isWinner={winner?.id === movieB.id}
            isLoser={loser?.id === movieB.id}
            hasVoted={!!winner}
          />
        </div>

        {/* Transition message */}
        {winner && (
          <div
            className="anim-fade-in"
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--bg-elevated)",
              border: "1px solid rgba(232,196,74,0.3)",
              borderRadius: 20,
              padding: "6px 16px",
              fontSize: "0.8rem",
              color: "var(--accent-gold)",
              whiteSpace: "nowrap",
            }}
          >
            🏆 {winner.title} advances!
          </div>
        )}
      </div>

      {/* Action bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
        <button
          onClick={() => setShowLeaderboard((v) => !v)}
          data-cursor-hover
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 18px",
            borderRadius: "24px",
            border: "1px solid var(--border-subtle)",
            background: showLeaderboard ? "rgba(232,196,74,0.1)" : "var(--bg-card)",
            color: showLeaderboard ? "var(--accent-gold)" : "var(--text-secondary)",
            fontSize: "0.83rem",
            cursor: "none",
            fontFamily: "var(--font-body)",
            transition: "all 0.2s",
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: 16 }} />
          Leaderboard ({Object.keys(scores).length})
        </button>

        <button
          onClick={handleReset}
          data-cursor-hover
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 18px",
            borderRadius: "24px",
            border: "1px solid var(--border-subtle)",
            background: "var(--bg-card)",
            color: "var(--text-secondary)",
            fontSize: "0.83rem",
            cursor: "none",
            fontFamily: "var(--font-body)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-red)";
            e.currentTarget.style.color = "var(--accent-red)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-subtle)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          ↺ Reset
        </button>
      </div>

      {/* Leaderboard */}
      {showLeaderboard && leaderboard.length > 0 && (
        <div
          className="anim-fade-in-up"
          style={{
            marginTop: 20,
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: 17, color: "var(--accent-gold)" }} />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.9rem",
                color: "var(--text-primary)",
              }}
            >
              Top Champions
            </span>
          </div>
          {leaderboard.map(({ movie, wins }, i) => (
            <div
              key={movie.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 20px",
                borderBottom: i < leaderboard.length - 1 ? "1px solid var(--border-subtle)" : "none",
                background: i === 0 ? "rgba(232,196,74,0.04)" : "transparent",
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  color: i === 0 ? "var(--accent-gold)" : "var(--text-muted)",
                  flexShrink: 0,
                }}
              >
                {i === 0 ? "👑" : i + 1}
              </span>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: 36, height: 54, objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {movie.title}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{movie.year}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontFamily: "var(--font-display)",
                    color: i === 0 ? "var(--accent-gold)" : "var(--text-secondary)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {wins}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  wins
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
