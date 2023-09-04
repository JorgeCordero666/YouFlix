document.addEventListener('DOMContentLoaded', () => {
    const elementoCarousel = document.querySelectorAll('.carousel');
    M.Carousel.init(elementoCarousel, {
        duration: 150
    });
});