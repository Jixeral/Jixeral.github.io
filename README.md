# jixeral.site — v3

a dark, melancholic, punpun-drenched personal site.
plain HTML / CSS / vanilla JS. no build step. hosted on GitHub Pages, served at **jixeral.site**.

---

## 📁 files

```
.
├── index.html        ← home
├── about.html
├── loves.html        ← manga / music / films / games / books — clickable search
├── stack.html        ← coding languages: luau, c#, c++, goals
├── projects.html
├── brand.html        ← jixeral the future clothing brand + print-on-demand options
├── blog.html         ← post list
├── blog/
│   └── welcome.html  ← first post (template for new ones)
├── guestbook.html    ← draw + write + upload (localStorage now, firebase later)
├── contact.html      ← form (needs formspree endpoint) + socials
├── rec-room.html     ← hidden tribute page (linked from Loves > Rec Room)
├── secret.html       ← deeper hidden page
├── 404.html          ← custom 404
├── CNAME             ← jixeral.site
├── css/style.css
├── js/main.js
└── assets/img/       ← all the punpun images
```

---

## 🥚 hidden things

- **konami code** anywhere → secret overlay (↑↑↓↓←→←→ B A)
- **type "punpun"** anywhere → same secret
- **type "dechu"**, "aiko", "jixeral", "lee" → little messages
- **type "sayonara"** → jumps to /secret.html
- **click the logo 5 times fast** → secret
- **click the punpun bird** (bottom-right) → punpun says things
- **click the afro god** (bottom-left, pops up when clicked) → keep clicking, he stays
- **open the browser console** (F12) → friendly hello + cheat sheet
- **/rec-room.html** → hidden tribute page (also reachable from Loves > Rec Room)
- **/secret.html** → quiet inner page

---

## ✏️ editing it

Everything is plain text. Open any `.html` file in VS Code and edit. The site uses no framework — change text directly.

Common tweaks:
- **Add a song to Loves:** open `loves.html`, find the music list, copy a `<li>` and edit.
- **Add a new blog post:** copy `blog/welcome.html` to `blog/your-slug.html`, edit the content, then add a link to it in `blog.html`.
- **Replace Rec Room photos:** upload images to `assets/img/rr/`, then edit `rec-room.html` and swap the `<div class="rr-slot">…</div>` placeholders for `<img src="assets/img/rr/your-file.jpg">`.
- **Change Punpun pictures:** drop new files in `assets/img/` and update the `src=""` in the HTML.

---

## 🔧 wiring up the backend bits

Two things on the site currently work in "demo" mode and need ~5 minutes of setup to go live:

### Contact form (Formspree)
1. Go to <https://formspree.io>, sign up free.
2. Create a new form. They give you an endpoint URL like `https://formspree.io/f/abcd1234`.
3. Open `contact.html`, find `<form class="contact-form" action="" method="POST">`, paste the URL into `action=""`.
4. Save, commit, push. Form now emails you.

### Guestbook (Firebase Firestore)
1. Go to <https://console.firebase.google.com> → create project.
2. Add a "Web app" → copy the config snippet (it has `apiKey`, `projectId`, etc.).
3. Enable **Firestore Database** (start in test mode for now).
4. Enable **Storage** (for image uploads).
5. Tell me and I'll write the Firebase glue code with your config baked in.

---

## 🚀 updating after edits

(You're using GitHub Pages with drag-and-drop)
1. Edit the files locally.
2. Go to your repo on github.com.
3. Drag the changed files into the repo (or use the ✏️ pencil to edit in-browser).
4. Commit. Wait ~60 seconds. Refresh https://jixeral.site.

---

made slowly · ♥ · dechu.
