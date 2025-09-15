
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('./service-worker.js');
      reg.addEventListener('updatefound', () => {
        const sw = reg.installing;
        sw?.addEventListener('statechange', () => {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            const bar = document.createElement('div');
            bar.style.position = 'fixed'; bar.style.bottom = '12px'; bar.style.left = '50%';
            bar.style.transform = 'translateX(-50%)'; bar.style.background = '#222'; bar.style.color = '#fff';
            bar.style.padding = '8px 12px'; bar.style.borderRadius = '999px'; bar.style.zIndex = '9999';
            bar.textContent = 'Update available — tap to refresh';
            bar.onclick = () => window.location.reload();
            document.body.appendChild(bar);
          }
        });
      });
    } catch (e) { console.warn('SW registration failed', e); }
  });
}
