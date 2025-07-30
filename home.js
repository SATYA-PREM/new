// Debug function - add this temporarily to test
function debugPricingToggle() {
    const toggle = document.getElementById('annual-toggle');
    const body = document.body;
    
    console.log('=== PRICING TOGGLE DEBUG ===');
    console.log('Toggle element found:', !!toggle);
    console.log('Toggle checked:', toggle ? toggle.checked : 'N/A');
    console.log('Body has annual-pricing class:', body.classList.contains('annual-pricing'));
    console.log('Monthly prices found:', document.querySelectorAll('.monthly-price').length);
    console.log('Annual prices found:', document.querySelectorAll('.annual-price').length);
    console.log('Monthly descriptions found:', document.querySelectorAll('.monthly-desc').length);
    console.log('Annual descriptions found:', document.querySelectorAll('.annual-desc').length);
    
    // Test the toggle
    if (toggle) {
        console.log('Testing toggle...');
        toggle.click();
        setTimeout(() => {
            console.log('After toggle - Body has annual-pricing:', body.classList.contains('annual-pricing'));
        }, 100);
    }
}

// Run debug after page loads
setTimeout(debugPricingToggle, 1000);

/* ===== Search-Bar Logic for
   <div class="search-container"> … </div>
   — drop in after the HTML — */

document.addEventListener('DOMContentLoaded', () => {
  const searchContainer = document.querySelector('.search-container');
  if (!searchContainer) return;

  /* DOM references */
  const searchInput = searchContainer.querySelector('input');
  const searchBtn   = searchContainer.querySelector('button');

  /* -------------------------------------------------
     1.  Animated placeholder typing & erasing
  ---------------------------------------------------*/
  const phrases = [
    "Describe what you're looking for…",
    "What is the latest on quantum computing?",
    "Find papers about ML in healthcare",
    "Explore CRISPR gene-editing advances",
    "Research climate-change mitigation"
  ];
  let phraseIdx = 0, charIdx = 0,
      deleting  = false, waiting = false;

  function typeLoop() {
    if (waiting) return;
    const text = phrases[phraseIdx];

    /* update placeholder */
    searchInput.placeholder = text.substring(0, charIdx);

    if (!deleting) {
      charIdx++;
      if (charIdx === text.length + 1) {
        deleting = true;
        waiting  = true;
        setTimeout(() => { waiting = false; }, 800);  // shorter pause before erasing
      }
    } else {
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        waiting = true;
        setTimeout(() => { waiting = false; }, 400);
      }
    }

    /* faster speeds */
    const speed = deleting ? 40 : 80;
    setTimeout(typeLoop, speed);
  }

  setTimeout(typeLoop, 500);  // start sooner

  /* pause typing while user is focused */
  searchInput.addEventListener('focus',  () => waiting = true);
  searchInput.addEventListener('blur',   () => waiting = false);

  /* -------------------------------------------------
     2.  Focus / blur elevation effect
  ---------------------------------------------------*/
  searchInput.addEventListener('focus', () => {
    searchContainer.style.transform  = 'translateY(-2px)';
    searchContainer.style.boxShadow  = '0 10px 25px rgba(30,64,175,.2)';
  });
  searchInput.addEventListener('blur', () => {
    if (!searchInput.value.trim()) {
      searchContainer.style.transform = 'translateY(0)';
      searchContainer.style.boxShadow = '0 4px 6px rgba(0,0,0,.08)';
    }
  });

  /* -------------------------------------------------
     3.  Search action
  ---------------------------------------------------*/
  function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      /* shake for empty */
      searchContainer.style.animation = 'shake .45s';
      setTimeout(() => (searchContainer.style.animation = ''), 450);
      return;
    }

    /* loading state */
    searchBtn.disabled = true;
    const original = searchBtn.innerHTML;
    searchBtn.innerHTML =
      '<span class="spinner"></span>Searching…';

    /* simulate async search */
    setTimeout(() => {
      searchBtn.disabled = false;
      searchBtn.innerHTML = original;
      showResultsModal(query);
    }, 1800);
  }
  searchBtn.addEventListener('click', e => {
    e.preventDefault();
    performSearch();
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') performSearch();
  });

  /* -------------------------------------------------
     4.  Results modal
  ---------------------------------------------------*/
  function showResultsModal(query) {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <header>
          <h3>Results for: “${query}”</h3>
          <button class="close">&times;</button>
        </header>
        <section class="body">
          <article><h4>Advanced Quantum Computing</h4>
            <p>Recent breakthroughs show promising …</p>
            <span>Nature Physics • 2024</span></article>
          <article><h4>ML in Biomedical Research</h4>
            <p>A comprehensive review of …</p>
            <span>Cell • 2024</span></article>
          <article><h4>CRISPR-Cas9 Advances</h4>
            <p>New precision editing techniques …</p>
            <span>Science • 2024</span></article>
        </section>
        <footer><button class="btn-primary">View all</button></footer>
      </div>`;
    document.body.appendChild(modal);

    /* fade-in animation */
    requestAnimationFrame(() => modal.classList.add('open'));

    /* close logic */
    const close = () => {
      modal.classList.remove('open');
      modal.addEventListener('transitionend', () =>
        modal.remove(), { once: true });
    };
    modal.querySelector('.close').onclick = close;
    modal.onclick = e => (e.target === modal) && close();
    document.addEventListener('keydown', e =>
      (e.key === 'Escape') && close(), { once: true });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
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
  window.addEventListener('scroll', function () {
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
    btn.addEventListener('click', function () {
      alert('Pricing page would be shown here');
    });
  });

  // Generic button logger
  document.querySelectorAll('.btn:not(.btn-login):not(.btn-pricing)').forEach(btn => {
    btn.addEventListener('click', function () {
      console.log("Button clicked:", this.textContent);
    });
  });

  // Logo click scroll-to-top
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function (e) {
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
  document.querySelectorAll('path.draw').forEach(function (path) {
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
      const circleId = this.id?.replace('c', '');
      if (circleId) {
        document.querySelectorAll('path').forEach(function (path) {
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
document.querySelector('.mobile-toggle').addEventListener('click', function () {
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('show');
  }
});
