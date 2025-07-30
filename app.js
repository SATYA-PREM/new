// TechFlow Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initHeaderScrollEffect();
    initTagChips();
    initLogoScroll();
    initAnimations();
    
    // Add click handlers for buttons
    setupButtonHandlers();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            // Toggle classes
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('show');
        });

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('show');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    // Handle navigation links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle logo click to scroll to top
    document.querySelector('.nav-brand h2').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Handle footer links
    document.querySelectorAll('.footer-column a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Tag Chips Functionality
function initTagChips() {
    const searchInput = document.querySelector('.search-input');
    const tagChips = document.querySelectorAll('.tag-chip');
    
    tagChips.forEach(chip => {
        // Hover effect
        chip.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        chip.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        // Click to populate search input
        chip.addEventListener('click', function() {
            const tagText = this.getAttribute('data-tag');
            if (searchInput && tagText) {
                searchInput.value = `Looking for ${tagText} solutions...`;
                searchInput.focus();
                
                // Add visual feedback
                this.style.background = 'var(--color-primary)';
                this.style.color = 'var(--color-btn-primary-text)';
                
                // Reset after a moment
                setTimeout(() => {
                    this.style.background = '';
                    this.style.color = '';
                }, 1000);
            }
        });
    });
}

// Logo Scroll Functionality
function initLogoScroll() {
    const scrollLeft = document.querySelector('.scroll-left');
    const scrollRight = document.querySelector('.scroll-right');
    const logosContainer = document.querySelector('.logos-container');
    
    if (scrollLeft && scrollRight && logosContainer) {
        scrollLeft.addEventListener('click', function() {
            logosContainer.scrollBy({
                left: -200,
                behavior: 'smooth'
            });
        });
        
        scrollRight.addEventListener('click', function() {
            logosContainer.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        });
    }
}

// Animation Effects
function initAnimations() {
    // Staggered fade-in for feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
    
    // Staggered fade-in for deep boxes
    const deepBoxes = document.querySelectorAll('.deep-box');
    deepBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            box.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
    
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.feature-item, .deep-box, .logo-item').forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
}

// Button Handlers
function setupButtonHandlers() {
    // Add hover effects to all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        btn.addEventListener('mousedown', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0) scale(0.98)';
            }
        });
        
        btn.addEventListener('mouseup', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px) scale(1)';
            }
        });
    });
}

// Placeholder Alert Functions
function showPricingAlert() {
    alert('Pricing information coming soon! Contact our sales team for custom quotes.');
}

function showLoginAlert() {
    alert('Login functionality will be available soon. Stay tuned for updates!');
}

// SVG Path Drawing and Circle Toggle (optional)
function initSVGAnimations() {
    const svgPaths = document.querySelectorAll('svg path');
    const circles = document.querySelectorAll('.circle');
    
    // SVG path drawing animation
    svgPaths.forEach(path => {
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        
        // Add draw class when in view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('draw');
                }
            });
        });
        
        observer.observe(path);
    });
    
    // Circle active/inactive toggle
    circles.forEach(circle => {
        circle.addEventListener('click', function() {
            // Remove active from all circles
            circles.forEach(c => {
                c.classList.remove('active');
                c.classList.add('inactive');
            });
            
            // Add active to clicked circle
            this.classList.add('active');
            this.classList.remove('inactive');
        });
    });
}

// Search functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchContainer = document.querySelector('.search-container');
    
    if (searchInput && searchContainer) {
        // Enhanced focus effects
        searchInput.addEventListener('focus', function() {
            searchContainer.style.transform = 'translateY(-2px)';
            searchContainer.style.boxShadow = '0 10px 25px rgba(33, 128, 141, 0.2)';
            searchContainer.style.borderColor = 'var(--color-primary)';
        });
        
        searchInput.addEventListener('blur', function() {
            if (!this.value) {
                searchContainer.style.transform = 'translateY(0)';
                searchContainer.style.boxShadow = 'var(--shadow-sm)';
                searchContainer.style.borderColor = 'var(--color-border)';
            }
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

// Search function (placeholder)
function performSearch(query) {
    if (query.trim()) {
        alert(`Searching for: "${query}"\n\nSearch functionality will be implemented soon!`);
    } else {
        alert('Please enter a search term.');
    }
}

// Lazy loading for performance
function initLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const src = element.getAttribute('data-lazy');
                
                if (src) {
                    element.src = src;
                    element.removeAttribute('data-lazy');
                }
                
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// Floating elements interaction
function initFloatingInteraction() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Random animation properties
        const duration = 6 + Math.random() * 4;
        const delay = Math.random() * 2;
        
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        
        // Mouse interaction
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
            this.style.opacity = '0.3';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        });
    });
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--color-primary);
        z-index: 9999;
        transition: width 0.1s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initSearchFunctionality();
    initLazyLoading();
    initFloatingInteraction();
    initScrollProgress();
    
    // Initialize SVG animations if SVGs are present
    if (document.querySelector('svg path') || document.querySelector('.circle')) {
        initSVGAnimations();
    }
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
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

// Enhanced smooth scrolling with easing
function smoothScrollTo(targetPosition, duration = 1000) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation for interactive elements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    window.announcer = announcer;
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// Handle reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .floating-element {
            animation: none !important;
        }
    `;
    document.head.appendChild(style);
}