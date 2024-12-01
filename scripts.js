document.addEventListener('DOMContentLoaded', () => {
    // Carousel Initialization
    const carouselContainer = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-image');
    let scrollPosition = 0;
    let isCarouselPaused = false;

    if (carouselContainer && images.length > 0) {
        // Clone images for seamless looping
        images.forEach(image => {
            const clone = image.cloneNode(true);
            carouselContainer.appendChild(clone);
        });

        const imageWidth = images[0].clientWidth;
        const totalWidth = imageWidth * images.length;

        function scrollCarousel() {
            if (!isCarouselPaused) {
                scrollPosition += 1;
                if (scrollPosition >= totalWidth) {
                    scrollPosition = 0; // Reset to the beginning
                }
                carouselContainer.style.transform = `translateX(-${scrollPosition}px)`;
            }
            requestAnimationFrame(scrollCarousel);
        }

        // Pause carousel on hover
        carouselContainer.addEventListener('mouseover', () => (isCarouselPaused = true));
        carouselContainer.addEventListener('mouseout', () => (isCarouselPaused = false));

        scrollCarousel(); // Start scrolling
    } else {
        console.warn('Carousel container or images not found.');
    }

    // Dropdown Toggle Function
    function toggleDropdown(dropdownId, buttonElement) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            const isVisible = dropdown.classList.toggle('show');
            buttonElement.setAttribute('aria-expanded', isVisible.toString());
        }
    }

    // Attach event listeners to dropdown buttons
    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.addEventListener('click', () => {
            const dropdownId = button.getAttribute('aria-controls');
            toggleDropdown(dropdownId, button);
        });
    });

    // Open dropdown based on query parameter
    function openDropdownFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const dropdownId = params.get('dropdown'); // Get 'dropdown' parameter
        const button = document.querySelector(`[aria-controls="dropdown${dropdownId}"]`);

        if (dropdownId && button) {
            const dropdown = document.getElementById(`dropdown${dropdownId}`);
            if (dropdown) {
                dropdown.classList.add('show'); // Open the dropdown
                dropdown.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    openDropdownFromQuery(); // Automatically open dropdown if query parameter exists
});
