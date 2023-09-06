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