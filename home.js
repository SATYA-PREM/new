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
     1.  Animated placeholder typing
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

    /* typing / deleting */
    if (!deleting) {
      charIdx++;
      if (charIdx === text.length + 1) {
        deleting = true;
        waiting  = true;
        setTimeout(() => (waiting = false), 2000);   // pause at end
      }
    } else {
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        waiting = true;
        setTimeout(() => (waiting = false), 400);    // pause before next
      }
    }
    /* speed */
    const speed = deleting ? 60 : 120;
    setTimeout(typeLoop, speed);
  }
  setTimeout(typeLoop, 800);                        // start after short delay

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

/* ========= Inject minimal CSS (optional) ========== */
const css = `
.search-container{display:flex;gap:.5rem;align-items:center;
  background:#fff;padding:.5rem .75rem;border-radius:9999px;
  box-shadow:0 4px 6px rgba(0,0,0,.08);transition:.25s}
.search-container input{border:none;outline:none;width:220px;font:16px/1.4 Inter,Arial,sans-serif}
.search-container button{background:#1e40af;color:#fff;border:none;
  display:flex;align-items:center;justify-content:center;
  padding:.55rem .8rem;border-radius:9999px;cursor:pointer;
  transition:transform .15s}
.search-container button svg{width:18px;height:18px}
.spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.3);
  border-top-color:#fff;border-radius:50%;animation:spin 1s linear infinite;margin-right:6px}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes shake{10%,90%{transform:translateX(-1px)}
  20%,80%{transform:translateX(2px)}30%,50%,70%{transform:translateX(-4px)}
  40%,60%{transform:translateX(4px)}}
.search-modal{position:fixed;inset:0;background:rgba(0,0,0,.5);
  display:flex;align-items:center;justify-content:center;opacity:0;transition:.25s}
.search-modal.open{opacity:1}
.search-modal .modal-content{background:#fff;width:90%;max-width:600px;
  max-height:80vh;overflow-y:auto;border-radius:12px;transform:translateY(20px);
  transition:.25s;padding:1.5rem;box-shadow:0 20px 40px rgba(0,0,0,.2)}
.search-modal.open .modal-content{transform:translateY(0)}
.search-modal header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
.search-modal header h3{font:600 18px/1.3 Inter,Arial,sans-serif;margin:0}
.search-modal header button{font-size:26px;border:none;background:none;cursor:pointer;color:#6b7280}
.search-modal .body article{padding:1rem 0;border-bottom:1px solid #f3f4f6}
.search-modal .body article:last-child{border-bottom:none}
.search-modal .body h4{margin:0 0 .25rem;font:600 16px/1.3 Inter,Arial,sans-serif;color:#1e40af}
.search-modal .body p{margin:0 0 .25rem;color:#4b5563;font-size:14px}
.search-modal .body span{font-size:12px;color:#9ca3af}
.search-modal footer{text-align:center;margin-top:1.25rem}
.btn-primary{background:#1e40af;color:#fff;border:none;padding:.55rem 1.2rem;
  border-radius:8px;cursor:pointer;font:600 14px Inter,Arial,sans-serif}
`;
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);
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
