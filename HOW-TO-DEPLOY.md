# 🚀 How to put your site on the internet (with GitHub Pages)

GitHub Pages = **free hosting** for your website. No credit card, no server stuff.
This guide assumes zero experience. Read it top to bottom, do each step.

You have two paths. **Pick one.**

- **PATH A — The easy way (drag & drop in the browser).** No installs. ~10 minutes.
- **PATH B — The "proper" way (Git on your computer).** You'll learn a real skill. ~25 minutes.

I recommend doing **PATH A** first to feel the dopamine of seeing your site live, then learning Path B later when you want to update it from your computer.

---

## 🪪 STEP 0 — Make a GitHub account (everyone does this)

1. Go to **<https://github.com>**
2. Click **Sign up** (top right).
3. Pick a username carefully — **this becomes part of your website's URL.**
   - Good: `aiko`, `nathan-w`, `punpunfan`
   - Avoid: anything with numbers/underscores you'll regret. Lowercase is nicest.
4. Verify your email when GitHub asks.

You're in. ✨

---

# 🛣️ PATH A — The easy way (drag & drop)

### 1. Create a new repository

A "repository" (repo) is just a folder GitHub hosts for you.

1. Top-right corner → click **+** → **New repository**.
2. **Repository name:** type `yourusername.github.io`
   - ⚠️ Use **your actual GitHub username** in lowercase. Example: if your username is `aiko`, name the repo `aiko.github.io`.
   - This exact naming is the magic that makes GitHub auto-host it at `https://aiko.github.io`.
3. **Public** ✅ (must be public for free hosting)
4. ✅ check **"Add a README file"** (just so the repo isn't empty)
5. Click **Create repository**.

### 2. Upload your site files

1. Inside your new repo, click **Add file** → **Upload files**.
2. Open your `site/` folder on your computer.
3. **Select everything inside it** (index.html, about.html, css folder, js folder, etc.) and **drag them all into the GitHub upload area.**
   - ⚠️ Drag the **contents** of `site/`, not the `site/` folder itself. The `index.html` must be at the top level of the repo.
4. Scroll down → in the commit message box type something like `add my site`.
5. Click **Commit changes**.

### 3. Turn on GitHub Pages

1. In your repo, click **Settings** (top tab).
2. Left sidebar → **Pages**.
3. Under "Build and deployment" → **Source** → choose **Deploy from a branch**.
4. **Branch:** select `main`, folder `/ (root)`, click **Save**.
5. Wait ~1–2 minutes.

### 4. Visit your site 🎉

Go to: **`https://yourusername.github.io`**

(replace `yourusername` with your actual GitHub username)

If it doesn't load right away, wait another minute and refresh. First deploy can be slow.

### 5. To update the site later (easy way)

1. Open your repo on github.com
2. Click any file → ✏️ pencil icon → edit → **Commit changes**
3. To upload new files: **Add file → Upload files** again.

Your site updates in ~1 minute.

---

# 🛣️ PATH B — The proper way (using Git on your computer)

This is how real developers do it. Once you set it up, updating your site is just typing three commands. **Strongly recommended** once you're comfortable.

### 1. Install Git

- **Windows:** download from <https://git-scm.com/download/win> → install with all default options.
- **Mac:** open the Terminal app and type `git --version`. It'll offer to install. Done.
- **Linux:** `sudo apt install git` (or your distro's equivalent).

To check: open a terminal and run:
```bash
git --version
```
You should see something like `git version 2.x.x`.

### 2. Tell Git who you are

In the terminal, type these two commands (use your real name + GitHub email):
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 3. Make the repository on GitHub

Same as Path A → Step 1, EXCEPT:
- **Don't** check "Add a README file" this time. We want an empty repo.

### 4. Push your site

Open your terminal and `cd` into your `site/` folder. For example:

```bash
cd Desktop/site
```

Then run these commands one at a time:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

⚠️ Replace **both** `yourusername` in the `remote add` line with your actual GitHub username.

The first `git push` will ask you to log in. On modern GitHub you'll need a **Personal Access Token** instead of a password:
1. Go to <https://github.com/settings/tokens> → **Generate new token (classic)**.
2. Give it a name, check **repo**, click generate.
3. Copy the token. Paste it when Git asks for your password.

### 5. Enable Pages

Same as Path A → Step 3.

### 6. Updating later (this is the magic)

After you make changes in any file in your `site/` folder, open the terminal there and run:

```bash
git add .
git commit -m "what i changed"
git push
```

That's it. Site updates in ~1 minute. Welcome to being a developer.

---

## ❓ Common problems

| Problem | Fix |
|---|---|
| `404 - page not found` after deploy | Wait 2 more minutes. Also check `index.html` is at the **root** of the repo, not inside a `site/` folder. |
| Fonts look wrong / no styling | The CSS file is missing or in the wrong folder. Make sure `css/style.css` and `js/main.js` exist at the right paths. |
| Repo name doesn't work | It must be **exactly** `yourusername.github.io` — same as your GitHub username. |
| Site loads but doesn't update | Hard refresh: `Ctrl+Shift+R` (Win) or `Cmd+Shift+R` (Mac). Browser was caching. |
| Used a different repo name | That's fine — site will be at `https://yourusername.github.io/repo-name/` instead of just `yourusername.github.io`. |

---

## 🎨 Quick edits you'll probably want to make first

Open these files in any text editor (download **[VS Code](https://code.visualstudio.com/)** if you don't have one — it's free and the best):

1. **`index.html`** — change `your name` to your actual name, edit the tagline.
2. **`about.html`** — write your real bio in the section under "a short bio".
3. **`loves.html`** — replace the manga / music / films with your own list.
4. **`projects.html`** — list your own projects, even small ones count.
5. **`contact.html`** — put your real email and social handles.
6. **`stack.html`** — change the skill names and `--w: 70%;` numbers to match your real progress.
7. **Logo (top left):** change `y.n` in every HTML file's `<a href="index.html" class="logo">` to your initials.

---

## 🎁 Hidden things in your site (don't forget!)

- **Konami code** anywhere: `↑ ↑ ↓ ↓ ← → ← → B A` → secret message
- **Click the punpun bird** in the bottom-right
- **Open browser console** (`F12`) → there's a hello message

---

## You're done. Go look at your site. ♥
