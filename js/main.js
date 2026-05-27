/* ============================================
   MAIN JS — cursor, reveals, easter eggs
   ============================================ */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader) loader.classList.add('hide');
  }, 600);
});

// ===== CUSTOM CURSOR =====
(function initCursor() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  // smooth-follow ring
  function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  // hover state on interactive
  const hoverables = 'a, button, .card, .project, .contact-link, .taste-list li, .skill, .punpun-corner, nav .logo';
  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });
})();

// ===== SCROLL REVEAL =====
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .skill');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => io.observe(el));
})();

// ===== MAGNETIC BUTTONS =====
(function initMagnetic() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

// ===== TYPING EFFECT (for hero taglines if any) =====
(function initType() {
  document.querySelectorAll('[data-type]').forEach(el => {
    const text = el.dataset.type;
    el.textContent = '';
    let i = 0;
    const speed = 40;
    function tick() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(tick, speed);
      }
    }
    setTimeout(tick, 800);
  });
})();

// ===== KONAMI EASTER EGG =====
(function initKonami() {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key.toLowerCase() === code[pos].toLowerCase()) {
      pos++;
      if (pos === code.length) {
        triggerSecret();
        pos = 0;
      }
    } else {
      pos = 0;
    }
  });
})();

function triggerSecret() {
  let o = document.querySelector('.secret-overlay');
  if (!o) {
    o = document.createElement('div');
    o.className = 'secret-overlay';
    o.innerHTML = `
      <h1>I want to disappear.</h1>
      <p>but i'm still here. and so are you.<br><br>
      thanks for finding this. that means something.</p>
      <button onclick="this.parentNode.classList.remove('show')">close</button>
    `;
    document.body.appendChild(o);
  }
  o.classList.add('show');
}

// ===== CONSOLE GREETING =====
console.log('%c hello.', 'color:#c43030;font-family:serif;font-size:48px;font-style:italic;');
console.log('%c you found the console. try the konami code somewhere on the site. ↑↑↓↓←→←→ b a', 'color:#9a9a96;font-family:monospace;font-size:12px;');
console.log('%c also try clicking the bird in the corner. ', 'color:#9a9a96;font-family:monospace;font-size:12px;');

// ===== PUNPUN BIRD CLICKS =====
(function initPunpun() {
  const bird = document.querySelector('.punpun-corner');
  if (!bird) return;
  const lines = [
    "dechu.",
    "i'm okay. probably.",
    "the sky is so big.",
    "good morning. good night.",
    "everything is fine. everything is fine.",
    "i love you.",
    "...",
    "do your best.",
    "punpun dechu~",
    "someday it'll all make sense."
  ];
  let i = 0;
  bird.addEventListener('click', (e) => {
    e.preventDefault();
    const bubble = document.createElement('div');
    bubble.textContent = lines[i % lines.length];
    bubble.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 24px;
      background: #181818;
      border: 1px solid #c43030;
      color: #e8e8e6;
      padding: 10px 16px;
      font-family: monospace;
      font-size: 12px;
      z-index: 60;
      max-width: 220px;
      animation: fadeBubble 2.4s forwards;
    `;
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2400);
    i++;
  });
})();

// inject bubble keyframes
const styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes fadeBubble {
  0% { opacity: 0; transform: translateY(8px); }
  15% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-8px); }
}
`;
document.head.appendChild(styleEl);

// ===== ACTIVE NAV LINK =====
(function highlightActive() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ===== SUBTLE PARALLAX ON HERO =====
(function parallax() {
  const hero = document.querySelector('.hero h1');
  if (!hero) return;
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    hero.style.transform = `translate(${x}px, ${y}px)`;
  });
})();
