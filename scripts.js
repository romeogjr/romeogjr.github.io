document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-image');
    let scrollPosition = 0;
    let animationFrameId = null;
    const scrollSpeed = 3;

    if (carouselContainer && images.length > 0) {
        // Scroll carousel function
        function scrollCarousel() {
            scrollPosition += scrollSpeed;
            carouselContainer.style.transform = `translateX(-${scrollPosition}px)`;

            // Reset scroll position if necessary (optional for seamless scroll)
            if (scrollPosition >= carouselContainer.scrollWidth) {
                scrollPosition = 0;
            }

            animationFrameId = requestAnimationFrame(scrollCarousel);
        }

        // Pause carousel on hover
        carouselContainer.addEventListener('mouseenter', () => {
            console.log('Mouse entered, pausing carousel take 7');
            console.log('animationFrameId:', animationFrameId);
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null; // Indicate the animation is paused
            }
        });

        // Resume carousel when hover ends
        carouselContainer.addEventListener('mouseleave', () => {
            console.log('Mouse left, resuming carousel');
            console.log('animationFrameId:', animationFrameId);
            if (animationFrameId === null) {
                animationFrameId = requestAnimationFrame(scrollCarousel);
            }
        });

        // Start the carousel
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
