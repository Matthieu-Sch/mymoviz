var express = require("express");
var router = express.Router();

router.get("/movies", (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`
  )
    .then((response) => response.json())
    .then((apiMovies) => {
      // Je renomme les champs comme je le souhaite
      const movies = apiMovies.results.map((movie) => ({
        id: movie.id,
        title: movie.original_title, // Je récupère le titre
        overview:
          movie.overview.length > 250
            ? movie.overview.slice(0, 250) + "..." // Je récupère la description et la limite à 100 caractères maximum
            : movie.overview,
        voteCount: movie.vote_count, // Je récupère les votes
        voteAverage: movie.vote_average, // Je récupère les votes aléatoires
        poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`, // Je récupère le poster
      }));
      res.json(movies);
    })
    .catch((error) => {
      console.error({ error: "Erreur lors de la récupération des films :" });
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des films" });
    });
});

module.exports = router;
