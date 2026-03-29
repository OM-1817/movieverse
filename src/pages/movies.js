// src/pages/movies.js
import { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import MOVIES from "../data/movies";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { searchMovies } from "../engines/searchEngine";
import { filterMovies, sortMovies } from "../engines/filterEngine";

const PAGE_SIZE = 12;

export default function MoviesPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ genre: "All", year: "", rating: "" });
  const [sortBy, setSortBy] = useState(router.query.sort || "rating_desc");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  // Apply all transformations
  const processed = (() => {
    let result = searchMovies(MOVIES, query);
    result = filterMovies(result, filters);
    result = sortMovies(result, sortBy);
    return result;
  })();

  const visible = processed.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < processed.length;

  // Infinite scroll observer
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setPage((p) => p + 1);
            setIsLoading(false);
          }, 400);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  // Reset page on filter/search change
  useEffect(() => { setPage(1); }, [query, filters, sortBy]);

  useEffect(() => {
    if (router.query.sort) setSortBy(router.query.sort);
  }, [router.query.sort]);

  return (
    <>
      <Head><title>All Movies — MovieVerse</title></Head>

      <div className="content-wrapper" style={{ paddingTop: 32, paddingBottom: 80 }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", letterSpacing: "0.08em", marginBottom: 4 }}>ALL MOVIES</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
            {processed.length} {processed.length === 1 ? "result" : "results"} found
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
          <SearchBar value={query} onChange={setQuery} />
          <Filters filters={filters} onFilterChange={setFilters} sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <>
            <div className="movies-grid">
              {visible.map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} index={i % PAGE_SIZE} />
              ))}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={loaderRef} style={{ padding: "40px 0", display: "flex", justifyContent: "center" }}>
              {isLoading && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  <div className="spinner" style={{ width: 24, height: 24 }} />
                  Loading more films…
                </div>
              )}
              {!hasMore && visible.length > 0 && (
                <div style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                  ✦ All {processed.length} movies shown
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="icon">🎬</div>
            <h3>No movies found</h3>
            <p>Try adjusting your search or filters to discover more films.</p>
            <button
              onClick={() => { setQuery(""); setFilters({ genre: "All", year: "", rating: "" }); }}
              data-cursor-hover
              style={{ marginTop: 8, padding: "10px 20px", borderRadius: 24, border: "1px solid var(--accent-gold)", background: "transparent", color: "var(--accent-gold)", cursor: "none", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
