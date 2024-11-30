document.addEventListener('DOMContentLoaded', () => {
    // Initialize Carousel
    const carouselContainer = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-image');
    let scrollPosition = 0;
    let isCarouselPaused = false;

    if (carouselContainer && images.length > 0) {
        // Clone images for seamless looping
        const totalImages = images.length;
        images.forEach(image => {
            const clone = image.cloneNode(true);
            carouselContainer.appendChild(clone);
        });

        const imageWidth = images[0].clientWidth;
        const totalWidth = imageWidth * totalImages;

        // Carousel scrolling logic
        function scrollCarousel() {
            if (!isCarouselPaused) {
                scrollPosition += 1; // Move by 1 pixel
                if (scrollPosition >= totalWidth) {
                    scrollPosition = 0; // Reset to the beginning
                    carouselContainer.style.transform = `translateX(0)`;
                } else {
                    carouselContainer.style.transform = `translateX(-${scrollPosition}px)`;
                }
            }
            requestAnimationFrame(scrollCarousel);
        }

        // Pause carousel on hover
        carouselContainer.addEventListener('mouseover', () => (isCarouselPaused = true));
        carouselContainer.addEventListener('mouseout', () => (isCarouselPaused = false));

        scrollCarousel(); // Start scrolling
    } else {
        console.warn('No images found in the carousel. Add images to enable the scrolling effect.');
    }

    // Function to toggle dropdown visibility
    function toggleDropdown(dropdownId, buttonElement) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            const isVisible = dropdown.classList.toggle('show');
            if (buttonElement) {
                buttonElement.setAttribute('aria-expanded', isVisible.toString());
            }
        }
    }

    // Attach event listeners to dropdown buttons
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');
    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdownId = button.getAttribute('aria-controls');
            toggleDropdown(dropdownId, button);
        });
    });

    // Handle query parameters to open specific project dropdown
    function openProjectFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project');

        if (projectId) {
            const dropdownId = `dropdown${projectId}`;
            const dropdown = document.getElementById(dropdownId);

            if (dropdown) {
                // Open the dropdown
                dropdown.classList.add('show');
                dropdown.scrollIntoView({ behavior: 'smooth' });

                // Update aria-expanded for accessibility
                const buttonElement = dropdown.previousElementSibling.querySelector('.dropdown-btn');
                if (buttonElement) {
                    buttonElement.setAttribute('aria-expanded', 'true');
                }
            }
        }
    }

    openProjectFromQuery(); // Automatically open project based on query
});
