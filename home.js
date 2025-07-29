document.addEventListener("DOMContentLoaded", function() {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      }
    });
  }

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      } else {
        header.style.background = 'var(--bg-white)';
        header.style.backdropFilter = 'none';
      }
    }
  });

  // Pricing button click handler
  document.querySelectorAll('.btn-pricing').forEach(btn => {
    btn.addEventListener('click', function() {
      alert('Pricing page would be shown here');
    });
  });

  // Generic button logger
  document.querySelectorAll('.btn:not(.btn-login):not(.btn-pricing)').forEach(btn => {
    btn.addEventListener('click', function() {
      console.log("Button clicked:", this.textContent);
    });
  });

  // Logo click scroll-to-top
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Tag input population on click/hover
  const searchInput = document.querySelector('.search-container input');
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseover', () => {
      if (searchInput) searchInput.value = tag.textContent.trim();
    });
    tag.addEventListener('mouseout', () => {
      if (searchInput) searchInput.value = '';
    });
    tag.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = tag.textContent.trim();
        searchInput.focus();
      }
    });
  });
  
  // SVG feature-item enter animations
  document.querySelectorAll('.feature-item').forEach((item, idx) => {
    item.style.opacity = 0;
    setTimeout(() => {
      item.style.transition = 'opacity 0.6s cubic-bezier(.51,.22,.09,1)';
      item.style.opacity = 1;
    }, 400 + idx * 120);
  });

  // scroll logo container only if buttons exist
  const container = document.getElementById('logoContainer');
  const btnLeft = document.getElementById('scrollLeft');
  const btnRight = document.getElementById('scrollRight');
  if (container && btnLeft && btnRight) {
    btnLeft.addEventListener('click', () => {
      container.scrollBy({ left: -150, behavior: 'smooth' });
    });
    btnRight.addEventListener('click', () => {
      container.scrollBy({ left: 150, behavior: 'smooth' });
    });
  }

  // Animate SVG paths with .draw
  document.querySelectorAll('path.draw').forEach(function(path) {
    path.classList.add('draw');
  });

  // SVG circles interaction
  document.querySelectorAll('circle').forEach(circle => {
    circle.addEventListener('click', function () {
      document.querySelectorAll('circle').forEach(c => {
        c.classList.remove('active');
        c.classList.add('inactive');
      });
      this.classList.remove('inactive');
      this.classList.add('active');
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

  // Deep box fade-in animation
  document.querySelectorAll('.deep-box').forEach((box, i) => {
    box.style.opacity = 0;
    setTimeout(() => {
      box.style.transition = 'opacity 0.7s cubic-bezier(.53,.32,.16,1)';
      box.style.opacity = 1;
    }, 220 + i * 90);
  });
});
