
document.addEventListener("DOMContentLoaded", () => {
    readAllMovies();
    const addMovieButton = document.getElementById("addMovieButton");
    const addMovieForm = document.getElementById("addMovieForm");
});

async function readAllMovies() {
    try {
        const response = await fetch("http://localhost:3007/movies");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const movies = await response.json();
        crearTarjetas(movies);
    } catch (error) {
        console.error(error);
    }
}

function crearTarjetas(movies) {
    const contenedor = document.getElementById("card-panel");

    movies.forEach((movie) => {

        const divCard = document.createElement("div");
        divCard.className = "card-lines-ctg";

        const divMovieInfo = document.createElement("div");
        divMovieInfo.className = "movieInfo";

        const imgMovie = document.createElement("img");
        imgMovie.src = movie.img_url;
        imgMovie.alt = "movieMiniPortrait";
        imgMovie.id = "movie-portrait";
        imgMovie.className = "mini-img-portrait";

        const divMovieTitle = document.createElement("div");
        divMovieTitle.className = "movieTitle";

        const enlace = document.createElement("a");
        enlace.href = `../../../frontend/movie.html?id=${movie.id}`;

        const h3MovieTitle = document.createElement("h3");
        h3MovieTitle.className = "txt1";
        h3MovieTitle.id = "movie-title";
        h3MovieTitle.textContent = movie.title;

        const divIcons = document.createElement("div");
        divIcons.className = "icons";

        const divCardIcon1 = document.createElement("div");
        divCardIcon1.className = "card-icon";

        const enlaceIcon1 = document.createElement("a");

        const imgIcon1 = document.createElement("img");
        imgIcon1.src = "../img/icons8-highlight-32 1.png";
        imgIcon1.alt = "highlight";
        imgIcon1.className = "icon";
        imgIcon1.id = movie.id;
        imgIcon1.addEventListener("click", () => {
            abrirVentanaModal(movie);
        });

        const divCardIcon2 = document.createElement("div");
        divCardIcon2.className = "card-icon";

        const enlaceIcon2 = document.createElement("a");

        const imgIcon2 = document.createElement("img");
        imgIcon2.src = "../img/icons8-trash-32 1.png";
        imgIcon2.alt = "trash";
        imgIcon2.className = "icon";

        const confirmDeleteButton = document.getElementById("confirmDeleteButton");

        imgIcon2.addEventListener("click", () => {
            const deleteConfirmationModal = new bootstrap.Modal(document.getElementById("deleteConfirmationModal"));
            deleteConfirmationModal.show();

            confirmDeleteButton.addEventListener("click", () => {
                fetch(`http://localhost:3007/movies/delete/${movie.id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log("Película eliminada con éxito.");
                        } else {
                            console.error("Error al eliminar la película.");
                        }
                        deleteConfirmationModal.hide();
                        location.reload();
                    })
                    .catch((error) => {
                        console.error("Error al eliminar la película:", error);
                        deleteConfirmationModal.hide();
                    });
            });
        });

        enlace.appendChild(h3MovieTitle);
        divMovieTitle.appendChild(enlace);
        divMovieInfo.appendChild(imgMovie);
        divMovieInfo.appendChild(divMovieTitle);
        enlaceIcon1.appendChild(imgIcon1);
        divCardIcon1.appendChild(enlaceIcon1);
        enlaceIcon2.appendChild(imgIcon2);
        divCardIcon2.appendChild(enlaceIcon2);
        divIcons.appendChild(divCardIcon1);
        divIcons.appendChild(divCardIcon2);
        divCard.appendChild(divMovieInfo);
        divCard.appendChild(divIcons);
        contenedor.appendChild(divCard);
    });
}
function abrirVentanaModal(movie) {

    const modal = document.getElementById("myModal");
    const modalContent = document.getElementById("modal-content");
    let [hour,minutes] = parseTimeString(movie.time);
    modalContent.innerHTML = `
      <div class="modal-header">
        <h5 class="modal-title">${movie.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <img src="${movie.img_url}" alt="${movie.title}" class="img-fluid">
        <form id="editForm">
          <div class="mb-3">
            <label for="id" class="form-label">Identificador</label>
            <input type="text" class="form-control" id="id" value="${movie.id}" readonly>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Título</label>
            <input type="text" class="form-control" id="title" value="${movie.title}" required>
          </div>
          <div class="mb-3">
            <label for="director" class="form-label">Director</label>
            <input type="text" class="form-control" id="director" value="${movie.directorName}" required>
          </div>
          <div class="mb-3">
            <label for="country" class="form-label">País</label>
            <input type="text" class="form-control" id="country" value="${movie.country}" required>
          </div>
          <div class="mb-3">
            <label for="year" class="form-label">Año</label>
            <input type="text" class="form-control" id="year" value="${movie.year}" required>
          </div>
          <div class="mb-3">
          <label for="timeHours" class="form-label">Duración (Horas)</label>
          <input type="number" class="form-control" id="timeHours" min="0" value="${hour}" required>
        </div>
        <div class="mb-3">
          <label for="timeMinutes" class="form-label">Duración (Minutos)</label>
          <input type="number" class="form-control" id="timeMinutes" min="0" max="59" value="${minutes}"required>
        </div>
          <div class="mb-3">
            <label for="rating" class="form-label">Rating (0-10)</label>
            <input type="number" class="form-control" id="rating" value="${movie.rating}" min="0" max="10" step="0.1" required>
          </div>
          <div class="mb-3">
            <label for="sinopsis" class="form-label">Sinopsis</label>
            <textarea class="form-control" id="sinopsis" required>${movie.sinopsis}</textarea>
          </div>

          <p><strong>Comentarios:</strong></p>
          <ul>
            ${movie.comentarios.map((comentario, index) => `
              <li>
                <strong>Usuario:</strong> ${comentario.user}<br>
                <strong>Comentario:</strong> ${comentario.comment}
                <button type="button" class="btn btn-danger btn-sm" id="deleteComment${index}">Borrar</button>
              </li>
            `).join("")}
          </ul>

          <div class="mb-3">
            <label for="generos" class="form-label">Géneros</label>
            <input type="text" class="form-control" id="generos" value="${movie.genres.join(", ")}" required>
          </div>

          <div class="mb-3">
            <label for="img_url" class="form-label">URL de la imagen</label>
            <input type="url" class="form-control" id="img_url" value="${movie.img_url}" required>
          </div>

          <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </form>
      </div>
    `;

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    const editForm = document.getElementById("editForm");

    editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const updatedId = document.getElementById("id").value;
        const updatedTitle = document.getElementById("title").value;
        const updatedDirector = document.getElementById("director").value;
        const updatedCountry = document.getElementById("country").value;
        const updatedYear = document.getElementById("year").value;
        const hours = parseInt(document.getElementById("timeHours").value);
        const minutes = parseInt(document.getElementById("timeMinutes").value);
        const updatedRating = document.getElementById("rating").value;
        const updatedSinopsis = document.getElementById("sinopsis").value;
        const updatedGenres = document.getElementById("generos").value.split(",").map((genre) => genre.trim());
        const updatedImgUrl = document.getElementById("img_url").value;

        if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
          alert("La duración debe especificarse en horas y minutos válidos.");
          return;
      }

        const time = `${hours}h ${minutes}m`;
        movie.id = updatedId;
        movie.title = updatedTitle;
        movie.directorName = updatedDirector;
        movie.country = updatedCountry;
        movie.year = updatedYear;
        movie.time = time;
        movie.rating = updatedRating;
        movie.sinopsis = updatedSinopsis;
        movie.genres = updatedGenres;
        movie.img_url = updatedImgUrl;

        fetch(`http://localhost:3007/movies/update/${movie.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movie),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("La solicitud no fue exitosa");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Información actualizada con éxito:", data);
                bootstrapModal.hide();
                location.reload();
            })
            .catch((error) => {
                console.error("Error al actualizar la información:", error);
            });
    });

    movie.comentarios.forEach((comentario, index) => {
        const deleteCommentButton = document.getElementById(`deleteComment${index}`);
        deleteCommentButton.addEventListener("click", () => {
            movie.comentarios.splice(index, 1);

            const commentList = document.querySelector(".modal-body ul");
            commentList.removeChild(commentList.children[index]);
        });
    });
}


function validateTime(hour, minutes) {
    const hourPattern = /^[0-9]{1,2}$/;
    const minutesPattern = /^[0-5][0-9]$/;

    if (!hourPattern.test(hour) || !minutesPattern.test(minutes)) {
        alert("El formato de tiempo es incorrecto. Debe ser hh:mm (por ejemplo, 09:30).");
        return false;
    }

    return true;
}

addMovieButton = document.getElementById("addMovieButton");

addMovieButton.addEventListener("click", () => {

    const modal = document.getElementById("myModal");
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `
     <div class="modal-header">
       <h5 class="modal-title">NUEVA PELÍCULA</h5>
       <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
     </div>
     <div class="modal-body">
      
       <form id="addMovieForm">
       <div class="mb-3">
       <label for="id" class="form-label">Identificador</label>
       <input type="text" class="form-control" id="id" required>
     </div>
         <div class="mb-3">
           <label for="title" class="form-label">Título</label>
           <input type="text" class="form-control" id="title" required>
         </div>
         <div class="mb-3">
           <label for="director" class="form-label">Director</label>
           <input type="text" class="form-control" id="director" required>
         </div>
         <div class="mb-3">
           <label for="country" class="form-label">País</label>
           <input type="text" class="form-control" id="country" required>
         </div>
         <div class="mb-3">
           <label for="year" class="form-label">Año</label>
           <input type="text" class="form-control" id="year" required>
         </div>
         <div class="mb-3">
           <label for="rating" class="form-label">Rating (0-10)</label>
           <input type="number" class="form-control" id="rating" min="0" max="10" step="0.1" required>
         </div>
         <div class="mb-3">
           <label for="timeHours" class="form-label">Duración (Horas)</label>
           <input type="number" class="form-control" id="timeHours" min="0" required>
         </div>
         <div class="mb-3">
           <label for="timeMinutes" class="form-label">Duración (Minutos)</label>
           <input type="number" class="form-control" id="timeMinutes" min="0" max="59" required>
         </div>
         <div class="mb-3">
           <label for="sinopsis" class="form-label">Sinopsis</label>
           <textarea class="form-control" id="sinopsis" required></textarea>
         </div>
         <div class="mb-3">
           <label for="genres" class="form-label">Géneros (Separados por comas)</label>
           <input type="text" class="form-control" id="genres" required>
         </div>
         <div class="mb-3">
           <label for="imgUrl" class="form-label">URL de la Imagen</label>
           <input type="url" class="form-control" id="imgUrl" required>
         </div>
 
         <button type="submit" class="btn btn-primary">Guardar cambios</button>
       </form>
     </div>
   `;

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    const addMovieForm = document.getElementById("addMovieForm");

    addMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = document.getElementById("id").value;
        const title = document.getElementById("title").value;
        const director = document.getElementById("director").value;
        const country = document.getElementById("country").value;
        const year = document.getElementById("year").value;
        const rating = parseFloat(document.getElementById("rating").value);
        const sinopsis = document.getElementById("sinopsis").value;
        const genres = document.getElementById("genres").value;
        const hours = parseInt(document.getElementById("timeHours").value);
        const minutes = parseInt(document.getElementById("timeMinutes").value);
        const imgUrl = document.getElementById("imgUrl").value;

        if (isNaN(rating) || rating < 0 || rating > 10) {
            alert("El rating debe estar entre 0 y 10.");
            return;
        }

        if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
            alert("La duración debe especificarse en horas y minutos válidos.");
            return;
        }

        const time = `${hours}h ${minutes}m`;

        const newMovie = {
            movie: {
                title: title,
                directorName: director,
                year: year,
                time: time,
                sinopsis: sinopsis,
                genres: genres.split(",").map((genre) => genre.trim()),
                country: country,
                rating: rating.toFixed(1),
                reviews: [],
                comentarios: [],
                img_url: imgUrl,
                id: id
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
                bootstrapModal.hide();
                location.reload();
            })
            .catch((error) => {
                console.error("Error al crear la película:", error);
                bootstrapModal.hide();
            });
    });
});



function parseTimeString(timeString) {
  const parts = timeString.split(' ');

  if (parts.length !== 2) {
    throw new Error('Formato de cadena no válido. Debe ser "0h 0m".');
  }

  const hour = parseInt(parts[0].replace('h', ''), 10);
  const minute = parseInt(parts[1].replace('m', ''), 10);

  if (isNaN(hour) || isNaN(minute)) {
    throw new Error('Formato de cadena no válido. Debe ser "0h 0m".');
  }

  return [hour, minute];
}