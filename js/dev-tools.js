/**
 * JIXERAL — SYSTEM ARCHITECT (OP MENU)
 * a visual builder for a static site.
 * generate code, test styles, and manage components.
 */

(function initDevTools() {
  const PASSWORD = 'Madmick2029';
  let buffer = '';

  // ===== TRIGGER =====
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    buffer += e.key.toLowerCase();
    if (buffer.length > 10) buffer = buffer.slice(-10);
    if (buffer.endsWith('op')) {
      showAuthModal();
      buffer = '';
    }
  });

  function showAuthModal() {
    const modal = document.createElement('div');
    modal.className = 'op-auth-modal';
    modal.innerHTML = `
      <div class="op-auth-content">
        <h2>system <span class="accent">access</span></h2>
        <p>enter administrator password to unlock architect mode.</p>
        <input type="password" id="op-pass" placeholder="password..." autofocus>
        <div class="op-auth-btns">
          <button id="op-cancel">abort</button>
          <button id="op-login">unlock</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const input = modal.querySelector('#op-pass');
    const loginBtn = modal.querySelector('#op-login');
    const cancelBtn = modal.querySelector('#op-cancel');

    const attempt = () => {
      if (input.value === PASSWORD) {
        modal.remove();
        initOpPanel();
      } else {
        input.style.borderColor = 'var(--accent)';
        input.placeholder = 'incorrect password';
        input.value = '';
      }
    };

    loginBtn.onclick = attempt;
    cancelBtn.onclick = () => modal.remove();
    input.onkeydown = (e) => { if (e.key === 'Enter') attempt(); };
  }

  function initOpPanel() {
    if (document.querySelector('.op-panel')) return;

    const panel = document.createElement('div');
    panel.className = 'op-panel';
    panel.innerHTML = `
      <div class="op-header">
        <h3>system <span class="accent">architect</span></h3>
        <button id="op-close">×</button>
      </div>
      
      <div class="op-tabs">
        <button class="op-tab active" data-tab="comp">components</button>
        <button class="op-tab" data-tab="style">styles</button>
        <button class="op-tab" data-tab="util">utils</button>
      </div>

      <div class="op-content">
        <!-- COMPONENTS TAB -->
        <div class="op-tab-pane active" id="tab-comp">
          <div class="op-section">
            <span class="op-label">build a component</span>
            <select id="op-comp-type">
              <option value="manga">manga panel</option>
              <option value="taste">taste list item</option>
              <option value="grid">grid card</option>
              <option value="text">minimal text block</option>
            </select>
            
            <input type="text" id="op-comp-title" placeholder="title / name">
            <textarea id="op-comp-desc" placeholder="description / text"></textarea>
            <input type="text" id="op-comp-link" placeholder="url (optional)">
            
            <div class="op-btn-group">
              <button id="op-preview">preview on page</button>
              <button id="op-copy">copy html code</button>
            </div>
          </div>
          
          <div class="op-section">
            <span class="op-label">image helper</span>
            <input type="text" id="op-img-url" placeholder="image url...">
            <select id="op-img-class">
              <option value="floater small">floater small</option>
              <option value="floater med">floater med</option>
              <option value="floater lg">floater lg</option>
              <option value="hero-side">hero side</option>
            </select>
            <button id="op-gen-img">generate tag</button>
            <div id="op-img-result" class="op-code-result"></div>
          </div>
        </div>

        <!-- STYLES TAB -->
        <div class="op-tab-pane" id="tab-style">
          <div class="op-section">
            <span class="op-label">theme colors</span>
            <div class="op-row">
              <label>accent</label>
              <input type="color" id="op-color-accent" value="#c43030">
            </div>
            <div class="op-row">
              <label>bg</label>
              <input type="color" id="op-color-bg" value="#0a0a0a">
            </div>
          </div>
          <div class="op-section">
            <span class="op-label">typography</span>
            <input type="text" id="op-font-serif" placeholder="google font serif (e.g. Playfair Display)">
            <button id="op-apply-font">test font</button>
          </div>
        </div>

        <!-- UTILS TAB -->
        <div class="op-tab-pane" id="tab-util">
          <div class="op-section">
            <span class="op-label">site tools</span>
            <button id="op-ghost">toggle ghost cursor</button>
            <button id="op-contrast">contrast boost</button>
            <button id="op-inspect">highlight reveals</button>
            <button id="op-clear-db">clear guestbook (requires rules)</button>
          </div>
          <div class="op-section">
            <span class="op-label">system info</span>
            <div id="op-sys-info" class="op-info-box">
              loading...
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    // --- TAB LOGIC ---
    const tabs = panel.querySelectorAll('.op-tab');
    const panes = panel.querySelectorAll('.op-tab-pane');
    tabs.forEach(tab => {
      tab.onclick = () => {
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        panel.querySelector('#tab-' + tab.dataset.tab).classList.add('active');
      };
    });

    // --- COMPONENT GENERATOR ---
    const generateHTML = () => {
      const type = document.getElementById('op-comp-type').value;
      const title = document.getElementById('op-comp-title').value || 'Untitled';
      const desc = document.getElementById('op-comp-desc').value || '...';
      const link = document.getElementById('op-comp-link').value;
      const linkAttr = link ? \` href="\${link}"\` : '';

      switch(type) {
        case 'manga':
          return \`<div class="manga-panel">
  <div class="corner-tr"></div><div class="corner-bl"></div>
  <h3\${linkAttr}>\${title}</h3>
  <p>\${desc}</p>
</div>\`;
        case 'taste':
          return \`<li class="taste-item" \${link ? \`data-href="\${link}"\` : ''}>
  <span class="title">\${title}</span>
  <span class="by">\${desc}</span>
</li>\`;
        case 'grid':
          return \`<div class="card">
  <div class="meta">\${desc}</div>
  <h3>\${title}</h3>
  <a href="\${link || '#'}" class="accent">read more →</a>
</div>\`;
        case 'text':
          return \`<p class="reveal"><strong>\${title}:</strong> \${desc}</p>\`;
        default: return '';
      }
    };

    document.getElementById('op-preview').onclick = () => {
      const html = generateHTML();
      const div = document.createElement('div');
      div.innerHTML = html;
      const el = div.firstElementChild;
      el.style.border = '2px dashed var(--accent)';
      el.style.position = 'relative';
      el.title = 'PREVIEW MODE: Copy code to save permanently';
      document.querySelector('main').appendChild(el);
    };

    document.getElementById('op-copy').onclick = () => {
      const html = generateHTML();
      navigator.clipboard.writeText(html);
      const btn = document.getElementById('op-copy');
      btn.textContent = 'copied!';
      setTimeout(() => btn.textContent = 'copy html code', 2000);
    };

    // Image Generator
    document.getElementById('op-gen-img').onclick = () => {
      const url = document.getElementById('op-img-url').value;
      const cls = document.getElementById('op-img-class').value;
      if(!url) return;
      const tag = \`<img src="\${url}" class="\${cls}" alt="decoration">\`;
      document.getElementById('op-img-result').textContent = tag;
      navigator.clipboard.writeText(tag);
    };

    // Style Logic
    document.getElementById('op-color-accent').oninput = (e) => {
      document.documentElement.style.setProperty('--accent', e.target.value);
    };
    document.getElementById('op-color-bg').oninput = (e) => {
      document.documentElement.style.setProperty('--bg', e.target.value);
    };
    document.getElementById('op-apply-font').onclick = () => {
      const font = document.getElementById('op-font-serif').value;
      if(!font) return;
      const link = document.createElement('link');
      link.href = \`https://fonts.googleapis.com/css2?family=\${font.replace(' ', '+')}:wght@300;400;700&display=swap\`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      document.documentElement.style.setProperty('--serif', \`'\${font}', serif\`);
    };

    // Utils
    document.getElementById('op-ghost').onclick = () => {
      const dot = document.querySelector('.cursor-dot');
      const ring = document.querySelector('.cursor-ring');
      if(dot) dot.style.display = dot.style.display === 'none' ? 'block' : 'none';
      if(ring) ring.style.display = ring.style.display === 'none' ? 'block' : 'none';
    };
    document.getElementById('op-contrast').onclick = () => {
      document.body.style.filter = document.body.style.filter === 'contrast(1.5)' ? '' : 'contrast(1.5)';
    };
    document.getElementById('op-inspect').onclick = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        el.style.outline = '1px solid var(--accent)';
        el.style.backgroundColor = 'rgba(196,48,48,0.1)';
      });
    };

    document.getElementById('op-close').onclick = () => panel.remove();

    // Sys Info
    const info = document.getElementById('op-sys-info');
    info.innerHTML = \`
      URL: \${location.hostname}<br>
      Pages: \${document.querySelectorAll('nav ul a').length}<br>
      Time: \${new Date().toLocaleTimeString()}<br>
      Mode: ARCHITECT
    \`;
  }
})();
