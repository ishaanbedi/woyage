function detect_website_id() {
  let t = document.querySelector("script[data-website-id]");
  return t ? t.getAttribute("data-website-id") : "Unknown";
}
async function checkCountry() {
  const t = await fetch("https://ipapi.co/json/");
  return (await t.json()).country_name;
}
async function track() {
  let t = detect_website_id();
  if ("Unknown" === t || !t || "" === t)
    return void console.error("Website ID not found");
  let e =
    navigator.language ||
    navigator.userLanguage ||
    navigator.browserLanguage ||
    navigator.systemLanguage ||
    "Unknown",
    n = document.referrer || "",
    o = document.title || "Unknown",
    a = window.location.href,
    r = a.split("/")[2];
  a.split("/")[3] && a.split("/")[3];
  var i = navigator.userAgent;
  post({
    country: await checkCountry(),
    userAgents: i,
    id: t,
    path: window.location.pathname + window.location.search,
    language: e,
    referrer: n,
    title: o,
    domain: r,
  });
}
function post(t) {
  fetch("https://supalytics.vercel.app/api/public-script", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t),
  }).catch((t) => {
    console.error("Error:", t);
  });
}
(() => {
  var initialTracked = 0
  const t = () => {
    initialTracked++
    track();
  },
    e = history.pushState,
    n = history.replaceState;
  (history.pushState = function (...n) {
    e.apply(history, n), t();
  }),
    (history.replaceState = function (...e) {
      n.apply(history, e), t();
    }),
    window.addEventListener("popstate", t);
  window.addEventListener("load", () => {
    if (initialTracked === 0) {
      t()
    }
  }
  );
})();
