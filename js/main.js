document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavScroll();
    initContactPopup();
    setCurrentYear();
    initFooterAnimation();
    initMobileMenu();
    initBackToTop();
});

/* ===================================
   Scroll Animations (Simple AOS)
   =================================== */
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ===================================
   Nav Scroll Effect
   =================================== */
function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

/* ===================================
   Contact Popup
   =================================== */
function initContactPopup() {
    const contactFloat = document.querySelector('.contact-float');
    const contactBtn = document.getElementById('contactBtn');
    const contactPopup = document.getElementById('contactPopup');
    
    if (!contactBtn || !contactFloat) return;

    contactBtn.addEventListener('click', () => {
        contactFloat.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!contactFloat.contains(e.target) && contactFloat.classList.contains('active')) {
            contactFloat.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactFloat.classList.contains('active')) {
            contactFloat.classList.remove('active');
        }
    });
}

/* ===================================
   Current Year
   =================================== */
function setCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* ===================================
   Smooth Scroll for Anchor Links
   =================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===================================
   Footer Scroll Animation
   =================================== */
function initFooterAnimation() {
    const footerHero = document.querySelector('.footer-hero');
    if (!footerHero) return;

    if (window.innerWidth > 768) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footerHero.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(footerHero);
    }
}

/* ===================================
   Mobile Menu Logic
   =================================== */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!toggleBtn || !mobileMenu) return;

    toggleBtn.addEventListener('click', () => {
        const isActive = mobileMenu.classList.contains('is-active');
        
        if (!isActive) {
            mobileMenu.classList.add('is-active');
            toggleBtn.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('is-active');
            toggleBtn.classList.remove('is-active');
            document.body.style.overflow = '';
        }
    });

    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('is-active');
            toggleBtn.classList.remove('is-active');
            document.body.style.overflow = '';
        });
    });
}

/* ===================================
   Back to Top Button
   =================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Smooth scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}