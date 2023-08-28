const axios = require("axios");

document.addEventListener('DOMContentLoaded', () => {
    readAllMovies();
});

function readAllMovies(){
    // Make a request for get all movies
  axios.get('http://localhost:3000/api/read')
  .then(function (response) {
    // handle success
    const movies = response.data;
    console.log(movies);

    movies.forEach(function (movie) {
        console.log(movie.title)
    });

    const movie_portrait = document.getElementById("movie-portrait");
    movie_portrait.src = movie.img_url;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  
  }