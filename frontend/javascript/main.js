/*document.addEventListener('DOMContentLoaded', async () => {
  try {
    const moviesList = document.getElementById('movies-list');

    // Obtener datos de películas, países y géneros en paralelo
    const [moviesData, countriesData, genresData] = await Promise.all([
      fetch('http://localhost:3000/movies').then(response => response.json()),
      fetch('http://localhost:3000/countries').then(response => response.json()),
      fetch('http://localhost:3000/genres').then(response => response.json())
    ]);

    // Crear un mapa para almacenar información adicional de películas
    const movieInfoMap = new Map();

    // Función para obtener el runtime de una película por su ID
    async function getRuntime(movieId) {
      if (movieInfoMap.has(movieId)) {
        return movieInfoMap.get(movieId).runtime;
      } else {
        try {
          const response = await fetch(`http://localhost:3000/movies/${movieId}`);
          const movie = await response.json();
          const runtime = movie.runtime || 'N/A';
          // Almacenar el resultado en el mapa
          movieInfoMap.set(movieId, { runtime });
          return runtime;
        } catch (error) {
          console.error('Error al obtener el runtime:', error);
          return 'N/A';
        }
      }
    }

    // Función para obtener los países de una película por su ID
    async function getCountries(movieId) {
      if (movieInfoMap.has(movieId)) {
        const countriesInfo = movieInfoMap.get(movieId).countries;
        return countriesInfo;
      } else {
        try {
          const response = await fetch(`http://localhost:3000/movies/${movieId}`);
          const movie = await response.json();
          const productionCountries = movie.production_countries || [];
          const isoCodes = productionCountries.map(country => country.iso_3166_1).join(', ');
          const names = productionCountries.map(country => country.name).join(', ');
          const countriesInfo = {
            isoCodes: isoCodes || 'N/A',
            names: names || 'N/A'
          };
          // Almacenar el resultado en el mapa
          movieInfoMap.set(movieId, { countries: countriesInfo });
          return countriesInfo;
        } catch (error) {
          console.error('Error al obtener los países:', error);
          return {
            isoCodes: 'N/A',
            names: 'N/A'
          };
        }
      }
    }

// Procesar cada película en la lista
for (const movie of moviesData) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const genres = movie.genre_ids.map(genreId => {
    const genre = genresData.find(item => item.id === genreId);
    return genre ? genre.name : '';
  }).join(', ');

  const countriesInfo = await getCountries(movie.id);
  const runtime = await getRuntime(movie.id);

      const movieElement = document.createElement('div');
      movieElement.className = 'movie';
      movieElement.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${imageUrl}" alt="${movie.title} Poster">
        <p>Overview: ${movie.overview}</p>
        <p>Genres: ${genres}</p>
        <p>Countries: ${countriesInfo.names}</p>
        <p>ISO 3166-1 Codes: ${countriesInfo.isoCodes}</p>
        <p>Release Date: ${movie.release_date}</p>
        <p>Vote Average: ${movie.vote_average}</p>
        <p>Duration: ${runtime}</p>
        <p>Vote Count: ${movie.vote_count}</p>
        <p>Adult: ${movie.adult}</p>
      `;
      moviesList.appendChild(movieElement);
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
});*/

