/* =====================================================
   CODEMOLL LANDING PAGE - MAIN APPLICATION
   Premium Cybersecurity & AI Company Website
   ===================================================== */

// =====================================================
// INITIALIZATION & DOM READY
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initScrollProgress();
    initButtons();
    initFAQ();
    initForms();
    initScrollReveal();
    initCounters();
    initBackToTop();
    initSmoothScroll();
    initMouseSpotlight();
    
    // Start animations after a delay
    setTimeout(() => {
        startBackgroundAnimations();
    }, 2000);
}

// =====================================================
// LOADING SCREEN
// =====================================================

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time (2-3 seconds)
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2500);
}

// =====================================================
// NAVIGATION
// =====================================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Hide navbar on scroll down, show on scroll up
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
    
    // Highlight active nav link
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// =====================================================
// SCROLL PROGRESS BAR
// =====================================================

function initScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// =====================================================
// BUTTONS & RIPPLE EFFECT
// =====================================================

function initButtons() {
    const buttons = document.querySelectorAll('.btn[data-ripple]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Remove existing ripple
            const ripple = this.querySelector('.ripple');
            if (ripple) {
                ripple.remove();
            }
            
            // Create ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const rippleEl = document.createElement('span');
            rippleEl.classList.add('ripple');
            rippleEl.style.width = rippleEl.style.height = size + 'px';
            rippleEl.style.left = x + 'px';
            rippleEl.style.top = y + 'px';
            
            this.appendChild(rippleEl);
            this.classList.add('ripple');
        });
        
        // Add hover lift effect
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// =====================================================
// FAQ ACCORDION
// =====================================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                }
            });
            
            // Toggle current item
            item.classList.toggle('open');
        });
    });
}

// =====================================================
// FORM HANDLING
// =====================================================

function initForms() {
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    
    // Validate form
    const inputs = this.querySelectorAll('.form-input');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff0000';
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (isValid) {
        // Show success message
        showNotification('Message sent successfully!', 'success');
        this.reset();
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = this.querySelector('.form-input').value;
    
    if (isValidEmail(email)) {
        showNotification('Successfully subscribed!', 'success');
        this.reset();
    } else {
        showNotification('Please enter a valid email', 'error');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : '#ff4444'};
        color: ${type === 'success' ? '#050505' : '#fff'};
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// =====================================================
// SCROLL REVEAL
// =====================================================

function initScrollReveal() {
    const reveals = document.querySelectorAll('section > .container, .glass-card, .service-card, .reason-item');
    
    // Set initial state
    reveals.forEach(element => {
        element.classList.add('scroll-reveal');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(element => observer.observe(element));
}

// =====================================================
// ANIMATED COUNTERS
// =====================================================

function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                animateCounter(entry.target);
                entry.target.dataset.counted = 'true';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '/7');
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '/7');
        }
    }, 16);
}

// =====================================================
// BACK TO TOP BUTTON
// =====================================================

function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =====================================================
// SMOOTH SCROLL
// =====================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =====================================================
// MOUSE SPOTLIGHT
// =====================================================

function initMouseSpotlight() {
    const spotlight = document.getElementById('mouse-spotlight');
    
    document.addEventListener('mousemove', (e) => {
        spotlight.style.left = (e.clientX - 250) + 'px';
        spotlight.style.top = (e.clientY - 250) + 'px';
    });
}

// =====================================================
// BACKGROUND ANIMATIONS
// =====================================================

function startBackgroundAnimations() {
    // Add stagger animation classes to cards
    const cards = document.querySelectorAll('.glass-card, .service-card, .reason-item');
    cards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
        card.style.animation = 'fadeInUp 0.6s ease forwards';
    });
    
    // Animate stat items
    const stats = document.querySelectorAll('.stat-item');
    stats.forEach((stat, index) => {
        stat.style.animationDelay = (index * 0.15) + 's';
        stat.style.animation = 'fadeInUp 0.6s ease forwards';
    });
}

// =====================================================
// PARALLAX EFFECT
// =====================================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = element.offsetTop;
            const distance = scrollPosition - elementOffset;
            
            element.style.transform = `translateY(${distance * 0.5}px)`;
        });
    });
}

// Initialize parallax after page load
window.addEventListener('load', initParallax);

// =====================================================
// LAZY LOADING
// =====================================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => observer.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

window.addEventListener('load', initLazyLoading);

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Debounce function for optimized scroll/resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for high-frequency events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get element's position relative to viewport
function getElementViewportPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        visible: rect.top < window.innerHeight && rect.bottom > 0
    };
}

// Check if element is in viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add class to elements with delay
function addClassWithDelay(elements, className, delayMs) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(className);
        }, index * delayMs);
    });
}

// Remove class from elements
function removeClassFromAll(selector, className) {
    document.querySelectorAll(selector).forEach(element => {
        element.classList.remove(className);
    });
}

// Toggle class on elements
function toggleClassOnAll(selector, className) {
    document.querySelectorAll(selector).forEach(element => {
        element.classList.toggle(className);
    });
}

// =====================================================
// PERFORMANCE OPTIMIZATION
// ===================================================== 

// Use requestAnimationFrame for smooth animations
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        element.textContent = Math.floor(progress * (end - start) + start);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
}

// =====================================================
// EVENT DELEGATION
// ===================================================== 

document.addEventListener('click', (e) => {
    // Handle dynamic click events
    if (e.target.closest('.faq-question')) {
        const faqItem = e.target.closest('.faq-item');
        if (faqItem) {
            faqItem.classList.toggle('open');
        }
    }
});

// =====================================================
// KEYBOARD NAVIGATION
// ===================================================== 

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Scroll to top on Home key
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Scroll to bottom on End key
    if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// =====================================================
// PERFORMANCE MONITORING
// ===================================================== 

function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const metrics = {
            dns: timing.domainLookupEnd - timing.domainLookupStart,
            tcp: timing.connectEnd - timing.connectStart,
            request: timing.responseStart - timing.requestStart,
            response: timing.responseEnd - timing.responseStart,
            dom: timing.domInteractive - timing.domLoading,
            load: timing.loadEventEnd - timing.loadEventStart,
            total: timing.loadEventEnd - timing.fetchStart
        };
        
        console.log('Performance Metrics:', metrics);
    }
}

// Log metrics after page load
window.addEventListener('load', logPerformanceMetrics);

// =====================================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================================== 

// Ensure focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// =====================================================
// FEATURE DETECTION
// ===================================================== 

const features = {
    intersectionObserver: 'IntersectionObserver' in window,
    requestAnimationFrame: 'requestAnimationFrame' in window,
    localStorage: typeof(Storage) !== 'undefined',
    serviceWorker: 'serviceWorker' in navigator,
    webGL: (() => {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    })()
};

console.log('Browser Features:', features);

// =====================================================
// ERROR HANDLING
// ===================================================== 

window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Send to error tracking service if needed
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// =====================================================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ===================================================== 

window.CodeMoll = {
    showNotification,
    animateValue,
    debounce,
    throttle,
    isElementInViewport,
    getElementViewportPosition
};

// =====================================================
// END OF MAIN APPLICATION
// ===================================================== 
