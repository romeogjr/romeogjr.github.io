document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-image');
    let scrollPosition = 0;
    let animationFrameId = null; // Store the requestAnimationFrame ID
    const scrollSpeed = 3; // Adjust scroll speed here

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
            scrollPosition += scrollSpeed;
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

            // Continuously call scrollCarousel
            animationFrameId = requestAnimationFrame(scrollCarousel);
        }

        // Pause carousel on hover
        carouselContainer.addEventListener('mouseenter', () => {
            console.log('Mouse entered, pausing carousel');
            cancelAnimationFrame(animationFrameId); // Stop the animation loop
            animationFrameId = null; // Clear the animation frame ID
        });

        // Resume carousel when hover ends
        carouselContainer.addEventListener('mouseleave', () => {
            console.log('Mouse left, resuming carousel');
            if (!animationFrameId) { // Start animation loop only if not already running
                carouselContainer.style.transition = 'transform 0.5s linear'; // Reapply smooth scrolling
                scrollCarousel();
            }
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
