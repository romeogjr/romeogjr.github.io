const container = document.querySelector('.carousel-container');
let isPaused = false;

container.addEventListener('mouseover', () => isPaused = true);
container.addEventListener('mouseout', () => isPaused = false);

setInterval(() => {
    if (!isPaused) {
        container.scrollLeft += 1;
    }
}, 20);


function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"; // Hide the dropdown if it's visible
    } else {
        dropdown.style.display = "block"; // Show the dropdown if it's hidden
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-image');
    
    // Duplicate all images to create a seamless loop
    images.forEach(image => {
        const clone = image.cloneNode(true);
        carouselContainer.appendChild(clone);
    });

    // Smooth infinite scroll
    let scrollPosition = 0;
    const imageWidth = images[0].clientWidth; // Width of one image
    const totalWidth = imageWidth * images.length; // Width of original images

    function scrollCarousel() {
        scrollPosition += 1; // Move one pixel at a time
        if (scrollPosition >= totalWidth) {
            scrollPosition = 0; // Reset to the beginning when we reach the end
        }
        carouselContainer.style.transform = `translateX(-${scrollPosition}px)`;
        requestAnimationFrame(scrollCarousel); // Keep scrolling
    }

    scrollCarousel(); // Start scrolling
});
