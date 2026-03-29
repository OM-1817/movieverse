// src/components/PersonalityQuiz.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../store";
import { PERSONALITY_QUESTIONS, calculatePersonality } from "../engines/personalityEngine";
import { getPersonalizedRecommendations } from "../engines/recommendationEngine";
import MOVIES from "../data/movies";
import MovieCard from "./MovieCard";

const TOTAL = PERSONALITY_QUESTIONS.length;

export default function PersonalityQuiz() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0); // 0 = intro, 1..N = questions, N+1 = result
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [recs, setRecs] = useState([]);

  const question = PERSONALITY_QUESTIONS[step - 1];
  const isIntro = step === 0;
  const isResult = step === TOTAL + 1;
  const progress = step === 0 ? 0 : Math.round((step / TOTAL) * 100);

  const handleStart = () => setStep(1);

  const handleSelect = (option) => setSelected(option);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (step === TOTAL) {
      const personality = calculatePersonality(newAnswers);
      setResult(personality);

      // Build fake "viewed" history from top-genre answers
      const topGenres = newAnswers.flatMap((a) => a.genres);
      const fakeViewed = MOVIES.filter((m) => m.genres.some((g) => topGenres.includes(g))).slice(0, 5);
      setRecs(getPersonalizedRecommendations(fakeViewed, MOVIES, 6));
      setStep(TOTAL + 1);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setResult(null);
    setRecs([]);
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "40px 36px",
        maxWidth: 680,
        margin: "0 auto",
      }}
    >
      {/* ── Intro ──────────────────────────────────────────────────────── */}
      {isIntro && (
        <div className="anim-fade-in" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>🎭</div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            WHAT'S YOUR MOVIE PERSONALITY?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 28px" }}>
            Answer {TOTAL} quick questions and we'll reveal your cinematic soul — and the movies made for you.
          </p>
          <button
            onClick={handleStart}
            data-cursor-hover
            style={{
              padding: "13px 32px",
              borderRadius: "28px",
              border: "none",
              background: "var(--accent-gold)",
              color: "#0a0a0f",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "none",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.03em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Start the Quiz →
          </button>
        </div>
      )}

      {/* ── Question ───────────────────────────────────────────────────── */}
      {!isIntro && !isResult && question && (
        <div className="anim-fade-in">
          {/* Progress */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Question {step} of {TOTAL}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--accent-gold)", fontWeight: 600 }}>
                {progress}%
              </span>
            </div>
            <div
              style={{
                height: 4,
                background: "var(--bg-elevated)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "var(--accent-gold)",
                  borderRadius: 2,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* Question text */}
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              color: "var(--text-primary)",
              marginBottom: 24,
              lineHeight: 1.4,
            }}
          >
            {question.question}
          </h3>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {question.options.map((opt, i) => {
              const isSelected = selected === opt;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  data-cursor-hover
                  style={{
                    padding: "14px 18px",
                    borderRadius: "var(--radius-md)",
                    border: `1px solid ${isSelected ? "rgba(232,196,74,0.6)" : "var(--border-subtle)"}`,
                    background: isSelected ? "rgba(232,196,74,0.12)" : "var(--bg-elevated)",
                    color: isSelected ? "var(--accent-gold)" : "var(--text-primary)",
                    fontSize: "0.9rem",
                    textAlign: "left",
                    cursor: "none",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.2s",
                    fontWeight: isSelected ? 600 : 400,
                    boxShadow: isSelected ? "0 0 0 3px rgba(232,196,74,0.1)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.background = "var(--bg-glass)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.background = "var(--bg-elevated)";
                    }
                  }}
                >
                  <span style={{ marginRight: 10, opacity: 0.5 }}>{["A", "B", "C", "D"][i]}.</span>
                  {opt.text}
                </button>
              );
            })}
          </div>

          {/* Next button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleNext}
              disabled={!selected}
              data-cursor-hover
              style={{
                padding: "10px 28px",
                borderRadius: "24px",
                border: "none",
                background: selected ? "var(--accent-gold)" : "var(--bg-elevated)",
                color: selected ? "#0a0a0f" : "var(--text-muted)",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: selected ? "none" : "not-allowed",
                fontFamily: "var(--font-body)",
                transition: "all 0.2s",
                opacity: selected ? 1 : 0.5,
              }}
            >
              {step === TOTAL ? "See Results →" : "Next →"}
            </button>
          </div>
        </div>
      )}

      {/* ── Result ─────────────────────────────────────────────────────── */}
      {isResult && result && (
        <div className="anim-scale-in">
          {/* Result card */}
          <div
            style={{
              textAlign: "center",
              padding: "32px 24px",
              background: "rgba(232,196,74,0.06)",
              border: "1px solid rgba(232,196,74,0.2)",
              borderRadius: "var(--radius-lg)",
              marginBottom: 36,
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: 12 }}>{result.icon}</div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: 8,
              }}
            >
              Your Movie Personality
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.2rem",
                color: "var(--accent-gold)",
                letterSpacing: "0.08em",
                marginBottom: 14,
              }}
            >
              {result.type.toUpperCase()}
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                maxWidth: 380,
                margin: "0 auto",
              }}
            >
              {result.description}
            </p>
          </div>

          {/* Recommendations */}
          {recs.length > 0 && (
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.1rem",
                  color: "var(--text-primary)",
                  marginBottom: 18,
                  textAlign: "center",
                }}
              >
                Movies Made For You
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                  gap: 14,
                  marginBottom: 28,
                }}
              >
                {recs.map((movie, i) => (
                  <MovieCard key={movie.id} movie={movie} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Retake */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleRestart}
              data-cursor-hover
              style={{
                padding: "10px 24px",
                borderRadius: "24px",
                border: "1px solid var(--border-subtle)",
                background: "transparent",
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                cursor: "none",
                fontFamily: "var(--font-body)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-gold)";
                e.currentTarget.style.color = "var(--accent-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              ↺ Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
