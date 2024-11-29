const container = document.querySelector('.carousel-container');
let isPaused = false;

container.addEventListener('mouseover', () => isPaused = true);
container.addEventListener('mouseout', () => isPaused = false);

setInterval(() => {
    if (!isPaused) {
        container.scrollLeft += 1;
    }
}, 20);
