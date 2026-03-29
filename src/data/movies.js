// src/data/movies.js — Static movie dataset with working TMDB poster URLs

export const MOVIES = [
  {
    id: 1, title: "Inception", year: 2010, rating: 8.8,
    genres: ["Sci-Fi", "Action", "Thriller"],
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy", "Ken Watanabe"],
    runtime: 148,
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    keywords: ["dreams", "heist", "mind", "reality", "subconscious"]
  },
  {
    id: 2, title: "The Dark Knight", year: 2008, rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman"],
    runtime: 152,
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    keywords: ["batman", "joker", "gotham", "chaos", "vigilante"]
  },
  {
    id: 3, title: "Interstellar", year: 2014, rating: 8.6,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    director: "Christopher Nolan",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Matt Damon", "Michael Caine"],
    runtime: 169,
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIe.jpg",
    keywords: ["space", "wormhole", "time", "gravity", "love"]
  },
  {
    id: 4, title: "The Shawshank Redemption", year: 1994, rating: 9.3,
    genres: ["Drama"],
    director: "Frank Darabont",
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler", "Clancy Brown"],
    runtime: 142,
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    keywords: ["prison", "hope", "friendship", "escape", "justice"]
  },
  {
    id: 5, title: "Pulp Fiction", year: 1994, rating: 8.9,
    genres: ["Crime", "Drama", "Thriller"],
    director: "Quentin Tarantino",
    actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis", "Harvey Keitel"],
    runtime: 154,
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    keywords: ["crime", "nonlinear", "hitmen", "redemption", "dialogue"]
  },
  {
    id: 6, title: "The Godfather", year: 1972, rating: 9.2,
    genres: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    actors: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall", "Diane Keaton"],
    runtime: 175,
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLeMMovrI834.jpg",
    keywords: ["mafia", "family", "power", "loyalty", "italy"]
  },
  {
    id: 7, title: "Forrest Gump", year: 1994, rating: 8.8,
    genres: ["Drama", "Romance"],
    director: "Robert Zemeckis",
    actors: ["Tom Hanks", "Robin Wright", "Gary Sinise", "Sally Field", "Mykelti Williamson"],
    runtime: 142,
    overview: "Historical events unfold through the perspective of an Alabama man with an extraordinary life journey.",
    poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    keywords: ["life", "history", "simplicity", "love", "journey"]
  },
  {
    id: 8, title: "The Matrix", year: 1999, rating: 8.7,
    genres: ["Sci-Fi", "Action"],
    director: "Lana Wachowski",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving", "Joe Pantoliano"],
    runtime: 136,
    overview: "A hacker discovers the shocking truth that the life he knows is the elaborate deception of an evil cyber-intelligence.",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    keywords: ["simulation", "reality", "chosen one", "machines", "hacker"]
  },
  {
    id: 9, title: "Goodfellas", year: 1990, rating: 8.7,
    genres: ["Crime", "Drama", "Biography"],
    director: "Martin Scorsese",
    actors: ["Ray Liotta", "Robert De Niro", "Joe Pesci", "Lorraine Bracco", "Paul Sorvino"],
    runtime: 146,
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his mob partners.",
    poster: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    keywords: ["mob", "mafia", "crime", "greed", "rise and fall"]
  },
  {
    id: 10, title: "Fight Club", year: 1999, rating: 8.8,
    genres: ["Drama", "Thriller"],
    director: "David Fincher",
    actors: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter", "Meat Loaf", "Jared Leto"],
    runtime: 139,
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much more.",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    keywords: ["identity", "consumerism", "anarchy", "masculinity", "twist"]
  },
  {
    id: 11, title: "The Silence of the Lambs", year: 1991, rating: 8.6,
    genres: ["Crime", "Drama", "Thriller"],
    director: "Jonathan Demme",
    actors: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn", "Ted Levine", "Anthony Heald"],
    runtime: 118,
    overview: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    poster: "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    keywords: ["serial killer", "fbi", "psychological", "horror", "cannibal"]
  },
  {
    id: 12, title: "Schindler's List", year: 1993, rating: 9.0,
    genres: ["Biography", "Drama", "History"],
    director: "Steven Spielberg",
    actors: ["Liam Neeson", "Ben Kingsley", "Ralph Fiennes", "Caroline Goodall", "Jonathan Sagall"],
    runtime: 195,
    overview: "Industrialist Oskar Schindler becomes concerned for his Jewish workforce during WWII and risks everything to save them.",
    poster: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    keywords: ["holocaust", "war", "humanity", "rescue", "history"]
  },
  {
    id: 13, title: "The Lord of the Rings: The Return of the King", year: 2003, rating: 9.0,
    genres: ["Adventure", "Drama", "Fantasy"],
    director: "Peter Jackson",
    actors: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen", "Orlando Bloom", "Cate Blanchett"],
    runtime: 201,
    overview: "Gandalf and Aragorn lead the World of Men against Sauron's army while Frodo and Sam approach Mount Doom with the One Ring.",
    poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    keywords: ["ring", "quest", "evil", "fellowship", "war"]
  },
  {
    id: 14, title: "Star Wars: A New Hope", year: 1977, rating: 8.6,
    genres: ["Action", "Adventure", "Fantasy"],
    director: "George Lucas",
    actors: ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Alec Guinness", "Peter Cushing"],
    runtime: 121,
    overview: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire.",
    poster: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    keywords: ["jedi", "force", "galaxy", "rebellion", "droids"]
  },
  {
    id: 15, title: "The Avengers", year: 2012, rating: 8.0,
    genres: ["Action", "Sci-Fi", "Adventure"],
    director: "Joss Whedon",
    actors: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson", "Chris Hemsworth", "Mark Ruffalo"],
    runtime: 143,
    overview: "Earth's mightiest heroes must come together to stop Loki and his alien army from enslaving humanity.",
    poster: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7KE3wYQnx.jpg",
    keywords: ["superhero", "team", "marvel", "aliens", "earth"]
  },
  {
    id: 16, title: "Joker", year: 2019, rating: 8.4,
    genres: ["Crime", "Drama", "Thriller"],
    director: "Todd Phillips",
    actors: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz", "Frances Conroy", "Brett Cullen"],
    runtime: 122,
    overview: "Mentally troubled comedian Arthur Fleck embarks on a downward spiral of revolution and bloody crime in Gotham City.",
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    keywords: ["joker", "society", "mental illness", "chaos", "origin"]
  },
  {
    id: 17, title: "Parasite", year: 2019, rating: 8.5,
    genres: ["Comedy", "Drama", "Thriller"],
    director: "Bong Joon-ho",
    actors: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik", "Park So-dam"],
    runtime: 132,
    overview: "Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    keywords: ["class", "inequality", "deception", "wealth", "family"]
  },
  {
    id: 18, title: "Avengers: Endgame", year: 2019, rating: 8.4,
    genres: ["Action", "Adventure", "Sci-Fi"],
    director: "Anthony Russo",
    actors: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"],
    runtime: 181,
    overview: "The Avengers assemble once more to reverse Thanos' actions and restore the universe.",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    keywords: ["time travel", "thanos", "marvel", "sacrifice", "infinity"]
  },
  {
    id: 19, title: "Spirited Away", year: 2001, rating: 8.6,
    genres: ["Animation", "Adventure", "Family"],
    director: "Hayao Miyazaki",
    actors: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino", "Rumi Hiiragi", "Mari Natsuki"],
    runtime: 125,
    overview: "A sulky 10-year-old girl wanders into a world ruled by gods, witches, and spirits during her family's move.",
    poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    keywords: ["spirit", "magic", "coming of age", "japan", "animation"]
  },
  {
    id: 20, title: "The Lion King", year: 1994, rating: 8.5,
    genres: ["Animation", "Adventure", "Drama"],
    director: "Roger Allers",
    actors: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones", "Jonathan Taylor Thomas", "Moira Kelly"],
    runtime: 88,
    overview: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    poster: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    keywords: ["king", "lion", "betrayal", "destiny", "africa"]
  },
  {
    id: 21, title: "Titanic", year: 1997, rating: 7.9,
    genres: ["Drama", "Romance"],
    director: "James Cameron",
    actors: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane", "Kathy Bates", "Frances Fisher"],
    runtime: 194,
    overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the ill-fated R.M.S. Titanic.",
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    keywords: ["ship", "love", "disaster", "ocean", "tragedy"]
  },
  {
    id: 22, title: "Gladiator", year: 2000, rating: 8.5,
    genres: ["Action", "Adventure", "Drama"],
    director: "Ridley Scott",
    actors: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen", "Oliver Reed", "Derek Jacobi"],
    runtime: 155,
    overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
    poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    keywords: ["rome", "gladiator", "vengeance", "arena", "empire"]
  },
  {
    id: 23, title: "The Prestige", year: 2006, rating: 8.5,
    genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    actors: ["Christian Bale", "Hugh Jackman", "Scarlett Johansson", "Michael Caine", "Andy Serkis"],
    runtime: 130,
    overview: "Two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have.",
    poster: "https://image.tmdb.org/t/p/w500/5MXyQfz8xUP3dIFPTubhTsbFY6V.jpg",
    keywords: ["magic", "illusion", "obsession", "rivalry", "sacrifice"]
  },
  {
    id: 24, title: "Memento", year: 2000, rating: 8.4,
    genres: ["Mystery", "Thriller"],
    director: "Christopher Nolan",
    actors: ["Guy Pearce", "Carrie-Anne Moss", "Joe Pantoliano", "Mark Boone Junior", "Russ Fega"],
    runtime: 113,
    overview: "A man with short-term memory loss attempts to track down his wife's murderer.",
    poster: "https://image.tmdb.org/t/p/w500/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg",
    keywords: ["memory", "mystery", "nonlinear", "investigation", "identity"]
  },
  {
    id: 25, title: "Whiplash", year: 2014, rating: 8.5,
    genres: ["Drama", "Music"],
    director: "Damien Chazelle",
    actors: ["Miles Teller", "J.K. Simmons", "Paul Reiser", "Melissa Benoist", "Austin Stowell"],
    runtime: 107,
    overview: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are tested.",
    poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    keywords: ["music", "ambition", "perfection", "jazz", "obsession"]
  },
  {
    id: 26, title: "La La Land", year: 2016, rating: 8.0,
    genres: ["Comedy", "Drama", "Music", "Romance"],
    director: "Damien Chazelle",
    actors: ["Ryan Gosling", "Emma Stone", "John Legend", "Rosemarie DeWitt", "J.K. Simmons"],
    runtime: 128,
    overview: "While navigating their careers in Los Angeles, a pianist and an actress fall in love.",
    poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    keywords: ["love", "music", "dreams", "jazz", "los angeles"]
  },
  {
    id: 27, title: "Get Out", year: 2017, rating: 7.7,
    genres: ["Horror", "Mystery", "Thriller"],
    director: "Jordan Peele",
    actors: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford", "Catherine Keener", "Caleb Landry Jones"],
    runtime: 104,
    overview: "A young African-American visits his white girlfriend's parents where simmering uneasiness eventually reaches a boiling point.",
    poster: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    keywords: ["race", "horror", "paranoia", "social commentary", "psychological"]
  },
  {
    id: 28, title: "Mad Max: Fury Road", year: 2015, rating: 8.1,
    genres: ["Action", "Adventure", "Sci-Fi"],
    director: "George Miller",
    actors: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne", "Rosie Huntington-Whiteley"],
    runtime: 120,
    overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.",
    poster: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    keywords: ["wasteland", "chase", "survival", "tyranny", "rebellion"]
  },
  {
    id: 29, title: "Gone Girl", year: 2014, rating: 8.1,
    genres: ["Drama", "Mystery", "Thriller"],
    director: "David Fincher",
    actors: ["Ben Affleck", "Rosamund Pike", "Neil Patrick Harris", "Tyler Perry", "Carrie Coon"],
    runtime: 149,
    overview: "With his wife's disappearance having become a media circus, a man finds himself suspected of foul play.",
    poster: "https://image.tmdb.org/t/p/w500/fOS8pBDX8KBnT0SMZQL9TLCzWBK.jpg",
    keywords: ["marriage", "mystery", "media", "deception", "disappearance"]
  },
  {
    id: 30, title: "Black Swan", year: 2010, rating: 8.0,
    genres: ["Drama", "Horror", "Mystery", "Thriller"],
    director: "Darren Aronofsky",
    actors: ["Natalie Portman", "Mila Kunis", "Vincent Cassel", "Barbara Hershey", "Winona Ryder"],
    runtime: 108,
    overview: "A committed dancer wins the lead role in Swan Lake only to find herself struggling to maintain her sanity.",
    poster: "https://image.tmdb.org/t/p/w500/wedPMnPHpFvEJPyLRSsB5lzpFQg.jpg",
    keywords: ["ballet", "obsession", "identity", "perfection", "madness"]
  },
  {
    id: 31, title: "The Social Network", year: 2010, rating: 7.7,
    genres: ["Biography", "Drama"],
    director: "David Fincher",
    actors: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake", "Armie Hammer", "Max Minghella"],
    runtime: 120,
    overview: "As Harvard student Mark Zuckerberg creates Facebook, he is sued by the twins who claimed he stole their idea.",
    poster: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHso.jpg",
    keywords: ["facebook", "startup", "betrayal", "harvard", "tech"]
  },
  {
    id: 32, title: "No Country for Old Men", year: 2007, rating: 8.1,
    genres: ["Crime", "Drama", "Thriller"],
    director: "Joel Coen",
    actors: ["Tommy Lee Jones", "Javier Bardem", "Josh Brolin", "Woody Harrelson", "Kelly Macdonald"],
    runtime: 122,
    overview: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and two million dollars in cash.",
    poster: "https://image.tmdb.org/t/p/w500/6d5XOczc2SoIamUkKQKhKBEjCBg.jpg",
    keywords: ["violence", "fate", "chase", "west texas", "mortality"]
  },
  {
    id: 33, title: "Blade Runner 2049", year: 2017, rating: 8.0,
    genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"],
    director: "Denis Villeneuve",
    actors: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Dave Bautista", "Robin Wright"],
    runtime: 164,
    overview: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
    poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    keywords: ["replicants", "future", "memory", "dystopia", "identity"]
  },
  {
    id: 34, title: "Arrival", year: 2016, rating: 7.9,
    genres: ["Drama", "Mystery", "Sci-Fi"],
    director: "Denis Villeneuve",
    actors: ["Amy Adams", "Jeremy Renner", "Forest Whitaker", "Michael Stuhlbarg", "Mark O'Brien"],
    runtime: 116,
    overview: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
    poster: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
    keywords: ["aliens", "language", "time", "communication", "linguistics"]
  },
  {
    id: 35, title: "Hereditary", year: 2018, rating: 7.3,
    genres: ["Drama", "Horror", "Mystery", "Thriller"],
    director: "Ari Aster",
    actors: ["Toni Collette", "Alex Wolff", "Milly Shapiro", "Ann Dowd", "Gabriel Byrne"],
    runtime: 127,
    overview: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.",
    poster: "https://image.tmdb.org/t/p/w500/4O1jtBxYZiRtcHFkLElrKP4CMOP.jpg",
    keywords: ["family", "grief", "occult", "horror", "supernatural"]
  },
  {
    id: 36, title: "Once Upon a Time in Hollywood", year: 2019, rating: 7.6,
    genres: ["Comedy", "Drama"],
    director: "Quentin Tarantino",
    actors: ["Leonardo DiCaprio", "Brad Pitt", "Margot Robbie", "Emile Hirsch", "Margaret Qualley"],
    runtime: 161,
    overview: "A faded television actor and his stunt double strive to achieve fame in the final years of Hollywood's Golden Age.",
    poster: "https://image.tmdb.org/t/p/w500/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg",
    keywords: ["hollywood", "1960s", "nostalgia", "manson", "stardom"]
  },
  {
    id: 37, title: "The Grand Budapest Hotel", year: 2014, rating: 8.1,
    genres: ["Adventure", "Comedy", "Crime", "Drama"],
    director: "Wes Anderson",
    actors: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric", "Adrien Brody", "Willem Dafoe"],
    runtime: 99,
    overview: "A writer encounters the owner of an aging high-class hotel who tells him of his early years under an exceptional concierge.",
    poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    keywords: ["hotel", "europe", "whimsy", "art theft", "friendship"]
  },
  {
    id: 38, title: "Moonlight", year: 2016, rating: 7.4,
    genres: ["Drama", "Romance"],
    director: "Barry Jenkins",
    actors: ["Mahershala Ali", "Naomie Harris", "Trevante Rhodes", "André Holland", "Janelle Monáe"],
    runtime: 111,
    overview: "A young African-American man grapples with his identity and sexuality across three chapters of his life.",
    poster: "https://image.tmdb.org/t/p/w500/4911T5FbJ9eAlnGgno5MpTk7mAe.jpg",
    keywords: ["identity", "sexuality", "coming of age", "drugs", "belonging"]
  },
  {
    id: 39, title: "Her", year: 2013, rating: 8.0,
    genres: ["Drama", "Romance", "Sci-Fi"],
    director: "Spike Jonze",
    actors: ["Joaquin Phoenix", "Amy Adams", "Scarlett Johansson", "Rooney Mara", "Olivia Wilde"],
    runtime: 126,
    overview: "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    poster: "https://image.tmdb.org/t/p/w500/eCOtqtfvn7mxGqFOdA2KKGXZQ9e.jpg",
    keywords: ["AI", "loneliness", "love", "future", "technology"]
  },
  {
    id: 40, title: "2001: A Space Odyssey", year: 1968, rating: 8.3,
    genres: ["Adventure", "Sci-Fi"],
    director: "Stanley Kubrick",
    actors: ["Keir Dullea", "Gary Lockwood", "William Sylvester", "Douglas Rain", "Daniel Richter"],
    runtime: 149,
    overview: "After discovering a mysterious artifact buried beneath the Lunar surface, mankind sets off on a quest with H.A.L. 9000.",
    poster: "https://image.tmdb.org/t/p/w500/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg",
    keywords: ["space", "AI", "monolith", "evolution", "odyssey"]
  },
  {
    id: 41, title: "Dune", year: 2021, rating: 8.0,
    genres: ["Action", "Adventure", "Drama", "Sci-Fi"],
    director: "Denis Villeneuve",
    actors: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac", "Josh Brolin", "Stellan Skarsgård"],
    runtime: 155,
    overview: "The son of a noble family is entrusted with the protection of the most vital element in the galaxy.",
    poster: "https://image.tmdb.org/t/p/w500/d5NXSklpcvkAv1GJi9ylFOBBCGZ.jpg",
    keywords: ["spice", "desert", "prophecy", "empire", "arrakis"]
  },
  {
    id: 42, title: "Tenet", year: 2020, rating: 7.3,
    genres: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    actors: ["John David Washington", "Robert Pattinson", "Elizabeth Debicki", "Dimple Kapadia", "Michael Caine"],
    runtime: 150,
    overview: "A Protagonist journeys through a twilight world of international espionage on a mission beyond real time.",
    poster: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijMFa8.jpg",
    keywords: ["time inversion", "espionage", "entropy", "future", "mission"]
  },
  {
    id: 43, title: "1917", year: 2019, rating: 8.3,
    genres: ["Drama", "War"],
    director: "Sam Mendes",
    actors: ["George MacKay", "Dean-Charles Chapman", "Mark Strong", "Andrew Scott", "Richard Madden"],
    runtime: 119,
    overview: "Two British soldiers during WWI are given an impossible mission: deliver a message to stop 1,600 men from walking into a trap.",
    poster: "https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYQLAjPvep.jpg",
    keywords: ["war", "one shot", "mission", "wwi", "survival"]
  },
  {
    id: 44, title: "Knives Out", year: 2019, rating: 7.9,
    genres: ["Comedy", "Crime", "Drama", "Mystery"],
    director: "Rian Johnson",
    actors: ["Daniel Craig", "Ana de Armas", "Chris Evans", "Jamie Lee Curtis", "Michael Shannon"],
    runtime: 130,
    overview: "A detective investigates the death of a patriarch of an eccentric, combative family.",
    poster: "https://image.tmdb.org/t/p/w500/pThyQovXQrws2hmUT088getmfkw.jpg",
    keywords: ["whodunit", "mystery", "family", "inheritance", "detective"]
  },
  {
    id: 45, title: "Portrait of a Lady on Fire", year: 2019, rating: 8.1,
    genres: ["Drama", "Romance"],
    director: "Céline Sciamma",
    actors: ["Noémie Merlant", "Adèle Haenel", "Luàna Bajrami", "Valeria Golino", "Armande Boulanger"],
    runtime: 122,
    overview: "On an isolated island in Brittany, a female painter is obliged to paint a wedding portrait of a young woman.",
    poster: "https://image.tmdb.org/t/p/w500/3l3IKq2fBMSbHPuNMRdkBhYJHDf.jpg",
    keywords: ["love", "painting", "18th century", "forbidden", "memory"]
  },
  {
    id: 46, title: "The Witch", year: 2015, rating: 6.9,
    genres: ["Drama", "Horror", "Mystery"],
    director: "Robert Eggers",
    actors: ["Anya Taylor-Joy", "Ralph Ineson", "Kate Dickie", "Harvey Scrimshaw", "Ellie Grainger"],
    runtime: 92,
    overview: "A family in 1630s New England is torn apart by the forces of witchcraft, black magic, and possession.",
    poster: "https://image.tmdb.org/t/p/w500/zhVniMBEHYurKLBgLiEMW8eCGre.jpg",
    keywords: ["witch", "puritan", "17th century", "evil", "folk horror"]
  },
  {
    id: 47, title: "Midsommar", year: 2019, rating: 7.1,
    genres: ["Drama", "Horror", "Mystery", "Thriller"],
    director: "Ari Aster",
    actors: ["Florence Pugh", "Jack Reynor", "Vilhelm Blomgren", "William Jackson Harper", "Björn Andresen"],
    runtime: 148,
    overview: "A couple travels to Sweden for a midsummer festival that devolves into an increasingly violent and bizarre competition.",
    poster: "https://image.tmdb.org/t/p/w500/7LEI8ulZzO5gy9Ww2NVCrKmHeDZ.jpg",
    keywords: ["pagan", "sweden", "cult", "summer", "ritual"]
  },
  {
    id: 48, title: "Baby Driver", year: 2017, rating: 7.6,
    genres: ["Action", "Crime", "Drama", "Music"],
    director: "Edgar Wright",
    actors: ["Ansel Elgort", "Kevin Spacey", "Lily James", "Jon Bernthal", "Eiza González"],
    runtime: 113,
    overview: "A young getaway driver with tinnitus finds himself taking part in a heist doomed to fail.",
    poster: "https://image.tmdb.org/t/p/w500/1O6e9RNMqAGoGFmKy63ZMtjSXAH.jpg",
    keywords: ["getaway", "music", "heist", "tinnitus", "crime"]
  },
  {
    id: 49, title: "Dunkirk", year: 2017, rating: 7.8,
    genres: ["Action", "Drama", "History", "Thriller", "War"],
    director: "Christopher Nolan",
    actors: ["Fionn Whitehead", "Tom Glynn-Carney", "Jack Lowden", "Harry Styles", "Mark Rylance"],
    runtime: 106,
    overview: "Allied soldiers are surrounded by the German Army and evacuated during a fierce battle in World War II.",
    poster: "https://image.tmdb.org/t/p/w500/ebSnODDg9lbsMIaWg2uAbjn7TO5.jpg",
    keywords: ["wwii", "evacuation", "survival", "beach", "war"]
  },
  {
    id: 50, title: "The Irishman", year: 2019, rating: 7.8,
    genres: ["Biography", "Crime", "Drama"],
    director: "Martin Scorsese",
    actors: ["Robert De Niro", "Al Pacino", "Joe Pesci", "Harvey Keitel", "Ray Romano"],
    runtime: 209,
    overview: "Hitman Frank Sheeran looks back at the secrets he kept as a loyal member of the Bufalino crime family.",
    poster: "https://image.tmdb.org/t/p/w500/mbm8k3GFhXS0Rock5MZBpV8zR7V.jpg",
    keywords: ["mafia", "aging", "loyalty", "betrayal", "hoffa"]
  },
  {
    id: 51, title: "Drive", year: 2011, rating: 7.8,
    genres: ["Crime", "Drama", "Thriller"],
    director: "Nicolas Winding Refn",
    actors: ["Ryan Gosling", "Carey Mulligan", "Bryan Cranston", "Albert Brooks", "Oscar Isaac"],
    runtime: 100,
    overview: "A Hollywood stuntman who moonlights as a getaway driver finds himself in trouble when he tries to help his neighbor.",
    poster: "https://image.tmdb.org/t/p/w500/602vevIURmpzkYPERZcNSwhfiHh.jpg",
    keywords: ["driver", "neo-noir", "getaway", "violence", "silence"]
  },
  {
    id: 52, title: "Oldboy", year: 2003, rating: 8.4,
    genres: ["Action", "Drama", "Mystery", "Thriller"],
    director: "Park Chan-wook",
    actors: ["Choi Min-sik", "Yoo Ji-tae", "Gang Hye-jung", "Kim Byeong-ok", "Oh Dal-su"],
    runtime: 120,
    overview: "After being imprisoned in a cell for 15 years without explanation, a man is released and given five days to find his captor.",
    poster: "https://image.tmdb.org/t/p/w500/pWDtjs568ZfOTMbURQBmrFuDyJY.jpg",
    keywords: ["revenge", "mystery", "imprisonment", "korean", "twist"]
  },
  {
    id: 53, title: "Pan's Labyrinth", year: 2006, rating: 8.2,
    genres: ["Drama", "Fantasy", "War"],
    director: "Guillermo del Toro",
    actors: ["Ivana Baquero", "Ariadna Gil", "Sergi López", "Doug Jones", "Maribel Verdú"],
    runtime: 118,
    overview: "In Falangist Spain of 1944, a bookish young girl escapes into an eerie but captivating fantasy world.",
    poster: "https://image.tmdb.org/t/p/w500/hBNZIAm80X2S3eaqaFaJGp1BKWQ.jpg",
    keywords: ["fantasy", "war", "labyrinth", "spain", "fairy tale"]
  },
  {
    id: 54, title: "WALL-E", year: 2008, rating: 8.4,
    genres: ["Animation", "Adventure", "Family", "Sci-Fi"],
    director: "Andrew Stanton",
    actors: ["Ben Burtt", "Elissa Knight", "Jeff Garlin", "Fred Willard", "John Ratzenberger"],
    runtime: 98,
    overview: "A small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
    poster: "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
    keywords: ["robot", "love", "earth", "space", "environment"]
  },
  {
    id: 55, title: "Toy Story", year: 1995, rating: 8.3,
    genres: ["Animation", "Adventure", "Comedy", "Family"],
    director: "John Lasseter",
    actors: ["Tom Hanks", "Tim Allen", "Don Rickles", "Jim Varney", "Wallace Shawn"],
    runtime: 81,
    overview: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy.",
    poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPl9zvVXX.jpg",
    keywords: ["toys", "childhood", "friendship", "imagination", "adventure"]
  },
  {
    id: 56, title: "Up", year: 2009, rating: 8.2,
    genres: ["Animation", "Adventure", "Comedy", "Drama", "Family"],
    director: "Pete Docter",
    actors: ["Edward Asner", "Jordan Nagai", "John Ratzenberger", "Christopher Plummer", "Delroy Lindo"],
    runtime: 96,
    overview: "78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, taking a young stowaway.",
    poster: "https://image.tmdb.org/t/p/w500/pSoWNaGH6LLQlCKXSCVMhbFHBuC.jpg",
    keywords: ["adventure", "love", "old age", "balloon", "dreams"]
  },
  {
    id: 57, title: "The Shining", year: 1980, rating: 8.4,
    genres: ["Drama", "Horror"],
    director: "Stanley Kubrick",
    actors: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd", "Scatman Crothers", "Barry Nelson"],
    runtime: 146,
    overview: "A family heads to an isolated hotel for the winter where an evil presence influences the father into violence.",
    poster: "https://image.tmdb.org/t/p/w500/nRj5511mZdTl4saWEPoj9QroTIu.jpg",
    keywords: ["hotel", "madness", "isolation", "haunting", "writer"]
  },
  {
    id: 58, title: "A Clockwork Orange", year: 1971, rating: 8.3,
    genres: ["Crime", "Drama", "Sci-Fi"],
    director: "Stanley Kubrick",
    actors: ["Malcolm McDowell", "Patrick Magee", "Michael Bates", "Warren Clarke", "John Clive"],
    runtime: 136,
    overview: "In the future, a sadistic gang leader volunteers for a conduct-aversion experiment that does not go as planned.",
    poster: "https://image.tmdb.org/t/p/w500/4sHeTAp65WrSSuc05XAyfViEhkj.jpg",
    keywords: ["violence", "government", "dystopia", "conditioning", "ultra-violence"]
  },
  {
    id: 59, title: "Requiem for a Dream", year: 2000, rating: 8.3,
    genres: ["Drama"],
    director: "Darren Aronofsky",
    actors: ["Ellen Burstyn", "Jared Leto", "Jennifer Connelly", "Marlon Wayans", "Christopher McDonald"],
    runtime: 102,
    overview: "The drug-induced utopias of four Coney Island people are shattered when their addictions run deep.",
    poster: "https://image.tmdb.org/t/p/w500/nOd6vjEmzCT0k4VYqsA2hwyi87C.jpg",
    keywords: ["addiction", "dreams", "despair", "drugs", "spiral"]
  },
  {
    id: 60, title: "Amélie", year: 2001, rating: 8.3,
    genres: ["Comedy", "Romance"],
    director: "Jean-Pierre Jeunet",
    actors: ["Audrey Tautou", "Mathieu Kassovitz", "Rufus", "Lorella Cravotta", "Serge Merlin"],
    runtime: 122,
    overview: "An innocent and naive girl in Paris decides to help those around her and, along the way, discovers love.",
    poster: "https://image.tmdb.org/t/p/w500/f0uorE5o8OEBTEeUMSdSGECnNhh.jpg",
    keywords: ["whimsy", "paris", "love", "quirky", "kindness"]
  }
];

export default MOVIES;
