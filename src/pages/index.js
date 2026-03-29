// src/pages/index.js
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import MOVIES from "../data/movies";
import { MOVIE_QUOTES } from "../data/quotes";
import MovieCard from "../components/MovieCard";
import { getPersonalizedRecommendations } from "../engines/recommendationEngine";
import { generateMovieNight, MOODS } from "../engines/movieNightEngine";
import { setSelectedMovie } from "../store";
import { shuffle, getRatingColor } from "../utils/helpers";

const GENRES = ["Action", "Sci-Fi", "Drama", "Crime", "Thriller", "Horror", "Comedy", "Animation"];
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function SectionHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24 }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", letterSpacing: "0.06em", color: "var(--text-primary)" }}>{title}</h2>
        {subtitle && <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: 4 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((s) => s.auth.user);
  const recentIds = useSelector((s) => s.recent.movieIds);
  const [quote, setQuote] = useState(null);
  const [topMovies] = useState(() => MOVIES.filter((m) => m.rating >= 8.5).sort((a, b) => b.rating - a.rating).slice(0, 12));
  const [nightMovies, setNightMovies] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);

  const recentMovies = recentIds.map((id) => MOVIES.find((m) => m.id === id)).filter(Boolean);
  const recentFull = recentMovies.map((m) => MOVIES.find((fm) => fm.id === m.id)).filter(Boolean);
  const recommended = getPersonalizedRecommendations(recentFull, MOVIES, 12);

  useEffect(() => {
    const idx = Math.floor(Math.random() * MOVIE_QUOTES.length);
    setQuote(MOVIE_QUOTES[idx]);
  }, []);

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
    setNightMovies(generateMovieNight(moodId, 4));
  };

  return (
    <>
      <Head><title>MovieVerse — Discover Cinema</title></Head>

      <div className="content-wrapper" style={{ paddingTop: 40, paddingBottom: 60 }}>

        {/* ── Hero Quote ─────────────────────────────────────────────────── */}
        {quote && (
          <div
            className="anim-fade-in"
            style={{
              textAlign: "center",
              padding: "60px 24px 48px",
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: "2.8rem", marginBottom: 16 }}>🎬</div>
            <blockquote style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontStyle: "italic", color: "var(--text-primary)", maxWidth: 640, margin: "0 auto 12px", lineHeight: 1.5 }}>
              "{quote.quote}"
            </blockquote>
            <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>— {quote.character}, <em>{quote.movie}</em></div>
          </div>
        )}

        {/* ── Hero CTA ──────────────────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 72 }}>
          <Link href="/movies" data-cursor-hover>
            <button style={{ padding: "12px 28px", borderRadius: "28px", background: "var(--accent-gold)", color: "#0a0a0f", border: "none", fontWeight: 700, fontSize: "0.9rem", cursor: "none", fontFamily: "var(--font-body)", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              Explore Movies →
            </button>
          </Link>
          {!user && (
            <Link href="/signup" data-cursor-hover>
              <button style={{ padding: "12px 28px", borderRadius: "28px", background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border-subtle)", fontWeight: 600, fontSize: "0.9rem", cursor: "none", fontFamily: "var(--font-body)", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent-gold)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-subtle)"}
              >
                Create Account
              </button>
            </Link>
          )}
        </div>

        {/* ── Recently Viewed ───────────────────────────────────────────── */}
        {recentMovies.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <SectionHeader title="RECENTLY VIEWED" subtitle="Pick up where you left off" />
            <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8 }}>
              {recentMovies.slice(0, 8).map((movie, i) => (
                <div key={movie.id} style={{ flexShrink: 0, width: 160 }}>
                  <MovieCard movie={movie} index={i} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Top Rated ─────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <SectionHeader
            title="TOP RATED"
            subtitle="The films that define cinema"
            action={
              <Link href="/movies?sort=rating_desc" data-cursor-hover>
                <span style={{ fontSize: "0.82rem", color: "var(--accent-gold)", cursor: "none" }}>See all →</span>
              </Link>
            }
          />
          <div className="movies-grid">
            {topMovies.slice(0, 6).map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        </section>

        {/* ── Recommendations ───────────────────────────────────────────── */}
        {recommended.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <SectionHeader
              title="RECOMMENDED FOR YOU"
              subtitle={user ? `Based on your viewing history, ${user.name}` : "Based on popular picks"}
            />
            <div className="movies-grid">
              {recommended.slice(0, 6).map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ── Browse by Genre ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <SectionHeader title="BROWSE BY GENRE" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
            {GENRES.map((genre) => {
              const count = MOVIES.filter((m) => m.genres.includes(genre)).length;
              const sample = MOVIES.filter((m) => m.genres.includes(genre))[0];
              return (
                <Link key={genre} href={`/genre/${slugify(genre)}`} data-cursor-hover>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      padding: "20px 16px",
                      cursor: "none",
                      transition: "transform 0.2s, border-color 0.2s",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "rgba(232,196,74,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
                  >
                    <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>
                      {{"Action":"⚔️","Sci-Fi":"🚀","Drama":"🎭","Crime":"🔍","Thriller":"😰","Horror":"👻","Comedy":"😂","Animation":"✨"}[genre] || "🎬"}
                    </div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: 4 }}>{genre}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{count} films</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Movie Night Generator ─────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <SectionHeader title="MOVIE NIGHT GENERATOR" subtitle="Let the vibes choose for you" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                data-cursor-hover
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 18px",
                  borderRadius: "24px",
                  border: `1px solid ${selectedMood === mood.id ? "rgba(232,196,74,0.5)" : "var(--border-subtle)"}`,
                  background: selectedMood === mood.id ? "rgba(232,196,74,0.12)" : "var(--bg-card)",
                  color: selectedMood === mood.id ? "var(--accent-gold)" : "var(--text-secondary)",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  cursor: "none",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                <span>{mood.emoji}</span>
                <span>{mood.label}</span>
              </button>
            ))}
          </div>

          {nightMovies.length > 0 && (
            <div className="movies-grid anim-fade-in-up">
              {nightMovies.map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* ── Stats bar ─────────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 48 }}>
          {[
            { label: "Movies", value: MOVIES.length, icon: "🎬" },
            { label: "Directors", value: new Set(MOVIES.map((m) => m.director)).size, icon: "🎥" },
            { label: "Genres", value: new Set(MOVIES.flatMap((m) => m.genres)).size, icon: "🎭" },
            { label: "Years Covered", value: `${Math.min(...MOVIES.map((m) => m.year))}–${Math.max(...MOVIES.map((m) => m.year))}`, icon: "📅" },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "20px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--accent-gold)", letterSpacing: "0.06em" }}>{value}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
