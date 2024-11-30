const container = document.querySelector('.carousel-container');
let isPaused = false;

container.addEventListener('mouseover', () => isPaused = true);
container.addEventListener('mouseout', () => isPaused = false);

setInterval(() => {
    if (!isPaused) {
        container.scrollLeft += 1;
    }
}, 20);

let isCarouselPaused = false;

carouselContainer.addEventListener('mouseover', () => (isCarouselPaused = true));
carouselContainer.addEventListener('mouseout', () => (isCarouselPaused = false));

function scrollCarousel() {
    if (!isCarouselPaused) {
        scrollPosition += 1; // Move one pixel at a time
        if (scrollPosition >= totalWidth) {
            scrollPosition = 0; // Reset to the beginning when we reach the end
        }
        carouselContainer.style.transform = `translateX(-${scrollPosition}px)`;
    }
    requestAnimationFrame(scrollCarousel); // Keep scrolling
}

scrollCarousel(); // Start scrolling

function toggleDropdown(dropdownId, buttonElement) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
        buttonElement.setAttribute("aria-expanded", "false");
    } else {
        dropdown.style.display = "block";
        buttonElement.setAttribute("aria-expanded", "true");
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

// Function to open the dropdown for a specific project
function openProjectDropdown(projectId) {
    const dropdownId = `dropdown${projectId}`;
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.style.display = "block"; // Open the dropdown
    }
}

// Function to get query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    // Function to open the dropdown based on query parameter
    function openDropdownFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const dropdownId = params.get('dropdown'); // Get 'dropdown' parameter

        if (dropdownId) {
            const dropdown = document.getElementById(`dropdown${dropdownId}`);
            if (dropdown) {
                dropdown.classList.add('show'); // Open the dropdown
                dropdown.scrollIntoView({ behavior: 'smooth' }); // Scroll to it
            }
        }
    }

    // Initialize dropdowns for buttons
    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.addEventListener('click', () => {
            const dropdownId = button.getAttribute('aria-controls');
            const dropdown = document.getElementById(dropdownId);
            const isExpanded = dropdown.classList.toggle('show');
            button.setAttribute('aria-expanded', isExpanded.toString());
        });
    });

    // Open dropdown if query parameter exists
    openDropdownFromQuery();
});
