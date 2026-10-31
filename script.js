const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll("nav a");

// Mobile menu
function setMenu(open) {
  header.classList.toggle("nav-open", open);
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

menuToggle.addEventListener("click", () => setMenu(!header.classList.contains("nav-open")));
navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

// Reveal sections as they scroll into view
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));

  // Highlight the nav link for the section currently in view
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("active"));
}

// Project details popup
const modal = document.querySelector(".project-modal");
const modalBody = modal.querySelector(".modal-body");

document.querySelectorAll(".details-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    modalBody.replaceChildren(...Array.from(card.children, (child) => child.cloneNode(true)));
    modalBody.querySelector(".details-btn").remove();
    modalBody.querySelector("h3").id = "modal-title";
    modal.showModal();
  });
});

modal.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});
