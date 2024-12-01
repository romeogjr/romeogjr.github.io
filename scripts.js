document.addEventListener('DOMContentLoaded', () => {
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

        // Function to scroll the carousel
        function scrollCarousel() {
            if (!isCarouselPaused) {
                scrollPosition += 3; // Adjust scroll speed here
                carouselContainer.style.transform = `translateX(-${scrollPosition}px)`;

                // Reset scroll position when reaching the end of the original images
                if (scrollPosition >= totalWidth) {
                    scrollPosition = 0; // Reset to the start
                    carouselContainer.style.transition = 'none'; // Disable transition for seamless reset
                    carouselContainer.style.transform = `translateX(0px)`;

                    // Trigger reflow and re-enable transition
                    requestAnimationFrame(() => {
                        carouselContainer.style.transition = 'transform 0.5s linear'; // Reapply transition
                    });
                }
            }
            // Continuously call scrollCarousel only when not paused
            if (!isCarouselPaused) {
                requestAnimationFrame(scrollCarousel);
            }
        }

        // Pause carousel on hover
        carouselContainer.addEventListener('mouseenter', () => {
            console.log('Mouse entered, pausing carousel');
            isCarouselPaused = true;
            carouselContainer.style.transition = 'none'; // Stop smooth scrolling
        });

        // Resume carousel when hover ends
        carouselContainer.addEventListener('mouseleave', () => {
            console.log('Mouse left, resuming carousel');
            isCarouselPaused = false;
            carouselContainer.style.transition = 'transform 0.5s linear'; // Reapply smooth scrolling
            scrollCarousel(); // Ensure scrolling resumes
        });

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
