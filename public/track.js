function dwid() {
  let t = document.querySelector("script[data-website-id]");
  return t ? t.getAttribute("data-website-id") : "Unknown";
}
async function cc() {
  const t = await fetch("https://ipapi.co/json/");
  return (await t.json()).country_name;
}
async function track() {
  let t = dwid();
  if ("Unknown" === t || !t || "" === t)
    return void console.error("Website ID not found");
  let e =
      navigator.language ||
      navigator.userLanguage ||
      navigator.browserLanguage ||
      navigator.systemLanguage ||
      "Unknown",
    n = document.referrer || "",
    a = document.title || "Unknown",
    o = window.location.href,
    r = o.split("/")[2];
  o.split("/")[3] && o.split("/")[3];
  var i = navigator.userAgent;
  post({
    country: await cc(),
    userAgents: i,
    id: t,
    path: window.location.pathname + window.location.search,
    language: e,
    referrer: n,
    title: a,
    domain: r,
  });
}
function post(t) {
  fetch("https://woyage.vercel.app/api/public-script", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t),
  }).catch((t) => {
    console.error("Error:", t);
  });
}
(() => {
  var t = 0;
  const e = () => {
      t++, track();
    },
    n = history.pushState,
    a = history.replaceState;
  (history.pushState = function (...t) {
    n.apply(history, t), e();
  }),
    (history.replaceState = function (...t) {
      a.apply(history, t), e();
    }),
    window.addEventListener("popstate", e),
    window.addEventListener("load", () => {
      0 === t && e();
    });
})();
