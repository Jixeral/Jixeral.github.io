/* ============================================
   JIXERAL — main.js v3
   ============================================ */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader) loader.classList.add('hide');
  }, 600);
});

// ===== STAR FIELD =====
(function initStars() {
  const sf = document.createElement('div');
  sf.className = 'starfield';
  document.body.appendChild(sf);

  // tiny twinkling stars
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 0.5;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.setProperty('--max', (0.3 + Math.random() * 0.6).toFixed(2));
    s.style.animationDelay = (Math.random() * 6) + 's';
    s.style.animationDuration = (4 + Math.random() * 6) + 's';
    sf.appendChild(s);
  }

  // shooting stars every 8-20s
  function spawnShootingStar() {
    const sh = document.createElement('div');
    sh.className = 'shooting-star';
    const startX = Math.random() * window.innerWidth * 0.7 + window.innerWidth * 0.3;
    const startY = Math.random() * window.innerHeight * 0.4;
    sh.style.left = startX + 'px';
    sh.style.top = startY + 'px';
    sh.style.animation = 'shoot 1.2s linear forwards';
    sf.appendChild(sh);
    setTimeout(() => sh.remove(), 1300);
    setTimeout(spawnShootingStar, 8000 + Math.random() * 12000);
  }
  setTimeout(spawnShootingStar, 4000 + Math.random() * 6000);
})();

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
  function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  function refreshHover() {
    const sel = 'a, button, .card, .project, .contact-link, .taste-list li, .skill, .punpun-corner, nav .logo, .platform-grid a, .blog-entry, input, textarea, .gb-tools button, .gb-tools label';
    document.querySelectorAll(sel).forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = '1';
      el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }
  refreshHover();
  // also re-run after a tick (for dynamically inserted things)
  setTimeout(refreshHover, 500);
  window._refreshCursorHover = refreshHover;
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

// ===== PARALLAX ON HERO =====
(function parallax() {
  const hero = document.querySelector('.hero h1');
  if (!hero) return;
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    hero.style.transform = `translate(${x}px, ${y}px)`;
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
        triggerSecret('konami');
        pos = 0;
      }
    } else { pos = 0; }
  });
})();

// ===== TYPE-WORD EASTER EGGS =====
(function initTypeEgg() {
  let buffer = '';
  let lastIndicator = 0;
  const triggers = {
    'punpun': () => triggerSecret('punpun'),
    'dechu': () => showBubble('dechu.', 'center'),
    'aiko': () => showBubble("aiko-chan.", 'center'),
    'jixeral': () => showBubble('that\'s me.', 'center'),
    'lee': () => showBubble('hi.', 'center'),
    'sayonara': () => window.location.href = 'secret.html'
  };
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key.length !== 1) return;
    buffer += e.key.toLowerCase();
    if (buffer.length > 20) buffer = buffer.slice(-20);
    for (const k in triggers) {
      if (buffer.endsWith(k)) {
        triggers[k]();
        buffer = '';
        break;
      }
    }
  });
})();

function showBubble(text, where) {
  const b = document.createElement('div');
  b.textContent = text;
  b.className = 'type-indicator show';
  document.body.appendChild(b);
  setTimeout(() => b.classList.remove('show'), 1800);
  setTimeout(() => b.remove(), 2400);
}

function triggerSecret(source) {
  let o = document.querySelector('.secret-overlay');
  if (!o) {
    o = document.createElement('div');
    o.className = 'secret-overlay';
    o.innerHTML = `
      <img src="assets/img/punpun-crying.png" alt="">
      <h1>i want to disappear.</h1>
      <p>but i'm still here. and so are you.<br><br>
      thanks for finding this. that means something.</p>
      <button onclick="this.parentNode.classList.remove('show')">close</button>
    `;
    document.body.appendChild(o);
    if (window._refreshCursorHover) window._refreshCursorHover();
  }
  o.classList.add('show');
}

// ===== CONSOLE GREETING =====
console.log('%c hello, jix here.', 'color:#c43030;font-family:serif;font-size:48px;font-style:italic;');
console.log('%c you found the console.', 'color:#9a9a96;font-family:monospace;font-size:14px;');
console.log('%c try: konami code (↑↑↓↓←→←→ba) · type "punpun" or "dechu" · click the bird · click the logo 5 times · click the afro god', 'color:#9a9a96;font-family:monospace;font-size:12px;');
console.log('%c or visit /secret.html if you\'re cheating.', 'color:#4a4a47;font-family:monospace;font-size:11px;font-style:italic;');

