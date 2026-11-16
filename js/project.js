/* Shared logic for project pages (open pages call it on load; locked pages call it after unlocking). */

function makePlaceholder(label, size) {
  const el = document.createElement("div");
  el.className = "ph";
  el.innerHTML = '<span class="ph__icon" aria-hidden="true">＋</span><span class="ph__file"></span><span class="ph__size"></span>';
  el.querySelector(".ph__file").textContent = label;
  el.querySelector(".ph__size").textContent = size || "";
  el.setAttribute("role", "img");
  el.setAttribute("aria-label", "Media placeholder: " + label);
  return el;
}

function initProject(root) {
  root = root || document;

  // Images: if the file is missing, show a labeled placeholder
  root.querySelectorAll("img[data-size]").forEach(img => {
    const swap = () => {
      const ph = makePlaceholder(img.getAttribute("src") || "image", img.dataset.size);
      img.replaceWith(ph);
    };
    if (img.complete && img.naturalWidth === 0) swap();
    else img.addEventListener("error", swap, { once: true });
  });

  // Looping clips (GIF replacements): play only while on screen
  const vids = [...root.querySelectorAll("video[data-loop]")];
  if (vids.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) en.target.play().catch(() => {}); else en.target.pause();
    }), { threshold: 0.25 });
    vids.forEach(v => io.observe(v));
  } else {
    vids.forEach(v => v.play && v.play().catch(() => {}));
  }

  // YouTube slots: <div class="video-slot" data-youtube="VIDEO_ID">
  root.querySelectorAll(".video-slot[data-youtube]").forEach(slot => {
    const id = (slot.dataset.youtube || "").trim();
    slot.textContent = "";
    if (/^[\w-]{11}$/.test(id) && id !== "YOUTUBE_ID") {
      if (location.protocol === "file:") {
        // YouTube refuses embeds opened from a local file (error 153): show a link card instead.
        // On GitHub Pages (https) the real embed below is used.
        const a = document.createElement("a");
        a.className = "yt-fallback";
        a.href = "https://www.youtube.com/watch?v=" + id;
        a.target = "_blank"; a.rel = "noopener";
        a.innerHTML = '<img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="Project video thumbnail">' +
          '<span class="yt-fallback__play" aria-hidden="true">▶</span>' +
          '<span class="yt-fallback__note">Local preview: opens on YouTube. Plays embedded once the site is online.</span>';
        slot.appendChild(a);
        return;
      }
      const f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id;
      f.title = "Project video";
      f.loading = "lazy";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      f.referrerPolicy = "strict-origin-when-cross-origin";
      f.allowFullscreen = true;
      slot.appendChild(f);
    } else {
      slot.appendChild(makePlaceholder("YouTube video", "set data-youtube=\"VIDEO_ID\" (the 11 characters after v=)"));
    }
  });
}

/* ---------- Lightbox for gallery images (delegated, set up once) ---------- */
(function () {
  let box, imgEl, list = [], idx = 0;

  function build() {
    box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML =
      '<button class="lb-close" aria-label="Close">✕</button>' +
      '<button class="lb-prev" aria-label="Previous">‹</button>' +
      '<img alt="">' +
      '<button class="lb-next" aria-label="Next">›</button>';
    imgEl = box.querySelector("img");
    document.body.appendChild(box);
    box.addEventListener("click", e => { if (e.target === box || e.target.classList.contains("lb-close")) close(); });
    box.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
    box.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
  }
  function show(i) {
    idx = (i + list.length) % list.length;
    imgEl.src = list[idx].currentSrc || list[idx].src;
    imgEl.alt = list[idx].alt || "";
  }
  function close() { box.classList.remove("is-on"); }

  document.addEventListener("click", e => {
    const img = e.target.closest && e.target.closest(".gallery img, .shots-row img, .proj-grid img, .proj-figure img");
    if (!img) return;
    if (!box) build();
    const group = img.closest(".gallery, .shots-row, .proj-grid") || img.closest(".proj-figure");
    list = [...group.querySelectorAll("img")];
    show(list.indexOf(img));
    const multi = list.length > 1;
    box.querySelector(".lb-prev").hidden = !multi;
    box.querySelector(".lb-next").hidden = !multi;
    box.classList.add("is-on");
  });
  document.addEventListener("keydown", e => {
    if (!box || !box.classList.contains("is-on")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
  // Locked pages call initProject() themselves after decrypting.
  if (!document.getElementById("payload")) initProject(document);
});
