
const CACHE = "wellbeing-complete-v1";
const ASSETS = [
  "./","./index.html","./css/style.css","./js/app.js","./js/pwa.js","./js/admin.js",
  "./data.json","./manifest.json","./offline.html",
  "./admin.html","./icons/icon-192.png","./icons/icon-256.png","./icons/icon-384.png","./icons/icon-512.png"
];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const req = e.request;
  e.respondWith((async () => {
    try {
      const net = await fetch(req);
      const c = await caches.open(CACHE); c.put(req, net.clone());
      return net;
    } catch {
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === "navigate") return (await caches.match("./offline.html")) || new Response("Offline",{status:503});
      return new Response("Offline",{status:503});
    }
  })());
});
