/**
 * Vocal Tech Marketing — script.js
 * Features:
 *  1. Page entrance fade-in
 *  2. Letter animation (slogan + lead-text)
 *  3. Intersection Observer (reveal, stagger, counters, testimonials)
 *  4. Hamburger mobile nav (with backdrop, keyboard, close-on-link)
 *  5. Smooth scroll
 *  6. Service & Profile overlay management
 *  7. Contact modal
 *  8. Contact form submission (Google Apps Script)
 */

/* ============================================================
   1. PAGE ENTRANCE
============================================================ */
const initPageTransition = () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease-in-out';
  window.requestAnimationFrame(() => {
    document.body.style.opacity = '1';
    const video = document.querySelector('.hero-video');
    if (video) video.playbackRate = 0.6;
  });
};

/* ============================================================
   2. LETTER ANIMATION
============================================================ */
const runLetterAnimation = (selector) => {
  const target = document.querySelector(selector);
  if (!target) return;

  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      [...node.textContent].forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'letter';
        frag.appendChild(span);
      });
      node.parentNode.replaceChild(frag, node);
    } else {
      // Iterate backwards to avoid index shifting after replaceChild
      [...node.childNodes].reverse().forEach(child => processNode(child));
    }
  };

  processNode(target);

  target.querySelectorAll('.letter').forEach((letter, i) => {
    letter.style.transitionDelay = `${i * 0.015}s`;
    setTimeout(() => letter.classList.add('active'), 80);
  });
};

/* ============================================================
   3. COUNTER ANIMATION
============================================================ */
const animateCounter = (el) => {
  const target = +el.getAttribute('data-target');
  const duration = 2400;
  let start = null;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = progress * (2 - progress); // ease-out quad
    el.textContent = Math.floor(eased * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + '+';
    }
  };
  requestAnimationFrame(step);
};

/* ============================================================
   4. INTERSECTION OBSERVER
============================================================ */
const initObserver = () => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      // Reveal
      el.classList.add('active');

      // Stagger children
      if (el.classList.contains('stagger-container')) {
        [...el.children].forEach((child, i) => {
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
            child.style.transition = 'all 0.55s cubic-bezier(0.22,1,0.36,1)';
          }, i * 130);
        });
      }

      // Testimonials
      if (el.classList.contains('testimonial-card')) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }

      // Counters
      el.querySelectorAll('.stat-number').forEach(num => {
        num.textContent = '0';
        animateCounter(num);
      });

      obs.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Testimonials: set initial hidden state
  document.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(22px)';
    card.style.transition = 'all 0.8s ease-out';
  });

  document.querySelectorAll(
    '.reveal, .stagger-container, .about-stats-box, .testimonial-card'
  ).forEach(el => observer.observe(el));
};

/* ============================================================
   5. HAMBURGER / MOBILE NAV
============================================================ */
const initNav = () => {
  const toggle   = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');
  const backdrop = document.getElementById('nav-backdrop');
  if (!toggle || !navLinks) return;

  const openNav = () => {
    navLinks.classList.add('active');
    toggle.classList.add('is-active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeNav = () => {
    navLinks.classList.remove('active');
    toggle.classList.remove('is-active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    navLinks.classList.contains('active') ? closeNav() : openNav();
  });

  // Close on backdrop click
  backdrop.addEventListener('click', closeNav);

  // Close when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Keyboard: close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) closeNav();
  });

  // Keyboard: Enter/Space on toggle
  toggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navLinks.classList.contains('active') ? closeNav() : openNav();
    }
  });
};

/* ============================================================
   6. SMOOTH SCROLL
============================================================ */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
};

/* ============================================================
   7. OVERLAY MANAGEMENT (service & profile modals)
============================================================ */
const openOverlay = (id) => {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.style.display = 'flex';
  // Scroll to top of overlay content
  const content = overlay.querySelector('.overlay-content');
  if (content) content.scrollTop = 0;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add('show'));
  });
  document.body.style.overflow = 'hidden';
};

const closeOverlay = (id) => {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('show');
  setTimeout(() => {
    overlay.style.display = 'none';
    // Restore scroll only if no other overlay/modal is open
    if (!document.querySelector('.page-overlay.show') &&
        !document.querySelector('.modal-overlay.show')) {
      document.body.style.overflow = '';
    }
  }, 420);
};

