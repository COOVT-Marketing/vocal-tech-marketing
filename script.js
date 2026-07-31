// Vocal Tech Marketing - main site JS
// handles: theme toggle, hero canvas bg, word cycler, counters, nav, reveal-on-scroll, contact form

(function () {
  'use strict';

  // ---------- theme toggle ----------
  var themeToggle = document.getElementById('themeToggle');
  var root = document.documentElement;

  function getSavedTheme() {
    return localStorage.getItem('vtm-theme') || 'dark';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('vtm-theme', theme);
    // the hero wave svg has a hardcoded fill so it needs updating manually when theme changes
    var wavePath = document.querySelector('.hero-wave path');
    if (wavePath) wavePath.setAttribute('fill', theme === 'light' ? '#e4eeed' : '#0d1a1a');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(getSavedTheme() === 'dark' ? 'light' : 'dark');
    });
  }
  setTheme(getSavedTheme());


  // ---------- hero particle background ----------
  // simple canvas dots + connecting lines, nothing fancy. could probably use fewer particles on mobile
  // but it hasn't been a perf problem yet so leaving it
  var canvas = document.getElementById('heroCanvas');

  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W, H, particles;

    function resizeCanvas() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function newParticle() {
      var isTeal = Math.random() < 0.75;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        color: isTeal
          ? 'rgba(84,136,136,' + (Math.random() * 0.5 + 0.15).toFixed(2) + ')'
          : 'rgba(201,168,76,' + (Math.random() * 0.3 + 0.1).toFixed(2) + ')',
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008
      };
    }

    function setupParticles() {
      resizeCanvas();
      var count = Math.floor((W * H) / 9000);
      particles = [];
      for (var i = 0; i < Math.min(count, 110); i++) particles.push(newParticle());
    }

    function connectDots(a, b, dist, maxDist) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = 'rgba(84,136,136,' + ((1 - dist / maxDist) * 0.18).toFixed(3) + ')';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);
      var maxDist = 130;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // wrap particles around the edges instead of bouncing
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.r + Math.sin(p.pulse) * 0.25), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dx = p.x - p2.x;
          var dy = p.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) connectDots(p, p2, dist, maxDist);
        }
      }
      requestAnimationFrame(drawFrame);
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupParticles, 150);
    });

    setupParticles();
    drawFrame();
  }


  // ---------- rotating word in the hero title ----------
  var heroWords = ['Medicare', 'ACA Insurance', 'MVA Campaigns', 'Auto Insurance', 'Final Expense', 'Web Development'];
  var wordIndex = 0;
  var cyclerEl = document.getElementById('cycler');

  if (cyclerEl) {
    setInterval(function () {
      cyclerEl.classList.add('fade');
      setTimeout(function () {
        wordIndex = (wordIndex + 1) % heroWords.length;
        cyclerEl.textContent = heroWords[wordIndex];
        cyclerEl.classList.remove('fade');
      }, 350); // needs to match the css transition timing on #cycler
    }, 2600);
  }


  // ---------- stat counters (count up when scrolled into view) ----------
  function animateCounter(el) {
    var target = +el.dataset.target;
    var duration = 1600;
    var start = performance.now();

    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic, looks less robotic than linear
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(function (el) {
    counterObserver.observe(el);
  });


  // ---------- navbar scroll state + active section highlight ----------
  var navbar = document.getElementById('navbar');
  var scrollTopBtn = document.getElementById('scrollTopBtn');
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links .nav-link');

  function handleScroll() {
    var y = window.scrollY;

    if (navbar) navbar.classList.toggle('scrolled', y > 40);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('show', y > 300);

    var current = '';
    sections.forEach(function (sec) {
      // 100px offset so the link switches a bit before the section actually hits the top
      if (y >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ---------- fade/slide elements in as they scroll into view ----------
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });


  // ---------- mobile nav ----------
  var hamburger = document.getElementById('hamburger');
  var closeNavBtn = document.getElementById('closeNav');
  var navOverlay = document.getElementById('navOverlay');

  function openMobileNav() {
    navOverlay.classList.add('open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // stop background scroll while menu is open
  }

  function closeMobileNav() {
    navOverlay.classList.remove('open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (navOverlay.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }
  if (closeNavBtn) closeNavBtn.addEventListener('click', closeMobileNav);

  if (navOverlay) {
    navOverlay.querySelectorAll('.nav-link, .nav-overlay-cta').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });


  // ---------- contact form ----------
  // posts to a Google Apps Script web app which just appends a row to a sheet.
  // using no-cors so we never get a real response back - fine for our purposes, we just
  // show the success state optimistically after the request goes out
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  var SHEET_URL = 'https://script.google.com/macros/s/AKfycbz0nyFjR4fLx90XyCEhhIaeXIFZUKGaUaJDLmbTQJsPIDNYboM1s77PSx4Z3V3JQ_r8/exec';

  function getUserIP() {
    return fetch('https://api.ipify.org?format=json')
      .then(function (res) { return res.json(); })
      .then(function (data) { return data.ip || 'Unknown'; })
      .catch(function () { return 'Unknown'; });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = contactForm.querySelector('button[type=submit]');
      if (!submitBtn) return;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      getUserIP().then(function (ip) {
        var payload = {
          name: contactForm.querySelector('[name="name"]').value.trim(),
          email: contactForm.querySelector('[name="email"]').value.trim(),
          phone: contactForm.querySelector('[name="phone"]').value.trim(),
          service: contactForm.querySelector('[name="service"]').value,
          message: contactForm.querySelector('[name="message"]').value.trim(),
          ip: ip,
          submittedAt: new Date().toLocaleString()
        };

        return fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }).catch(function (err) {
        console.error('contact form submission failed:', err);
      }).finally(function () {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
      });
    });
  }


  // ---------- smooth scroll for in-page anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
