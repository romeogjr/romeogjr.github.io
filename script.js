const container = document.querySelector('.carousel-container');
let isPaused = false;

container.addEventListener('mouseover', () => isPaused = true);
container.addEventListener('mouseout', () => isPaused = false);

setInterval(() => {
    if (!isPaused) {
        container.scrollLeft += 1;
    }
}, 20);


function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"; // Hide the dropdown if it's visible
    } else {
        dropdown.style.display = "block"; // Show the dropdown if it's hidden
    }
}
