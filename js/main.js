document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });

  const featuredArtworks = [
    {
      title: "The Witcher",
      artist: "@artist123",
      likes: "12k",
      image: "assets/images/artworks/witcher-portrait.jpg",
    },
    {
      title: "Spirited Away",
      artist: "@artist123",
      likes: "15k",
      image: "assets/images/artworks/spirited.jpg",
    },
    {
      title: "Star Wars",
      artist: "@artist123",
      likes: "18k",
      image: "assets/images/artworks/starwars.jpg",
    },
    {
      title: "Avatar: The Last Airbender",
      artist: "@artist123",
      likes: "10k",
      image: "assets/images/artworks/avatar.jpg",
    },
    {
      title: "Harry Potter",
      artist: "@artist123",
      likes: "11k",
      image: "assets/images/artworks/harrypotter.jpg",
    },
  ];

  const artworkGrid = document.querySelector(".artwork-grid");

  function createArtworkCard(artwork) {
    return `
            <div class="artwork-card">
                <img src="${artwork.image}" alt="${artwork.title}" />
                <div class="artwork-info">
                    <h3>${artwork.title}</h3>
                    <p>Illustration by ${artwork.artist}</p>
                    <span class="likes">${artwork.likes} likes</span>
                </div>
            </div>
        `;
  }

  if (artworkGrid) {
    artworkGrid.innerHTML = featuredArtworks
      .map((artwork) => createArtworkCard(artwork))
      .join("");
  }

  const style = document.createElement("style");
  style.textContent = `
        .artwork-placeholder {
            background-color: #f0f0f0;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 1.2rem;
            border-radius: 8px 8px 0 0;
        }
        
        .placeholder-text {
            padding: 1rem;
            text-align: center;
        }
    `;
  document.head.appendChild(style);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
