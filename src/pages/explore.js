// src/pages/explore.js
import { useState } from "react";
import Head from "next/head";
import PersonalityQuiz from "../components/PersonalityQuiz";
import MovieBattle from "../components/MovieBattle";

const TABS = [
  { id: "quiz",   label: "Personality Quiz", emoji: "🎭" },
  { id: "battle", label: "Battle Arena",      emoji: "⚔️" },
];

export default function ExplorePage() {
  const [tab, setTab] = useState("quiz");

  return (
    <>
      <Head>
        <title>Explore — MovieVerse</title>
      </Head>

      <div className="content-wrapper" style={{ paddingTop: 32, paddingBottom: 80 }}>

        {/* Header */}
        <div style={{ marginBottom: 36, textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.6rem",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            EXPLORE MOVIEVERSE
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Interactive tools to find your next obsession
          </p>
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 44,
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              data-cursor-hover
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 24px",
                borderRadius: "28px",
                border: `1px solid ${
                  tab === t.id ? "rgba(232,196,74,0.5)" : "var(--border-subtle)"
                }`,
                background:
                  tab === t.id ? "rgba(232,196,74,0.1)" : "var(--bg-card)",
                color:
                  tab === t.id ? "var(--accent-gold)" : "var(--text-secondary)",
                fontSize: "0.88rem",
                fontWeight: tab === t.id ? 600 : 400,
                cursor: "none",
                fontFamily: "var(--font-body)",
                transition: "all 0.2s",
                letterSpacing: "0.02em",
              }}
            >
              <span>{t.emoji}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div key={tab} className="anim-fade-in">
          {tab === "quiz"   && <PersonalityQuiz />}
          {tab === "battle" && <MovieBattle />}
        </div>
      </div>
    </>
  );
}
