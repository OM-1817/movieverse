// src/engines/filterEngine.js — Movie filtering engine

export const filterMovies = (movies, filters) => {
  let results = [...movies];

  if (filters.genre && filters.genre !== "All") {
    results = results.filter((m) => m.genres.includes(filters.genre));
  }

  if (filters.year) {
    const minYear = parseInt(filters.year);
    results = results.filter((m) => m.year >= minYear);
  }

  if (filters.rating) {
    const minRating = parseFloat(filters.rating);
    results = results.filter((m) => m.rating >= minRating);
  }

  return results;
};

export const sortMovies = (movies, sortBy) => {
  const sorted = [...movies];
  switch (sortBy) {
    case "rating_desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "rating_asc":
      return sorted.sort((a, b) => a.rating - b.rating);
    case "year_desc":
      return sorted.sort((a, b) => b.year - a.year);
    case "year_asc":
      return sorted.sort((a, b) => a.year - b.year);
    case "title_az":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title_za":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
};

export default { filterMovies, sortMovies };
