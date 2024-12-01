document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    initializeDropdowns();
});

function initializeCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    console.log("fix attempt 14, initialize speed part 2");

    if (!carouselContainer) {
        console.warn('Carousel container not found.');
        return;
    }

    const speedPerSecond = 100; // Adjust this to set your desired constant speed

    const updateAnimationSpeed = () => {
        const containerWidth = carouselContainer.offsetWidth;
        const duration = containerWidth / speedPerSecond;
        carouselContainer.style.animationDuration = `${duration}s`;
        console.log("adjusting speed");
    };

    const addClones = () => {
        const images = Array.from(document.querySelectorAll('.carousel-image'));
        console.log("adding clones");
        images.forEach(image => {
            const clone = image.cloneNode(true);
            carouselContainer.appendChild(clone);
        });

        const imageWidth = images[0].offsetWidth;
        const totalImages = carouselContainer.children.length;
        carouselContainer.style.width = `${imageWidth * totalImages}px`;

        updateAnimationSpeed();
    };

    const cleanupOldImages = () => {
        const allImages = carouselContainer.querySelectorAll('.carousel-image');
        if (allImages.length > 100) {
            for (let i = 0; i < 20; i++) {
                allImages[i].remove();
            }
        }
    };

    // Pause/resume carousel on hover
    carouselContainer.addEventListener('mouseenter', () => {
        console.log('Mouse came in, pausing carousel');
        carouselContainer.classList.add('paused');
    });

    carouselContainer.addEventListener('mouseleave', () => {
        console.log('Mouse left, resuming carousel');
        carouselContainer.classList.remove('paused');
    });

    updateAnimationSpeed();

    setInterval(() => {
        addClones();
        cleanupOldImages();
    }, 22000);
}

function initializeDropdowns() {
    function toggleDropdown(dropdownId, buttonElement) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            const isVisible = dropdown.classList.toggle('show');
            buttonElement.setAttribute('aria-expanded', isVisible.toString());
        }
    }

    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.addEventListener('click', () => {
            const dropdownId = button.getAttribute('aria-controls');
            toggleDropdown(dropdownId, button);
        });
    });

    openDropdownFromQuery();
}

function openDropdownFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const dropdownId = params.get('dropdown');
    console.log('Dropdown query parameter:', dropdownId);

    if (dropdownId) {
        const dropdown = document.getElementById(`dropdown${dropdownId}`);
        const button = document.querySelector(`[aria-controls="dropdown${dropdownId}"]`);
        const projectContainer = button?.closest('.project');

        if (dropdown && button && projectContainer) {
            dropdown.classList.add('show');
            button.setAttribute('aria-expanded', 'true');
            projectContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log('Dropdown opened:', dropdownId);
        } else {
            console.warn('Dropdown or button not found for id:', dropdownId);
        }
    }
}