function detect_website_id() {
  let a = document.querySelector("script[data-website-id]");
  return a ? a.getAttribute("data-website-id") : "Unknown";
}
async function checkCountry() {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  return data.country_name;
}
async function track() {
  let a = detect_website_id();
  if (a === "Unknown" || !a || a === "") {
    return;
  }
  var userAgents = navigator.userAgent;
  post({
    country: await checkCountry(),
    userAgents: userAgents,
    id: a,
    path: window.location.href,
  });
}
function post(a) {
  fetch("https://supalytics.vercel.app/api/public-script", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(a),
  }).catch((a) => {
    console.error("Error:", a);
  });
}
(() => {
  "use strict";
  const handleRouteChange = () => {
    track();
  };
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  history.pushState = function (...args) {
    originalPushState.apply(history, args);
    handleRouteChange();
  };
  history.replaceState = function (...args) {
    originalReplaceState.apply(history, args);
    handleRouteChange();
  };
  window.addEventListener("popstate", handleRouteChange);
})();
