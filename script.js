document.addEventListener("DOMContentLoaded", () => {
    const appRoot = document.getElementById("vocaltech-app-root");
    if (!appRoot) return;

    // Injecting the full structural HTML interface layout dynamically
    appRoot.innerHTML = `
    <nav class="navbar" id="navbar">
    <div class="nav-inner">
        <a href="#home" class="nav-logo">
            <img src="images/logo.png" alt="Vocal Tech Marketing Logo" class="nav-logo-img" />
            <span class="logo-v">VOCAL</span><span class="logo-accent">TECH</span>
            <span class="logo-sub">MARKETING</span>
        </a>
        <ul class="nav-links" id="navLinks">
            <li><a href="#home"     class="nav-link active">Home</a></li>
            <li><a href="#services" class="nav-link">Services</a></li>
            <li><a href="#about"    class="nav-link">About</a></li>
            <li><a href="#results"  class="nav-link">Results</a></li>
            <li><a href="#webdev"   class="nav-link">Web Dev</a></li>
            <li><a href="#contact"  class="nav-link">Contact</a></li>
        </ul>
        <a href="#contact" class="nav-cta">Get Started</a>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu">
            <span></span><span></span><span></span>
        </button>
    </div>
</nav>
<div class="nav-overlay" id="navOverlay">
    <button class="close-nav" id="closeNav" aria-label="Close menu">&times;</button>
    <ul class="nav-links">
        <li><a href="#home"     class="nav-link">Home</a></li>
        <li><a href="#services" class="nav-link">Services</a></li>
        <li><a href="#about"    class="nav-link">About</a></li>
        <li><a href="#results"  class="nav-link">Results</a></li>
        <li><a href="#webdev"   class="nav-link">Web Dev</a></li>
        <li><a href="#contact"  class="nav-link">Contact</a></li>
    </ul>
</div>
<!-- ══════════ HERO ══════════ -->
<section class="hero" id="home">
    <!-- Particle canvas background -->
    <canvas id="heroCanvas"></canvas>

    <div class="hero-mesh"></div>
    <div class="hero-grid-overlay"></div>
    <div class="hero-orb hero-orb-1"></div>
    <div class="hero-orb hero-orb-2"></div>
    <div class="hero-orb hero-orb-3"></div>

    <div class="hero-inner">
        <div class="hero-badge reveal">
            <span class="badge-dot"></span>
            Specialized Marketing Firm
        </div>
        <h1 class="hero-title reveal reveal-delay-1">
            We Drive Results<br>in <span class="cycler-wrap"><span id="cycler">Medicare</span></span>
        </h1>
        <p class="hero-desc reveal reveal-delay-2">
            Vocal Tech Marketing handles end-to-end outbound &amp; inbound campaigns
            for Medicare, ACA, MVA, Auto Insurance, and Final Expense —
            plus full-stack web development that converts.
        </p>
        <div class="hero-actions reveal reveal-delay-3">
            <a href="#contact" class="btn-primary">Start a Campaign</a>
            <a href="#services" class="btn-ghost">Explore Services</a>
        </div>
        <div class="hero-stats reveal reveal-delay-4">
            <div class="hstat">
                <div>
                    <span class="hstat-num" data-target="10">0</span><span>+</span>
                </div>
                    <span class="hstat-label">Verticals Served</span>
            </div>
            <div class="hstat-div"></div>
            <div class="hstat">
                <div>
                    <span class="hstat-num" data-target="98">0</span><span>%</span>
                </div>
                    <span class="hstat-label">Client Retention</span>
            </div>
            <div class="hstat-div"></div>
            <div class="hstat">
                <div>
                    <span class="hstat-num" data-target="24">0</span><span>/7</span>
                </div>
                    <span class="hstat-label">Campaign Support</span>
            </div>
        </div>
    </div>

    <!-- Hero right visual cards -->
    <div class="hero-right-visual">
        <div class="hrv-card">
            <div class="hrv-card-top">
                <div class="hrv-icon teal">📊</div>
                <div><div class="hrv-title">Medicare AEP</div><div class="hrv-sub">Conversion rate</div></div>
            </div>
            <div class="hrv-bar-wrap"><div class="hrv-bar teal"></div></div>
            <div class="hrv-pct">92%</div>
        </div>
        <div class="hrv-card">
            <div class="hrv-card-top">
                <div class="hrv-icon gold">⚡</div>
                <div><div class="hrv-title">ACA Enrollment</div><div class="hrv-sub">Campaign efficiency</div></div>
            </div>
            <div class="hrv-bar-wrap"><div class="hrv-bar gold"></div></div>
            <div class="hrv-pct">78%</div>
        </div>
        <div class="hrv-card">
            <div class="hrv-card-top">
                <div class="hrv-icon coral">🎯</div>
                <div><div class="hrv-title">Auto Live Transfer</div><div class="hrv-sub">Attorney intake rate</div></div>
            </div>
            <div class="hrv-bar-wrap"><div class="hrv-bar coral"></div></div>
            <div class="hrv-pct">85%</div>
        </div>
    </div>

    <div class="hero-scroll-hint">
        <span>Scroll</span>
        <div class="scroll-line"></div>
    </div>

    <!-- Animated wave bottom divider -->
    <div class="hero-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#0d1a1a"/>
        </svg>
    </div>
</section>

<!-- ══════════ TICKER ══════════ -->
<div class="ticker-band">
    <div class="ticker-track">
        <span>Medicare</span><span class="t-sep">&#9670;</span>
        <span>ACA Insurance</span><span class="t-sep">&#9670;</span>
        <span>MVA Campaigns</span><span class="t-sep">&#9670;</span>
        <span>Auto Insurance</span><span class="t-sep">&#9670;</span>
        <span>Final Expense</span><span class="t-sep">&#9670;</span>
        <span>Web Development</span><span class="t-sep">&#9670;</span>
        <span>Inbound &amp; Outbound</span><span class="t-sep">&#9670;</span>
        <span>Lead Generation</span><span class="t-sep">&#9670;</span>
        <span>Medicare</span><span class="t-sep">&#9670;</span>
        <span>ACA Insurance</span><span class="t-sep">&#9670;</span>
        <span>MVA Campaigns</span><span class="t-sep">&#9670;</span>
        <span>Auto Insurance</span><span class="t-sep">&#9670;</span>
        <span>Final Expense</span><span class="t-sep">&#9670;</span>
        <span>Web Development</span><span class="t-sep">&#9670;</span>
        <span>Inbound &amp; Outbound</span><span class="t-sep">&#9670;</span>
        <span>Lead Generation</span><span class="t-sep">&#9670;</span>
    </div>
</div>

<!-- ══════════ SERVICES ══════════ -->
<section class="services-section" id="services">
    <div class="section-wrap">
        <div class="section-header">
            <div class="section-chip reveal">Our Services</div>
            <h2 class="section-title reveal reveal-delay-1">Every vertical.<br>One powerhouse team.</h2>
            <p class="section-sub reveal reveal-delay-2">
                From cold outreach to warm inbound transfer — we own the full funnel
                across the most competitive insurance and legal verticals.
            </p>
        </div>

        <div class="services-grid">
            <div class="svc-card reveal" data-color="teal">
                <div class="svc-num">01</div>
                <div class="svc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <h3>Medicare</h3>
                <p>Compliant inbound &amp; outbound Medicare campaigns — Part A, B, C, D and Supplement plans. T65 targeting, SEP and AEP surge management.</p>
                <ul class="svc-list">
                    <li>Outbound dialing &amp; transfer</li>
                    <li>Inbound IVR routing</li>
                    <li>AEP &amp; SEP campaign bursts</li>
                    <li>TPMO compliant scripting</li>
                </ul>
                <div class="svc-tag">Medicare</div>
            </div>

            <div class="svc-card reveal reveal-delay-1" data-color="sky">
                <div class="svc-num">02</div>
                <div class="svc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3>ACA Insurance</h3>
                <p>Affordable Care Act enrollment campaigns with SEP and OEP handling. Maximize enrollments and minimize churn through precision targeting.</p>
                <ul class="svc-list">
                    <li>SEP &amp; OEP enrollment surges</li>
                    <li>Subsidy eligibility filtering</li>
                    <li>Multi-state licensed agents</li>
                    <li>Real-time lead delivery</li>
                </ul>
                <div class="svc-tag">ACA</div>
            </div>

            <div class="svc-card reveal reveal-delay-2" data-color="gold">
                <div class="svc-num">03</div>
                <div class="svc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <h3>MVA Campaigns</h3>
                <p>Motor Vehicle Accident lead generation and live transfer to law firms and legal teams. High-intent claimants delivered in real time.</p>
                <ul class="svc-list">
                    <li>Live MVA transfer campaigns</li>
                    <li>Attorney intake qualification</li>
                    <li>Geo-targeted outreach</li>
                    <li>Injury severity filtering</li>
                </ul>
                <div class="svc-tag">MVA</div>
            </div>

            <div class="svc-card reveal reveal-delay-1" data-color="teal">
                <div class="svc-num">04</div>
                <div class="svc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><path d="M9 17h6" /></svg>
                </div>
                <h3>Auto Insurance</h3>
                <p>Outbound auto insurance campaigns with carrier matching and live transfer. From standard policies to SR-22 and high-risk drivers.</p>
                <ul class="svc-list">
                    <li>Carrier comparison calls</li>
                    <li>SR-22 specialist routing</li>
                    <li>High-risk driver targeting</li>
                    <li>Multi-vehicle household leads</li>
                </ul>
                <div class="svc-tag">Auto</div>
            </div>

            <div class="svc-card reveal reveal-delay-2" data-color="coral">
                <div class="svc-num">05</div>
                <div class="svc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </div>
                <h3>Final Expense</h3>
                <p>Compassionate final expense campaigns built on trust and compliance. Reach seniors with whole life and burial insurance that truly matters.</p>
                <ul class="svc-list">
                    <li>Senior-focused outreach</li>
                    <li>Guaranteed issue leads</li>
                    <li>Simplified underwriting calls</li>
                    <li>DNC compliant dialing</li>
                </ul>
                <div class="svc-tag">Final Expense</div>
            </div>

            <div class="svc-card reveal reveal-delay-3" data-color="sky">
                <div class="svc-num">06</div>
                <div class="svc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </div>
                <h3>Web Development</h3>
                <p>Full-stack landing pages, lead funnels, and business websites built to convert. Responsive, fast, and designed with your campaign goals in mind.</p>
                <ul class="svc-list">
                    <li>Landing pages &amp; funnels</li>
                    <li>Lead capture &amp; CRM integration</li>
                    <li>Mobile-first responsive builds</li>
                    <li>Performance &amp; SEO optimized</li>
                </ul>
                <div class="svc-tag">Web Dev</div>
            </div>
        </div>
    </div>
</section>

<!-- ══════════ ABOUT ══════════ -->
<section class="about-section" id="about">
    <div class="about-wrap">
        <div class="about-visual reveal">
            <div class="about-img-card">
                <div class="acard-inner">
                    <div class="acard-logo">VTM</div>
                    <div class="acard-lines">
                        <div class="aline"></div>
                        <div class="aline aline--short"></div>
                        <div class="aline aline--med"></div>
                    </div>
                    <div class="acard-tags">
                        <span>Outbound</span>
                        <span>Inbound</span>
                        <span>Web Dev</span>
                    </div>
                </div>
                <div class="acard-glow"></div>
            </div>
            <div class="about-float-badge reveal reveal-delay-2">
                <span class="afb-icon">&#10003;</span>
                <div><strong>TCPA Compliant</strong><span>All campaigns</span></div>
            </div>
            <div class="about-float-badge about-float-badge--2 reveal reveal-delay-3">
                <span class="afb-icon">&#9650;</span>
                <div><strong>ROI Focused</strong><span>Every vertical</span></div>
            </div>
        </div>

        <div class="about-text">
            <div class="section-chip reveal">About Us</div>
            <h2 class="section-title left reveal reveal-delay-1">
                Your full-service<br>marketing engine.
            </h2>
            <p class="about-body reveal reveal-delay-2">
                Vocal Tech Marketing was built by industry veterans who understand that
                insurance and legal verticals demand more than generic marketing.
                We combine data-driven outbound dialing, precision inbound routing,
                and conversion-focused web builds into one unified team.
            </p>
            <p class="about-body reveal reveal-delay-3">
                Whether you're scaling Medicare AEP enrollment, generating MVA transfers
                for a law firm, or launching a fresh ACA campaign — we have the
                infrastructure, the scripts, and the specialists to execute at volume.
            </p>
            <div class="about-pillars reveal reveal-delay-4">
                <div class="pillar">
                    <div class="pillar-icon">&#9670;</div>
                    <div>
                        <strong>Compliance First</strong>
                        <p>TCPA, CMS, and state-level compliance baked into every campaign.</p>
                    </div>
                </div>
                <div class="pillar">
                    <div class="pillar-icon">&#9670;</div>
                    <div>
                        <strong>Full Funnel Ownership</strong>
                        <p>From first touch to closed deal — we own every step of the process.</p>
                    </div>
                </div>
                <div class="pillar">
                    <div class="pillar-icon">&#9670;</div>
                    <div>
                        <strong>Dedicated Account Team</strong>
                        <p>Real people managing your campaigns, not automated dashboards alone.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ══════════ RESULTS ══════════ -->
<section class="results-section" id="results">
    <div class="results-mesh"></div>
    <div class="section-wrap">
        <div class="section-header">
            <div class="section-chip reveal">Results</div>
            <h2 class="section-title light reveal reveal-delay-1">Numbers that speak<br>for themselves.</h2>
        </div>
        <div class="results-grid">
            <div class="result-card reveal">
                <div class="rc-num"><span class="counter" data-target="250">0</span>K+</div>
                <div class="rc-label">Leads Generated</div>
                <div class="rc-sub">Across all verticals combined</div>
            </div>
            <div class="result-card reveal reveal-delay-1">
                <div class="rc-num"><span class="counter" data-target="98">0</span>%</div>
                <div class="rc-label">Client Retention Rate</div>
                <div class="rc-sub">Year-over-year retention</div>
            </div>
            <div class="result-card reveal reveal-delay-2">
                <div class="rc-num"><span class="counter" data-target="40">0</span>%</div>
                <div class="rc-label">Avg. Cost Reduction</div>
                <div class="rc-sub">Vs. previous campaigns</div>
            </div>
            <div class="result-card reveal reveal-delay-3">
                <div class="rc-num"><span class="counter" data-target="5">0</span>+</div>
                <div class="rc-label">Active Verticals</div>
                <div class="rc-sub">Medicare · ACA · MVA · Auto · FE</div>
            </div>
        </div>

        <div class="process-strip">
            <div class="ps-step reveal">
                <div class="ps-num">01</div>
                <h4>Strategy &amp; Setup</h4>
                <p>Campaign goals, targeting, compliance review, script approval.</p>
            </div>
            <div class="ps-step reveal reveal-delay-1">
                <div class="ps-num">02</div>
                <h4>Launch &amp; Dial</h4>
                <p>Outbound campaigns live, inbound lines active, leads flowing.</p>
            </div>
            <div class="ps-step reveal reveal-delay-2">
                <div class="ps-num">03</div>
                <h4>Qualify &amp; Transfer</h4>
                <p>Intent scoring, live agent transfer, real-time CRM delivery.</p>
            </div>
            <div class="ps-step reveal reveal-delay-3">
                <div class="ps-num">04</div>
                <h4>Optimize &amp; Scale</h4>
                <p>A/B testing, reporting, cost-per-lead reduction, volume growth.</p>
            </div>
        </div>
    </div>
</section>

<!-- ══════════ TESTIMONIALS ══════════ -->
<section class="testimonials-section">
    <div class="section-wrap">
        <div class="section-header" style="padding-top:0">
            <div class="section-chip reveal">Testimonials</div>
            <h2 class="section-title reveal reveal-delay-1">Clients who scaled with us.</h2>
        </div>
        <div class="testimonials-grid">
            <div class="testi-card reveal">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-body">VTM transformed our Medicare AEP season. Their outbound team delivered more qualified transfers in one month than our previous vendor did all year.</p>
                <div class="testi-author">
                    <div class="testi-avatar">RJ</div>
                    <div>
                        <div class="testi-name">Robert J.</div>
                        <div class="testi-role">Medicare FMO Director</div>
                    </div>
                </div>
            </div>
            <div class="testi-card reveal reveal-delay-1">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-body">The MVA live transfer quality is unmatched. We see 85% attorney intake rates on every transfer. Our case load has tripled since partnering with Vocal Tech.</p>
                <div class="testi-author">
                    <div class="testi-avatar">SM</div>
                    <div>
                        <div class="testi-name">Sarah M.</div>
                        <div class="testi-role">Personal Injury Law Firm</div>
                    </div>
                </div>
            </div>
            <div class="testi-card reveal reveal-delay-2">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-body">Their web dev team built our ACA landing page and CRM integration in under a week. TCPA-compliant, blazing fast, and our cost-per-lead dropped 40%.</p>
                <div class="testi-author">
                    <div class="testi-avatar">DK</div>
                    <div>
                        <div class="testi-name">Daniel K.</div>
                        <div class="testi-role">ACA Insurance Agency Owner</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ══════════ WEB DEV ══════════ -->
<section class="webdev-section" id="webdev">
    <div class="section-wrap">
        <div class="wd-inner">
            <div class="wd-text">
                <div class="section-chip reveal">Web Development</div>
                <h2 class="section-title left reveal reveal-delay-1">
                    Websites that<br>work as hard<br>as your agents.
                </h2>
                <p class="about-body reveal reveal-delay-2">
                    Our dev team builds conversion-first landing pages, full business
                    websites, and lead funnels that integrate directly with your CRM,
                    dialer, and compliance stack. Every build is mobile-first, fast,
                    and designed around your specific vertical.
                </p>
                <div class="wd-features reveal reveal-delay-3">
                    <div class="wd-feat"><span>&#10003;</span> TCPA-compliant lead forms</div>
                    <div class="wd-feat"><span>&#10003;</span> TrustedForm &amp; Jornaya integration</div>
                    <div class="wd-feat"><span>&#10003;</span> Google Sheets &amp; CRM API hooks</div>
                    <div class="wd-feat"><span>&#10003;</span> Mobile-first responsive design</div>
                    <div class="wd-feat"><span>&#10003;</span> SEO-optimized page structure</div>
                    <div class="wd-feat"><span>&#10003;</span> Fast load speeds &amp; Core Web Vitals</div>
                </div>
                <a href="#contact" class="btn-primary reveal reveal-delay-4">Request a Build</a>
            </div>
            <div class="wd-visual reveal reveal-delay-2">
                <div class="code-window">
                    <div class="cw-bar">
                        <span class="cw-dot cw-dot--r"></span>
                        <span class="cw-dot cw-dot--y"></span>
                        <span class="cw-dot cw-dot--g"></span>
                        <span class="cw-title">vtm-landing.html</span>
                    </div>
                    <div class="cw-body">
                        <div class="code-line"><span class="c-tag">&lt;section</span> <span class="c-attr">class</span>=<span class="c-str">"hero"</span><span class="c-tag">&gt;</span></div>
                        <div class="code-line indent"><span class="c-tag">&lt;h1&gt;</span><span class="c-text">Get Your Free Quote</span><span class="c-tag">&lt;/h1&gt;</span></div>
                        <div class="code-line indent"><span class="c-tag">&lt;form</span> <span class="c-attr">id</span>=<span class="c-str">"leadForm"</span><span class="c-tag">&gt;</span></div>
                        <div class="code-line indent2"><span class="c-tag">&lt;input</span> <span class="c-attr">type</span>=<span class="c-str">"tel"</span> <span class="c-tag">/&gt;</span></div>
                        <div class="code-line indent2"><span class="c-tag">&lt;select</span> <span class="c-attr">id</span>=<span class="c-str">"state"</span><span class="c-tag">&gt;</span></div>
                        <div class="code-line indent2"><span class="c-tag">&lt;button</span> <span class="c-attr">class</span>=<span class="c-str">"submit-btn"</span><span class="c-tag">&gt;</span></div>
                        <div class="code-line indent"><span class="c-tag">&lt;/form&gt;</span></div>
                        <div class="code-line"><span class="c-tag">&lt;/section&gt;</span></div>
                        <div class="code-line mt"><span class="c-comment">/* TrustedForm active */</span></div>
                        <div class="code-line"><span class="c-prop">tcpaCompliant</span>: <span class="c-bool">true</span></div>
                        <div class="code-line"><span class="c-prop">crmIntegration</span>: <span class="c-bool">true</span></div>
                        <div class="code-line"><span class="c-prop">mobileFirst</span>: <span class="c-bool">true</span></div>
                        <div class="cw-cursor"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ══════════ CONTACT ══════════ -->
<section class="contact-section" id="contact">
    <div class="contact-mesh"></div>
    <div class="section-wrap">
        <div class="contact-inner">
            <div class="contact-text">
                <div class="section-chip reveal">Contact Us</div>
                <h2 class="section-title left light reveal reveal-delay-1">
                    Ready to scale<br>your campaigns?
                </h2>
                <p class="about-body light reveal reveal-delay-2">
                    Tell us your vertical, your goals, and your volume — we'll put
                    together a custom plan within 24 hours. No fluff, no runaround.
                </p>
                <div class="contact-details reveal reveal-delay-3">
                    <div class="cd-item">
                        <div class="cd-icon">&#9993;</div>
                        <div>
                            <strong>Email Us</strong>
                            <a href="mailto:info@vocaltechmarketing.com">info@vocaltechmarketing.com</a>
                        </div>
                    </div>
                    <div class="cd-item">
                        <div class="cd-icon">&#9742;</div>
                        <div>
                            <strong>Call Us</strong>
                            <a href="tel:8005550000">(800) 555-0000</a>
                        </div>
                    </div>
                    <div class="cd-item">
                        <div class="cd-icon">&#127760;</div>
                        <div>
                            <strong>Website</strong>
                            <a href="https://vocaltechmarketing.com" target="_blank">vocaltechmarketing.com</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="contact-form-wrap reveal reveal-delay-2">
                <form class="contact-form" id="contactForm" onsubmit="handleSubmit(event)">
                    <div class="cf-row">
                        <div class="cf-field">
                            <label>Your Name</label>
                            <input type="text" placeholder="John Smith" required />
                        </div>
                        <div class="cf-field">
                            <label>Email Address</label>
                            <input type="email" placeholder="john@company.com" required />
                        </div>
                    </div>
                    <div class="cf-field">
                        <label>Phone Number</label>
                        <input type="tel" placeholder="(555) 000-0000" />
                    </div>
                    <div class="cf-field">
                        <label>Service Interested In</label>
                        <select required>
                            <option value="" disabled selected>Select a service</option>
                            <option>Medicare Campaigns</option>
                            <option>ACA Insurance</option>
                            <option>MVA Campaigns</option>
                            <option>Auto Insurance</option>
                            <option>Final Expense</option>
                            <option>Web Development</option>
                            <option>Multiple Services</option>
                        </select>
                    </div>
                    <div class="cf-field">
                        <label>Tell Us About Your Goals</label>
                        <textarea placeholder="Monthly lead volume, target states, budget range..." rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn-primary full">Send Message &#8594;</button>
                </form>
            </div>
        </div>
    </div>
</section>

<!-- ══════════ FOOTER ══════════ -->
<footer class="main-footer">
    <div class="footer-inner">
        <div class="footer-brand">
            <div class="footer-logo">
                <span class="logo-mark" style="width:38px;height:38px">
                    <img src="images/logo.png" alt="Vocal Tech Marketing Logo" style="width:100%;height:100%;object-fit:contain;" />
                </span>
                <span class="logo-v">VOCAL</span><span class="logo-accent">TECH</span>
                <span class="logo-sub">MARKETING</span>
            </div>
            <p>Specialized outbound &amp; inbound marketing for insurance and legal verticals. Full-stack web development included.</p>
        </div>
        <div class="footer-col">
            <h4>Services</h4>
            <a href="#services">Medicare</a>
            <a href="#services">ACA Insurance</a>
            <a href="#services">MVA Campaigns</a>
            <a href="#services">Auto Insurance</a>
            <a href="#services">Final Expense</a>
            <a href="#webdev">Web Development</a>
        </div>
        <div class="footer-col">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#results">Our Results</a>
            <a href="#contact">Contact</a>
            <a href="https://vocaltechmarketing.com" target="_blank">vocaltechmarketing.com</a>
        </div>
        <div class="footer-col">
            <h4>Get In Touch</h4>
            <a href="mailto:info@vocaltechmarketing.com">info@vocaltechmarketing.com</a>
            <a href="tel:8005550000">(800) 555-0000</a>
            <div class="footer-socials">
                <a href="#" aria-label="LinkedIn">in</a>
                <a href="#" aria-label="Twitter">&#120143;</a>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2026 Vocal Tech Marketing. All rights reserved.</p>
        <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
        </div>
    </div>
</footer>

<!-- Scroll to top -->
<button class="scroll-top" id="scrollTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">&#8593;</button>

    `;

    // Initialize layout scripts, observers, events, and render modules
    initializeSiteEngine();
});

