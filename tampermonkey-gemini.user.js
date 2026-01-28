// ==UserScript==
// @name         Gemini Image Saver (Local)
// @namespace    https://localhost
// @version      0.1.0
// @description  Send Gemini images to local server for saving
// @match        https://gemini.google.com/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      localhost
// ==/UserScript==

(() => {
  const SAVE_URL = 'http://localhost:3000/save-image';

  const style = `
    .gm-save-btn {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 999999;
      padding: 10px 14px;
      background: #111;
      color: #fff;
      border-radius: 10px;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 6px 18px rgba(0,0,0,0.2);
      user-select: none;
    }
    .gm-save-btn:hover { background: #222; }
  `;

  GM_addStyle(style);

  const btn = document.createElement('div');
  btn.className = 'gm-save-btn';
  btn.textContent = 'Save Gemini Image';
  document.body.appendChild(btn);

  function findCandidateImages() {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.filter((img) => {
      if (!img.src) return false;
      if (img.width < 256 || img.height < 256) return false;
      if (!img.complete) return false;
      return true;
    });
  }

  function pickImage() {
    const imgs = findCandidateImages();
    if (imgs.length === 0) return null;
    return imgs[imgs.length - 1];
  }

  async function fetchAsDataUrl(url) {
    const res = await fetch(url, { mode: 'cors', credentials: 'include' });
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  function sendToLocal(dataUrl) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'POST',
        url: SAVE_URL,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ image: dataUrl }),
        onload: (resp) => resolve(resp.responseText),
        onerror: (err) => reject(err),
      });
    });
  }

  btn.addEventListener('click', async () => {
    try {
      btn.textContent = 'Saving...';
      const img = pickImage();
      if (!img) {
        alert('No suitable image found. Scroll to the generated image and try again.');
        btn.textContent = 'Save Gemini Image';
        return;
      }

      const dataUrl = img.src.startsWith('data:') ? img.src : await fetchAsDataUrl(img.src);
      const resp = await sendToLocal(dataUrl);
      alert(`Saved: ${resp}`);
    } catch (err) {
      alert(`Save failed: ${err}`);
    } finally {
      btn.textContent = 'Save Gemini Image';
    }
  });
})();
