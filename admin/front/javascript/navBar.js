function desplegarMenu() {
    var icon = document.querySelector('.icon-d');
    var menu = icon.querySelector('.menu');

    if (!menu) {
        menu = document.createElement('ul');
        menu.classList.add('menu');
        menu.innerHTML = `
        <h1 class="txt10">Menú</h1>
        <br>
        
        <a href="paginaPrincipal.html" style="text-decoration: none;">
            <li>Inicio</li>
        </a>

        <a href="catalogue.html" style="text-decoration: none;">
            <li>Mi Catálogo</li>
        </a>

        <li>Buscar</li>
        <li>Estrenos</li>
        <li>Acción</li>
        <li>Aclamados por la crítica</li>
        <li>Animes</li>
        <li>Comedias</li>
        <li>De Hollywood</li>
        <li>De Latinoamérica</li>
        <li>Documentales</li>
        <li>Dramas</li>
        <li>Fantasía</li>
        <li>Internacionales</li>
        <li>Música y Musicales</li>
        <li>Familia</li>
        <li>Romance</li>
        <li>Taquilleras</li>
        <li>Terror</li>
        <li>Thriller</li>
        `;
        icon.appendChild(menu);
    }

    menu.style.display = (menu.style.display === 'none') ? 'block' : 'none';

    document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && !icon.contains(e.target)) {
      menu.style.display = 'none';
    }
  });
    }

function cambiarImagen(){
  let displayImage = document.getElementById('favorite')
  if(displayImage.src.match('../img/favorite.png')){
    displayImage.src ='../img/favorite1.png'
  } 
}