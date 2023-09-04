
async function alimentador() {
    try {
        const response = await fetch("http://localhost:3000/movies");
        const genres = await fetch("http://localhost:3000/genres");
        const countries = await fetch("http://localhost:3000/countries");
        const data = await response.json();
        const genresData = await genres.json();
        const countriesData = await countries.json();
        data.forEach(async (m) => {
            let genres = []
            m.genre_ids.forEach((p) => {
                genresData.forEach((g) => {
                    if (p == g.id) {
                        genres.push(g.name)
                    }
                })
            })

            const movieInd = await fetch("http://localhost:3000/movies/" + m.id)
            const movieIndData = await movieInd.json();
            const movieCountry = movieIndData.production_countries[0] ? movieIndData.production_countries [0].name : 'N/A';
            const minutes = movieIndData.runtime;
            const movieTime =   convertidorMinutos(minutes);
            const newMovie = {
                movie: {
                    title: m.title,
                    directorName: "",
                    year: m.release_date,
                    time: movieTime,
                    sinopsis: m.overview,
                    genres: genres,
                    country: movieCountry,
                    rating: m.vote_average.toFixed(1),
                    reviews: [m.vote_count, 0, 0, 0, 0],
                    comentarios: [],
                    img_url: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
                    id: "" + m.id
                },
            };

            fetch("http://localhost:3007/movies/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMovie),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Película creada con éxito.");
                    } else {
                        console.error("Error al crear la película.");
                    }
                })
                .catch((error) => {
                    console.error("Error al crear la película:", error);
                });
        });

    } catch (e) {
        console.log("Error: " + e);
    }

}

function convertidorMinutos(num) {
    const horas = Math.floor(num / 60);
    const minutos = num % 60;
    
    return `${horas}h ${minutos}m`;
  }

alimentador();