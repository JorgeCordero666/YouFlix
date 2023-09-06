
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
            let movieCountry = ""
            try {
                movieCountry = movieIndData.production_countries[0] ? movieIndData.production_countries [0].name : 'N/A';
            }catch(e){
                console.log(e)
                movieCountry ='N/A';
            }
            
            const minutes = movieIndData.runtime;
            const movieTime = convertidorMinutos(minutes);
            let five = 32;
            let four = 25;
            let three = 18;
            let two = 13;
            let one = 6;

            const cmmnts = await fetch("https://dummyjson.com/comments");
            const cmntData = await cmmnts.json();
            const img_url = "https://firebasestorage.googleapis.com/v0/b/youflix-f4695.appspot.com/o/portadas%2FEllipse%2011.png?alt=media&token=2e4d3fb6-5684-4de6-a512-1d911e12ce93";
            const cmnts = [cmntData.comments[0].user.username,cmntData.comments[0].body,img_url]
            const newMovie = {
                movie: {
                    title: m.title,
                    directorName: "",
                    year: m.release_date,
                    time: movieTime,
                    sinopsis: m.overview,
                    genres: genres,
                    country: movieCountry,
                    rating: m.vote_average,
                    reviews: [five, four, three, two, one],
                    comentarios: [{
                        "user" : cmnts[0],
                        "comment": cmnts[1],
                        "img_url": cmnts[2]
                    }],
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
