// =========================================================
// script.js
// Handles: mobile nav toggle, dark/light theme toggle (saved
// in localStorage), time-of-day greeting, and contact form
// validation feedback (no backend — front-end only).
// =========================================================
const GITHUB_USERNAME = 'kfupmstudent';
document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  setupMobileNav();
  setupThemeToggle();
  setGreetingByTime();
  setupContactForm();
  setupProjectFilter();
    setupReadMore();
      loadRepos();
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

    const errors = {
      nameError: name.length < 2 ? 'Please enter your name (at least 2 characters).' : '',
      emailError: !isValidEmail(email) ? 'Enter a valid email like you@example.com.' : '',
      messageError: message.length < 10 ? 'Please write at least 10 characters.' : '',
    };

    let hasError = false;
    for (const [id, text] of Object.entries(errors)) {
      document.getElementById(id).textContent = text;
      if (text) hasError = true;
    }

    if (hasError) {
      status.textContent = 'Please fix the errors above and send again.';
      status.className = 'form-status is-error';
      return;
    }

    status.textContent = `Thanks, ${name}! Your message has been noted (demo only — no server is connected).`;
    status.className = 'form-status is-success';
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
// ---- GitHub repositories (public API) ----
async function loadRepos() {
  const status = document.getElementById('repoStatus');
  const list = document.getElementById('repoList');
  list.innerHTML = '';
  status.textContent = 'Loading repositories…';
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error('Status ' + res.status);
    const repos = await res.json();
    if (repos.length === 0) {
      status.textContent = 'No public repositories yet. Check back soon!';
      return;
    }
    status.textContent = '';
    repos.forEach((repo) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = repo.html_url;
      a.textContent = repo.name;
      a.target = '_blank';
      a.rel = 'noopener';
      const p = document.createElement('p');
      p.textContent = repo.description || 'No description provided.';
      li.append(a, p);
      list.appendChild(li);
    });
  } catch (error) {
    status.textContent = 'Could not load repositories. Check your internet connection and try again. ';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Try again';
    retry.addEventListener('click', loadRepos);
    status.appendChild(retry);
  }
}