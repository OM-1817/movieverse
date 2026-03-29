# 🎬 MovieVerse

A cinematic movie discovery platform built with Next.js, React, Redux, and Material UI.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── components/          # UI components
│   ├── CursorGlow.jsx       — Animated custom cursor
│   ├── NavbarDock.jsx        — Floating dock navigation
│   ├── ThemeToggle.jsx       — Dark/Light theme switcher
│   ├── MovieCard.jsx         — Movie grid card
│   ├── MovieModal.jsx        — Full detail modal + recommendations
│   ├── MovieComparison.jsx   — Side-by-side comparison bar
│   ├── PersonalityQuiz.jsx   — 5-step personality quiz
│   ├── MovieBattle.jsx       — Vote-based battle arena
│   ├── SearchBar.jsx         — Debounced search input
│   ├── Filters.jsx           — Genre/year/rating filters + sort
│   └── Footer.jsx
│
├── pages/               # Next.js pages
│   ├── index.js             — Homepage (hero, recently viewed, recommendations, genre grid, movie night)
│   ├── movies.js            — All movies with infinite scroll
│   ├── watchlist.js         — Per-user saved movies
│   ├── explore.js           — Personality quiz + Battle arena
│   ├── login.js             — Authentication
│   ├── signup.js            — Registration with sarcastic password quotes
│   ├── actor/[slug].js      — Actor filmography pages
│   ├── director/[slug].js   — Director filmography pages
│   └── genre/[slug].js      — Genre browse pages
│
├── data/                # Static datasets
│   ├── movies.js            — 60 full movie records
│   ├── actors.js            — Actor profiles
│   ├── directors.js         — Director profiles
│   └── quotes.js            — Movie quotes + sarcastic password quotes
│
├── engines/             # Algorithm modules
│   ├── searchEngine.js      — Multi-field search (title, actor, director, keywords)
│   ├── filterEngine.js      — Genre/year/rating filter + sort
│   ├── recommendationEngine.js — Score-based recommendations
│   ├── personalityEngine.js — Quiz scoring + personality types
│   └── movieNightEngine.js  — Mood-based movie picker
│
├── systems/             # State & persistence
│   ├── authSystem.js        — localStorage auth (signup/login/session)
│   ├── watchlistSystem.js   — Per-user watchlist persistence
│   └── recentlyViewedSystem.js — Recently viewed tracking
│
├── store/
│   └── index.js             — Redux store (auth, theme, watchlist, recent, UI)
│
├── utils/
│   ├── storage.js           — localStorage abstraction
│   ├── validators.js        — Password validation + strength meter
│   └── helpers.js           — slugify, formatRuntime, getRatingColor, debounce, etc.
│
└── styles/
    ├── global.css           — CSS variables, dark/light theme, typography
    └── animations.css       — Keyframes, utility animation classes
```

---

## ✨ Features

| Feature | Description |
|---|---|
| **Cinematic UI** | Dark/light theme, custom cursor glow, Bebas Neue + Cinzel fonts |
| **Authentication** | Sign up / login / logout via localStorage, session persistence |
| **Password Validation** | Strength meter + sarcastic movie quotes on weak passwords |
| **Movie Discovery** | 60 movies with search, filters, and infinite scroll |
| **Search Engine** | Searches title, director, actor, keywords, overview |
| **Filtering** | Genre, release year, rating filters with chip UI |
| **Sorting** | Rating, year, A-Z, Z-A |
| **Infinite Scroll** | Loads 12 movies at a time on scroll |
| **Movie Detail Modal** | Full info, cast, related movies, watchlist, compare |
| **Recommendation Engine** | Score-based: genre × 3, rating × 2, year × 1, director bonus |
| **Watchlist** | Per-user, persisted in localStorage, with badge counter |
| **Recently Viewed** | Auto-tracked, shown on homepage |
| **Movie Night Generator** | Pick a mood → get 3–4 curated suggestions |
| **Personality Quiz** | 5 questions → personality type + tailored recommendations |
| **Movie Battle Arena** | Vote between two movies, track a leaderboard |
| **Movie Comparison** | Compare 2 movies side-by-side with stat bars |
| **Actor Pages** | `/actor/[slug]` — filmography for every cast member |
| **Director Pages** | `/director/[slug]` — filmography + bio + avg rating |
| **Genre Pages** | `/genre/[slug]` — browse with stats + related genres |

---

## 🎨 Design System

- **Primary Font:** Bebas Neue (display titles)
- **Secondary Font:** Cinzel (headings)
- **Body Font:** Inter
- **Accent Color:** Gold `#e8c44a`
- **Theme:** Full dark/light toggle via CSS variables + `[data-theme]`
- **Cursor:** Custom dot + ring cursor replaces the default

---

## 📦 Tech Stack

- **Next.js 14** — Framework
- **React 18** — UI
- **Redux Toolkit** — State management
- **Material UI 5** — Component library
- **Framer Motion** — Animations (available)
- **localStorage** — All persistence (no backend)

---

> All movie data is static and for demonstration purposes only.
