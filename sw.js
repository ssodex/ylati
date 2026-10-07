// Změň VERSION při vydání nové verze aplikace.
const VERSION = "v3";
const PREFIX = "italiano-" + self.registration.scope;
const CACHE = PREFIX + VERSION;
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./core.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith(PREFIX) && k !== CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (
    url.origin !== self.location.origin ||
    !url.href.startsWith(self.registration.scope)
  )
    return;
  // Aplikační shell z jedné verze. Aktualizace se aktivuje po uzavření starých klientů.
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      if (event.request.mode === "navigate") {
        return (await cache.match("./index.html")) || fetch(event.request);
      }
      return (await cache.match(event.request)) || fetch(event.request);
    }),
  );
});
