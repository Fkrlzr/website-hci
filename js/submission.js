document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("artSubmissionForm");
  const emailInput = document.getElementById("email");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const tagsInput = document.getElementById("tags");
  const fileInput = document.getElementById("fileInput");
  const uploadButton = document.getElementById("uploadButton");
  const uploadArea = document.getElementById("uploadArea");
  const previewImage = document.getElementById("previewImage");

  // Validation functions
  function validateEmail(email) {
    // Custom email validation without regex
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    if (atIndex === -1 || dotIndex === -1) return false;
    if (atIndex === 0 || dotIndex === email.length - 1) return false;
    if (dotIndex <= atIndex + 1) return false;
    if (email.includes(" ")) return false;

    return true;
  }

  function validateTitle(title) {
    return title.length >= 3 && title.length <= 100;
  }

  function validateDescription(description) {
    return description.length >= 10 && description.length <= 500;
  }

  function validateTags(tags) {
    const tagList = tags.split(",").map((tag) => tag.trim());
    return (
      tagList.length >= 1 &&
      tagList.length <= 10 &&
      tagList.every((tag) => tag.length > 0)
    );
  }

  function validateFile(file) {
    if (!file) return false;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 20 * 1024 * 1024; // 20MB

    return validTypes.includes(file.type) && file.size <= maxSize;
  }

  // Error display functions
  function showError(inputElement, errorMessage) {
    const formGroup = inputElement.closest(".form-group");
    const errorElement = document.getElementById(`${inputElement.id}Error`);

    formGroup.classList.add("error");
    inputElement.classList.add("error");
    errorElement.textContent = errorMessage;

    // Shake animation for better feedback
    formGroup.classList.add("shake");
    setTimeout(() => formGroup.classList.remove("shake"), 500);
  }

  function clearError(inputElement) {
    const formGroup = inputElement.closest(".form-group");
    const errorElement = document.getElementById(`${inputElement.id}Error`);

    formGroup.classList.remove("error");
    inputElement.classList.remove("error");
    errorElement.textContent = "";
  }

  // Real-time validation
  emailInput.addEventListener("input", () => {
    if (emailInput.value) {
      if (!validateEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email address");
      } else {
        clearError(emailInput);
      }
    }
  });

  titleInput.addEventListener("input", () => {
    if (titleInput.value) {
      if (!validateTitle(titleInput.value)) {
        showError(titleInput, "Title must be between 3 and 100 characters");
      } else {
        clearError(titleInput);
      }
    }
  });

  descriptionInput.addEventListener("input", () => {
    if (descriptionInput.value) {
      if (!validateDescription(descriptionInput.value)) {
        showError(
          descriptionInput,
          "Description must be between 10 and 500 characters"
        );
      } else {
        clearError(descriptionInput);
      }
    }
  });

  tagsInput.addEventListener("input", () => {
    if (tagsInput.value) {
      if (!validateTags(tagsInput.value)) {
        showError(tagsInput, "Please enter 1-10 comma-separated tags");
      } else {
        clearError(tagsInput);
      }
    }
  });

  // File upload handling
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
    if (validateFile(file)) {
      handleFileUpload(file);
      clearError(fileInput);
    } else {
      showError(
        fileInput,
        "Invalid file. Please check the upload requirements."
      );
    }
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (validateFile(file)) {
      handleFileUpload(file);
      clearError(fileInput);
    } else {
      showError(
        fileInput,
        "Invalid file. Please check the upload requirements."
      );
    }
  });

  function handleFileUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewImage.style.width = "100%";
      previewImage.style.height = "auto";
    };
    reader.readAsDataURL(file);
  }

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear all previous errors
    form.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("error");
    });

    // Email validation
    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    }

    // Title validation
    if (!validateTitle(titleInput.value)) {
      showError(titleInput, "Title must be between 3 and 100 characters");
      isValid = false;
    }

    // Description validation
    if (!validateDescription(descriptionInput.value)) {
      showError(
        descriptionInput,
        "Description must be between 10 and 500 characters"
      );
      isValid = false;
    }

    // Tags validation
    if (!validateTags(tagsInput.value)) {
      showError(tagsInput, "Please enter 1-10 comma-separated tags");
      isValid = false;
    }

    // File validation
    if (!fileInput.files[0]) {
      showError(fileInput, "Please select a file to upload");
      isValid = false;
    } else if (!validateFile(fileInput.files[0])) {
      showError(
        fileInput,
        "Invalid file. Please check the upload requirements."
      );
      isValid = false;
    }

    // AI Generated validation
    const aiGeneratedRadios = form.querySelectorAll(
      'input[name="isAiGenerated"]'
    );
    const aiGeneratedSelected = Array.from(aiGeneratedRadios).some(
      (radio) => radio.checked
    );
    if (!aiGeneratedSelected) {
      const radioGroup = aiGeneratedRadios[0].closest(".form-group");
      radioGroup.classList.add("error");
      document.getElementById("aiGeneratedError").textContent =
        "Please indicate if the artwork is AI-generated";
      isValid = false;
    }

    if (isValid) {
      // Here you would typically submit the form data to a server
      alert("Form submitted successfully!");
      form.reset();
      previewImage.src = "../assets/images/upload-icon.svg";
      previewImage.style.width = "64px";
      previewImage.style.height = "64px";
    }
  });
});
