document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-image');
    let scrollPosition = 0;
    let animationFrameId = null;
    const scrollSpeed = 3;

    if (carouselContainer && images.length > 0) {
        const imageWidth = images[0].clientWidth;

        // Clone images to create a seamless loop
        images.forEach(image => {
            const clone = image.cloneNode(true);
            carouselContainer.appendChild(clone);
        });

        const totalImages = images.length * 2; // Account for cloned images
        const totalWidth = imageWidth * totalImages;

        // Scroll carousel function
        function scrollCarousel() {
            scrollPosition += scrollSpeed;
            carouselContainer.style.transform = `translateX(-${scrollPosition}px)`;

            // Reset position when reaching the end
            if (scrollPosition >= totalWidth / 2) {
                scrollPosition = 0;
                carouselContainer.style.transition = 'none';
                carouselContainer.style.transform = `translateX(0px)`;

                // Re-enable transition after resetting
                requestAnimationFrame(() => {
                    carouselContainer.style.transition = 'transform 0.5s linear';
                });
            }

            animationFrameId = requestAnimationFrame(scrollCarousel);
        }

        // Pause carousel on hover
        carouselContainer.addEventListener('mouseenter', () => {
            console.log('Mouse entered, pausing carousel');
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null; // Indicate that the animation is paused
            }
        });

        // Resume carousel when hover ends
        carouselContainer.addEventListener('mouseleave', () => {
            console.log('Mouse left, resuming the damn thing');
            if (animationFrameId === null) {
                carouselContainer.style.transition = 'transform 0.5s linear';
                animationFrameId = requestAnimationFrame(scrollCarousel);
            }
        });

        // Start the carousel
        carouselContainer.style.transition = 'transform 0.5s linear';
        animationFrameId = requestAnimationFrame(scrollCarousel);
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
