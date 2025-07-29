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
// Populate input when a tag is clicked
    document.getElementById('tagList').addEventListener('click', (e) => {
      if (e.target.classList.contains('tag')) {
        document.getElementById('searchBox').value = e.target.textContent.trim();
        document.getElementById('searchBox').focus();
      }
    });
    const searchInput = document.getElementById('searchInput');
const tags = document.querySelectorAll('.tag');

tags.forEach(tag => {
  tag.addEventListener('mouseover', () => {
    searchInput.value = tag.textContent.trim();
  });
  tag.addEventListener('mouseout', () => {
    searchInput.value = '';
  });
});
// JavaScript
const container = document.getElementById('logoContainer');
const btnLeft = document.getElementById('scrollLeft');
const btnRight = document.getElementById('scrollRight');

btnLeft.addEventListener('click', () => {
  container.scrollBy({ left: -150, behavior: 'smooth' });
});

btnRight.addEventListener('click', () => {
  container.scrollBy({ left: 150, behavior: 'smooth' });
});
document.addEventListener("DOMContentLoaded", function() {
  const items = document.querySelectorAll('.feature-item');
  items.forEach((item, idx) => {
    item.style.opacity = 0;
    setTimeout(() => {
      item.style.transition = 'opacity 0.6s cubic-bezier(.51,.22,.09,1)';
      item.style.opacity = 1;
    }, 400 + idx * 120);
  });
});
// Animation for .draw paths and click to change active circles
document.addEventListener('DOMContentLoaded', function () {
  // Animate .draw paths on load
  document.querySelectorAll('path.draw').forEach(function(path) {
    path.classList.add('draw'); // triggers the CSS animation above
  });

  // Optional: On click, activate circle and highlight paths it connects to
  document.querySelectorAll('circle').forEach(function(circle) {
    circle.addEventListener('click', function () {
      // Deactivate all circles
      document.querySelectorAll('circle').forEach(function(c) {
        c.classList.remove('active');
        c.classList.add('inactive');
      });
      // Activate this one
      this.classList.remove('inactive');
      this.classList.add('active');
      // Optionally: highlight associated paths by ID (custom logic)
      const circleId = this.id?.replace('c','');
      if (circleId) {
        document.querySelectorAll('path').forEach(function(path) {
          if (path.id && path.id.includes(circleId)) {
            path.classList.add('draw');
          } else if (path.classList.contains('draw')) {
            path.classList.remove('draw');
          }
        });
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.deep-box').forEach((box, i) => {
    box.style.opacity = 0;
    setTimeout(() => {
      box.style.transition = 'opacity 0.7s cubic-bezier(.53,.32,.16,1)';
      box.style.opacity = 1;
    }, 220 + i * 90);
  });
});
