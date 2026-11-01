const C='sigmind-v17';const CORE=['./','./index.html','./manifest.webmanifest','./sigmind-icon.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);
if(u.hostname.endsWith('supabase.co'))return; // never cache account/sync data
if(q.mode==='navigate'){e.respondWith(fetch(q).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put('./index.html',cp));return res;}).catch(()=>caches.match('./index.html')));return;}
e.respondWith(caches.match(q).then(r=>r||fetch(q).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(q,cp)).catch(()=>{});return res;})));});
