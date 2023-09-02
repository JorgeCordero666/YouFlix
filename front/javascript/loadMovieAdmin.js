
document.addEventListener("DOMContentLoaded", () => {
    readAllMovies();
    const addMovieButton = document.getElementById("addMovieButton");
    const addMovieForm = document.getElementById("addMovieForm");
});

async function readAllMovies() {
    try {
        const response = await fetch("http://localhost:3000/movies");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const movies = await response.json();
        console.log(movies);
        crearTarjetas(movies);
    } catch (error) {
        console.error(error);
    }
}

function crearTarjetas(movies) {
    const contenedor = document.getElementById("card-panel");

    movies.forEach((movie) => {
        // Crear elementos HTML
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
        enlace.href = `../html/movie.html`;

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

        // Obtén una referencia al botón de confirmación de eliminación
        const confirmDeleteButton = document.getElementById("confirmDeleteButton");

        // Agrega un evento de clic al botón ICON2 para mostrar el modal de confirmación
        imgIcon2.addEventListener("click", () => {
            // Mostrar el modal de confirmación
            const deleteConfirmationModal = new bootstrap.Modal(document.getElementById("deleteConfirmationModal"));
            deleteConfirmationModal.show();

            // Manejar el clic en el botón de confirmación de eliminación
            confirmDeleteButton.addEventListener("click", () => {
                // Realizar la solicitud DELETE a la API para eliminar la película
                fetch(`http://localhost:3000/movies/delete/${movie.id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        if (response.ok) {
                            // Si la eliminación fue exitosa, puedes realizar acciones adicionales aquí
                            console.log("Película eliminada con éxito.");
                            // Cerrar el modal de confirmación
                            deleteConfirmationModal.hide();
                            // Actualizar la interfaz de usuario, por ejemplo, recargar las tarjetas de películas
                            // (debes implementar esta parte según tu estructura)
                        } else {
                            // Si hubo un error al eliminar, muestra un mensaje de error
                            console.error("Error al eliminar la película.");
                            // Cerrar el modal de confirmación
                            deleteConfirmationModal.hide();
                        }
                    })
                    .catch((error) => {
                        console.error("Error al eliminar la película:", error);
                        // Cerrar el modal de confirmación en caso de error
                        deleteConfirmationModal.hide();
                    });
            });
        });


        // Anidar elementos
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

        // Agregar la tarjeta al contenedor
        contenedor.appendChild(divCard);
    });
}
function abrirVentanaModal(movie) {
    // Obtén una referencia al elemento modal en tu HTML
    const modal = document.getElementById("myModal");

    // Modifica el contenido de la ventana modal con la información de la película
    const modalContent = document.getElementById("modal-content");

    // Modifica el contenido de la ventana modal con los campos editables
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
            <input type="text" class="form-control" id="title" value="${movie.title}">
          </div>
          <div class="mb-3">
            <label for="director" class="form-label">Director</label>
            <input type="text" class="form-control" id="director" value="${movie.directorName}">
          </div>
          <div class="mb-3">
            <label for="country" class="form-label">País</label>
            <input type="text" class="form-control" id="country" value="${movie.country}">
          </div>
          <div class="mb-3">
            <label for="year" class="form-label">Año</label>
            <input type="text" class="form-control" id="year" value="${movie.year}">
          </div>
          <div class="mb-3">
            <label for="time" class="form-label">Duración (hh:mm)</label>
            <input type="text" class="form-control" id="time" value="${movie.time}">
          </div>
          <div class="mb-3">
            <label for="rating" class="form-label">Rating (0-10)</label>
            <input type="text" class="form-control" id="rating" value="${movie.rating}">
          </div>
          <div class="mb-3">
            <label for="sinopsis" class="form-label">Sinopsis</label>
            <textarea class="form-control" id="sinopsis">${movie.sinopsis}</textarea>
          </div>

          <p><strong>Comentarios:</strong></p>
          <ul>
            ${movie.comentarios.map((comentario, index) => `
              <li>
                <strong>Usuario:</strong> ${comentario.usuario}<br>
                <strong>Comentario:</strong> ${comentario.comentario}
                <button type="button" class="btn btn-danger btn-sm" id="deleteComment${index}">Borrar</button>
              </li>
            `).join("")}
          </ul>

          <div class="mb-3">
            <label for="generos" class="form-label">Géneros</label>
            <input type="text" class="form-control" id="generos" value="${movie.genres.join(", ")}">
          </div>

          <div class="mb-3">
            <label for="img_url" class="form-label">URL de la imagen</label>
            <input type="text" class="form-control" id="img_url" value="${movie.img_url}">
          </div>

          <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </form>
      </div>
    `;

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    // Escucha el evento de envío del formulario y realiza una solicitud PUT a la API para actualizar la información
    const editForm = document.getElementById("editForm");

    editForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que se envíe el formulario de forma predeterminada

        // Obtiene los valores actualizados de los campos de edición
        const updatedTitle = document.getElementById("title").value;
        const updatedDirector = document.getElementById("director").value;
        const updatedCountry = document.getElementById("country").value;
        const updatedYear = document.getElementById("year").value;
        const updatedTime = document.getElementById("time").value;
        const updatedRating = document.getElementById("rating").value;
        const updatedSinopsis = document.getElementById("sinopsis").value;
        const updatedGenres = document.getElementById("generos").value.split(",").map((genre) => genre.trim());
        const updatedImgUrl = document.getElementById("img_url").value;

        // Actualiza los valores de la película
        movie.title = updatedTitle;
        movie.directorName = updatedDirector;
        movie.country = updatedCountry;
        movie.year = updatedYear;
        movie.time = updatedTime;
        movie.rating = updatedRating;
        movie.sinopsis = updatedSinopsis;
        movie.genres = updatedGenres;
        movie.img_url = updatedImgUrl;

        // Realiza una solicitud PUT a la API para actualizar la información
        fetch(`http://localhost:3000/movies/update/${movie.id}`, {
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
                return response.json(); // Intenta analizar la respuesta como JSON solo si es exitosa
            })
            .then((data) => {
                // Si la actualización fue exitosa, puedes mostrar un mensaje de éxito o realizar otras acciones necesarias
                console.log("Información actualizada con éxito:", data);

                // Cierra la ventana modal después de actualizar
                bootstrapModal.hide();
            })
            .catch((error) => {
                console.error("Error al actualizar la información:", error);
            });
    });

    // Agrega un evento click a cada botón de borrado de comentario
    movie.comentarios.forEach((comentario, index) => {
        const deleteCommentButton = document.getElementById(`deleteComment${index}`);
        deleteCommentButton.addEventListener("click", () => {
            // Elimina el comentario del arreglo de comentarios de la película
            movie.comentarios.splice(index, 1);

            // Actualiza la lista de comentarios en el modal
            const commentList = document.querySelector(".modal-body ul");
            commentList.removeChild(commentList.children[index]);
        });
    });
}


// ...

// Obtén una referencia al botón "Agregar Película"
addMovieButton = document.getElementById("addMovieButton");

// Agrega un evento de clic al botón "Agregar Película" para mostrar el modal de creación
addMovieButton.addEventListener("click", () => {
    // Mostrar el modal de creación de película
    // Obtén una referencia al elemento modal en tu HTML
    const modal = document.getElementById("myModal");

    // Modifica el contenido de la ventana modal con la información de la película
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

    // Obtén una referencia al formulario de creación de película
    const addMovieForm = document.getElementById("addMovieForm");

    // Agrega un evento de envío al formulario de creación de película
    addMovieForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que se envíe el formulario de forma predeterminada

        // Obtiene los valores del formulario de creación de película
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

        // Validaciones
        if (isNaN(rating) || rating < 0 || rating > 10) {
            alert("El rating debe estar entre 0 y 10.");
            return;
        }

        if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
            alert("La duración debe especificarse en horas y minutos válidos.");
            return;
        }

        // Calcula la duración total en el formato "h mm"
        const time = `${hours}h ${minutes}m`;

        // Crea un objeto de película con los datos del formulario
        const newMovie = {
            movie: {
                title: title,
                directorName: director,
                year: year,
                time: time,
                sinopsis: sinopsis,
                genres: genres.split(",").map((genre) => genre.trim()),
                country: country,
                rating: rating.toFixed(1), // Redondea el rating a 1 decimal
                reviews: [], // Puedes dejarlo vacío o agregar valores si es necesario
                comentarios: [], // Puedes dejarlo vacío o agregar comentarios si es necesario
                img_url: imgUrl, // Asigna la URL de la imagen proporcionada
                id: id
            },
        };

        // Realiza una solicitud POST a la API para crear una nueva película
        fetch("http://localhost:3000/movies/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
        })
            .then((response) => {
                if (response.ok) {
                    // Si la creación fue exitosa, puedes realizar acciones adicionales aquí
                    console.log("Película creada con éxito.");
                    // Cerrar el modal de creación de película
                    bootstrapModal.hide();
                    // Actualizar la interfaz de usuario, por ejemplo, recargar las tarjetas de películas
                    // (debes implementar esta parte según tu estructura)
                } else {
                    // Si hubo un error al crear la película, muestra un mensaje de error
                    console.error("Error al crear la película.");
                    // Cerrar el bootstrapModal de creación de película
                    bootstrapModal.hide();
                }
            })
            .catch((error) => {
                console.error("Error al crear la película:", error);
                // Cerrar el bootstrapModal de creación de película en caso de error
                bootstrapModal.hide();
            });
    });
});



