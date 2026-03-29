// src/pages/login.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { setUser, setWatchlist, setRecent } from "../store";
import { authSystem } from "../systems/authSystem";
import { watchlistSystem } from "../systems/watchlistSystem";
import { recentlyViewedSystem } from "../systems/recentlyViewedSystem";
import { validateEmail } from "../utils/validators";
import { AUTH_PAGE_QUOTES } from "../data/quotes";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [quote] = useState(() => AUTH_PAGE_QUOTES.filter((q) => q.context === "login")[Math.floor(Math.random() * 3) % 2]);

  useEffect(() => {
    if (user) router.replace("/");
  }, [user]);

  const validate = () => {
    const errs = {};
    if (!validateEmail(form.email)) errs.email = "Enter a valid email address";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = authSystem.login(form);
    if (result.success) {
      const session = authSystem.getSession();
      dispatch(setUser(session));
      const wl = watchlistSystem.getWatchlist(session.email);
      dispatch(setWatchlist(wl));
      const recent = recentlyViewedSystem.getRecent(session.email);
      dispatch(setRecent(recent));
      router.push("/");
    } else {
      setErrors({ submit: result.error });
    }
    setLoading(false);
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${errors[field] ? "rgba(231,76,60,0.6)" : "rgba(255,255,255,0.12)"}`,
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#f0f0f8",
    fontSize: "0.92rem",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s",
    cursor: "none",
  });

  return (
    <>
      <Head><title>Sign In — MovieVerse</title></Head>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px 40px",
          background: "radial-gradient(ellipse at 20% 50%, rgba(74,158,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(232,196,74,0.06) 0%, transparent 50%), var(--bg-primary)",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🎬</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--accent-gold)", letterSpacing: "0.1em" }}>MOVIEVERSE</div>
          </div>

          {/* Quote */}
          <div style={{
            textAlign: "center",
            marginBottom: 32,
            padding: "20px",
            background: "rgba(232,196,74,0.06)",
            border: "1px solid rgba(232,196,74,0.15)",
            borderRadius: "var(--radius-md)",
          }}>
            <p style={{ fontStyle: "italic", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>"{quote?.quote}"</p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: 8 }}>— {quote?.movie}</p>
          </div>

          {/* Form card */}
          <div style={{
            background: "var(--bg-glass)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)",
            padding: "32px",
          }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", marginBottom: 24, color: "var(--text-primary)" }}>Welcome back</h2>

            {errors.submit && (
              <div style={{ padding: "10px 14px", background: "rgba(231,76,60,0.12)", border: "1px solid rgba(231,76,60,0.3)", borderRadius: 8, marginBottom: 16, fontSize: "0.84rem", color: "#ff6b6b" }}>
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(232,196,74,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(232,196,74,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.email ? "rgba(231,76,60,0.6)" : "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                  style={inputStyle("email")}
                  placeholder="you@example.com"
                  data-cursor-hover
                  autoComplete="email"
                />
                {errors.email && <p style={{ fontSize: "0.75rem", color: "#ff6b6b", marginTop: 4 }}>{errors.email}</p>}
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(232,196,74,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(232,196,74,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.password ? "rgba(231,76,60,0.6)" : "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                  style={inputStyle("password")}
                  placeholder="••••••••"
                  data-cursor-hover
                  autoComplete="current-password"
                />
                {errors.password && <p style={{ fontSize: "0.75rem", color: "#ff6b6b", marginTop: 4 }}>{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                data-cursor-hover
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "none",
                  background: loading ? "rgba(232,196,74,0.5)" : "var(--accent-gold)",
                  color: "#0a0a0f",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "none",
                  fontFamily: "var(--font-body)",
                  transition: "opacity 0.2s",
                  letterSpacing: "0.03em",
                }}
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Don't have an account?{" "}
              <Link href="/signup" data-cursor-hover>
                <span style={{ color: "var(--accent-gold)", fontWeight: 500, cursor: "none" }}>Create one</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
