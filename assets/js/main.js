/*==================== MOBILE MENU ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU ON LINK CLICK ====================*/
const navLinks = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLinks.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACTIVE LINK ON SCROLL ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 80;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]"
    );

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active-link");
      } else {
        navLink.classList.remove("active-link");
      }
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*==================== DARK MODE TOGGLE ====================*/
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// Check saved theme preference
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  body.classList.add("dark-theme");
  themeIcon.classList.replace("bx-moon", "bx-sun");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    themeIcon.classList.replace("bx-moon", "bx-sun");
    localStorage.setItem("portfolio-theme", "dark");
  } else {
    themeIcon.classList.replace("bx-sun", "bx-moon");
    localStorage.setItem("portfolio-theme", "light");
  }
});

/*==================== SCROLL TO TOP BUTTON ====================*/
const scrollTopBtn = document.getElementById("scroll-top");

const scrollTop = () => {
  if (window.scrollY >= 400) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
};
window.addEventListener("scroll", scrollTop);

/*==================== HEADER SHADOW ON SCROLL ====================*/
const header = document.getElementById("header");

const shadowHeader = () => {
  if (window.scrollY >= 80) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
};
window.addEventListener("scroll", shadowHeader);

/*==================== WORK FILTER ====================*/
const filterButtons = document.querySelectorAll(".work__filter");
const workCards = document.querySelectorAll(".work__card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    workCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
        card.style.animation = "fadeInUp 0.4s ease forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/*==================== CONTACT FORM ====================*/
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      contactStatus.textContent = "Please fill in all required fields.";
      contactStatus.className = "contact__status error";
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      contactStatus.textContent = "Please enter a valid email address.";
      contactStatus.className = "contact__status error";
      return;
    }

    // Simulate form submission (replace with actual backend/EmailJS later)
    const submitBtn = contactForm.querySelector(".contact__button");
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      contactStatus.textContent =
        "Message sent successfully! I'll get back to you soon.";
      contactStatus.className = "contact__status success";
      contactForm.reset();
      submitBtn.innerHTML = '<i class="bx bx-send"></i> Send Message';
      submitBtn.disabled = false;

      // Clear status after 5 seconds
      setTimeout(() => {
        contactStatus.textContent = "";
        contactStatus.className = "contact__status";
      }, 5000);
    }, 1500);
  });
}

/*==================== SCROLL REVEAL ANIMATIONS ====================*/
const sr = ScrollReveal({
  origin: "top",
  distance: "50px",
  duration: 1800,
  delay: 150,
  easing: "ease",
});

sr.reveal(".home__data", {});
sr.reveal(".home__img", { delay: 300, origin: "right" });
sr.reveal(".home__social-icon", { interval: 150, origin: "left" });

sr.reveal(".about__img", { origin: "left" });
sr.reveal(".about__subtitle, .about__text, .about__profession-tag", {
  delay: 200,
  origin: "right",
});
sr.reveal(".about__info-item", { interval: 150, origin: "bottom" });

sr.reveal(".skills__group", { interval: 200, origin: "bottom" });
sr.reveal(".skills__data", { interval: 100, origin: "bottom" });

sr.reveal(".work__filters", { origin: "top" });
sr.reveal(".work__card", { interval: 150, origin: "bottom" });

sr.reveal(".contact__info-item", { interval: 150, origin: "left" });
sr.reveal(".contact__input-group", { interval: 100, origin: "right" });
sr.reveal(".contact__button", { delay: 300, origin: "bottom" });

/*==================== ANIMATE SKILL BARS ON SCROLL ====================*/
const skillBars = document.querySelectorAll(".skills__bar");

const animateSkillBars = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      observer.unobserve(entry.target);
    }
  });
};

const skillObserver = new IntersectionObserver(animateSkillBars, {
  threshold: 0.3,
});

skillBars.forEach((bar) => {
  skillObserver.observe(bar);
});

/*==================== FADE IN UP ANIMATION (CSS Keyframe) ====================*/
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
