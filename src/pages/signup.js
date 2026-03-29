// src/pages/signup.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { setUser, setWatchlist } from "../store";
import { authSystem } from "../systems/authSystem";
import { validatePassword, getPasswordStrength, getRandomSarcasticQuote, validateEmail } from "../utils/validators";
import { AUTH_PAGE_QUOTES } from "../data/quotes";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [sarcasticQuote, setSarcasticQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showStrength, setShowStrength] = useState(false);
  const [quote] = useState(() => AUTH_PAGE_QUOTES.filter((q) => q.context === "signup")[0]);

  useEffect(() => {
    if (user) router.replace("/");
  }, [user]);

  const strength = form.password ? getPasswordStrength(form.password) : null;

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setForm({ ...form, password: val });
    setShowStrength(val.length > 0);
    if (val.length > 0) {
      const errs = validatePassword(val);
      if (errs.length > 0) setSarcasticQuote(getRandomSarcasticQuote());
      else setSarcasticQuote(null);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!validateEmail(form.email)) errs.email = "Enter a valid email address";
    const pwErrs = validatePassword(form.password);
    if (pwErrs.length > 0) errs.password = pwErrs.join(", ");
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = authSystem.signup({ name: form.name.trim(), email: form.email.trim(), password: form.password });
    if (result.success) {
      const session = authSystem.getSession();
      dispatch(setUser(session));
      dispatch(setWatchlist([]));
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
    transition: "border-color 0.2s, box-shadow 0.2s",
    cursor: "none",
  });

  const focusStyle = "rgba(232,196,74,0.5)";

  return (
    <>
      <Head><title>Join MovieVerse — Create Account</title></Head>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px 40px",
          background: "radial-gradient(ellipse at 80% 50%, rgba(155,89,182,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(232,196,74,0.06) 0%, transparent 50%), var(--bg-primary)",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440 }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🎬</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--accent-gold)", letterSpacing: "0.1em" }}>MOVIEVERSE</div>
          </div>

          {/* Quote */}
          <div style={{ textAlign: "center", marginBottom: 28, padding: "18px", background: "rgba(155,89,182,0.08)", border: "1px solid rgba(155,89,182,0.2)", borderRadius: "var(--radius-md)" }}>
            <p style={{ fontStyle: "italic", color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>"{quote?.quote}"</p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.72rem", marginTop: 6 }}>— {quote?.movie}</p>
          </div>

          {/* Form */}
          <div style={{ background: "var(--bg-glass)", backdropFilter: "blur(20px)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", marginBottom: 24, color: "var(--text-primary)" }}>Create your account</h2>

            {errors.submit && (
              <div style={{ padding: "10px 14px", background: "rgba(231,76,60,0.12)", border: "1px solid rgba(231,76,60,0.3)", borderRadius: 8, marginBottom: 16, fontSize: "0.84rem", color: "#ff6b6b" }}>
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>Your Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={(e) => { e.target.style.borderColor = focusStyle; e.target.style.boxShadow = "0 0 0 3px rgba(232,196,74,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.name ? "rgba(231,76,60,0.6)" : "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                  style={inputStyle("name")} placeholder="John Doe" data-cursor-hover autoComplete="name"
                />
                {errors.name && <p style={{ fontSize: "0.73rem", color: "#ff6b6b", marginTop: 3 }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>Email Address</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={(e) => { e.target.style.borderColor = focusStyle; e.target.style.boxShadow = "0 0 0 3px rgba(232,196,74,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.email ? "rgba(231,76,60,0.6)" : "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                  style={inputStyle("email")} placeholder="you@example.com" data-cursor-hover autoComplete="email"
                />
                {errors.email && <p style={{ fontSize: "0.73rem", color: "#ff6b6b", marginTop: 3 }}>{errors.email}</p>}
              </div>

              {/* Password */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>Password</label>
                <input type="password" value={form.password} onChange={handlePasswordChange}
                  onFocus={(e) => { e.target.style.borderColor = focusStyle; e.target.style.boxShadow = "0 0 0 3px rgba(232,196,74,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.password ? "rgba(231,76,60,0.6)" : "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                  style={inputStyle("password")} placeholder="Min 8 chars, upper, lower, number, symbol"
                  data-cursor-hover autoComplete="new-password"
                />
                {/* Strength bar */}
                {showStrength && strength && (
                  <div style={{ marginTop: 6 }}>
                    <div style={{ height: 3, background: "var(--bg-elevated)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(["Weak","Fair","Good","Strong"].indexOf(strength.level) + 1) * 25}%`, background: strength.color, borderRadius: 2, transition: "width 0.3s" }} />
                    </div>
                    <span style={{ fontSize: "0.7rem", color: strength.color, marginTop: 2, display: "block" }}>{strength.level} password</span>
                  </div>
                )}
                {errors.password && <p style={{ fontSize: "0.73rem", color: "#ff6b6b", marginTop: 3 }}>{errors.password}</p>}
              </div>

              {/* Sarcastic Quote for bad password */}
              {sarcasticQuote && form.password.length > 0 && validatePassword(form.password).length > 0 && (
                <div style={{ padding: "10px 14px", background: "rgba(232,196,74,0.06)", border: "1px solid rgba(232,196,74,0.2)", borderRadius: 8, marginBottom: 14 }}>
                  <p style={{ fontStyle: "italic", fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    "{sarcasticQuote.quote}"
                  </p>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 4 }}>— {sarcasticQuote.character}, <em>{sarcasticQuote.movie}</em></p>
                </div>
              )}

              {/* Confirm */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>Confirm Password</label>
                <input type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  onFocus={(e) => { e.target.style.borderColor = focusStyle; e.target.style.boxShadow = "0 0 0 3px rgba(232,196,74,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.confirm ? "rgba(231,76,60,0.6)" : "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                  style={inputStyle("confirm")} placeholder="••••••••" data-cursor-hover autoComplete="new-password"
                />
                {errors.confirm && <p style={{ fontSize: "0.73rem", color: "#ff6b6b", marginTop: 3 }}>{errors.confirm}</p>}
              </div>

              <button type="submit" disabled={loading} data-cursor-hover
                style={{ width: "100%", padding: "13px", borderRadius: "10px", border: "none", background: loading ? "rgba(232,196,74,0.5)" : "var(--accent-gold)", color: "#0a0a0f", fontWeight: 700, fontSize: "0.95rem", cursor: "none", fontFamily: "var(--font-body)", letterSpacing: "0.03em" }}
              >
                {loading ? "Creating account…" : "Create Account"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Already have an account?{" "}
              <Link href="/login" data-cursor-hover>
                <span style={{ color: "var(--accent-gold)", fontWeight: 500, cursor: "none" }}>Sign in</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
