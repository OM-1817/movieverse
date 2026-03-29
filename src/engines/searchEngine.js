// src/engines/searchEngine.js — Movie search engine

export const searchMovies = (movies, query) => {
  if (!query || query.trim() === "") return movies;
  const q = query.toLowerCase().trim();

  return movies.filter((movie) => {
    if (movie.title.toLowerCase().includes(q)) return true;
    if (movie.director.toLowerCase().includes(q)) return true;
    if (movie.actors.some((a) => a.toLowerCase().includes(q))) return true;
    if (movie.keywords && movie.keywords.some((k) => k.toLowerCase().includes(q))) return true;
    if (movie.overview && movie.overview.toLowerCase().includes(q)) return true;
    return false;
  });
};

export default searchMovies;
