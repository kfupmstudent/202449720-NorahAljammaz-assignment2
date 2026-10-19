// =========================================================
// script.js
// Handles: mobile nav toggle, dark/light theme toggle (saved
// in localStorage), time-of-day greeting, and contact form
// validation feedback (no backend — front-end only).
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  setupMobileNav();
  setupThemeToggle();
  setGreetingByTime();
  setupContactForm();
  setupProjectFilter();
    setupReadMore();
});

// ---- Footer year -----------------------------------------
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ---- Mobile hamburger menu --------------------------------
function setupMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after a link is clicked (mobile UX nicety)
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Dark / light theme toggle ----------------------------
function setupThemeToggle() {
  const button = document.getElementById('themeToggle');
  if (!button) return;

  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    button.textContent = saved === 'dark' ? '☀️' : '🌙';
  }

  button.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    button.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// ---- Greeting based on time of day -------------------------
function setGreetingByTime() {
  const el = document.getElementById('greeting');
  if (!el) return;

  const hour = new Date().getHours();
  let greeting = 'Good evening, welcome';
  if (hour < 12) greeting = 'Good morning, welcome';
  else if (hour < 18) greeting = 'Good afternoon, welcome';

  el.textContent = greeting;
}

// ---- Contact form (front-end only, no backend) --------------
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in every field before sending.';
      return;
    }

    if (!isValidEmail(email)) {
      status.textContent = 'Please enter a valid email address.';
      return;
    }

    // No backend is wired up for this assignment, so we just
    // confirm the message locally and reset the form.
    status.textContent = `Thanks, ${name}! Your message has been noted (demo only — no server is connected).`;
    form.reset();
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
// ---- Project filter + live search ----
function setupProjectFilter() {
  const cards = document.querySelectorAll('.project-card');
  const buttons = document.querySelectorAll('.filter-btn');
  const search = document.getElementById('projectSearch');
  const count = document.getElementById('resultsCount');
  const empty = document.getElementById('emptyState');
  let activeFilter = 'all';

  function apply() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const text = (card.querySelector('h3').textContent + ' ' +
        card.dataset.tags + ' ' +
        card.querySelector('.project-desc').textContent).toLowerCase();
      const matchesFilter = activeFilter === 'all' || card.dataset.tags.split(' ').includes(activeFilter);
      const show = matchesFilter && text.includes(query);
      card.hidden = !show;
      if (show) visible++;
    });
    count.textContent = `Showing ${visible} of ${cards.length} projects`;
    empty.hidden = visible !== 0;
  }

  buttons.forEach((btn) => btn.addEventListener('click', () => {
    activeFilter = btn.dataset.filter;
    buttons.forEach((b) => b.classList.toggle('active', b === btn));
    apply();
  }));
  search.addEventListener('input', apply);
  apply();
}
// ---- Read more / Show less ----
function setupReadMore() {
  document.querySelectorAll('.project-desc').forEach((desc) => {
    desc.classList.add('is-collapsed');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'read-more';
    btn.textContent = 'Read more';
    btn.addEventListener('click', () => {
      const collapsed = desc.classList.toggle('is-collapsed');
      btn.textContent = collapsed ? 'Read more' : 'Show less';
    });
    desc.after(btn);
  });
}
