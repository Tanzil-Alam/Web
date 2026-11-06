const header = document.getElementById("header");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link, .nav__contact");

function closeMenu() {
  navMenu.classList.remove("show-menu");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("show-menu");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navClose.addEventListener("click", closeMenu);
navLinks.forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

const words = ["Developer", "Builder", "Maker"];
const typedElement = document.getElementById("home-typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  let wordIndex = 0;
  let characterIndex = words[0].length;
  let deleting = true;
  function typeWord() {
    const word = words[wordIndex];
    characterIndex += deleting ? -1 : 1;
    typedElement.textContent = word.slice(0, characterIndex);
    let delay = deleting ? 55 : 95;
    if (characterIndex <= 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 350;
    } else if (characterIndex >= words[wordIndex].length) {
      deleting = true;
      delay = 1450;
    }
    window.setTimeout(typeWord, delay);
  }
  window.setTimeout(typeWord, 1600);
}

const workTrack = document.getElementById("work-track");
const workCards = [...workTrack.querySelectorAll(".work__card")];
const workPagination = document.getElementById("work-pagination");
const workDots = workCards.map((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = `work__dot${index === 0 ? " active" : ""}`;
  dot.setAttribute("aria-label", `Show skill ${index + 1}`);
  dot.addEventListener("click", () => {
    workCards[index].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "start" });
  });
  workPagination.append(dot);
  return dot;
});

function updateWorkPagination() {
  const trackRect = workTrack.getBoundingClientRect();
  let nearest = 0;
  let distance = Infinity;
  workCards.forEach((card, index) => {
    const currentDistance = Math.abs(card.getBoundingClientRect().left - trackRect.left);
    if (currentDistance < distance) {
      distance = currentDistance;
      nearest = index;
    }
  });
  workDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === nearest);
    dot.setAttribute("aria-current", index === nearest ? "true" : "false");
  });
}

document.getElementById("work-prev").addEventListener("click", () => {
  workTrack.scrollBy({ left: -workTrack.clientWidth * .78, behavior: reduceMotion ? "auto" : "smooth" });
});
document.getElementById("work-next").addEventListener("click", () => {
  workTrack.scrollBy({ left: workTrack.clientWidth * .78, behavior: reduceMotion ? "auto" : "smooth" });
});
workTrack.addEventListener("scroll", updateWorkPagination, { passive: true });

const testimonialTrack = document.getElementById("testimonials-track");
document.getElementById("testimonial-prev").addEventListener("click", () => {
  testimonialTrack.scrollBy({ left: -testimonialTrack.clientWidth * .8, behavior: reduceMotion ? "auto" : "smooth" });
});
document.getElementById("testimonial-next").addEventListener("click", () => {
  testimonialTrack.scrollBy({ left: testimonialTrack.clientWidth * .8, behavior: reduceMotion ? "auto" : "smooth" });
});

const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`
  );
  contactMessage.textContent = "Your email app will open with your message ready to send.";
  contactMessage.className = "contact__message success";
  window.location.href = `mailto:xiamcommunity@gmail.com?subject=${subject}&body=${body}`;
});

const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll(".nav__link").forEach(link => {
      link.classList.toggle("active-link", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));

const scrollUp = document.getElementById("scroll-up");
function updateScrollState() {
  header.classList.toggle("header-shadow", window.scrollY >= 50);
  scrollUp.classList.toggle("show-scroll", window.scrollY >= 450);
}
window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

document.getElementById("year").textContent = new Date().getFullYear();
