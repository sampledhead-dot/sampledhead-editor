/* SampledHead Editor v1.14 · service worker */
const V='shed-1.14',LAME='shed-lame',ORT='shed-ort',KEEP=[LAME,ORT,'sh-models-v1'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','index.html','manifest.webmanifest'])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&!KEEP.includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(/lame\.min\.js$/.test(u.pathname)){
    e.respondWith(caches.open(LAME).then(async c=>{const m=await c.match(r.url);if(m)return m;
      try{const n=await fetch(r);if(n&&(n.ok||n.type==='opaque'))c.put(r.url,n.clone());return n;}catch(err){return Response.error();}}));return;}
  if(/onnxruntime-web@/.test(r.url)){
    e.respondWith(caches.open(ORT).then(async c=>{const m=await c.match(r.url);if(m)return m;
      try{const n=await fetch(r);if(n&&n.ok)c.put(r.url,n.clone());return n;}catch(err){return Response.error();}}));return;}
  if(u.origin===location.origin){
    e.respondWith(fetch(r).then(n=>{if(n.ok){const cp=n.clone();caches.open(V).then(c=>c.put(r,cp));}return n;}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));}
});
