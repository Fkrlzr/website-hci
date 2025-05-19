document.addEventListener("DOMContentLoaded", () => {
  const galleryData = [
    {
      id: 1,
      title: "The Last of Us Part II",
      artist: "Naughty Dog",
      image: "../assets/images/artworks/lastofus.jpg",
      likes: "8.3k",
      views: "15.2k",
      description:
        "Ellie's intense gaze captures the emotional depth and darkness of The Last of Us Part II.",
      tags: ["Digital Art", "Gaming", "Fan Art"],
    },
    {
      id: 2,
      title: "The Witcher 3: Wild Hunt",
      artist: "CD Projekt Red",
      image: "../assets/images/artworks/witcher.jpg",
      likes: "7.2k",
      views: "12.8k",
      description:
        "Geralt of Rivia stands ready for battle in this iconic cover art from The Witcher 3.",
      tags: ["Digital Art", "Gaming", "Character Design"],
    },
    {
      id: 3,
      title: "Final Fantasy VII Remake",
      artist: "Square Enix",
      image: "../assets/images/artworks/ff7.jpg",
      likes: "6.5k",
      views: "11.5k",
      description: "The heroes of Final Fantasy VII Remake gather before the sprawling city of Midgar.",
      tags: ["Digital Art", "Gaming", "Fan Art"],
    },
    {
      id: 4,
      title: "Red Dead Redemption 2",
      artist: "Rockstar Games",
      image: "../assets/images/artworks/rdr2.jpg",
      likes: "5.9k",
      views: "10.2k",
      description:
        "The Van der Linde gang assembled in this stunning artwork from Red Dead Redemption 2.",
      tags: ["Digital Art", "Gaming", "Fan Art"],
    },
    {
      id: 5,
      title: "God of War",
      artist: "Santa Monica Studio",
      image: "../assets/images/artworks/gow.jpg",
      likes: "9.1k",
      views: "16.7k",
      description:
        "Kratos and Atreus embark on their journey across Norse mythology in this powerful scene.",
      tags: ["Digital Art", "Gaming", "Character Design"],
    },
  ];

  const galleryGrid = document.querySelector(".gallery-grid");
  const modal = document.querySelector(".artwork-modal");
  const modalClose = document.querySelector(".modal-close");
  const tagButtons = document.querySelectorAll(".gallery-tags .tag");

  function createGalleryItems(items) {
    return items
      .map(
        (item) => `
            <div class="gallery-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-item-info">
                    <h3>${item.title}</h3>
                    <p>by ${item.artist}</p>
                </div>
            </div>
        `
      )
      .join("");
  }

  if (galleryGrid) {
    galleryGrid.innerHTML = createGalleryItems(galleryData);
  }

  function openModal(artwork) {
    const modalImage = modal.querySelector(".artwork-image img");
    const modalTitle = modal.querySelector(".artwork-title");
    const modalArtist = modal.querySelector(".artwork-artist");
    const modalStats = modal.querySelector(".artwork-stats");
    const modalDescription = modal.querySelector(".artwork-description");
    const modalTags = modal.querySelector(".artwork-tags");

    modalImage.src = artwork.image;
    modalImage.alt = artwork.title;
    modalTitle.textContent = artwork.title;
    modalArtist.textContent = `by ${artwork.artist}`;
    modalStats.innerHTML = `
            <span class="likes">❤ ${artwork.likes} likes</span>
            <span class="views">👁 ${artwork.views} views</span>
        `;
    modalDescription.textContent = artwork.description;
    modalTags.innerHTML = artwork.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (galleryGrid) {
    galleryGrid.addEventListener("click", (e) => {
      const galleryItem = e.target.closest(".gallery-item");
      if (galleryItem) {
        const artworkId = parseInt(galleryItem.dataset.id);
        const artwork = galleryData.find((item) => item.id === artworkId);
        if (artwork) {
          openModal(artwork);
        }
      }
    });
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tagButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const tag = button.textContent;
      const filteredItems =
        tag === "Digital Art"
          ? galleryData
          : galleryData.filter((item) => item.tags.includes(tag));

      galleryGrid.innerHTML = createGalleryItems(filteredItems);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  const paginationButtons = document.querySelectorAll(".pagination button");
  paginationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (
        !button.classList.contains("active") &&
        !button.classList.contains("prev-page") &&
        !button.classList.contains("next-page")
      ) {
        paginationButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
      }
    });
  });
});
