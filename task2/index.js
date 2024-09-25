const allImg = [
  "img/solar-panels-meadow2(1).png",
  "img/solar-panels-meadow2(2).png",
  "img/solar-panels-meadow2.png",
];

const carousal = document.querySelector(".slides");
const dotsContainer = document.querySelector(".pagination-dots");

let currentIndex = 0;
let intervalId; // Variable to store the interval ID

// Variables for swipe functionality
let startX = 0;
let endX = 0;

function updateImg(index) {
  // carousal.src = allImg[index % allImg.length];
  currentIndex = index % allImg.length;
  // carousal.src = allImg[currentIndex];

  // Apply the flip effect
  carousal.style.transition = "transform 0.6s"; // Smooth transition
  carousal.style.transform = `rotateY(180deg)`; // Trigger the flip
    // Change the image after the flip
    setTimeout(() => {
      carousal.src = allImg[currentIndex];
      carousal.style.transition = "none"; // Remove transition to avoid flicker
      carousal.style.transform = `rotateY(0deg)`; // Reset the rotation for the next image
  }, 1500); // Match this timeout with the transition duration

  // Slide effect
  createPaginationDots();
}

// Function to create pagination dots dynamically
function createPaginationDots() {
  dotsContainer.innerHTML = ""; // Clear any existing dots

  for (let i = 0; i < allImg.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === currentIndex) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      updateImg(i); // Navigate to the clicked image
      clearInterval(intervalId); // Stop auto-sliding when dot clicked
      start(); // Restart auto-slide
    });

    dotsContainer.appendChild(dot);
  }
}

function start() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    updateImg(++currentIndex);
  }, 3000);
}

// Function to update the active dot
function updateActiveDot(index) {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index); // Highlight the active dot
  });
}

updateImg(currentIndex);
updateActiveDot(currentIndex);

function nextSlide() {
  currentIndex = (currentIndex + 1) % allImg.length;
  updateImg(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + allImg.length) % allImg.length;
  updateImg(currentIndex);
}

// Swipe handling
function handleSwipe() {
  const swipeDistance = startX - endX;

  // Set a threshold to prevent minor swipes from triggering the slide
  const swipeThreshold = 50;

  if (swipeDistance > swipeThreshold) {
    // Swipe left -> Next slide
    nextSlide();
  } else if (swipeDistance < -swipeThreshold) {
    // Swipe right -> Previous slide
    prevSlide();
  }
}

// Capture the start of the swipe (touchstart)
carousal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX; // Get the X coordinate of the first touch
});

// Capture the end of the swipe (touchend)
carousal.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX; // Get the X coordinate where the touch ended
  handleSwipe(); // Determine swipe direction and navigate
});

carousal.addEventListener("mouseover", () => {
  clearInterval(intervalId);
});

carousal.addEventListener("mouseout", () => {
  start();
});

document.getElementById("prev").addEventListener("click", prevSlide);
document.getElementById("next").addEventListener("click", nextSlide);

document.addEventListener("DOMContentLoaded", start);