// Close overlay on background click
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('page-overlay')) {
    closeOverlay(e.target.id);
  }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.page-overlay.show').forEach(o => closeOverlay(o.id));
  const modal = document.getElementById('contact-modal');
  if (modal && modal.classList.contains('show')) closeContactModal();
});

// Expose globally (used in onclick attributes)
window.openOverlay = openOverlay;
window.closeOverlay = closeOverlay;

/* ============================================================
   8. CONTACT MODAL
============================================================ */
const openContactModal = () => {
  const modal = document.getElementById('contact-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => modal.classList.add('show'));
  });
  document.body.style.overflow = 'hidden';
};

const closeContactModal = () => {
  const modal = document.getElementById('contact-modal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
    if (!document.querySelector('.page-overlay.show')) {
      document.body.style.overflow = '';
    }
  }, 320);
};

// Expose globally
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;

const initContactModal = () => {
  const modal      = document.getElementById('contact-modal');
  const closeBtn   = document.getElementById('close-btn');
  const form       = document.getElementById('contact-form-data');
  const submitBtn  = document.getElementById('submit-btn');
  const navContact = document.getElementById('nav-contact-btn');

  if (!modal) return;

  // Open from nav
  if (navContact) navContact.addEventListener('click', (e) => { e.preventDefault(); openContactModal(); });

  // Open from any .btn-contact that isn't inside a service overlay (those call openContactModal directly)
  document.querySelectorAll('.btn-contact:not(#nav-contact-btn)').forEach(btn => {
    if (!btn.hasAttribute('onclick')) {
      btn.addEventListener('click', (e) => { e.preventDefault(); openContactModal(); });
    }
  });

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closeContactModal);

  // Click outside modal box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeContactModal();
  });

  // Form submission
  if (form && submitBtn) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz0nyFjR4fLx90XyCEhhIaeXIFZUKGaUaJDLmbTQJsPIDNYboM1s77PSx4Z3V3JQ_r8/exec';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        await fetch(scriptURL, {
          method: 'POST',
          body: new FormData(form),
          mode: 'no-cors',
        });
        submitBtn.textContent = '✓ Sent Successfully!';
        submitBtn.style.background = '#28a745';
        setTimeout(() => {
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = '';
          closeContactModal();
        }, 2600);
      } catch (err) {
        console.error('Submission error:', err);
        submitBtn.textContent = 'Error — try again';
        submitBtn.style.background = '#c0392b';
        submitBtn.disabled = false;
        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = '';
        }, 3000);
      }
    });
  }
};

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  runLetterAnimation('.slogan');
  runLetterAnimation('.lead-text');
  initObserver();
  initNav();
  initSmoothScroll();
  initContactModal();
});
/* ============================================================
   9. PAKISTAN GEO-RESTRICTION
   Country code injected by Cloudflare Worker as window.__USER_COUNTRY__
   Falls back to "XX" (hidden) if not set.
============================================================ */
(function initGeoRestriction() {
   var country = (typeof window.__USER_COUNTRY__ !== 'undefined')
      ? String(window.__USER_COUNTRY__).trim().toUpperCase()
      : 'XX';

   console.log('[GeoRestriction] Detected country:', country);

   if (country === 'PK') {
      // Show all pk-only section/element blocks
      document.querySelectorAll('.pk-only').forEach(function(el) {
         el.classList.add('pk-visible');
      });

      // Unlock employee overlays — remove data-pk-locked so openOverlay() works
      document.querySelectorAll('.page-overlay[data-pk-locked]').forEach(function(el) {
         el.removeAttribute('data-pk-locked');
      });

      console.log('[GeoRestriction] Pakistan confirmed — all restricted content unlocked.');
   } else {
      // Actively force-hide all pk-only elements for non-PK visitors
      document.querySelectorAll('.pk-only').forEach(function(el) {
         el.style.setProperty('display', 'none', 'important');
      });
      document.querySelectorAll('.page-overlay[data-pk-locked]').forEach(function(el) {
         el.style.setProperty('display', 'none', 'important');
      });

      console.log('[GeoRestriction] Not Pakistan (' + country + ') — restricted content force-hidden.');
   }
})();