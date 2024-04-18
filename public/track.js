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
    console.error("Website ID not found");
    return;
  }
  let language =
    navigator.language ||
    navigator.userLanguage ||
    navigator.browserLanguage ||
    navigator.systemLanguage ||
    "Unknown";
  let referrer = document.referrer || "";
  let title = document.title || "Unknown";
  let url = window.location.href;
  let domain = url.split("/")[2];
  let path = url.split("/")[3] ? `/${url.split("/")[3]}` : "/";
  var userAgents = navigator.userAgent;
  var object = {
    country: await checkCountry(),
    userAgents: userAgents,
    id: a,
    path: window.location.pathname + window.location.search,
    language: language,
    referrer: referrer,
    title: title,
    domain: domain,
  };
  console.log(object);
  post(object);
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
  var initalTrack = 0;

  const handleRouteChange = () => {
    track();
    initalTrack++;
  };
  if (initalTrack === 0) {
    track();
  }

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
