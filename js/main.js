/* Portfolio front page logic: renders cards from js/projects.js, filters, placeholders. */

/* ---------- Media placeholder (shown until the real file exists) ---------- */
function makePlaceholder(path, size, variant) {
  const el = document.createElement("div");
  el.className = "ph" + (variant ? " ph--" + variant : "");
  el.innerHTML =
    '<span class="ph__icon" aria-hidden="true">＋</span>' +
    '<span class="ph__file"></span>' +
    '<span class="ph__size"></span>';
  el.querySelector(".ph__file").textContent = path;
  el.querySelector(".ph__size").textContent = size;
  el.setAttribute("role", "img");
  el.setAttribute("aria-label", "Media placeholder: " + path);
  return el;
}
window.makePlaceholder = makePlaceholder;

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-on"), 2600);
}

/* ---------- Cards ---------- */
function buildCard(p) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.tags = p.tags.join("|");

  // Cover
  const media = document.createElement("div");
  media.className = "card__media";

  const img = document.createElement("img");
  img.className = "card__img";
  img.src = p.cover;
  img.alt = p.title + " — cover";
  img.loading = "lazy";
  img.addEventListener("error", () => img.replaceWith(makePlaceholder(p.cover, "1280×548")));
  media.appendChild(img);

  if (p.banner) {
    // Looping, muted, autoplaying clip that replaces the still cover (the still stays as fallback)
    const vid = document.createElement("video");
    vid.className = "card__video";
    vid.src = p.banner;
    vid.poster = p.cover;
    vid.muted = true; vid.loop = true; vid.playsInline = true;
    vid.setAttribute("aria-hidden", "true");
    vid.preload = "metadata";
    vid.addEventListener("error", () => vid.remove());
    media.appendChild(vid);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!calm && "IntersectionObserver" in window) {
      new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? vid.play().catch(() => {}) : vid.pause()), { threshold: 0.25 }).observe(vid);
    }
  }

  if (p.coverHover) {
    const gif = document.createElement("img");
    gif.className = "card__gif";
    gif.alt = "";
    gif.setAttribute("aria-hidden", "true");
    gif.addEventListener("error", () => gif.remove()); // no GIF yet: just skip it
    // Only load the GIF on first hover to keep the page light
    card.addEventListener("pointerenter", () => { if (!gif.src) gif.src = p.coverHover; }, { once: true });
    media.appendChild(gif);
  }

  if (p.locked) {
    const badge = document.createElement("span");
    badge.className = "lock-badge";
    badge.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg> Password protected';
    media.appendChild(badge);
  }

  // Body
  const bullets = p.bullets
    .map(b => `<li><strong>${b.label}${b.text ? ":" : ""}</strong>${b.text ? " " + b.text : ""}</li>`).join("");
  const tags = p.tags.map(t => `<span class="chip">${t}</span>`).join("");

  const body = document.createElement("div");
  body.className = "card__body";
  body.innerHTML = `
    <h3 class="card__title">${p.title}</h3>
    <p class="card__meta">${[p.studio, p.platform].filter(Boolean).join(" · ")}</p>
    ${p.metric ? `<div class="card__results">
      <p class="card__results-title">Key Results</p>
      <div class="card__metrics">${[].concat(p.metric).map(x => `<p class="card__metric">${x}</p>`).join("")}</div>
    </div>` : ""}
    <ul class="card__bullets">${bullets}</ul>
    <div class="card__foot">
      <div class="card__tags">${tags}</div>
      <a class="btn btn--pill" href="projects/${p.id}.html" data-id="${p.id}">
        <span class="btn__arrow">→</span> See details
      </a>
    </div>`;

  const link = body.querySelector("a");
  link.addEventListener("click", e => {
    if (!p.detailReady) {
      e.preventDefault();
      toast("Detail page for “" + p.title + "” isn't built yet — next phase.");
    }
  });

  card.append(media, body);
  return card;
}

/* ---------- Filters ---------- */
function setupFilters(projects) {
  const wrap = document.getElementById("filters");
  const tags = [...new Set(projects.flatMap(p => p.tags))];
  const all = ["All", ...tags];

  all.forEach((tag, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "filter" + (i === 0 ? " is-active" : "");
    b.textContent = tag;
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", () => {
      wrap.querySelectorAll(".filter").forEach(x => {
        x.classList.remove("is-active");
        x.setAttribute("aria-pressed", "false");
      });
      b.classList.add("is-active");
      b.setAttribute("aria-pressed", "true");
      applyFilter(tag);
    });
    wrap.appendChild(b);
  });
}

function applyFilter(tag) {
  let shown = 0;
  document.querySelectorAll(".card").forEach(c => {
    const match = tag === "All" || c.dataset.tags.split("|").includes(tag);
    c.hidden = !match;
    if (match) shown++;
  });
  document.getElementById("empty").hidden = shown !== 0;
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("project-grid");
  window.PROJECTS.forEach(p => grid.appendChild(buildCard(p)));
  setupFilters(window.PROJECTS);

  // Hero photo fallback
  const photo = document.getElementById("hero-photo");
  const swap = () => photo.replaceWith(makePlaceholder("assets/photo/rafael.jpg", "600×600", "round"));
  if (photo.complete && photo.naturalWidth === 0) swap();
  else photo.addEventListener("error", swap);
  document.getElementById("year").textContent = new Date().getFullYear();
});
