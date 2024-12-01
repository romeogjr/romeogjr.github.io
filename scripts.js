document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    console.log("fix attempt 14");

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


    const speedPerSecond = 100; // Adjust this to set your desired constant speed

    // Function to calculate and set animation duration
    const updateAnimationSpeed = () => {
        const containerWidth = carouselContainer.offsetWidth; // Total width of the carousel
        const duration = containerWidth / speedPerSecond; // Time (in seconds) to scroll the entire width
        carouselContainer.style.animationDuration = `${duration}s`; // Set the animation duration dynamically
        console.log("adjusting speed");
    };


    const addClones = () => {
        const images = Array.from(document.querySelectorAll('.carousel-image')); // Select all current images
        console.log("adding clones");
        images.forEach(image => {
            const clone = image.cloneNode(true); // Clone the image
            carouselContainer.appendChild(clone); // Append the clone to the container
        });

        // Dynamically adjust the container's width
        const imageWidth = images[0].offsetWidth; // Width of a single image
        const totalImages = carouselContainer.children.length; // Total number of images in the container
        carouselContainer.style.width = `${imageWidth * totalImages}px`; // Adjust container width

        updateAnimationSpeed();
    };

    // Function to clean up old images (to prevent memory issues)
    const cleanupOldImages = () => {
        const allImages = carouselContainer.querySelectorAll('.carousel-image');
        if (allImages.length > 100) { // Keep the total number of images manageable
            for (let i = 0; i < 20; i++) {
                allImages[i].remove(); // Remove the oldest 20 images
            }
        }
    };

    // Add initial clones to start with enough content
    addClones();

    // Add clones every 10 seconds
    setInterval(() => {
        addClones(); // Add new clones
        cleanupOldImages(); // Optional: Clean up old images
    }, 10000);


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
