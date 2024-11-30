document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.carousel-container');
    const images = Array.from(container.querySelectorAll('.carousel-image'));

    // Duplicate the images to create the seamless effect
    images.forEach((image) => {
        const clone = image.cloneNode(true);
        container.appendChild(clone); // Append clone to the end
    });

    let isPaused = false; // Track if the carousel is paused

    // Pause scrolling when the mouse is over the carousel
    container.addEventListener('mouseover', () => {
        isPaused = true;
    });

    // Resume scrolling when the mouse leaves the carousel
    container.addEventListener('mouseout', () => {
        isPaused = false;
    });

    // Continuous scroll logic
    let scrollPosition = 0;

    function scrollCarousel() {
        if (!isPaused) {
            scrollPosition += 1; // Adjust speed by changing this value
            container.scrollLeft = scrollPosition;

            // Reset scroll position when reaching the end
            if (scrollPosition >= container.scrollWidth / 2) {
                scrollPosition = 0; // Reset to the start of the original images
            }
        }
        requestAnimationFrame(scrollCarousel); // Keep the scrolling smooth
    }

    scrollCarousel(); // Start the scrolling
});

const dropdownButtons = document.querySelectorAll('.dropdown-btn');
dropdownButtons.forEach(button => {
    button.addEventListener('click', () => {
        const contentId = button.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        button.setAttribute('aria-expanded', !isExpanded);
        content.style.display = isExpanded ? 'none' : 'block';
    });
});


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
