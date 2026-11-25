# Rafael Barçante — Game Design Portfolio

Static site: plain HTML + CSS + JS. No build step, works on any host (GitHub Pages, Hostinger, Cloudflare…).

## Preview
Double-click `index.html`.
(YouTube embeds can show an error when a page is opened by double-click; they work once the site is hosted.)

## Folder map
```
index.html              front page
css/                    styles.css (site) · project.css (project pages)
js/projects.js          card data — edit this to add/change cards
js/main.js              front page logic
js/project.js           project page logic (placeholders, YouTube, gallery)
js/unlock.js            password unlock for locked pages
projects/               FINISHED project pages (published)
private-src/            project CONTENT files (NOT published, see .gitignore)
tools/encrypt.html      builds a finished page from a content file (open or locked)
assets/                 images, gifs, video, photo, cv
```

## Add your media
Every empty slot shows a dashed box with the exact file name it expects. Save your file with that name and refresh.

| What | Where | Size |
|---|---|---|
| Your photo | `assets/photo/rafael.jpg` | 600×600 |
| Card cover | `assets/images/project-N-cover.jpg` | 1280×548 (21:9) |
| Card hover GIF (optional) | `assets/gifs/project-N-hover.gif` | 640×360, under ~3 MB |
| Project banner | `assets/images/project-N-banner.jpg` | 1920×720 |
| Diagrams | `assets/images/project-N-diagram.png` | ~1600 wide |
| Screenshots | `assets/images/project-N-shot-1.jpg` … | ~540×1170 (portrait) |
| CV | `assets/cv/Rafael-Barcante-CV.pdf` | — |
| Link preview image | `assets/images/og-share.jpg` | 1200×630 |

Use `.jpg`/`.webp` under ~300 KB. YouTube: put the 11-character video ID in `data-youtube="…"` in the content file.

## Create / edit a project page
1. Copy `private-src/_content-template.html` to `private-src/project-3.content.html` and edit text + image names.
2. Open `tools/encrypt.html` in your browser. Pick the content file, choose **open** or **locked** (set a password).
   - Locked: also select the images used by that page, so they are encrypted inside the page (otherwise they stay public files).
3. It downloads `project-3.html`. Move it into `projects/`.
4. In `js/projects.js` set `detailReady: true` (and `locked: true` for the card's lock badge).

To change a page later: edit its content file and rebuild. Same password again, or a new one.

The eight project pages (`buraco-jogatina`, `fashion-match`, `lets-zeppelin`, `satellite-rush`, `yatzy-party`, `bushido-saga`, `unreleased-cozy-multiplayer`, `unreleased-roguelike`) are all open (no password) and are built from the matching files in `private-src/` (the two Fortis Games pages play their videos from `assets/video/<project>/gameplay.mp4`).
(`project-1` / `project-2` were demo pages from the first build — safe to delete: `projects/project-1.html`, `projects/project-2.html`, `private-src/project-1.content.html`, `private-src/project-2.content.html`.)

Animated clips are short looping `.mp4` files (in `assets/video/<project>/`) instead of GIFs: ~10× lighter. In a content file use:
`<video src="../assets/video/<project>/clip.mp4" data-loop autoplay loop muted playsinline preload="metadata"></video>`
To convert a GIF: `ffmpeg -i in.gif -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p" -c:v libx264 -crf 23 -an out.mp4`

## How the optional lock works (and its limits)
(No page is locked right now. The tool still supports it: choose **locked** in `tools/encrypt.html` and set `locked: true` on the card.)
- Locked pages are AES-256-GCM encrypted in the browser, key derived from the password with PBKDF2 (600k rounds). The published file contains only scrambled data.
- Anyone with the password can open it and share it. To revoke, rebuild with a new password and republish.
- Use a long passphrase; short passwords can be guessed offline.
- Keep `private-src/` out of GitHub (it is in `.gitignore`) and back it up somewhere private (cloud drive).
- Not for strict NDA material. For that, use server-side protection (e.g. Cloudflare Access).

## TODO placeholders
Search for `TODO` in `index.html` (email, LinkedIn, About text, CV).

## Publish (later)
GitHub Pages: push this folder to a repo, then Settings → Pages → deploy from `main` / root.
