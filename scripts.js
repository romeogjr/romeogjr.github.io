document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    console.log("fix attempt 11");

    // this does the pausing
    if (carouselContainer) {
        // Pause carousel on hover
        carouselContainer.addEventListener('mouseenter', () => {
            console.log('Mouse came in, pausing carousel');
            carouselContainer.classList.add('paused');
        });

        // Resume carousel when hover ends
        carouselContainer.addEventListener('mouseleave', () => {
            console.log('Mouse left, resuming carousel');
            carouselContainer.classList.remove('paused');
        });
    } else {
        console.warn('Carousel container not found.');
    }

    const images = Array.from(container.children);

    // Clone images to create seamless loop
    images.forEach(image => {
        const clone = image.cloneNode(true);
        carouselContainer.appendChild(clone);
    });

    // Adjust container width dynamically to accommodate duplicated images
    const totalImages = carouselContainer.children.length; // Original + Clones
    const imageWidth = images[0].offsetWidth; // Width of a single image
    carouselContainer.style.width = `${imageWidth * totalImages}px`; // Total width


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
