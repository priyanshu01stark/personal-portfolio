document.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcome");
  const themeBtn = document.getElementById("themeBtn");
  const topButton = document.getElementById("topBtn");
  const loader = document.getElementById("loader");
  const menu = document.getElementById("menu");
  const menuBtn = document.getElementById("menuBtn");
  const yearEl = document.getElementById("year");
  const progressBar = document.getElementById("progress-bar");
  const scrollPercent = document.getElementById("scrollPercent");
  const searchInput = document.getElementById("projectSearch");
  const copyEmail = document.getElementById("copyEmail");
  const contactForm = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendBtn");
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImg = modal?.querySelector("img");
  const modalDesc = modal?.querySelector("p");
  const modalLinks = modal ? modal.querySelectorAll("a") : [];
  const typing = document.getElementById("typing");
  const projectCards = document.querySelectorAll(".project-card");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const revealEls = document.querySelectorAll(".reveal");
  const progressBars = document.querySelectorAll(".progress-bar");
  const navLinks = document.querySelectorAll(".menu a");

  let userName = "Priyanshu";
  if (!userName) userName = "Guest";
  if (welcome) welcome.textContent = `Welcome ${userName} 👋`;

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeBtn) themeBtn.innerHTML = "☀ Light Mode";
  }

  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (themeBtn) themeBtn.innerHTML = isDark ? "☀ Light Mode" : "🌙 Dark Mode";
  }

  function updateScrollUI() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (scrollPercent) scrollPercent.textContent = `${Math.round(progress)}%`;

    if (topButton) {
      const visible = scrollTop > 200;
      topButton.style.opacity = visible ? "1" : "0";
      topButton.style.visibility = visible ? "visible" : "hidden";
      topButton.style.transform = visible ? "translateY(0)" : "translateY(20px)";
    }

    let currentSection = "";
    document.querySelectorAll("section[id]").forEach(section => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;
      if (scrollTop >= top && scrollTop < bottom) currentSection = section.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });

    revealEls.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 120) el.classList.add("active");
    });

    progressBars.forEach(bar => {
      if (!bar.dataset.width) {
        bar.dataset.width = getComputedStyle(bar).width;
        bar.style.width = "0%";
      }
      if (bar.getBoundingClientRect().top < window.innerHeight - 100) {
        bar.style.width = bar.dataset.width;
      }
    });
  }

  function openModal(title, image, description, live, github) {
    if (!modal || !modalTitle || !modalImg || !modalDesc || modalLinks.length < 2) return;
    modalTitle.textContent = title;
    modalImg.src = image;
    modalImg.alt = title;
    modalDesc.textContent = description;
    modalLinks[0].href = live;
    modalLinks[1].href = github;
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function filterProjects(category) {
    filterBtns.forEach(btn => btn.classList.remove("active"));
    filterBtns.forEach(btn => {
      const label = btn.textContent.trim().toLowerCase();
      const match =
        (category === "all" && label === "all") ||
        (category === "html" && label.includes("html")) ||
        (category === "javascript" && label.includes("javascript")) ||
        (category === "api" && label.includes("api"));
      if (match) btn.classList.add("active");
    });

    projectCards.forEach(card => {
      const show = category === "all" || card.dataset.category.includes(category);
      if (show) {
        card.style.display = "";
        card.style.opacity = "0";
        setTimeout(() => (card.style.opacity = "1"), 50);
      } else {
        card.style.display = "none";
      }
    });
  }

  function typeEffect() {
    if (!typing) return;

    const typingTexts = [
      "Frontend Developer",
      "BCA Student",
      "JavaScript Learner",
      "Future Full Stack Developer",
      "Open For Internship"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const current = typingTexts[textIndex];

      if (!deleting) {
        typing.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          return setTimeout(tick, 1500);
        }
      } else {
        typing.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          textIndex = (textIndex + 1) % typingTexts.length;
        }
      }

      setTimeout(tick, deleting ? 60 : 120);
    };

    tick();
  }

  function incrementCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;

    let current = 0;
    const step = Math.max(1, Math.ceil(target / 100));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 20);
  }

  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      const active = menu.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", active ? "true" : "false");
    });
  }

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => menu?.classList.remove("active"));
  });

  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (copyEmail) {
    copyEmail.addEventListener("click", async () => {
      const email = "priyanshugangwar73@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        alert("Email Copied ✅");
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const value = this.value.toLowerCase().trim();
      projectCards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(value) ? "" : "none";
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const label = btn.textContent.trim().toLowerCase();
      if (label === "all") filterProjects("all");
      else if (label.includes("html")) filterProjects("html");
      else if (label.includes("javascript")) filterProjects("javascript");
      else if (label.includes("api")) filterProjects("api");
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name) return alert("Please Enter Your Name");
      if (!email) return alert("Please Enter Your Email");
      if (!emailPattern.test(email)) return alert("Please Enter Valid Email");
      if (!message) return alert("Please Enter Your Message");

      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = "Sending...";
      }

      try {
        await emailjs.send("service_t1zafvv", "template_5p0xv37", {
          from_name: name,
          from_email: email,
          message: message
        });
        alert("✅ Message Sent Successfully!");
        contactForm.reset();
      } catch (error) {
        console.log(error);
        alert("❌ Failed to Send Message");
      } finally {
        if (sendBtn) {
          sendBtn.disabled = false;
          sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
      }
    });
  }

  window.addEventListener("scroll", updateScrollUI);
  window.addEventListener("resize", updateScrollUI);
  updateScrollUI();

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) loader.style.display = "none";
    }, 500);

    typeEffect();
    incrementCounter("projectCount", 4);
    incrementCounter("certificateCount", 4);
    incrementCounter("skillCount", 5);
    incrementCounter("codingCount", 150);

    if (window.AOS) {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 120
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (modal && e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.key === "d" || e.key === "D") toggleTheme();
  });

  window.filterProjects = filterProjects;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.topFunction = () => window.scrollTo({ top: 0, behavior: "smooth" });
});