// src/components/NavbarDock.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store";
import { authSystem } from "../systems/authSystem";
import ThemeToggle from "./ThemeToggle";
import {
  Badge, Tooltip, IconButton, Avatar, Menu, MenuItem, Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExploreIcon from "@mui/icons-material/Explore";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

const NAV_ITEMS = [
  { href: "/",        label: "Home",    icon: HomeIcon },
  { href: "/movies",  label: "Movies",  icon: MovieIcon },
  { href: "/explore", label: "Explore", icon: ExploreIcon },
  { href: "/watchlist", label: "Watchlist", icon: BookmarkIcon },
];

export default function NavbarDock() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const watchlistCount = useSelector((s) => s.watchlist.movieIds.length);
  const mode = useSelector((s) => s.theme.mode);

  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    authSystem.logout();
    dispatch(clearUser());
    setAnchorEl(null);
    router.push("/login");
  };

  const isActive = (href) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: "var(--nav-height)",
        background: scrolled
          ? mode === "dark"
            ? "rgba(10,10,15,0.92)"
            : "rgba(244,244,248,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "none",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginRight: "auto" }}>
        <span style={{ fontSize: "1.6rem" }}>🎬</span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            letterSpacing: "0.1em",
            color: "var(--accent-gold)",
            lineHeight: 1,
          }}
        >
          MOVIEVERSE
        </span>
      </Link>

      {/* Center dock */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "var(--bg-glass)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "40px",
          padding: "6px 12px",
          backdropFilter: "blur(12px)",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Tooltip key={href} title={label} arrow placement="bottom">
            <Link href={href} data-cursor-hover>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: "28px",
                  background: isActive(href) ? "rgba(232,196,74,0.15)" : "transparent",
                  border: isActive(href) ? "1px solid rgba(232,196,74,0.3)" : "1px solid transparent",
                  color: isActive(href) ? "var(--accent-gold)" : "var(--text-secondary)",
                  transition: "all 0.2s ease",
                  cursor: "none",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(href)) {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.background = "var(--bg-elevated)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(href)) {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {href === "/watchlist" ? (
                  <Badge
                    badgeContent={watchlistCount}
                    color="warning"
                    sx={{ "& .MuiBadge-badge": { fontSize: "0.65rem", minWidth: 16, height: 16 } }}
                  >
                    <Icon sx={{ fontSize: 17 }} />
                  </Badge>
                ) : (
                  <Icon sx={{ fontSize: 17 }} />
                )}
                <span style={{ display: { xs: "none", sm: "inline" } }}>{label}</span>
              </div>
            </Link>
          </Tooltip>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
        <ThemeToggle />

        {user ? (
          <>
            <Tooltip title={user.name} arrow>
              <Avatar
                onClick={(e) => setAnchorEl(e.currentTarget)}
                data-cursor-hover
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "var(--accent-gold)",
                  color: "#000",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: "none",
                  border: "2px solid transparent",
                  transition: "border-color 0.2s",
                  "&:hover": { borderColor: "var(--accent-gold)" },
                }}
              >
                {user.name[0].toUpperCase()}
              </Avatar>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                sx: {
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                  minWidth: 180,
                  mt: 1,
                },
              }}
            >
              <MenuItem disabled sx={{ opacity: 1 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{user.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{user.email}</div>
                </div>
              </MenuItem>
              <Divider sx={{ borderColor: "var(--border-subtle)" }} />
              <MenuItem
                onClick={handleLogout}
                data-cursor-hover
                sx={{ gap: 1.5, color: "var(--accent-red)", "&:hover": { background: "rgba(231,76,60,0.1)" } }}
              >
                <LogoutIcon sx={{ fontSize: 17 }} /> Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Link href="/login" data-cursor-hover>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 16px",
                borderRadius: "20px",
                background: "var(--accent-gold)",
                color: "#0a0a0f",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                transition: "opacity 0.2s",
                cursor: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <LoginIcon sx={{ fontSize: 15 }} /> Sign In
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
