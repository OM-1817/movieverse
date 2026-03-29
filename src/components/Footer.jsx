// src/components/Footer.jsx
import Link from "next/link";

const GENRES = ["Action", "Drama", "Sci-Fi", "Crime", "Thriller", "Horror", "Comedy", "Romance"];
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "48px 0 24px",
        marginTop: 80,
      }}
    >
      <div className="content-wrapper">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: "1.4rem" }}>🎬</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--accent-gold)", letterSpacing: "0.1em" }}>MOVIEVERSE</span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 300 }}>
              Your cinematic universe. Discover, explore, and save the movies that define you.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Explore</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/", label: "Home" },
                { href: "/movies", label: "All Movies" },
                { href: "/watchlist", label: "My Watchlist" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} data-cursor-hover>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-gold)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                  >{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Genres */}
          <div>
            <h4 style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Genres</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {GENRES.slice(0, 6).map((g) => (
                <Link key={g} href={`/genre/${slugify(g)}`} data-cursor-hover>
                  <span
                    style={{ color: "var(--text-secondary)", fontSize: "0.85rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-gold)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                  >{g}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>© 2026 MovieVerse — Built with ❤️ for cinema lovers</span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>All movie data is static and for demonstration purposes only.</span>
        </div>
      </div>
    </footer>
  );
}
