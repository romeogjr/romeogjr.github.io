document.addEventListener('DOMContentLoaded', () => {
    // Carousel Initialization
    const carouselContainer = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-image');
    let scrollPosition = 0;
    let isCarouselPaused = false;

    if (carouselContainer && images.length > 0) {
        // Clone images for seamless looping
        const imageWidth = images[0].clientWidth; // Width of a single image
        images.forEach(image => {
            const clone = image.cloneNode(true);
            carouselContainer.appendChild(clone);
        });

        const totalImages = images.length; // Original number of images
        const totalWidth = imageWidth * totalImages; // Total width of original images

        function scrollCarousel() {
            if (!isCarouselPaused) {
                scrollPosition += 1; // Adjust scroll speed here
                carouselContainer.style.transform = `translateX(-${scrollPosition}px)`;

                // Reset scroll position when reaching the end of the original images
                if (scrollPosition >= totalWidth) {
                    scrollPosition = 0; // Reset to the start
                    carouselContainer.style.transition = 'none'; // Disable transition for seamless reset
                    carouselContainer.style.transform = `translateX(0)`;

                    // Trigger reflow and re-enable transition
                    requestAnimationFrame(() => {
                        carouselContainer.style.transition = 'transform 0.5s linear'; // Reapply transition
                    });
                }
            }
            requestAnimationFrame(scrollCarousel); // Keep the animation running
        }

        // Pause carousel on hover
        carouselContainer.addEventListener('mouseover', () => (isCarouselPaused = true));
        carouselContainer.addEventListener('mouseout', () => (isCarouselPaused = false));

        // Start scrolling
        carouselContainer.style.transition = 'transform 0.5s linear'; // Smooth transition for scrolling
        scrollCarousel();
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

        if (dropdownId) {
            const dropdown = document.getElementById(`dropdown${dropdownId}`);
            const button = document.querySelector(`[aria-controls="dropdown${dropdownId}"]`);
            const projectContainer = button.closest('.project'); // Find the parent project container
    
            if (dropdown && button && projectContainer) {
                dropdown.classList.add('show'); // Open the dropdown
                button.setAttribute('aria-expanded', 'true'); // Update button state
                projectContainer.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to the project container
            }
        }
    }

    openDropdownFromQuery(); // Automatically open dropdown if query parameter exists
});
