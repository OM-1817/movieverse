// src/engines/recommendationEngine.js — Score-based recommendation engine

export const scoreRecommendation = (target, candidate) => {
  if (target.id === candidate.id) return -1;

  let score = 0;

  // Genre match: 3 points per shared genre
  const sharedGenres = target.genres.filter((g) => candidate.genres.includes(g));
  score += sharedGenres.length * 3;

  // Rating similarity: 2 points if within 1.0 rating
  const ratingDiff = Math.abs(target.rating - candidate.rating);
  if (ratingDiff <= 0.5) score += 4;
  else if (ratingDiff <= 1.0) score += 2;

  // Year similarity: 1 point if within 5 years
  const yearDiff = Math.abs(target.year - candidate.year);
  if (yearDiff <= 3) score += 2;
  else if (yearDiff <= 5) score += 1;

  // Same director: 5 bonus points
  if (target.director === candidate.director) score += 5;

  // Shared actors: 2 points per shared actor
  const sharedActors = target.actors.filter((a) => candidate.actors.includes(a));
  score += sharedActors.length * 2;

  return score;
};

export const getRecommendations = (movie, allMovies, limit = 6) => {
  if (!movie) return [];

  return allMovies
    .map((m) => ({ ...m, score: scoreRecommendation(movie, m) }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const getPersonalizedRecommendations = (viewedMovies, allMovies, limit = 12) => {
  if (!viewedMovies || viewedMovies.length === 0) return allMovies.slice(0, limit);

  const scoreMap = {};
  viewedMovies.forEach((viewed) => {
    allMovies.forEach((m) => {
      if (!scoreMap[m.id]) scoreMap[m.id] = 0;
      scoreMap[m.id] += scoreRecommendation(viewed, m);
    });
  });

  return allMovies
    .filter((m) => !viewedMovies.find((v) => v.id === m.id))
    .sort((a, b) => (scoreMap[b.id] || 0) - (scoreMap[a.id] || 0))
    .slice(0, limit);
};

export default { getRecommendations, getPersonalizedRecommendations };
