// src/pages/actor/[slug].js
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import MOVIES from "../../data/movies";
import ACTORS from "../../data/actors";
import MovieCard from "../../components/MovieCard";

export default function ActorPage() {
  const router = useRouter();
  const { slug } = router.query;

  const actorData = ACTORS.find((a) => a.id === slug);
  const actorName = actorData?.name || slug?.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
  const movies = MOVIES.filter((m) => m.actors.some((a) => a.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug));

  if (!slug) return null;

  return (
    <>
      <Head><title>{actorName} — MovieVerse</title></Head>
      <div className="content-wrapper" style={{ paddingTop: 32, paddingBottom: 80 }}>

        {/* Back */}
        <Link href="/movies" data-cursor-hover>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", cursor: "none", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 32 }}>
            ← Back to Movies
          </span>
        </Link>

        {/* Actor header */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 48 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--bg-elevated)", border: "2px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontFamily: "var(--font-heading)", color: "var(--accent-gold)", fontWeight: 700, flexShrink: 0 }}>
            {actorName?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", letterSpacing: "0.06em", marginBottom: 6 }}>{actorName}</h1>
            {actorData?.born && (
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Born {actorData.born}</p>
            )}
            {actorData?.bio && (
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", maxWidth: 560, marginTop: 8, lineHeight: 1.6 }}>{actorData.bio}</p>
            )}
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: 8 }}>{movies.length} movie{movies.length !== 1 ? "s" : ""} in MovieVerse</p>
          </div>
        </div>

        {/* Movies */}
        {movies.length > 0 ? (
          <>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", marginBottom: 20, color: "var(--text-primary)" }}>Filmography</h2>
            <div className="movies-grid">
              {movies.map((movie, i) => <MovieCard key={movie.id} movie={movie} index={i} />)}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="icon">🎬</div>
            <h3>No movies found</h3>
            <p>We don't have any movies for this actor in our database yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
