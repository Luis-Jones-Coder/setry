/* ═══════════════════════════════════════════════════
   SENTRY — Main JavaScript
═══════════════════════════════════════════════════ */

// ── Navbar: transparent → glass on scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile nav toggle ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Hero background Ken Burns entrance ──
window.addEventListener('load', () => {
  document.getElementById('heroBg').classList.add('loaded');
});

// ── Scroll reveal with stagger for grid children ──
const grids = document.querySelectorAll(
  '.pillars, .values-grid, .why-grid, .process-steps, .audience-grid, .success-grid, .promise-list'
);

grids.forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((child, i) => {
    child.style.transitionDelay = (i * 0.1) + 's';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ═══════════════════════════════════════════════════
// CONTACT FORM — validation & submission
// ═══════════════════════════════════════════════════

const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) submitForm();
  });

  // Live validation: clear errors on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });
}

function validateForm() {
  let valid = true;

  // Required text / email inputs
  ['fullName', 'email'].forEach(id => {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      showError(field); valid = false;
    } else if (id === 'email' && !isValidEmail(field.value.trim())) {
      showError(field); valid = false;
    }
  });

  // Required select
  const businessType = document.getElementById('businessType');
  if (!businessType.value) {
    showError(businessType); valid = false;
  }

  // Privacy checkbox
  const privacy      = document.getElementById('privacy');
  const privacyError = document.getElementById('privacyError');
  if (!privacy.checked) {
    privacyError.classList.add('visible'); valid = false;
  } else {
    privacyError.classList.remove('visible');
  }

  return valid;
}

function showError(field) {
  const isSelect = field.tagName === 'SELECT';
  const target   = isSelect ? field.closest('.select-wrap') : field;
  target.classList.add('error');
  const errMsg = field.closest('.form-group').querySelector('.field-error');
  if (errMsg) errMsg.classList.add('visible');
}

function clearError(field) {
  const isSelect = field.tagName === 'SELECT';
  const target   = isSelect ? field.closest('.select-wrap') : field;
  target.classList.remove('error');
  const errMsg = field.closest('.form-group')?.querySelector('.field-error');
  if (errMsg) errMsg.classList.remove('visible');
  // Also clear privacy error when checkbox changes
  if (field.id === 'privacy') {
    document.getElementById('privacyError').classList.remove('visible');
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function submitForm() {
  const btn = form.querySelector('.btn-submit');
  btn.disabled = true;
  btn.querySelector('.btn-submit-text').textContent = 'Sending…';

  // Simulate async submission (replace with real fetch/API call)
  setTimeout(() => {
    form.style.display = 'none';
    formSuccess.classList.add('visible');
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
}
