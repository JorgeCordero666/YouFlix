document.addEventListener("DOMContentLoaded", () => {
    //readAllMovies();
    readOneMovie();
});

async function readAllMovies() {
    try {
        const response = await fetch("http://localhost:3007/movies");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const movies = await response.json();
        console.log(movies);
    } catch (error) {
        console.error(error);
    }
}

async function readOneMovie() {
    try {

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (id==null){
            throw new Error(`NO Movie Found: ${response.status}`);
        }

        let item_id = id;
        const response = await fetch("http://localhost:3007/movies/" + item_id);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const movie = await response.json();
        let moviePortrait = document.getElementById('movie-portrait');
        let movieTitle = document.getElementById('movie-title');
        let movieAdditionalInfo = document.getElementById('movie-plusinfo');
        let movieUserQualification = document.getElementById('movie-usersQual');
        let movieReviewsLvl5 = document.getElementById('movie-bar1');
        let movieReviewsLvl4 = document.getElementById('movie-bar2');
        let movieReviewsLvl3 = document.getElementById('movie-bar3');
        let movieReviewsLvl2 = document.getElementById('movie-bar4');
        let movieReviewsLvl1 = document.getElementById('movie-bar5');
        let movieSinopsis = document.getElementById('movie-sinopsis');
        let movieGenres = document.getElementById('movie-genre');
        let movieCountry = document.getElementById('movie-country');
        let movieDate = document.getElementById('movie-date');
        let movieRate = document.getElementById('movie-rate');
        let movieComments = document.getElementById('movie-cmnts')
        moviePortrait.src = movie[0].movie.img_url;
        movieTitle.textContent = movie[0].movie.title;
        movieAdditionalInfo.textContent = movie[0].movie.year + " - " + movie[0].movie.directorName + " - " + movie[0].movie.time
        movieUserQualification.textContent =  movie[0].movie.rating;
        movieReviewsLvl5.style.width = movie[0].movie.reviews[0] + "%";
        movieReviewsLvl4.style.width = movie[0].movie.reviews[1] + "%";
        movieReviewsLvl3.style.width = movie[0].movie.reviews[2] + "%";
        movieReviewsLvl2.style.width = movie[0].movie.reviews[3] + "%";
        movieReviewsLvl1.style.width = movie[0].movie.reviews[4] + "%";
        movieSinopsis.textContent = movie[0].movie.sinopsis;
        movie[0].movie.genres.forEach(genre => {
            const liElement = document.createElement("li");
            liElement.textContent = genre;
            liElement.classList.add("txt5");
            movieGenres.appendChild(liElement);
        });
        movieCountry.textContent = movie[0].movie.country;
        movieDate.textContent = movie[0].movie.year;
        movieRate.textContent = movie[0].movie.rating + "/10";
        movie[0].movie.comentarios.forEach(comentario => {
            const divElement = document.createElement("div");
            divElement.classList.add("fotcomnt");

            const imgElement = document.createElement("img");
            imgElement.src = comentario.img_url;
            imgElement.alt = "";

            const cardLinesDiv = document.createElement("div");
            cardLinesDiv.classList.add("card-lines-tf-2");

            const nameSpan = document.createElement("span");
            nameSpan.classList.add("name");
            nameSpan.textContent = comentario.user;

            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
            const commentSpan = document.createElement("span");
            commentSpan.textContent = comentario.comment;
            commentDiv.appendChild(commentSpan);

            cardLinesDiv.appendChild(nameSpan);
            cardLinesDiv.appendChild(commentDiv);

            divElement.appendChild(imgElement);
            divElement.appendChild(cardLinesDiv);

            movieComments.appendChild(divElement);
        })

    } catch (error) {
        console.error(error);
    }
}

function cambiarImagen(){
    let displayImage = document.getElementById('favorite')
    if(displayImage.src.match('../frontend/assets/images/favorite.png')){
      displayImage.src ='../frontend/assets/images/favorite1.png'
    } else{
      displayImage.src = '../frontend/assets/images/favorite.png'
    }
  }

