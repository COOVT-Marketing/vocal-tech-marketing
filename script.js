(function () {
  'use strict';

  /* ── Theme Toggle ── */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function getTheme() {
    return localStorage.getItem('vtm-theme') || 'dark';
  }
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('vtm-theme', theme);
    /* Update hero wave fill to match new surface color */
    const wavePath = document.querySelector('.hero-wave path');
    if (wavePath) {
      wavePath.setAttribute('fill', theme === 'light' ? '#e4eeed' : '#0d1a1a');
    }
  }

  themeToggle?.addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  /* Apply on load (already set by inline script, but sync wave fill) */
  setTheme(getTheme());

  /* ── Particle Canvas ── */
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles, animId;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    function mkParticle() {
      const r = Math.random();
      return {
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        color: r < 0.75
          ? `rgba(84,136,136,${(Math.random() * 0.5 + 0.15).toFixed(2)})`
          : `rgba(201,168,76,${(Math.random() * 0.3 + 0.1).toFixed(2)})`,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      };
    }
    function init() {
      resize();
      const count = Math.floor((W * H) / 9000);
      particles = Array.from({ length: Math.min(count, 110) }, mkParticle);
    }
    function drawConnection(a, b, dist, maxDist) {
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(84,136,136,${((1 - dist / maxDist) * 0.18).toFixed(3)})`;
      ctx.lineWidth = 0.8; ctx.stroke();
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      const maxDist = 130;
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.pulse += p.pulseSpeed;
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.r + Math.sin(p.pulse) * 0.25), 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j], dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) drawConnection(p, p2, dist, maxDist);
        }
      });
      animId = requestAnimationFrame(frame);
    }
    let resizeTimer;
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(init, 150); });
    init(); frame();
  }

  /* ── Hero Text Cycler ── */
  const words = ['Medicare', 'ACA Insurance', 'MVA Campaigns', 'Auto Insurance', 'Final Expense', 'Web Development'];
  let wIdx = 0;
  const cyclerEl = document.getElementById('cycler');
  if (cyclerEl) {
    setInterval(() => {
      cyclerEl.classList.add('fade');
      setTimeout(() => {
        wIdx = (wIdx + 1) % words.length;
        cyclerEl.textContent = words[wIdx];
        cyclerEl.classList.remove('fade');
      }, 350);
    }, 2600);
  }

  /* ── Counter Animation ── */
  function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1600;
    const start = performance.now();
    (function run(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(run); else el.textContent = target;
    })(start);
  }
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

  /* ── Navbar Scroll + Active Link Tracking ── */
  const navbar     = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-links .nav-link');

  function onScroll() {
    const y = window.scrollY;
    navbar?.classList.toggle('scrolled', y > 40);
    scrollTopBtn?.classList.toggle('show', y > 300);

    let current = '';
    sections.forEach(sec => { if (y >= sec.offsetTop - 100) current = sec.id; });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Reveal on Scroll ── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── Mobile Nav ── */
  const hamburger  = document.getElementById('hamburger');
  const closeNavBtn = document.getElementById('closeNav');
  const navOverlay = document.getElementById('navOverlay');

  function openNav() {
    navOverlay.classList.add('open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    navOverlay.classList.remove('open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  hamburger?.addEventListener('click', () => {
    navOverlay.classList.contains('open') ? closeNav() : openNav();
  });
  closeNavBtn?.addEventListener('click', closeNav);
  navOverlay?.querySelectorAll('.nav-link, .nav-overlay-cta').forEach(link => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  /* ── Contact Form ── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const SHEET_URL   = 'https://script.google.com/macros/s/AKfycbz0nyFjR4fLx90XyCEhhIaeXIFZUKGaUaJDLmbTQJsPIDNYboM1s77PSx4Z3V3JQ_r8/exec';

  async function getUserIP() {
    try {
      const res  = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      return data.ip || 'Unknown';
    } catch {
      return 'Unknown';
    }
  }

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type=submit]');
    if (!btn) return;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const ip = await getUserIP();

    const payload = {
      name:    contactForm.querySelector('[name="name"]').value.trim(),
      email:   contactForm.querySelector('[name="email"]').value.trim(),
      phone:   contactForm.querySelector('[name="phone"]').value.trim(),
      service: contactForm.querySelector('[name="service"]').value,
      message: contactForm.querySelector('[name="message"]').value.trim(),
      ip:      ip,
      submittedAt: new Date().toLocaleString(),
    };

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode:   'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body:   JSON.stringify(payload),
      });
    } catch (err) {
      console.error('Form submission error:', err);
    }

    contactForm.style.display = 'none';
    formSuccess.classList.add('show');
  });

  /* ── Smooth scroll for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

})();