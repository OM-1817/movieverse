// src/pages/director/[slug].js
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import MOVIES from "../../data/movies";
import DIRECTORS from "../../data/directors";
import MovieCard from "../../components/MovieCard";
import { getRatingColor } from "../../utils/helpers";
import StarIcon from "@mui/icons-material/Star";

export default function DirectorPage() {
  const router = useRouter();
  const { slug } = router.query;

  const dirData = DIRECTORS.find((d) => d.id === slug);
  const dirName = dirData?.name || slug?.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
  const movies = MOVIES.filter((m) => m.director.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug);
  const avgRating = movies.length > 0 ? (movies.reduce((s, m) => s + m.rating, 0) / movies.length).toFixed(1) : null;

  if (!slug) return null;

  return (
    <>
      <Head><title>{dirName} — MovieVerse Director</title></Head>
      <div className="content-wrapper" style={{ paddingTop: 32, paddingBottom: 80 }}>

        <Link href="/movies" data-cursor-hover>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", cursor: "none", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 32 }}>
            ← Back to Movies
          </span>
        </Link>

        {/* Director header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", background: "var(--bg-elevated)", padding: "3px 10px", borderRadius: 12 }}>Director</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", letterSpacing: "0.06em", marginBottom: 8 }}>{dirName}</h1>

          {dirData && (
            <div style={{ maxWidth: 640 }}>
              {dirData.nationality && <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: 8 }}>🌍 {dirData.nationality} · Born {dirData.born}</p>}
              {dirData.bio && <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 10 }}>{dirData.bio}</p>}
              {dirData.style && (
                <div style={{ padding: "10px 14px", background: "rgba(232,196,74,0.06)", border: "1px solid rgba(232,196,74,0.15)", borderRadius: 8 }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Style: </span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{dirData.style}</span>
                </div>
              )}
            </div>
          )}

          {/* Stats */}
          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--accent-gold)" }}>{movies.length}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Films</div>
            </div>
            {avgRating && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <StarIcon sx={{ fontSize: 18, color: getRatingColor(parseFloat(avgRating)) }} />
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: getRatingColor(parseFloat(avgRating)) }}>{avgRating}</span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Avg Rating</div>
              </div>
            )}
          </div>
        </div>

        {/* Filmography */}
        {movies.length > 0 ? (
          <>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", marginBottom: 20 }}>Filmography</h2>
            <div className="movies-grid">
              {movies.sort((a, b) => b.year - a.year).map((movie, i) => <MovieCard key={movie.id} movie={movie} index={i} />)}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="icon">🎥</div>
            <h3>No films found</h3>
            <p>No films by this director are in our database yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
