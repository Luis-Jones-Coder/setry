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
  '.services-grid, .why-grid, .cases-grid, .testi-grid, .pillars'
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
  ['fullName', 'email', 'companyName'].forEach(id => {
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

// ═══════════════════════════════════════════════════
// 3D TESTIMONIALS CAROUSEL
// ═══════════════════════════════════════════════════
(function () {

  /* ── Data ── */
  const TESTIMONIALS = [
    {
      initials: 'AM',
      name:     'Alexandra M.',
      role:     'CEO, Finova Technologies',
      text:     "Sentry didn't just give us a strategy — they gave us clarity. For the first time our entire leadership team was aligned and moving in the same direction. We closed our Series A six months later.",
      stars:    5
    },
    {
      initials: 'RK',
      name:     'Rafael K.',
      role:     'Founder, NovaBridge Commerce',
      text:     "The market analysis Sentry delivered exposed a positioning gap none of our competitors had found. We repositioned within 60 days and saw a 40% lift in qualified pipeline that very quarter.",
      stars:    5
    },
    {
      initials: 'SC',
      name:     'Sofia C.',
      role:     'COO, PulseHealth Platform',
      text:     "Their operational frameworks saved us 18 months of trial and error. Our burn rate dropped, team output doubled, and we hit profitability six full months ahead of plan.",
      stars:    5
    },
    {
      initials: 'JW',
      name:     'James W.',
      role:     'Founder, LaunchBase Labs',
      text:     "From zero to pitch-ready in 10 weeks. Sentry built our financial model, GTM playbook, and investor narrative end-to-end. We raised $1.8M on the first round without a single revision.",
      stars:    5
    },
    {
      initials: 'ML',
      name:     'Maria L.',
      role:     'CMO, ScaleFlow Agency',
      text:     "Sentry's brand positioning work completely transformed how the market sees us. Premium clients that previously ignored us are now inbound. Revenue per client is up 65% year over year.",
      stars:    5
    }
  ];

  /* ── DOM refs ── */
  const track    = document.getElementById('tcTrack');
  const dotsWrap = document.getElementById('tcDots');
  const prevBtn  = document.getElementById('tcPrev');
  const nextBtn  = document.getElementById('tcNext');
  const scene    = document.getElementById('tcScene');
  const wrapper  = document.querySelector('.tcarousel-wrapper');

  if (!track) return; // Carousel not present on this page

  /* ── State ── */
  const TOTAL       = TESTIMONIALS.length;
  let   activeIndex = 0;
  let   isAnimating = false;
  let   autoTimer;

  /* ── Build cards ── */
  TESTIMONIALS.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'tc-card';
    card.dataset.index = i;
    card.innerHTML = `
      <div class="tc-card__stars">${'★'.repeat(t.stars)}</div>
      <div class="tc-card__quote-icon">&ldquo;</div>
      <blockquote>${t.text}</blockquote>
      <div class="tc-card__author">
        <div class="tc-card__avatar">${t.initials}</div>
        <div>
          <span class="tc-card__name">${t.name}</span>
          <span class="tc-card__role">${t.role}</span>
        </div>
      </div>`;

    // Click on a side card to navigate to it
    card.addEventListener('click', () => {
      if (card.classList.contains('tc-card--next')) navigate(1);
      else if (card.classList.contains('tc-card--prev')) navigate(-1);
    });

    track.appendChild(card);
  });

  /* ── Build dots ── */
  TESTIMONIALS.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type      = 'button';
    dot.className = 'tc-dot';
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  /* ── Position class logic ──
     Maps card index → position class based on distance from activeIndex.
     Handles infinite wrap-around for any array length ≥ 3.          */
  function positionClass(cardIndex) {
    const diff = ((cardIndex - activeIndex) % TOTAL + TOTAL) % TOTAL;
    if (diff === 0)           return 'tc-card--active';
    if (diff === 1)           return 'tc-card--next';
    if (diff === TOTAL - 1)   return 'tc-card--prev';
    if (diff === 2)           return 'tc-card--far-next';
    if (diff === TOTAL - 2)   return 'tc-card--far-prev';
    return 'tc-card--hidden';
  }

  /* ── Re-render all card positions & dots ── */
  function updateCarousel() {
    track.querySelectorAll('.tc-card').forEach(card => {
      card.classList.remove(
        'tc-card--active', 'tc-card--prev',     'tc-card--next',
        'tc-card--far-prev', 'tc-card--far-next', 'tc-card--hidden'
      );
      card.classList.add(positionClass(+card.dataset.index));
    });

    dotsWrap.querySelectorAll('.tc-dot').forEach((dot, i) => {
      dot.classList.toggle('tc-dot--active', i === activeIndex);
    });
  }

  /* ── Navigate by direction (+1 next / -1 prev) ── */
  function navigate(dir) {
    if (isAnimating) return;
    isAnimating  = true;
    activeIndex  = (activeIndex + dir + TOTAL) % TOTAL;
    updateCarousel();
    setTimeout(() => { isAnimating = false; }, 750);
    resetAuto();
  }

  /* ── Jump directly to index ── */
  function goTo(index) {
    if (isAnimating || index === activeIndex) return;
    isAnimating = true;
    activeIndex = index;
    updateCarousel();
    setTimeout(() => { isAnimating = false; }, 750);
    resetAuto();
  }

  /* ── Arrow buttons ── */
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  /* ── Keyboard arrows ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  /* ── Touch / swipe ── */
  let touchStartX = 0;
  scene.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  scene.addEventListener('touchend', e => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 48) navigate(dx > 0 ? 1 : -1);
  }, { passive: true });

  /* ── Auto-play (5 s) — pauses on hover ── */
  function startAuto() { autoTimer = setInterval(() => navigate(1), 5000); }
  function stopAuto()  { clearInterval(autoTimer); }
  function resetAuto() { stopAuto(); startAuto(); }

  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAuto);
    wrapper.addEventListener('mouseleave', startAuto);
  }

  /* ── Init ── */
  updateCarousel();
  startAuto();

})(); // IIFE — no global scope pollution

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
