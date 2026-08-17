(function () {
  'use strict';

  if (typeof console !== 'undefined' && console.log) {
    console.log('%cVocal Tech Marketing', 'font-weight:bold;font-size:14px;color:#548888;');
    console.log('Site built and maintained by our team — not AI-generated.');
  }

  var themeToggle = document.getElementById('themeToggle');
  var root = document.documentElement;
  function getSavedTheme() {
    return localStorage.getItem('vtm-theme') || 'dark';
  }
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('vtm-theme', theme);
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(getSavedTheme() === 'dark' ? 'light' : 'dark');
    });
  }
  setTheme(getSavedTheme());

  var canvas = document.getElementById('heroCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W, H, particles;
    function resizeCanvas() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    function newParticle() {
      var isTeal = Math.random() < 0.72;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        color: isTeal
          ? 'rgba(84,136,136,' + (Math.random() * 0.45 + 0.12).toFixed(2) + ')'
          : 'rgba(201,168,76,' + (Math.random() * 0.28 + 0.08).toFixed(2) + ')',
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.018 + 0.007
      };
    }
    function setupParticles() {
      resizeCanvas();
      var count = Math.floor((W * H) / 9500);
      particles = [];
      for (var i = 0; i < Math.min(count, 95); i++) particles.push(newParticle());
    }
    function connectDots(a, b, dist, maxDist) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = 'rgba(84,136,136,' + ((1 - dist / maxDist) * 0.16).toFixed(3) + ')';
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
    function drawFrame() {
      ctx.clearRect(0, 0, W, H);
      var maxDist = 120;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < -8) p.x = W + 8;
        if (p.x > W + 8) p.x = -8;
        if (p.y < -8) p.y = H + 8;
        if (p.y > H + 8) p.y = -8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.r + Math.sin(p.pulse) * 0.2), 0, Math.PI * 2);
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
      resizeTimer = setTimeout(setupParticles, 140);
    });
    setupParticles();
    drawFrame();
  }

  var heroWords = ['Medicare Advantage', 'ACA Insurance', 'MVA Campaigns', 'Auto Insurance', 'Final Expense', 'Web Development'];
  var wordIndex = 0;
  var cyclerEl = document.getElementById('cycler');
  if (cyclerEl) {
    setInterval(function () {
      cyclerEl.classList.add('fade');
      setTimeout(function () {
        wordIndex = (wordIndex + 1) % heroWords.length;
        cyclerEl.textContent = heroWords[wordIndex];
        cyclerEl.classList.remove('fade');
      }, 340);
    }, 2500);
  }

  function animateCounter(el) {
    var target = +el.dataset.target;
    var duration = 1500;
    var start = performance.now();
    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
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
  }, { threshold: 0.45 });
  document.querySelectorAll('[data-target]').forEach(function (el) {
    counterObserver.observe(el);
  });

  var navbar = document.getElementById('navbar');
  var scrollTopBtn = document.getElementById('scrollTopBtn');
  function handleScroll() {
    var y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 36);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('show', y > 280);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  var hamburger = document.getElementById('hamburger');
  var closeNavBtn = document.getElementById('closeNav');
  var navOverlay = document.getElementById('navOverlay');
  function openMobileNav() {
    if (!navOverlay) return;
    navOverlay.classList.add('open');
    if (hamburger) {
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    if (!navOverlay) return;
    navOverlay.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (navOverlay && navOverlay.classList.contains('open')) closeMobileNav();
      else openMobileNav();
    });
  }
  if (closeNavBtn) closeNavBtn.addEventListener('click', closeMobileNav);
  if (navOverlay) {
    navOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  var servicesItem = document.getElementById('navServicesItem');
  var servicesTrigger = document.getElementById('servicesTrigger');
  var servicesDropdown = document.getElementById('servicesDropdown');
  if (servicesItem && servicesTrigger && servicesDropdown) {
    var mmOpen = false;
    var mmHoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function openMegaMenu() {
      mmOpen = true;
      servicesItem.classList.add('open');
      servicesTrigger.setAttribute('aria-expanded', 'true');
    }
    function closeMegaMenu() {
      mmOpen = false;
      servicesItem.classList.remove('open');
      servicesTrigger.setAttribute('aria-expanded', 'false');
    }

    servicesTrigger.addEventListener('click', function (e) {
      if (!mmHoverCapable && !mmOpen) {
        e.preventDefault();
        openMegaMenu();
      }
    });
    servicesItem.addEventListener('mouseenter', function () {
      if (mmHoverCapable) openMegaMenu();
    });
    servicesItem.addEventListener('mouseleave', function () {
      if (mmHoverCapable) closeMegaMenu();
    });
    servicesTrigger.addEventListener('focus', function () {
      if (mmHoverCapable) openMegaMenu();
    });
    servicesItem.addEventListener('focusout', function (e) {
      if (!servicesItem.contains(e.relatedTarget)) closeMegaMenu();
    });
    document.addEventListener('click', function (e) {
      if (mmOpen && !servicesItem.contains(e.target)) closeMegaMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mmOpen) {
        closeMegaMenu();
        servicesTrigger.focus();
      }
    });
  }

  (function markActiveNav() {
    var curPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '/') || '/';
    document.querySelectorAll('.mobile-services-list a, .nav-dropdown-item').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      try {
        var linkPath = new URL(href, window.location.href).pathname.replace(/index\.html$/, '').replace(/\/$/, '/') || '/';
        if (linkPath === curPath) {
          link.classList.add('active');
          if (servicesTrigger) servicesTrigger.classList.add('active');
        }
      } catch (err) {}
    });
  })();

