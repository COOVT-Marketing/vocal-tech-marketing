/**
 * Vocal Tech Marketing — script.js
 * ─────────────────────────────────
 * All site interactivity, animations, and canvas effects.
 *
 * Sections:
 *  1. Navbar — scroll shadow, active link highlighting
 *  2. Mobile nav overlay — hamburger open/close
 *  3. Reveal on scroll — IntersectionObserver fade-in
 *  4. Hero canvas — particle animation
 *  5. Hero text cycler — rotating vertical names
 *  6. Animated counters — hstat-num and .counter elements
 *  7. Scroll-to-top button
 *  8. Contact form handler
 */

'use strict';

/* ============================================================
   1. NAVBAR — scroll shadow + active link
   ============================================================ */

(function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Add scrolled class once page scrolls
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // Highlight nav link matching current section in viewport
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], div[id]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
})();


/* ============================================================
   2. MOBILE NAV OVERLAY
   ============================================================ */

(function initMobileNav() {
    const hamburger  = document.getElementById('hamburger');
    const navOverlay = document.getElementById('navOverlay');
    const navClose   = document.getElementById('navClose');

    if (!hamburger || !navOverlay) return;

    const openMenu  = () => navOverlay.classList.add('open');
    const closeMenu = () => navOverlay.classList.remove('open');

    hamburger.addEventListener('click', openMenu);
    if (navClose) navClose.addEventListener('click', closeMenu);

    // Close on any overlay nav-link click
    navOverlay.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
})();


/* ============================================================
   3. REVEAL ON SCROLL
   ============================================================ */

(function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));
})();


/* ============================================================
   4. HERO CANVAS — particle field
   ============================================================ */

(function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx    = canvas.getContext('2d');
    let W, H, particles;

    // ── Resize ──────────────────────────────────────────────
    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        buildParticles();
    }

    // ── Particle factory ────────────────────────────────────
    function randomParticle() {
        const isTeal = Math.random() > 0.25;
        return {
            x:          Math.random() * W,
            y:          Math.random() * H,
            vx:         (Math.random() - 0.5) * 0.4,
            vy:         (Math.random() - 0.5) * 0.4,
            r:          Math.random() * 1.8 + 0.5,
            pulse:      Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.02 + 0.008,
            color:      isTeal ? 'rgba(84,136,136,' : 'rgba(201,168,76,',
        };
    }

    function buildParticles() {
        const count = Math.floor((W * H) / 14000);
        particles   = Array.from({ length: count }, randomParticle);
    }

    // ── Draw ────────────────────────────────────────────────
    function draw() {
        ctx.clearRect(0, 0, W, H);

        particles.forEach((p) => {
            // Move
            p.x += p.vx;
            p.y += p.vy;
            p.pulse += p.pulseSpeed;

            // Wrap edges
            if (p.x < 0)  p.x = W;
            if (p.x > W)  p.x = 0;
            if (p.y < 0)  p.y = H;
            if (p.y > H)  p.y = 0;

            const alpha = (Math.sin(p.pulse) * 0.3 + 0.55).toFixed(2);

            // Draw dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color + alpha + ')';
            ctx.fill();
        });

        // Draw connection lines between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(84,136,136,${(0.12 * (1 - dist / 100)).toFixed(3)})`;
                    ctx.lineWidth   = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    draw();
})();


/* ============================================================
   5. HERO TEXT CYCLER
   ============================================================ */

(function initCycler() {
    const el = document.getElementById('cycler');
    if (!el) return;

    const words  = ['Medicare', 'ACA', 'MVA', 'Auto Insurance', 'Final Expense', 'Web Dev'];
    let   index  = 0;

    function cycle() {
        // Fade out
        el.style.transition = 'opacity 0.35s, transform 0.35s';
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(-12px)';

        setTimeout(() => {
            index       = (index + 1) % words.length;
            el.textContent = words[index];

            // Fade in from below
            el.style.transform  = 'translateY(12px)';
            el.style.opacity    = '0';

            requestAnimationFrame(() => {
                el.style.opacity   = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 380);
    }

    setInterval(cycle, 2400);
})();


/* ============================================================
   6. ANIMATED COUNTERS
   ============================================================ */

(function initCounters() {
    // Handles both .hstat-num and .counter elements
    const all = document.querySelectorAll('[data-target]');
    if (!all.length) return;

    function animateCounter(el) {
        const target   = parseInt(el.dataset.target, 10);
        const duration = 1600;
        const start    = performance.now();

        function step(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased    = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);

            if (progress < 1) requestAnimationFrame(step);
            else              el.textContent = target;
        }

        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    all.forEach((el) => observer.observe(el));
})();


/* ============================================================
   7. SCROLL TO TOP BUTTON
   ============================================================ */

(function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();


/* ============================================================
   8. CONTACT FORM HANDLER
   ============================================================ */

(function initContactForm() {
    const form = document.getElementById('campaignContactForm');
    if (!form) return;

    const submitBtn = form.querySelector('button[type=submit]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled    = true;

        // Simulate async submission (replace with real endpoint / fetch call)
        setTimeout(() => {
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg,#3a8a6a,#2e6e55)';
            form.reset();

            setTimeout(() => {
                submitBtn.textContent    = originalText;
                submitBtn.disabled       = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1200);
    });
})();