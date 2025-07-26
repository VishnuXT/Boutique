const cards = document.querySelectorAll(".card");
const track = document.querySelector(".carousel-track");

let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex = (newIndex + cards.length) % cards.length;

  cards.forEach((card, i) => {
    const offset = (i - currentIndex + cards.length) % cards.length;
    card.classList.remove(
      "center",
      "left-1",
      "left-2",
      "right-1",
      "right-2",
      "hidden"
    );

    if (offset === 0) card.classList.add("center");
    else if (offset === 1) card.classList.add("right-1");
    else if (offset === 2) card.classList.add("right-2");
    else if (offset === cards.length - 1) card.classList.add("left-1");
    else if (offset === cards.length - 2) card.classList.add("left-2");
    else card.classList.add("hidden");
  });

  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

cards.forEach((card, i) => {
  card.addEventListener("click", () => updateCarousel(i));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
  else if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
});

// Mouse drag
let isDragging = false;
let startX = 0;
let endX = 0;

track.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  track.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  endX = e.clientX;
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  const diff = startX - endX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) updateCarousel(currentIndex + 1);
    else updateCarousel(currentIndex - 1);
  }
  track.style.cursor = "grab";
});

// Touch support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) updateCarousel(currentIndex + 1);
    else updateCarousel(currentIndex - 1);
  }
});

updateCarousel(0);

// nav

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

// Toggle full-screen nav
burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu on link click
document.querySelectorAll(".nav_links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

function showSidebar() {
  document.getElementById("sidebar").style.display = "flex";
}

function hideSidebar() {
  document.getElementById("sidebar").style.display = "none";
}
