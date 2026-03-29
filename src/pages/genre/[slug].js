// src/pages/genre/[slug].js
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import MOVIES from "../../data/movies";
import MovieCard from "../../components/MovieCard";
import { sortMovies } from "../../engines/filterEngine";
import { getGenreColor } from "../../utils/helpers";

const GENRE_META = {
  action:    { label: "Action",    emoji: "⚔️",  desc: "High-octane thrills, explosive sequences, and unstoppable heroes." },
  adventure: { label: "Adventure", emoji: "🌍",  desc: "Epic journeys, uncharted worlds, and the call of the unknown." },
  animation: { label: "Animation", emoji: "✨",  desc: "Imagination brought to life — for every age, every heart." },
  biography: { label: "Biography", emoji: "📖",  desc: "Real lives, real stakes — the stories that shaped our world." },
  comedy:    { label: "Comedy",    emoji: "😂",  desc: "Laughter is the best medicine. These films deliver the dose." },
  crime:     { label: "Crime",     emoji: "🔍",  desc: "The underworld, the chase, and the price of crossing the line." },
  drama:     { label: "Drama",     emoji: "🎭",  desc: "Raw emotion, complex characters, and the weight of truth." },
  family:    { label: "Family",    emoji: "👨‍👩‍👧", desc: "Stories that bring generations together around the screen." },
  fantasy:   { label: "Fantasy",   emoji: "🐉",  desc: "Worlds beyond imagination — magic, myth, and wonder." },
  history:   { label: "History",   emoji: "🏛️",  desc: "The past retold — events that changed the course of everything." },
  horror:    { label: "Horror",    emoji: "👻",  desc: "Fear is the oldest emotion. These films tap straight into it." },
  music:     { label: "Music",     emoji: "🎵",  desc: "Rhythm, soul, and the universal language that connects us all." },
  mystery:   { label: "Mystery",   emoji: "🕵️",  desc: "Secrets hidden in plain sight. Can you solve it before the end?" },
  romance:   { label: "Romance",   emoji: "❤️",  desc: "Love found, lost, and fought for — stories that stay with you." },
  "sci-fi":  { label: "Sci-Fi",    emoji: "🚀",  desc: "The final frontier of ideas — science, space, and the future." },
  thriller:  { label: "Thriller",  emoji: "😰",  desc: "Edge-of-your-seat tension. Every second counts." },
  war:       { label: "War",       emoji: "🪖",  desc: "Courage under fire — the human cost of conflict." },
};

const SORT_OPTIONS = [
  { label: "Rating ↓", value: "rating_desc" },
  { label: "Newest",   value: "year_desc" },
  { label: "A → Z",   value: "title_az" },
];

export default function GenrePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [sortBy, setSortBy] = useState("rating_desc");

  if (!slug) return null;

  const meta = GENRE_META[slug] || {
    label: slug.charAt(0).toUpperCase() + slug.slice(1),
    emoji: "🎬",
    desc: "Explore this genre's finest films.",
  };

  // Match genre label (case-insensitive)
  const genreLabel = meta.label;
  const raw = MOVIES.filter((m) =>
    m.genres.some((g) => g.toLowerCase() === genreLabel.toLowerCase())
  );
  const movies = sortMovies(raw, sortBy);
  const genreColor = getGenreColor(genreLabel);

  // Related genres — collect all genres that appear alongside this one
  const relatedGenres = [
    ...new Set(
      raw.flatMap((m) => m.genres.filter((g) => g.toLowerCase() !== genreLabel.toLowerCase()))
    ),
  ].slice(0, 6);

  return (
    <>
      <Head>
        <title>{meta.label} Movies — MovieVerse</title>
      </Head>

      <div className="content-wrapper" style={{ paddingTop: 32, paddingBottom: 80 }}>

        {/* Breadcrumb */}
        <Link href="/movies" data-cursor-hover>
          <span
            style={{
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              cursor: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              marginBottom: 32,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            ← All Movies
          </span>
        </Link>

        {/* Genre Hero */}
        <div
          className="anim-fade-in"
          style={{
            padding: "40px 36px",
            borderRadius: "var(--radius-lg)",
            background: `linear-gradient(135deg, ${genreColor}14 0%, transparent 60%), var(--bg-card)`,
            border: `1px solid ${genreColor}30`,
            marginBottom: 48,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background watermark */}
          <div
            style={{
              position: "absolute",
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "8rem",
              opacity: 0.06,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {meta.emoji}
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <span style={{ fontSize: "2.8rem" }}>{meta.emoji}</span>
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: genreColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  Genre
                </div>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3rem",
                    letterSpacing: "0.08em",
                    color: "var(--text-primary)",
                    lineHeight: 1,
                  }}
                >
                  {meta.label.toUpperCase()}
                </h1>
              </div>
            </div>

            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.95rem",
                maxWidth: 520,
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              {meta.desc}
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: 24 }}>
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    color: genreColor,
                    letterSpacing: "0.04em",
                  }}
                >
                  {movies.length}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: 6, textTransform: "uppercase" }}>
                  Films
                </span>
              </div>
              {movies.length > 0 && (
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.8rem",
                      color: genreColor,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {(movies.reduce((s, m) => s + m.rating, 0) / movies.length).toFixed(1)}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: 6, textTransform: "uppercase" }}>
                    Avg Rating
                  </span>
                </div>
              )}
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    color: genreColor,
                    letterSpacing: "0.04em",
                  }}
                >
                  {movies.length > 0 ? Math.max(...movies.map((m) => m.year)) : "—"}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: 6, textTransform: "uppercase" }}>
                  Latest
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sort bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            Showing <strong style={{ color: "var(--text-primary)" }}>{movies.length}</strong> films
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                data-cursor-hover
                style={{
                  padding: "6px 14px",
                  borderRadius: "18px",
                  border: `1px solid ${sortBy === opt.value ? genreColor + "80" : "var(--border-subtle)"}`,
                  background: sortBy === opt.value ? genreColor + "18" : "var(--bg-card)",
                  color: sortBy === opt.value ? genreColor : "var(--text-secondary)",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  cursor: "none",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Grid */}
        {movies.length > 0 ? (
          <div className="movies-grid">
            {movies.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">{meta.emoji}</div>
            <h3>No {meta.label} films found</h3>
            <p>We don't have any {meta.label.toLowerCase()} films in our database yet.</p>
            <Link href="/movies" data-cursor-hover>
              <button
                style={{
                  marginTop: 8,
                  padding: "10px 20px",
                  borderRadius: 24,
                  border: "1px solid var(--accent-gold)",
                  background: "transparent",
                  color: "var(--accent-gold)",
                  cursor: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                }}
              >
                Browse All Movies
              </button>
            </Link>
          </div>
        )}

        {/* Related Genres */}
        {relatedGenres.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.1rem",
                color: "var(--text-primary)",
                marginBottom: 16,
              }}
            >
              Often paired with {meta.label}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {relatedGenres.map((g) => {
                const gSlug = g.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                const gColor = getGenreColor(g);
                return (
                  <Link key={g} href={`/genre/${gSlug}`} data-cursor-hover>
                    <div
                      style={{
                        padding: "8px 18px",
                        borderRadius: "24px",
                        background: gColor + "14",
                        border: `1px solid ${gColor}30`,
                        color: gColor,
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        cursor: "none",
                        transition: "transform 0.2s, background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.background = gColor + "28";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.background = gColor + "14";
                      }}
                    >
                      {g}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