// ===== PUNPUN BIRD CLICKS =====
(function initPunpunCorner() {
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
    "someday it'll all make sense.",
    "have you been eating?",
    "it'll be alright.",
    "hi, jix."
  ];
  let i = 0;
  bird.addEventListener('click', (e) => {
    e.preventDefault();
    const bubble = document.createElement('div');
    bubble.textContent = lines[i % lines.length];
    bubble.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 24px;
      background: #181818;
      border: 1px solid #c43030;
      color: #e8e8e6;
      padding: 10px 16px;
      font-family: monospace;
      font-size: 12px;
      z-index: 60;
      max-width: 220px;
      animation: fadeBubble 2.6s forwards;
    `;
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2600);
    i++;
  });
})();

// bubble keyframe
const _bubbleStyle = document.createElement('style');
_bubbleStyle.textContent = `
@keyframes fadeBubble {
  0% { opacity: 0; transform: translateY(8px); }
  15% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-8px); }
}`;
document.head.appendChild(_bubbleStyle);

// ===== LOGO CLICK COUNTER EASTER EGG =====
(function initLogoEgg() {
  const logo = document.querySelector('nav .logo');
  if (!logo) return;
  let count = 0;
  let timer;
  logo.addEventListener('click', (e) => {
    count++;
    clearTimeout(timer);
    timer = setTimeout(() => count = 0, 1500);
    if (count >= 5) {
      e.preventDefault();
      count = 0;
      triggerSecret('logo');
    }
  });
})();

// ===== ACTIVE NAV =====
(function highlightActive() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });
})();

// ===== AFRO GOD EASTER EGG =====
// pops up from bottom-left when you click; if you keep clicking, he stays up.
// stop clicking and after a delay, he retracts.
(function initAfroGod() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  const god = document.createElement('div');
  god.className = 'afro-god';
  god.innerHTML = '<img src="assets/img/afro-god.png" alt="" draggable="false">';
  god.title = 'click me. keep clicking.';
  document.body.appendChild(god);

  let visible = -180; // how much of him is up (negative means hidden)
  let retractTimer;
  const maxUp = 40; // bottom: 40px = fully visible

  function setPos() { god.style.bottom = visible + 'px'; }
  setPos();

  god.addEventListener('click', () => {
    visible = Math.min(maxUp, visible + 60);
    setPos();
    clearTimeout(retractTimer);
    // brief tilt feedback
    god.style.transform = 'rotate(' + (Math.random() * 6 - 3) + 'deg)';
    retractTimer = setTimeout(() => {
      visible = -180;
      setPos();
      god.style.transform = '';
    }, 1400);
  });

  if (window._refreshCursorHover) window._refreshCursorHover();
})();

// ===== LOVES PAGE SEARCH POPUP =====
(function initTasteSearch() {
  const lists = document.querySelectorAll('.taste-list[data-search]');
  if (!lists.length) return;

  const pop = document.createElement('div');
  pop.className = 'search-pop';
  document.body.appendChild(pop);
  let current = null;

  function showFor(li, type) {
    current = li;
    const q = encodeURIComponent(li.dataset.search || li.querySelector('.title').textContent);
    let html = '<div class="pop-label">search for it</div>';
    if (type === 'music') {
      html += `<button data-url="https://open.spotify.com/search/${q}">▶ spotify</button>`;
      html += `<button data-url="https://music.youtube.com/search?q=${q}">▶ youtube music</button>`;
      html += `<button data-url="https://www.youtube.com/results?search_query=${q}">▶ youtube</button>`;
    } else {
      html += `<button data-url="https://www.google.com/search?q=${q}">▶ google</button>`;
      html += `<button data-url="https://www.google.com/search?q=${q}&tbm=isch">▶ images</button>`;
    }
    pop.innerHTML = html;
    pop.classList.add('show');
    pop.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        window.open(b.dataset.url, '_blank');
        pop.classList.remove('show');
      });
    });
    if (window._refreshCursorHover) window._refreshCursorHover();

    const r = li.getBoundingClientRect();
    let x = r.right + 8;
    if (x + 220 > window.innerWidth) x = r.left - 200;
    let y = r.top;
    if (y + 200 > window.innerHeight) y = window.innerHeight - 220;
    pop.style.left = x + 'px';
    pop.style.top = y + 'px';
  }

  lists.forEach(list => {
    const type = list.dataset.search; // 'music' or 'general'
    list.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', (e) => {
        if (li.dataset.href) { window.location.href = li.dataset.href; return; }
        e.stopPropagation();
        showFor(li, type);
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!pop.contains(e.target) && !e.target.closest('.taste-list[data-search] li')) {
      pop.classList.remove('show');
    }
  });
})();

// ===== GUESTBOOK CANVAS (works locally w/o backend) =====
// real backend wiring to Firebase is in firebase-setup.js when keys are added
(function initGuestbook() {
  const canvas = document.getElementById('gb-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function fit() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
  fit();

  let drawing = false, lastX = 0, lastY = 0;
  const color = document.getElementById('gb-color');
  const size = document.getElementById('gb-size');

  function pos(e) {
    const r = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  }
  function start(e) { drawing = true; const p = pos(e); lastX = p.x; lastY = p.y; e.preventDefault(); }
  function move(e) {
    if (!drawing) return;
    const p = pos(e);
    ctx.strokeStyle = color.value;
    ctx.lineWidth = size.value;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastX = p.x; lastY = p.y;
    e.preventDefault();
  }
  function end() { drawing = false; }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  canvas.addEventListener('mouseup', end);
  canvas.addEventListener('mouseleave', end);
  canvas.addEventListener('touchstart', start);
  canvas.addEventListener('touchmove', move);
  canvas.addEventListener('touchend', end);

  document.getElementById('gb-clear').addEventListener('click', () => {
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  const form = document.getElementById('gb-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('gb-name').value.trim() || 'anonymous';
    const text = document.getElementById('gb-text').value.trim();
    const file = document.getElementById('gb-image').files[0];
    const drawing = canvas.toDataURL('image/png');

    // local-only fallback: save to localStorage and render
    let entries = [];
    try { entries = JSON.parse(localStorage.getItem('gb_entries') || '[]'); } catch(_) {}
    const entry = {
      id: Date.now(),
      name, text,
      drawing,
      image: null,
      date: new Date().toISOString()
    };
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        entry.image = reader.result;
        entries.unshift(entry);
        localStorage.setItem('gb_entries', JSON.stringify(entries.slice(0, 50)));
        renderEntries();
        form.reset();
        document.getElementById('gb-clear').click();
      };
      reader.readAsDataURL(file);
    } else {
      entries.unshift(entry);
      localStorage.setItem('gb_entries', JSON.stringify(entries.slice(0, 50)));
      renderEntries();
      form.reset();
      document.getElementById('gb-clear').click();
    }
  });

  function renderEntries() {
    const wrap = document.getElementById('gb-entries');
    let entries = [];
    try { entries = JSON.parse(localStorage.getItem('gb_entries') || '[]'); } catch(_) {}
    if (!entries.length) {
      wrap.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--ink-faint); font-style: italic;">no entries yet. be the first.</p>';
      return;
    }
    wrap.innerHTML = entries.map(e => `
      <div class="gb-entry">
        ${e.drawing ? `<img src="${e.drawing}" alt="drawing">` : ''}
        ${e.image ? `<img src="${e.image}" alt="upload">` : ''}
        ${e.text ? `<div class="text">${escapeHtml(e.text)}</div>` : ''}
        <div class="meta"><span>— ${escapeHtml(e.name)}</span><span>${new Date(e.date).toLocaleDateString()}</span></div>
      </div>
    `).join('');
  }
  function escapeHtml(s) { return s.replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c])); }
  renderEntries();
})();

// ===== CONTACT FORM AJAX =====
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    
    if (status) {
      status.textContent = 'sending...';
      status.style.color = 'var(--ink-faint)';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        if (status) {
          status.textContent = 'message sent! thanks for reaching out.';
          status.style.color = '#c43030'; // Use the accent red
        }
        form.reset();
      } else {
        const errorData = await response.json();
        if (status) {
          status.textContent = errorData.errors ? errorData.errors[0].message : 'something went wrong.';
          status.style.color = 'orange';
        }
      }
    } catch (error) {
      if (status) {
        status.textContent = 'network error. please try again later.';
        status.style.color = 'orange';
      }
    }
  });
})();
