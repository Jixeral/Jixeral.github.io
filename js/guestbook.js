import { db } from './firebase-setup.js';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

(function initGuestbook() {
  const canvas = document.getElementById('gb-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // State to track if the user actually drew something
  let isDirty = false;

  function fit() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    // Set background to transparent for saving, 
    // but we'll fill it with light grey for the visual UI
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    isDirty = false; 
  }
  fit();
  window.addEventListener('resize', fit);

  let drawing = false, lastX = 0, lastY = 0;
  const color = document.getElementById('gb-color');
  const size = document.getElementById('gb-size');

  function pos(e) {
    const r = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  }

  function start(e) { 
    drawing = true; 
    const p = pos(e); 
    lastX = p.x; 
    lastY = p.y; 
    if(e.cancelable) e.preventDefault(); 
  }

  function move(e) {
    if (!drawing) return;
    const p = pos(e);
    ctx.strokeStyle = color.value;
    ctx.lineWidth = size.value;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastX = p.x; 
    lastY = p.y;
    isDirty = true; // Mark as drawn
    if(e.cancelable) e.preventDefault();
  }

  function end() { drawing = false; }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  canvas.addEventListener('mouseup', end);
  canvas.addEventListener('mouseleave', end);
  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', move, { passive: false });
  canvas.addEventListener('touchend', end);

  document.getElementById('gb-clear').addEventListener('click', () => {
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);
    isDirty = false;
  });

  // --- UI FLOW ---
  const saveBtn = document.getElementById('gb-save-btn');
  const submitBtn = document.getElementById('gb-submit-btn');
  const details = document.getElementById('gb-details');
  const form = document.getElementById('gb-form');

  saveBtn.addEventListener('click', () => {
    details.classList.add('show');
    saveBtn.style.display = 'none';
    submitBtn.style.display = 'block';
  });

  async function saveEntry(entryData) {
    try {
      await addDoc(collection(db, "entries"), {
        ...entryData,
        createdAt: serverTimestamp()
      });
      renderEntries();
      form.reset();
      document.getElementById('gb-clear').click();
      // Reset UI state
      details.classList.remove('show');
      saveBtn.style.display = 'block';
      submitBtn.style.display = 'none';
      isDirty = false;
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Something went wrong while saving your entry.");
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('gb-name').value.trim() || 'anonymous';
    const text = document.getElementById('gb-text').value.trim();
    const fileInput = document.getElementById('gb-image');
    const file = fileInput.files[0];

    // Only save drawing if it's not just a blank white box
    let drawingData = null;
    if (isDirty) {
      drawingData = canvas.toDataURL('image/png', 0.7);
    }

    const entry = {
      name, 
      text,
      drawing: drawingData,
      image: null,
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        entry.image = reader.result;
        await saveEntry(entry);
      };
      reader.readAsDataURL(file);
    } else {
      await saveEntry(entry);
    }
  });

  async function renderEntries() {
    const wrap = document.getElementById('gb-entries');
    if (!wrap) return;

    try {
      const q = query(collection(db, "entries"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        wrap.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--ink-faint); font-style: italic;">no entries yet. be the first.</p>';
        return;
      }

      wrap.innerHTML = querySnapshot.docs.map(doc => {
        const e = doc.data();
        return `
          <div class="gb-entry">
            ${e.drawing ? `<img src="${e.drawing}" alt="drawing">` : ''}
            ${e.image ? `<img src="${e.image}" alt="upload">` : ''}
            ${e.text ? `<div class="text">${escapeHtml(e.text)}</div>` : ''}
            <div class="meta"><span>— ${escapeHtml(e.name)}</span><span>${e.createdAt ? new Date(e.createdAt.toDate()).toLocaleDateString() : 'just now'}</span></div>
          </div>
        `;
      }).join('');
    } catch (e) {
      console.error("Error fetching entries: ", e);
      wrap.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--ink-faint);">Error loading entries. Please check database rules.</p>';
    }
  }

  function escapeHtml(s) { 
    return s.replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c])); 
  }

  renderEntries();
})();
