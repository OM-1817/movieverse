// src/pages/watchlist.js
import Head from "next/head";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import MOVIES from "../data/movies";
import MovieCard from "../components/MovieCard";
import { setWatchlist } from "../store";
import { watchlistSystem } from "../systems/watchlistSystem";

export default function WatchlistPage() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const watchlistIds = useSelector((s) => s.watchlist.movieIds);

  const movies = watchlistIds.map((id) => MOVIES.find((m) => m.id === id)).filter(Boolean);

  const clearAll = () => {
    if (!user) return;
    watchlistIds.forEach((id) => watchlistSystem.removeMovie(user.email, id));
    dispatch(setWatchlist([]));
  };

  if (!user) {
    return (
      <>
        <Head><title>Watchlist — MovieVerse</title></Head>
        <div className="empty-state" style={{ paddingTop: 120 }}>
          <div className="icon">🔒</div>
          <h3>Sign in to access your Watchlist</h3>
          <p>Create an account or sign in to save movies to your personal watchlist.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <Link href="/login" data-cursor-hover>
              <button style={{ padding: "10px 24px", borderRadius: 24, background: "var(--accent-gold)", color: "#0a0a0f", border: "none", fontWeight: 700, cursor: "none", fontFamily: "var(--font-body)" }}>
                Sign In
              </button>
            </Link>
            <Link href="/signup" data-cursor-hover>
              <button style={{ padding: "10px 24px", borderRadius: 24, background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border-subtle)", fontWeight: 600, cursor: "none", fontFamily: "var(--font-body)" }}>
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head><title>My Watchlist — MovieVerse</title></Head>
      <div className="content-wrapper" style={{ paddingTop: 32, paddingBottom: 80 }}>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", letterSpacing: "0.08em", marginBottom: 4 }}>MY WATCHLIST</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
              {movies.length} {movies.length === 1 ? "movie" : "movies"} saved, {user.name}
            </p>
          </div>
          {movies.length > 0 && (
            <button
              onClick={clearAll}
              data-cursor-hover
              style={{ padding: "8px 16px", borderRadius: 20, background: "transparent", color: "var(--accent-red)", border: "1px solid rgba(231,76,60,0.3)", fontSize: "0.82rem", cursor: "none", fontFamily: "var(--font-body)", transition: "background 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(231,76,60,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              Clear All
            </button>
          )}
        </div>

        {movies.length > 0 ? (
          <div className="movies-grid">
            {movies.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">🎬</div>
            <h3>Your watchlist is empty</h3>
            <p>Browse movies and click the bookmark icon to save films you want to watch.</p>
            <Link href="/movies" data-cursor-hover style={{ marginTop: 12 }}>
              <button style={{ padding: "10px 24px", borderRadius: 24, background: "var(--accent-gold)", color: "#0a0a0f", border: "none", fontWeight: 700, cursor: "none", fontFamily: "var(--font-body)" }}>
                Discover Movies
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
