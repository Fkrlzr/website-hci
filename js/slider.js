document.addEventListener("DOMContentLoaded", () => {
  const slides = [
    {
      image: "assets/images/artworks/witcher-portrait.jpg",
      artist: "CD Projekt Red",
      title: "The Witcher 3: Wild Hunt",
    },
    {
      image: "assets/images/artworks/spirited.jpg",
      artist: "@artist123",
      title: "Spirited Away",
    },
    {
      image: "assets/images/artworks/starwars.jpg",
      artist: "@artist123",
      title: "Star Wars",
    },
    {
      image: "assets/images/artworks/avatar.jpg",
      artist: "@artist123",
      title: "Avatar: The Last Airbender",
    },
    {
      image: "assets/images/artworks/harrypotter.jpg",
      artist: "@artist123",
      title: "Harry Potter",
    },
  ];

  let currentSlide = 0;
  const heroSlider = document.querySelector(".hero-slider");
  const slideContent = document.querySelector(".slide-content");

  // Create slide elements
  slides.forEach((_, index) => {
    const slideElement = document.createElement("div");
    slideElement.className = `slide ${index === 0 ? "active" : ""}`;
    heroSlider.appendChild(slideElement);
  });

  function updateSlide() {
    const slide = slides[currentSlide];

    // Update background image
    heroSlider.style.backgroundImage = `url(${slide.image})`;

    // Update content
    slideContent.querySelector("h1").textContent = slide.title;
    slideContent.querySelector(
      ".artist"
    ).textContent = `Art by ${slide.artist}`;

    // Update active slide indicator
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
  }

  function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
  }

  // Add navigation dots
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "slider-dots";
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlide();
    });
    dotsContainer.appendChild(dot);
  });
  heroSlider.insertBefore(dotsContainer, slideContent);

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      previousSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  // Add touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  heroSlider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  heroSlider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        previousSlide();
      } else {
        nextSlide();
      }
    }
  }

  // Initial slide setup
  updateSlide();

  // Auto advance slides every 5 seconds
  setInterval(nextSlide, 5000);
});
