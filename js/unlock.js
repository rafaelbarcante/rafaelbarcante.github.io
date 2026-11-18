/* Unlocks an encrypted project page.
   Format: PBKDF2-SHA256 → AES-256-GCM (Web Crypto). Everything happens in the visitor's browser. */
(function () {
  const payload = JSON.parse(document.getElementById("payload").textContent);
  const lock = document.getElementById("lock");
  const form = document.getElementById("lock-form");
  const input = document.getElementById("lock-pw");
  const error = document.getElementById("lock-error");
  const content = document.getElementById("content");
  const KEY = "pf-unlock:" + location.pathname;

  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));

  async function decrypt(password) {
    const km = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: b64(payload.salt), iterations: payload.iter, hash: "SHA-256" },
      km, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const buf = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(payload.iv) }, key, b64(payload.data));
    return new TextDecoder().decode(buf);
  }

  // Lets the page decrypt protected media files (format: salt16 | iv12 | AES-GCM ciphertext) with the same password
  function exposeFileDecryptor(password) {
    window.pfDecryptFile = async buf => {
      const u = new Uint8Array(buf);
      const km = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
      const key = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: u.slice(0, 16), iterations: payload.iter, hash: "SHA-256" },
        km, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
      return crypto.subtle.decrypt({ name: "AES-GCM", iv: u.slice(16, 28) }, key, u.slice(28));
    };
  }

  async function attempt(password, remember) {
    error.hidden = true;
    lock.classList.add("is-busy");
    try {
      const html = await decrypt(password);
      exposeFileDecryptor(password);
      content.innerHTML = html;
      content.hidden = false;
      lock.hidden = true;
      const h1 = content.querySelector("h1");
      if (h1) document.title = h1.textContent + " — Rafael Barçante";
      if (remember) { try { sessionStorage.setItem(KEY, password); } catch (e) {} }
      window.initProject(content);
      window.scrollTo(0, 0);
      return true;
    } catch (e) {
      return false;
    } finally {
      lock.classList.remove("is-busy");
    }
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!window.crypto || !crypto.subtle) {
      error.textContent = "Your browser can't unlock this page (needs a secure https connection).";
      error.hidden = false;
      return;
    }
    const ok = await attempt(input.value, true);
    if (!ok) {
      error.textContent = "Incorrect password. Please try again.";
      error.hidden = false;
      input.select();
    }
  });

  // Skip the prompt on reload within the same browser session
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const saved = sessionStorage.getItem(KEY);
      if (saved && crypto.subtle && !(await attempt(saved, false))) sessionStorage.removeItem(KEY);
    } catch (e) {}
    if (!lock.hidden) input.focus();
  });
})();
