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