/*
 * Zpětný odkaz na rozcestník.
 * Vlož do libovolné aplikace jediným řádkem:
 *   <script src="https://app.sachytynec.cz/back.js" defer></script>
 * Styl i cíl odkazu měníš tady na jednom místě pro všechny aplikace.
 */
(function () {
  var HUB = "https://app.sachytynec.cz";

  // Na samotném rozcestníku odznak nezobrazuj.
  try {
    if (location.hostname === new URL(HUB).hostname) return;
  } catch (e) {}

  function mount() {
    if (document.getElementById("stc-back")) return;

    var a = document.createElement("a");
    a.id = "stc-back";
    a.href = HUB;
    a.setAttribute("aria-label", "Zpět na rozcestník aplikací");
    a.textContent = "♞ Rozcestník";

    var s = a.style;
    s.position = "fixed";
    s.left = "16px";
    s.bottom = "16px";
    s.zIndex = "2147483000";
    s.display = "inline-flex";
    s.alignItems = "center";
    s.gap = "6px";
    s.padding = "8px 14px";
    s.font = "500 14px/1 system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
    s.color = "#f4ecda";
    s.background = "#2e4a34";
    s.border = "1px solid rgba(0,0,0,.15)";
    s.borderRadius = "999px";
    s.textDecoration = "none";
    s.boxShadow = "0 2px 10px rgba(0,0,0,.18)";
    s.transition = "transform .15s ease, background .15s ease";
    s.cursor = "pointer";

    a.addEventListener("mouseenter", function () {
      a.style.background = "#24382a";
      a.style.transform = "translateY(-2px)";
    });
    a.addEventListener("mouseleave", function () {
      a.style.background = "#2e4a34";
      a.style.transform = "none";
    });

    document.body.appendChild(a);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
