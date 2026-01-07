// ===== Typing effect header =====
const text = "Bonjour, je suis Richard MARE.";
let i = 0;
function typing() {
  const typingElem = document.getElementById("typing");
  if (!typingElem) return;
  if (i < text.length) {
    typingElem.textContent += text.charAt(i);
    i++;
    setTimeout(typing, 70);
  }
}
window.addEventListener("load", typing);

// ===== Accordéon =====
document.querySelectorAll(".accordion-title").forEach(title => {
  title.addEventListener("click", () => {
    const parent = title.parentElement;
    parent.classList.toggle("active");
  });
});

// ===== Carrousels =====
function initCarousel(carouselElem) {
  const track = carouselElem.querySelector(".carousel-track");
  const slides = carouselElem.querySelectorAll(".project-card");
  if (!track || slides.length === 0) return;

  let index = 0;
  const nextBtn = carouselElem.querySelector(".next");
  const prevBtn = carouselElem.querySelector(".prev");

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  });

  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  });
}

// Initialisation des carrousels
document.querySelectorAll(".carousel").forEach(initCarousel);

// ===== Texte tournant autour du drapeau =====
const rotatingTextPath = document.getElementById("rotatingTextPath");
let offset = 0;
function rotateText() {
  if (rotatingTextPath) {
    offset = (offset + 0.3) % 100; // vitesse de rotation
    rotatingTextPath.setAttribute("startOffset", offset + "%");
    requestAnimationFrame(rotateText);
  }
}
window.addEventListener("load", () => {
  if (rotatingTextPath) rotateText();
});

// ===== CTA ouvrant accordéons et scroll =====
document.querySelectorAll(".cta a").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const targetId = btn.getAttribute("href").substring(1);
    const section = document.getElementById(targetId);
    if (!section) return;

    // ouvrir tous les accordéons de la section
    section.querySelectorAll(".accordion").forEach(acc => {
      if (!acc.classList.contains("active")) acc.classList.add("active");
    });

    // scroll smooth
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== Typing effect pour état civil =====
document.addEventListener("DOMContentLoaded", () => {
  const fields = [
    { selector: ".field-nom span", text: "Nom : MARE" },
    { selector: ".field-prenom span", text: "Prénom : Richard" },
    { selector: ".field-age span", text: "Âge : 23 ans" },
    { selector: ".field-status span", text: "Célibataire" },
    { selector: ".field-residence span", text: "Réside à : OUAGADOUGOU/BF" },
    { selector: ".field-etudes span", text: "Étudiant en Licence Informatique Appliquée" },
    { selector: ".field-ambition span", text: "Ambition : Fonder une entreprise informatique innovante" }
  ];

  fields.forEach((field, idx) => {
    const span = document.querySelector(field.selector);
    if (!span) return;

    let i = 0;
    function typeChar() {
      if (i < field.text.length) {
        span.textContent += field.text.charAt(i);
        i++;
        setTimeout(typeChar, 40);
      }
    }

    setTimeout(typeChar, idx * 400); // effet cascade
  });
});
