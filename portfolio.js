const header = document.querySelector(".site-header");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const year = document.querySelector("#year");

// Dynamic footer year
year.textContent = new Date().getFullYear();


// ================================
// Mobile Navigation
// ================================

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  });
});


// ================================
// Header Appearance While Scrolling
// ================================

const updateHeader = () => {
  header.classList.toggle(
    "scrolled",
    window.scrollY > 30
  );
};

window.addEventListener("scroll", updateHeader);

updateHeader();


// ================================
// Active Navigation Link
// ================================

const sections = document.querySelectorAll(
  "main section[id]"
);

const navItems = document.querySelectorAll(
  '.nav-links a[href^="#"]'
);

const setActiveLink = () => {
  let current = "home";

  sections.forEach(section => {
    const top = section.offsetTop - 160;

    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navItems.forEach(item => {
    item.classList.toggle(
      "active",
      item.getAttribute("href") === `#${current}`
    );
  });
};

window.addEventListener(
  "scroll",
  setActiveLink
);

setActiveLink();


// ================================
// Scroll Reveal Animation
// ================================

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );
        }

      });

    },
    {
      threshold: 0.12
    }
  );

document
  .querySelectorAll(".reveal")
  .forEach(el => {

    revealObserver.observe(el);

  });


// ================================
// Portfolio Filtering
// ================================

const filterButtons =
  document.querySelectorAll(".filter");

const portfolioItems =
  document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter =
        button.dataset.filter;

      portfolioItems.forEach(item => {

        const show =
          filter === "all" ||
          item.dataset.category === filter;

        item.classList.toggle(
          "hidden",
          !show
        );

      });

    }
  );

});


// ================================
// Image Lightbox
// ================================

const lightbox =
  document.querySelector("#lightbox");

const lightboxImage =
  document.querySelector("#lightboxImage");

const lightboxTitle =
  document.querySelector("#lightboxTitle");

const lightboxClose =
  document.querySelector("#lightboxClose");


document
  .querySelectorAll("[data-lightbox]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        lightboxImage.src =
          button.dataset.lightbox;

        lightboxImage.alt =
          button.dataset.title;

        lightboxTitle.textContent =
          button.dataset.title;

        lightbox.classList.add("open");

        lightbox.setAttribute(
          "aria-hidden",
          "false"
        );

        document.body.classList.add(
          "no-scroll"
        );

      }
    );

  });


function closeLightbox() {

  lightbox.classList.remove(
    "open"
  );

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "no-scroll"
  );

  setTimeout(() => {

    lightboxImage.src = "";

  }, 250);

}


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


lightbox.addEventListener(
  "click",
  event => {

    if (
      event.target === lightbox
    ) {

      closeLightbox();

    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      lightbox.classList.contains("open")
    ) {

      closeLightbox();

    }

  }
);


// ================================
// FORMSPREE CONTACT FORM
// APON EXQUISITE FURNITURE DECO. & ENTERPRISES
// ================================

const contactForm =
  document.querySelector("#contactForm");

const formMessage =
  document.querySelector("#formMessage");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    async event => {

      // Prevent the browser from leaving the page
      event.preventDefault();


      const submitButton =
        contactForm.querySelector(
          'button[type="submit"]'
        );


      const originalButtonText =
        submitButton.innerHTML;


      // Show sending state
      submitButton.disabled = true;

      submitButton.innerHTML =
        "Sending...";


      formMessage.textContent =
        "Sending your project request...";


      try {

        const response =
          await fetch(
            contactForm.action,
            {
              method: "POST",

              body:
                new FormData(
                  contactForm
                ),

              headers: {
                Accept:
                  "application/json"
              }
            }
          );


        if (response.ok) {

          // Successful submission
          formMessage.textContent =
            "Thank you! Your project request has been sent successfully. We will get back to you shortly.";

          formMessage.style.color =
            "#24483a";


          // Clear the form
          contactForm.reset();


        } else {

          // Try to read Formspree's error
          const data =
            await response.json();


          if (
            data.errors &&
            data.errors.length
          ) {

            formMessage.textContent =
              data.errors
                .map(
                  error =>
                    error.message
                )
                .join(", ");

          } else {

            formMessage.textContent =
              "Something went wrong. Please try again.";

          }


          formMessage.style.color =
            "#a33";


        }

      } catch (error) {

        console.error(
          "Formspree error:",
          error
        );


        formMessage.textContent =
          "Unable to send your request. Please check your internet connection and try again.";


        formMessage.style.color =
          "#a33";


      } finally {

        // Restore button
        submitButton.disabled =
          false;

        submitButton.innerHTML =
          originalButtonText;

      }

    }
  );

}
