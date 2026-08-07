/*
 * Zpětný odkaz na rozcestník.
 * Vlož do libovolné aplikace jediným řádkem:
 *   <script src="https://app.sachytynec.cz/back.js" defer></script>
 * Styl i cíl odkazu měníš tady na jednom místě pro všechny aplikace.
 *
 * Chování: na krátké stránce svítí celý nápis. Jakmile obsah přeroste
 * 90 % výšky okna, odznak se scvrkne na samotnou ikonu, aby nepřekážel —
 * a rozbalí se při najetí myší, při zaměření klávesnicí a při scrollování.
 */
(function () {
  var HUB = "https://app.sachytynec.cz";
  var TALL_RATIO = 0.9; // podíl výšky okna, nad kterým je stránka „vysoká"
  var OPEN_MS = 1400; // jak dlouho zůstane nápis po scrollu rozbalený

  // Na samotném rozcestníku odznak nezobrazuj.
  try {
    if (location.hostname === new URL(HUB).hostname) return;
  } catch (e) {}

  var CSS =
    '#stc-back{position:fixed;left:16px;bottom:16px;z-index:2147483000;' +
    "display:inline-flex;align-items:center;box-sizing:border-box;height:40px;" +
    "padding:0 14px;font:500 14px/1 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;" +
    "color:#f4ecda;background:#2e4a34;border:1px solid rgba(0,0,0,.15);border-radius:999px;" +
    "text-decoration:none;box-shadow:0 2px 10px rgba(0,0,0,.18);cursor:pointer;" +
    "transition:padding .2s ease,background .15s ease,transform .15s ease}" +
    "#stc-back:hover{background:#24382a;transform:translateY(-2px)}" +
    "#stc-back .stc-ico{flex:none;font-size:18px;line-height:1}" +
    "#stc-back .stc-txt{max-width:12em;margin-left:6px;overflow:hidden;white-space:nowrap;" +
    "transition:max-width .2s ease,margin-left .2s ease,opacity .15s ease}" +
    /* vysoká stránka → jen ikona */
    "#stc-back.stc-mini{padding:0 10px}" +
    "#stc-back.stc-mini .stc-txt{max-width:0;margin-left:0;opacity:0}" +
    /* … a zase celý nápis při najetí myší nebo při scrollu */
    "#stc-back.stc-mini:hover,#stc-back.stc-mini.stc-open{padding:0 14px}" +
    "#stc-back.stc-mini:hover .stc-txt,#stc-back.stc-mini.stc-open .stc-txt" +
    "{max-width:12em;margin-left:6px;opacity:1}" +
    /* zaměření klávesnicí zvlášť: starší Safari nezná :focus-visible a zahodilo by
       celé pravidlo, kdyby bylo ve stejné skupině selektorů jako :hover */
    "#stc-back.stc-mini:focus-visible{padding:0 14px}" +
    "#stc-back.stc-mini:focus-visible .stc-txt{max-width:12em;margin-left:6px;opacity:1}" +
    "@media (prefers-reduced-motion:reduce){#stc-back,#stc-back .stc-txt{transition:none}}";

  function mount() {
    if (document.getElementById("stc-back")) return;

    var style = document.createElement("style");
    style.id = "stc-back-css";
    style.textContent = CSS;
    document.head.appendChild(style);

    var a = document.createElement("a");
    a.id = "stc-back";
    a.href = HUB;
    a.setAttribute("aria-label", "Zpět na rozcestník aplikací");

    var ico = document.createElement("span");
    ico.className = "stc-ico";
    ico.textContent = "♞";
    ico.setAttribute("aria-hidden", "true");

    var txt = document.createElement("span");
    txt.className = "stc-txt";
    txt.textContent = "Rozcestník";

    a.appendChild(ico);
    a.appendChild(txt);
    document.body.appendChild(a);

    // Vysoká stránka = obsah přerostl TALL_RATIO výšky okna, nebo se dá scrollovat.
    function isTall() {
      var b = document.body;
      var content = b ? Math.max(b.scrollHeight, b.offsetHeight) : 0;
      var scrollable =
        document.documentElement.scrollHeight - window.innerHeight > 1;
      return scrollable || content > window.innerHeight * TALL_RATIO;
    }

    function apply() {
      a.classList.toggle("stc-mini", isTall());
    }

    // Měření z observerů slučuj do jednoho snímku, ať se to nepřepočítává zbytečně.
    var queued = false;
    function schedule() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        apply();
      });
    }

    var timer;
    function onScroll() {
      a.classList.add("stc-open");
      clearTimeout(timer);
      timer = setTimeout(function () {
        a.classList.remove("stc-open");
      }, OPEN_MS);
    }

    apply();
    window.addEventListener("resize", schedule);
    // capture kvůli scrollujícím kontejnerům uvnitř stránky, ty na window nebublají
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });

    if (window.ResizeObserver) {
      new ResizeObserver(schedule).observe(document.body);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
