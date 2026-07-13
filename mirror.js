(() => {
  function installNotice() {
    if (document.querySelector(".atomMirrorNotice")) return;
    const notice = document.createElement("aside");
    notice.className = "atomMirrorNotice";
    notice.setAttribute("aria-label", "GitHub Pages mirror notice");
    notice.innerHTML = "<strong>STATIC LUCERNA LABS MIRROR</strong>Articles and browser demonstrations run here.";
    document.body.appendChild(notice);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installNotice, { once: true });
  } else {
    installNotice();
  }
})();