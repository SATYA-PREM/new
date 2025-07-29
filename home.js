document.querySelector('.mobile-toggle').addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--bg-white)';
                header.style.backdropFilter = 'none';
            }
        });

        // Button click handlers
        document.querySelector('.btn-pricing').addEventListener('click', function() {
            alert('Pricing page would be shown here');
        });

        // Add click handlers for other buttons
        document.querySelectorAll('.btn').forEach(button => {
            if (!button.classList.contains('btn-login') && !button.classList.contains('btn-pricing')) {
                button.addEventListener('click', function() {
                    console.log('Button clicked:', this.textContent);
                });
            }
        });
        const logo = document.querySelector('.logo');
if (logo) {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}