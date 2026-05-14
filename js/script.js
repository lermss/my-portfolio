const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    const buttons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-card");

    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projects.forEach((project) => {
      const shouldShow = filter === "all" || project.dataset.category === filter;
      project.hidden = !shouldShow;
    });
  });
});

document.querySelectorAll(".carousel").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const previous = carousel.querySelector(".carousel-btn.prev");
  const next = carousel.querySelector(".carousel-btn.next");
  let currentIndex = slides.findIndex((slide) => slide.classList.contains("active"));

  if (slides.length <= 1) {
    previous.hidden = true;
    next.hidden = true;
    return;
  }

  if (currentIndex < 0) {
    currentIndex = 0;
    slides[currentIndex].classList.add("active");
  }

  const showSlide = (index) => {
    slides[currentIndex].classList.remove("active");
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
  };

  previous.addEventListener("click", () => showSlide(currentIndex - 1));
  next.addEventListener("click", () => showSlide(currentIndex + 1));
});

const certificateModal = document.querySelector("#certificateModal");

if (certificateModal) {
  const modalImage = certificateModal.querySelector("img");
  const closeButton = certificateModal.querySelector(".certificate-modal-close");

  const closeCertificate = () => {
    certificateModal.hidden = true;
    modalImage.src = "";
    modalImage.alt = "";
  };

  document.querySelectorAll(".cert-image").forEach((certificateLink) => {
    certificateLink.addEventListener("click", (event) => {
      const image = certificateLink.querySelector("img");

      if (!image) {
        return;
      }

      event.preventDefault();
      modalImage.src = certificateLink.href;
      modalImage.alt = image.alt;
      certificateModal.hidden = false;
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", closeCertificate);
  certificateModal.addEventListener("click", (event) => {
    if (event.target === certificateModal) {
      closeCertificate();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !certificateModal.hidden) {
      closeCertificate();
    }
  });
}

const projectModal = document.querySelector("#projectModal");

if (projectModal) {
  const modalImage = projectModal.querySelector("img");
  const closeButton = projectModal.querySelector(".project-modal-close");
  const previousButton = projectModal.querySelector(".modal-prev");
  const nextButton = projectModal.querySelector(".modal-next");
  let activeSlides = [];
  let activeIndex = 0;

  const showProjectSlide = (index) => {
    if (!activeSlides.length) {
      return;
    }

    activeIndex = (index + activeSlides.length) % activeSlides.length;
    const slide = activeSlides[activeIndex];
    modalImage.src = slide.src;
    modalImage.alt = slide.alt;

    const hasMultipleSlides = activeSlides.length > 1;
    previousButton.disabled = !hasMultipleSlides;
    nextButton.disabled = !hasMultipleSlides;
  };

  const closeProject = () => {
    projectModal.hidden = true;
    modalImage.src = "";
    modalImage.alt = "";
    activeSlides = [];
    activeIndex = 0;
  };

  document.querySelectorAll(".carousel-slide").forEach((slide) => {
    slide.addEventListener("click", () => {
      const carousel = slide.closest(".carousel");
      activeSlides = Array.from(carousel.querySelectorAll(".carousel-slide"));
      activeIndex = activeSlides.indexOf(slide);
      showProjectSlide(activeIndex);
      projectModal.hidden = false;
      closeButton.focus();
    });
  });

  previousButton.addEventListener("click", () => showProjectSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => showProjectSlide(activeIndex + 1));
  closeButton.addEventListener("click", closeProject);
  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      closeProject();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !projectModal.hidden) {
      closeProject();
    }

    if (event.key === "ArrowLeft" && !projectModal.hidden) {
      showProjectSlide(activeIndex - 1);
    }

    if (event.key === "ArrowRight" && !projectModal.hidden) {
      showProjectSlide(activeIndex + 1);
    }
  });
}


// =========================================================
// CONTACT FORM (NETLIFY FORMS)
// IMPORTANT: Remove your old JavaScript submit handler.
// Netlify handles the form automatically.
// =========================================================
const contactForm = document.querySelector(".contact-form");
const contactSuccessModal = document.querySelector(
  "#contactSuccessModal"
);

if (contactForm && contactSuccessModal) {
  contactForm.addEventListener("submit", () => {
    // Optional: show loading state before browser submits form
    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    // DO NOT call event.preventDefault()
    // DO NOT use fetch()
    // Netlify will process the form automatically.
  });