function initializeSiteEngine() {
    /* ─── Particle Canvas Background Logic ─── */
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
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.8 + 0.4,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
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

        function drawConnectionLine(a, b, dist, maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(84,136,136,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
        }

        function frame() {
            ctx.clearRect(0, 0, W, H);
            const maxDist = 130;

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.pulse += p.pulseSpeed;

                if (p.x < -10) p.x = W + 10;
                if (p.x > W + 10) p.x = -10;
                if (p.y < -10) p.y = H + 10;
                if (p.y > H + 10) p.y = -10;

                let radiusAdjustment = p.r + Math.sin(p.pulse) * 0.25;
                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(0.1, radiusAdjustment), 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dx * dy);
                    if (dist < maxDist) {
                        drawConnectionLine(p, p2, dist, maxDist);
                    }
                }
            });

            animId = requestAnimationFrame(frame);
        }

        window.addEventListener('resize', () => {
            resize();
            init();
        });

        init();
        frame();
    }

    /* ─── Hero Header Text Cycling Module ─── */
    const words = ["Medicare", "ACA Insurance", "MVA Campaigns", "Auto Insurance", "Final Expense", "Web Development"];
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

    /* ─── Stat Section Counter Acceleration ─── */
    function animateCounter(el) {
        const target = +el.dataset.target;
        const duration = 1600;
        const start = performance.now();
        const run = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * target);
            if (p < 1) requestAnimationFrame(run);
            else el.textContent = target;
        };
        requestAnimationFrame(run);
    }

    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                counterObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

    /* ─── Scroll Event Handlers (Navbar / Scroll Top Button) ─── */
    const navbar = document.getElementById("navbar");
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar?.classList.add("scrolled");
            scrollTopBtn?.classList.add("visible");
        } else {
            navbar?.classList.remove("scrolled");
            scrollTopBtn?.classList.remove("visible");
        }
    });

    scrollTopBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ─── Reveal On Scroll Intersection Observer ─── */
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

    /* ─── Interactive Mobile Menu Events ─── */
    const hamburger = document.getElementById("hamburger");
    const closeNav = document.getElementById("closeNav");
    const navOverlay = document.getElementById("navOverlay");

    function openNav() {
        navOverlay?.classList.add("open");
        hamburger?.classList.add("is-open");
    }
    function closeNavMenu() {
        navOverlay?.classList.remove("open");
        hamburger?.classList.remove("is-open");
    }

    hamburger?.addEventListener("click", openNav);
    closeNav?.addEventListener("click", closeNavMenu);
    
    document.querySelectorAll(".nav-overlay .nav-link").forEach(link => {
        link.addEventListener("click", closeNavMenu);
    });

    /* ─── Contact Form Callback Route Submission ─── */
    const formElement = document.getElementById("campaignContactForm");
    formElement?.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type=submit]');
        if (!btn) return;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = '✓ Campaign Request Logged';
            e.target.reset();
        }, 1500);
    });
}