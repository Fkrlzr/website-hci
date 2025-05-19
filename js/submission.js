document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("artSubmissionForm");
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const uploadButton = document.getElementById("uploadButton");
  const previewImage = document.getElementById("previewImage");

  const validations = {
    email: {
      validate: (value) => {
        if (!value) return "Email is required";
        if (!value.includes("@")) return "Email must contain @";
        const [localPart, domain] = value.split("@");
        if (!localPart || !domain) return "Invalid email format";
        if (!domain.includes(".")) return "Invalid domain format";
        return "";
      },
    },
    title: {
      validate: (value) => {
        if (!value) return "Title is required";
        if (value.length < 3) return "Title must be at least 3 characters";
        if (value.length > 100) return "Title must be less than 100 characters";
        return "";
      },
    },
    description: {
      validate: (value) => {
        if (!value) return "Description is required";
        if (value.length < 10)
          return "Description must be at least 10 characters";
        if (value.length > 500)
          return "Description must be less than 500 characters";
        return "";
      },
    },
    tags: {
      validate: (value) => {
        if (!value) return "Tags are required";
        const tags = value.split(",").map((tag) => tag.trim());
        if (tags.length < 1) return "At least one tag is required";
        if (tags.length > 10) return "Maximum 10 tags allowed";
        if (tags.some((tag) => tag.length < 2))
          return "Tags must be at least 2 characters";
        return "";
      },
    },
    artwork: {
      validate: (file) => {
        if (!file) return "File is required";

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
          return "Only JPG, JPEG, and PNG files are allowed";
        }

        const maxSize = 20 * 1024 * 1024;
        if (file.size > maxSize) {
          return "File size must be less than 20MB";
        }

        return "";
      },
    },
  };

  function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    errorElement.textContent = message;
    errorElement.classList.add("visible");
  }

  function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    errorElement.textContent = "";
    errorElement.classList.remove("visible");
  }

  function validateField(fieldId, value) {
    const validation = validations[fieldId];
    if (validation) {
      const error = validation.validate(value);
      if (error) {
        showError(fieldId, error);
        return false;
      }
      clearError(fieldId);
      return true;
    }
    return true;
  }

  function handleFileUpload(file) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.style.width = "auto";
        previewImage.style.height = "auto";
        previewImage.style.maxHeight = "300px";
      };
      reader.readAsDataURL(file);
      validateField("artwork", file);
    }
  }

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  });

  uploadButton.addEventListener("click", () => {
    fileInput.click();
  });

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    fileInput.files = e.dataTransfer.files;
    handleFileUpload(file);
  });

  ["email", "title", "description", "tags"].forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    input.addEventListener("blur", () => {
      validateField(fieldId, input.value);
    });
    input.addEventListener("input", () => {
      clearError(fieldId);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    ["email", "title", "description", "tags"].forEach((fieldId) => {
      const input = document.getElementById(fieldId);
      if (!validateField(fieldId, input.value)) {
        isValid = false;
      }
    });

    if (!validateField("artwork", fileInput.files[0])) {
      isValid = false;
    }

    if (isValid) {
      alert("Artwork submitted successfully!");
      form.reset();
      previewImage.src = "../assets/images/upload-icon.svg";
      previewImage.style.width = "64px";
      previewImage.style.height = "64px";
    }
  });
});
