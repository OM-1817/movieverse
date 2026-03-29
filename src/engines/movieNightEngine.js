// src/engines/movieNightEngine.js — Generate movie night suggestions

import MOVIES from "../data/movies";
import { shuffle } from "../utils/helpers";

export const MOODS = [
  { id: "thriller_night", label: "Edge of Your Seat", emoji: "😰", genres: ["Thriller", "Mystery", "Horror"], minRating: 7.0 },
  { id: "feel_good", label: "Feel Good Night", emoji: "😊", genres: ["Comedy", "Romance", "Animation", "Family"], minRating: 7.5 },
  { id: "epic_adventure", label: "Epic Adventure", emoji: "⚔️", genres: ["Action", "Adventure", "Fantasy"], minRating: 7.5 },
  { id: "mind_bender", label: "Mind Bender", emoji: "🤯", genres: ["Sci-Fi", "Thriller", "Mystery"], minRating: 7.8 },
  { id: "drama_night", label: "Deep Drama", emoji: "🎭", genres: ["Drama", "Biography", "History"], minRating: 8.0 },
  { id: "crime_night", label: "Crime Night", emoji: "🔍", genres: ["Crime", "Drama", "Thriller"], minRating: 7.5 },
  { id: "classics", label: "All-Time Classics", emoji: "⭐", genres: [], minRating: 8.5 },
  { id: "animated", label: "Animation Magic", emoji: "🎨", genres: ["Animation", "Family"], minRating: 7.5 },
];

export const generateMovieNight = (moodId, count = 3) => {
  const mood = MOODS.find((m) => m.id === moodId);
  if (!mood) return [];

  let candidates = MOVIES.filter((m) => m.rating >= mood.minRating);

  if (mood.genres.length > 0) {
    candidates = candidates.filter((m) =>
      m.genres.some((g) => mood.genres.includes(g))
    );
  }

  return shuffle(candidates).slice(0, count);
};

export default { MOODS, generateMovieNight };
