/**
 * Website Main Script
 * Features: Page Transitions, Letter Animations, Counter Engine, 
 * Form Submission, and Modal/Overlay Management.
 */

/* --- 1. UTILITY & ANIMATION ENGINES --- */

// A. Page Entrance Logic
const initPageTransition = () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.05s ease-in-out';
    
    window.requestAnimationFrame(() => {
        document.body.style.opacity = '1';
        const myVideo = document.querySelector('video');
        if (myVideo) myVideo.playbackRate = 0.5;
    });
};

// B. Advanced Letter-by-Letter Engine (Preserves HTML Tags)
const runLetterAnimation = (selector) => {
    const target = document.querySelector(selector);
    if (!target) return;

    const processNode = (node) => {
        if (node.nodeType === 3) { // Text node
            const chars = [...node.textContent];
            const fragment = document.createDocumentFragment();
            chars.forEach((char) => {
                const span = document.createElement('span');
                span.textContent = char === " " ? "\u00A0" : char;
                span.className = 'letter';
                fragment.appendChild(span);
            });
            node.parentNode.replaceChild(fragment, node);
        } else {
            for (let i = node.childNodes.length - 1; i >= 0; i--) {
                processNode(node.childNodes[i]);
            }
        }
    };

    processNode(target);

    const allLetters = target.querySelectorAll('.letter');
    allLetters.forEach((letter, i) => {
        letter.style.transitionDelay = `${i * 0.01}s`;
        // Triggering the 'active' class via timeout to start animation
        setTimeout(() => letter.classList.add('active'), 50);
    });
};

// C. Counter Engine
const animateValue = (obj) => {
    const target = +obj.getAttribute('data-target');
    let start = null;
    const duration = 2500; 
    
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const easeProgress = progress * (2 - progress); // outQuad
        
        obj.innerHTML = Math.floor(easeProgress * target);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = target + "+";
        }
    };
    window.requestAnimationFrame(step);
};

/* --- 2. CORE INITIALIZATION --- */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Styles & Entrance
    initPageTransition();
    runLetterAnimation('.slogan');
    runLetterAnimation('.lead-text');

    /* --- Intersection Observer Logic --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" 
    };

    const globalObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Default Reveal
                target.classList.add('active');

                // Staggered Grids
                if (target.classList.contains('stagger-container')) {
                    Array.from(target.children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = "1";
                            child.style.transform = "translateY(0)";
                            child.style.transition = "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
                        }, index * 120);
                    });
                }

                // Testimonials
                if (target.classList.contains('testimonial-card')) {
                    target.style.opacity = "1";
                    target.style.transform = "translateY(0)";
                }

                // Live Counters
                const numbers = target.querySelectorAll('.stat-number');
                if (numbers.length > 0) {
                    numbers.forEach(num => {
                        num.innerText = "0";
                        animateValue(num);
                    });
                }

                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Register all elements for observation
    const registerAnimations = () => {
        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            card.style.transition = "all 1s ease-out";
        });

        const toAnimate = document.querySelectorAll(
            '.reveal, .stagger-container, .about-stats-box, .stats-container, .employee-card, .service-detail-card, .testimonial-card'
        );
        toAnimate.forEach(el => globalObserver.observe(el));
    };
    registerAnimations();

    /* --- Navigation Logic --- */
    const initNavigation = () => {
        const menu = document.querySelector('#mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        if (menu && navLinks) {
            menu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menu.classList.toggle('is-active');
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
            });

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menu.classList.remove('is-active');
                    document.body.style.overflow = 'auto';
                });
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    };
    initNavigation();

    /* --- Form Submission Logic --- */
    const initContactForm = () => {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbz0nyFjR4fLx90XyCEhhIaeXIFZUKGaUaJDLmbTQJsPIDNYboM1s77PSx4Z3V3JQ_r8/exec';
        const modal = document.getElementById('contact-modal');
        const contactBtns = document.querySelectorAll('.btn-contact');
        const closeBtn = document.getElementById('close-btn');
        const contactForm = document.getElementById('contact-form-data');
        const submitBtn = document.getElementById('submit-btn');

        if (!modal) return;

        const openModal = (e) => {
            if (e) e.preventDefault();
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
            document.body.style.overflow = 'auto';
        };

        contactBtns.forEach(btn => btn.addEventListener('click', openModal));
        if (closeBtn) closeBtn.onclick = closeModal;
        window.onclick = (e) => { if (e.target === modal) closeModal(); };

        if (contactForm) {
            contactForm.addEventListener('submit', e => {
                e.preventDefault();
                submitBtn.disabled = true;
                submitBtn.innerText = "Sending...";

                fetch(scriptURL, { 
                    method: 'POST', 
                    body: new FormData(contactForm),
                    mode: 'no-cors' 
                })
                .then(() => {
                    submitBtn.innerText = "Sent Successfully!";
                    submitBtn.style.background = "#28a745";
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerText = "Send Message";
                        submitBtn.style.background = "#548888";
                        closeModal();
                    }, 2500);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    submitBtn.innerText = "Error, try again";
                    submitBtn.disabled = false;
                });
            });
        }
    };
    initContactForm();
});

/* --- 3. GLOBAL OVERLAY FUNCTIONS (Accessible globally) --- */

function openOverlay(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
        overlay.style.display = 'flex';
        setTimeout(() => overlay.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeOverlay(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => { overlay.style.display = 'none'; }, 400);
        document.body.style.overflow = 'auto';
    }
}

// Global click listener for closing overlays on background click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('page-overlay')) {
        closeOverlay(e.target.id);
    }
});