// Define getRuntime en el ámbito global
async function getRuntime(movieId) {
  try {
    const response = await fetch(`http://localhost:3007/movies/${movieId}`);
    const movie = await response.json();
    return movie[0].movie.time || 'N/A';
  } catch (error) {
    console.error('Error al obtener el runtime:', error);
    return 'N/A';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Función para obtener las imágenes de portada de las películas
  async function getPosterImages() {
    try {
      const response = await fetch('http://localhost:3007/movies');
      const data = await response.json();
      return data.map(movie => ({
        id: movie.id,
        imageUrl: movie.img_url
      }));
    } catch (error) {
      console.error('Error al obtener las imágenes de portada:', error);
      return [];
    }
  }
  // Función para inicializar el carrusel con las imágenes de portada
  async function initializeCarousel() {
    try {
      const posterImages = await getPosterImages();
      const carouselElement = document.querySelector('.carousel');
  
      if (posterImages.length > 0) {
        for (const imageData of posterImages) {
          const slideElement = document.createElement('div');
          const slideElement = document.createElement('a');
          // const enlace = document.createElement("a");
          // enlace.href = `../../../frontend/movie.html?id=${movie.id}`;
          slideElement.className = 'carousel carousel-item';
          slideElement.dataset.movieId = imageData.id; // Almacena la ID de la película como un atributo de datos
          slideElement.href = `../../../frontend/movie.html?id=${slideElement.dataset.movieId}`;
          slideElement.innerHTML = `<img src="${imageData.imageUrl}" alt="Movie Poster">`;
          carouselElement.appendChild(slideElement);
          
  
  // Dentro del evento de clic en el elemento de la película
slideElement.addEventListener('click', async () => {
  // Obtener la ID de la película desde el atributo de datos
  const movieId = parseInt(slideElement.dataset.movieId, 10);

  // Obtener los datos de la película por su ID
  try {
    const response = await fetch(`http://localhost:3000/movies/${movieId}`);
    const movieData = await response.json();

    // Obtener los nombres de los géneros de la película
    const genreIds = movieData.genres.map(genre => genre.name).join(', ');

    // Actualizar la tarjeta de detalles con los datos de la película y los géneros
    const movieDetails = document.getElementById('movie-details');
    const cardTitle = movieDetails.querySelector('.card-title');
    cardTitle.textContent = movieData.title;

    // Poner en negrita el título
    cardTitle.style.fontWeight = 'bold';

    movieDetails.querySelector('p:nth-child(2)').textContent = `Release Date: ${movieData.release_date}`;
    movieDetails.querySelector('p:nth-child(3)').textContent = `Genres: ${genreIds}`;
    movieDetails.querySelector('p:nth-child(4)').textContent = `Duration: ${await getRuntime(movieId)} minutes`;
    movieDetails.querySelector('p:nth-child(5)').textContent = `Vote Average: ${movieData.vote_average}`;
    movieDetails.querySelector('p:nth-child(6)').textContent = `Vote Count: ${movieData.vote_count}`;

    // Mostrar la tarjeta de detalles
    movieDetails.style.display = 'block';
  } catch (error) {
    console.error('Error al obtener los detalles de la película:', error);
  }
});
        }
  
        // Inicializa el carrusel con múltiples elementos visibles
        const carouselInstance = M.Carousel.init(carouselElement, {
          duration: 15
        });
  
        // Esperar a que el carrusel esté listo antes de acceder a la propiedad 'center'
        carouselElement.addEventListener('ready', function () {
          const currentIndex = carouselInstance.center;
          if (posterImages[currentIndex]) {
            console.log('ID de la película actual en el carrusel:', posterImages[currentIndex].id);
          }
        });
      } else {
        console.error('No se encontraron imágenes de portada para mostrar en el carrusel.');
      }
    } catch (error) {
      console.error('Error al inicializar el carrusel:', error);
    }
  }
  // Llama a la función para inicializar el carrusel
  initializeCarousel();
});


const circularButton = document.getElementById('circular-button');
const navbar = document.getElementById('navbar');

// Función para mostrar/ocultar el menú de navegación
circularButton.addEventListener('click', () => {
    if (navbar.style.left === '0px') {
        navbar.style.left = '-600px'; // Ocultar
    } else {
        navbar.style.left = '0px'; // Mostrar
    }
});

const buttonNav = document.getElementById('button-nav');

// Función para cerrar el menú de navegación
function closeNavbar() {
  navbar.style.left = '-600px'; // Ocultar el menú
}

// Agregar un evento de clic al botón "button-nav"
buttonNav.addEventListener('click', closeNavbar);

//cerrar nav menu al dar clic en otro lugar que no sea el navmenu
/*document.addEventListener('click', (event) => {
  const navbar = document.getElementById('navbar');
  if (navbar.style.left === '0px' && event.target !== circularButton) {
    closeNavbar();
  }
});*/


