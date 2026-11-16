// Offline support for AI IA v0.4. Each path is relative to the app scope (works on GitHub Pages subpaths).
const CACHE_NAME='aiia-offline-v4';
const PRECACHE=['./','./index.html','./styles.css?v=4','./app.js?v=4','./manifest.webmanifest?v=4','./favicon.png','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(PRECACHE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('aiia-offline-')&&key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)))}return response}).catch(async()=>await caches.match(event.request,{ignoreSearch:true})||await caches.match('./index.html')));
});