(function () {
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  var SHEET_URL = 'https://script.google.com/macros/s/AKfycbz0nyFjR4fLx90XyCEhhIaeXIFZUKGaUaJDLmbTQJsPIDNYboM1s77PSx4Z3V3JQ_r8/exec';

  if (!contactForm) return;

  var fields = {
    name: {
      input: document.getElementById('cf-name'),
      error: document.getElementById('err-name'),
      validate: function (v) {
        v = v.trim();
        if (!v) return 'Please enter your name.';
        if (v.length < 2) return 'Name is too short.';
        if (v.length > 60) return 'Name is too long.';
        if (!/^[A-Za-z][A-Za-z .'-]*[A-Za-z.]$/.test(v)) {
          return 'Enter a valid name (letters only).';
        }
        return '';
      }
    },
    email: {
      input: document.getElementById('cf-email'),
      error: document.getElementById('err-email'),
      validate: function (v) {
        v = v.trim();
        if (!v) return 'Please enter your email.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
          return 'Enter a valid email address.';
        }
        return '';
      }
    },
    phone: {
      input: document.getElementById('cf-phone'),
      error: document.getElementById('err-phone'),
      validate: function (v) {
        v = v.trim();
        if (!v) return ''; // optional field
        var digits = v.replace(/\D/g, '');
        if (digits.length < 10 || digits.length > 11) {
          return 'Enter a valid phone number.';
        }
        return '';
      }
    },
    service: {
      input: document.getElementById('cf-service'),
      error: document.getElementById('err-service'),
      validate: function (v) {
        if (!v) return 'Please select a service.';
        return '';
      }
    },
    message: {
      input: document.getElementById('cf-message'),
      error: document.getElementById('err-message'),
      validate: function (v) {
        v = v.trim();
        if (!v) return 'Please tell us about your goals.';
        if (v.length < 10) return 'Please provide a bit more detail (10+ characters).';
        if (v.length > 1000) return 'Message is too long (max 1000 characters).';
        return '';
      }
    }
  };

  function showError(field, message) {
    if (!field.error) return;
    field.error.textContent = message;
    field.input.classList.toggle('invalid', !!message);
    field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateField(key) {
    var field = fields[key];
    var msg = field.validate(field.input.value);
    showError(field, msg);
    return !msg;
  }

  function validateAll() {
    var valid = true;
    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) valid = false;
    });
    return valid;
  }

  Object.keys(fields).forEach(function (key) {
    var field = fields[key];
    if (!field.input) return;
    field.input.addEventListener('blur', function () { validateField(key); });
    field.input.addEventListener('input', function () {
      if (field.error && field.error.textContent) validateField(key);
    });
  });

  function getUserIP() {
    return fetch('https://api.ipify.org?format=json')
      .then(function (res) { return res.json(); })
      .then(function (data) { return data.ip || 'Unknown'; })
      .catch(function () { return 'Unknown'; });
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateAll()) {
      var firstInvalid = Object.keys(fields)
        .map(function (key) { return fields[key]; })
        .find(function (f) { return f.error && f.error.textContent; });
      if (firstInvalid) firstInvalid.input.focus();
      return;
    }

    var submitBtn = contactForm.querySelector('button[type=submit]');
    if (submitBtn) {
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;
    }

    getUserIP().then(function (ip) {
      var payload = {
        name: fields.name.input.value.trim(),
        email: fields.email.input.value.trim(),
        phone: fields.phone.input.value.trim(),
        service: fields.service.input.value,
        message: fields.message.input.value.trim(),
        ip: ip,
        submittedAt: new Date().toLocaleString()
      };
      return fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }).catch(function () {}).finally(function () {
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('show');
    });
  });
})();
