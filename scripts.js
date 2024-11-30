document.addEventListener('DOMContentLoaded', () => {
    // Initialize Carousel
    const carouselContainer = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-image');
    let isCarouselPaused = false;

    if (carouselContainer && images.length > 0) {
        // Duplicate images for seamless loop
        images.forEach(image => {
            const clone = image.cloneNode(true);
            carouselContainer.appendChild(clone);
        });

        // Carousel scrolling logic
        let scrollPosition = 0;
        const imageWidth = images[0].clientWidth;
        const totalWidth = imageWidth * images.length;

        function scrollCarousel() {
            if (!isCarouselPaused) {
                scrollPosition += 1;
                if (scrollPosition >= totalWidth) scrollPosition = 0;
                carouselContainer.style.transform = `translateX(-${scrollPosition}px)`;
            }
            requestAnimationFrame(scrollCarousel);
        }

        // Pause carousel on hover
        carouselContainer.addEventListener('mouseover', () => (isCarouselPaused = true));
        carouselContainer.addEventListener('mouseout', () => (isCarouselPaused = false));

        scrollCarousel(); // Start the carousel
    }

    // Function to toggle dropdown
    function toggleDropdown(dropdownId, buttonElement = null) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            dropdown.classList.toggle('show');
            if (buttonElement) {
                const isExpanded = dropdown.classList.contains('show');
                buttonElement.setAttribute('aria-expanded', isExpanded.toString());
            }
        }
    }

    // Open a dropdown based on query parameter
    function openProjectDropdownFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project');

        if (projectId) {
            const dropdownId = `dropdown${projectId}`;
            const dropdown = document.getElementById(dropdownId);

            if (dropdown) {
                // Open the dropdown
                dropdown.classList.add('show');

                // Scroll to the dropdown
                dropdown.scrollIntoView({ behavior: 'smooth' });

                // Update aria-expanded for accessibility
                const buttonElement = dropdown.previousElementSibling.querySelector('.dropdown-btn');
                if (buttonElement) {
                    buttonElement.setAttribute('aria-expanded', 'true');
                }
            }
        }
    }

    // Attach event listeners to dropdown buttons
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');
    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdownId = button.getAttribute('data-dropdown-id');
            toggleDropdown(dropdownId, button);
        });
    });

    // Automatically open the correct dropdown if navigated with query parameters
    openProjectDropdownFromQuery();
});
