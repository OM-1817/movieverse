// src/engines/personalityEngine.js — Movie personality quiz engine

export const PERSONALITY_QUESTIONS = [
  {
    id: 1,
    question: "How do you like to spend a Friday night?",
    options: [
      { text: "Solving a complex puzzle or board game", genres: ["Mystery", "Thriller", "Sci-Fi"], weight: 2 },
      { text: "Watching the stars and dreaming big", genres: ["Sci-Fi", "Adventure", "Drama"], weight: 2 },
      { text: "Meeting friends at a party", genres: ["Comedy", "Romance", "Action"], weight: 2 },
      { text: "Reading a deep novel alone", genres: ["Drama", "Biography", "History"], weight: 2 },
    ],
  },
  {
    id: 2,
    question: "Pick a vacation destination:",
    options: [
      { text: "A bustling city with nightlife", genres: ["Crime", "Thriller", "Drama"], weight: 2 },
      { text: "A remote mountain cabin", genres: ["Horror", "Mystery", "Drama"], weight: 2 },
      { text: "A magical fantasy world", genres: ["Fantasy", "Adventure", "Animation"], weight: 2 },
      { text: "A space station", genres: ["Sci-Fi", "Action", "Adventure"], weight: 2 },
    ],
  },
  {
    id: 3,
    question: "What type of music speaks to you?",
    options: [
      { text: "Epic orchestral scores", genres: ["Action", "Adventure", "War"], weight: 2 },
      { text: "Jazz and blues", genres: ["Drama", "Music", "Romance"], weight: 2 },
      { text: "Electronic and synthwave", genres: ["Sci-Fi", "Thriller", "Crime"], weight: 2 },
      { text: "Silence — no music needed", genres: ["Horror", "Mystery", "Drama"], weight: 2 },
    ],
  },
  {
    id: 4,
    question: "Your hero archetype:",
    options: [
      { text: "The reluctant hero who rises", genres: ["Drama", "Adventure", "Fantasy"], weight: 3 },
      { text: "The anti-hero with a code", genres: ["Crime", "Thriller", "Action"], weight: 3 },
      { text: "The trickster who outsmarts all", genres: ["Comedy", "Crime", "Mystery"], weight: 3 },
      { text: "The visionary who changes the world", genres: ["Biography", "Sci-Fi", "Drama"], weight: 3 },
    ],
  },
  {
    id: 5,
    question: "Choose a storytelling style:",
    options: [
      { text: "Non-linear and mind-bending", genres: ["Thriller", "Mystery", "Sci-Fi"], weight: 3 },
      { text: "Classic linear with emotional depth", genres: ["Drama", "Romance", "Biography"], weight: 3 },
      { text: "Fast-paced with big spectacle", genres: ["Action", "Adventure", "Sci-Fi"], weight: 3 },
      { text: "Quiet and character-driven", genres: ["Drama", "Romance", "Animation"], weight: 3 },
    ],
  },
];

export const PERSONALITY_TYPES = {
  "Action,Adventure": { type: "The Explorer", description: "You crave thrills and live for the next big adventure.", icon: "🌍" },
  "Drama,Romance": { type: "The Romantic", description: "You believe in deep human connections and emotional truth.", icon: "❤️" },
  "Sci-Fi,Thriller": { type: "The Visionary", description: "You're fascinated by the future and love having your mind blown.", icon: "🔭" },
  "Crime,Mystery": { type: "The Detective", description: "You have a sharp mind and love unraveling secrets.", icon: "🔍" },
  "Horror,Mystery": { type: "The Seeker of Darkness", description: "You're drawn to what lurks in the shadows.", icon: "🌑" },
  "Animation,Family": { type: "The Dreamer", description: "You never lost your sense of childlike wonder.", icon: "✨" },
  "Biography,History": { type: "The Scholar", description: "You believe real stories are the most powerful of all.", icon: "📚" },
  default: { type: "The Cinephile", description: "You appreciate all that cinema has to offer — a true film lover.", icon: "🎬" },
};

export const calculatePersonality = (answers) => {
  const genreScores = {};

  answers.forEach((answer) => {
    answer.genres.forEach((genre) => {
      genreScores[genre] = (genreScores[genre] || 0) + answer.weight;
    });
  });

  const sorted = Object.entries(genreScores).sort((a, b) => b[1] - a[1]);
  const topTwo = sorted.slice(0, 2).map(([genre]) => genre).join(",");

  return PERSONALITY_TYPES[topTwo] || PERSONALITY_TYPES.default;
};

export default { PERSONALITY_QUESTIONS, calculatePersonality };
