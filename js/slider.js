document.addEventListener("DOMContentLoaded", () => {
  const slides = [
    {
      image: "assets/images/artworks/witcher.jpg",
      artist: "CD Projekt Red",
      title: "The Witcher 3: Wild Hunt",
    },
    {
      image: "assets/images/artworks/gow.jpg",
      artist: "Santa Monica Studio",
      title: "God of War",
    },
    {
      image: "assets/images/artworks/ff7.jpg",
      artist: "Square Enix",
      title: "Final Fantasy VII Remake",
    },
  ];

  let currentSlide = 0;
  const heroSlider = document.querySelector(".hero-slider");
  const sliderContent = document.querySelector(".slide-content");

  function updateSlide() {
    const slide = slides[currentSlide];
    heroSlider.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`;
    sliderContent.querySelector("h1").textContent = slide.title;
    sliderContent.querySelector(
      ".artist"
    ).textContent = `Art by ${slide.artist}`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
  }

  // Initial slide
  updateSlide();

  // Auto advance slides every 5 seconds
  setInterval(nextSlide, 5000);

  // Add navigation dots
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "slider-dots";
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlide();
      document.querySelectorAll(".dot").forEach((d, i) => {
        d.classList.toggle("active", i === index);
      });
    });
    dotsContainer.appendChild(dot);
  });
  heroSlider.appendChild(dotsContainer);
});
