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

/* ============================================
   NEW: ambient music + clickable taste links
   ============================================ */

// ===== TASTE LIST SEARCH ON CLICK =====
(function initTasteSearch() {
  document.querySelectorAll('.taste-list li').forEach(li => {
    const title = li.querySelector('.title')?.textContent?.trim();
    const by    = li.querySelector('.by')?.textContent?.trim();
    if (!title) return;
    const query = encodeURIComponent(`${title} ${by || ''}`.trim());
    const url = `https://duckduckgo.com/?q=${query}`;
    li.style.cursor = 'none';
    li.addEventListener('click', () => window.open(url, '_blank', 'noopener'));
    li.setAttribute('title', `search: ${title}`);
  });
})();

// ===== AMBIENT MUSIC (web audio — gentle generated tones, no external files) =====
(function initAmbient() {
  let audioCtx = null;
  let masterGain = null;
  let nodes = [];
  let playing = false;

  function makeAmbient() {
    if (audioCtx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AC();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(audioCtx.destination);

    // gentle pad: a few detuned sine + triangle oscillators
    // chord: A minor 9 (A2, E3, G3, B3) — wistful, "punpun" mood
    const freqs = [110, 164.81, 196, 246.94, 329.63];
    freqs.forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      osc.type = i % 2 ? 'sine' : 'triangle';
      osc.frequency.value = f;
      osc.detune.value = (Math.random() - 0.5) * 12;

      const g = audioCtx.createGain();
      g.gain.value = 0.0;

      // slow LFO for shimmer
      const lfo = audioCtx.createOscillator();
      lfo.frequency.value = 0.05 + Math.random() * 0.1;
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.value = 0.04;
      lfo.connect(lfoGain).connect(g.gain);
      lfo.start();

      // low-pass for warmth
      const lp = audioCtx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 800 + Math.random() * 400;

      osc.connect(g).connect(lp).connect(masterGain);
      osc.start();

      // initial volume fade-in
      g.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.04, audioCtx.currentTime + 4);
      nodes.push({ osc, g, lfo, lp });
    });

    // subtle noise wash (rain-like)
    const bufSize = 2 * audioCtx.sampleRate;
    const noiseBuf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
    const out = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) out[i] = (Math.random() * 2 - 1) * 0.4;
    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;
    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 350;
    const noiseGain = audioCtx.createGain();
    noiseGain.gain.value = 0.025;
    noise.connect(noiseFilter).connect(noiseGain).connect(masterGain);
    noise.start();
    nodes.push({ noise, noiseGain });
  }

  function toggle() {
    makeAmbient();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const t = audioCtx.currentTime;
    if (playing) {
      masterGain.gain.cancelScheduledValues(t);
      masterGain.gain.linearRampToValueAtTime(0, t + 1.5);
      playing = false;
    } else {
      masterGain.gain.cancelScheduledValues(t);
      masterGain.gain.linearRampToValueAtTime(0.35, t + 2.5);
      playing = true;
    }
    sessionStorage.setItem('ambient', playing ? '1' : '0');
    updateUI();
  }

  function updateUI() {
    const btn = document.querySelector('.music-toggle');
    if (!btn) return;
    btn.classList.toggle('playing', playing);
    btn.querySelector('.label').textContent = playing ? 'playing' : 'play ambient';
  }

  function inject() {
    if (document.querySelector('.music-toggle')) return;
    const btn = document.createElement('button');
    btn.className = 'music-toggle';
    btn.innerHTML = `
      <span class="eq"><span></span><span></span><span></span><span></span></span>
      <span class="label">play ambient</span>
    `;
    btn.addEventListener('click', toggle);
    document.body.appendChild(btn);

    // hover state for custom cursor
    btn.addEventListener('mouseenter', () => {
      document.querySelector('.cursor-dot')?.classList.add('hover');
      document.querySelector('.cursor-ring')?.classList.add('hover');
    });
    btn.addEventListener('mouseleave', () => {
      document.querySelector('.cursor-dot')?.classList.remove('hover');
      document.querySelector('.cursor-ring')?.classList.remove('hover');
    });

    // auto-resume across pages within session
    if (sessionStorage.getItem('ambient') === '1') {
      // need a user gesture; show subtle hint
      btn.querySelector('.label').textContent = 'click to resume';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
