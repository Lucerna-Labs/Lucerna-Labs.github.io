(() => {
  const canonical = "https://atom-architecture-lab.jgalicea.chatgpt.site";

  function installNotice() {
    if (document.querySelector(".atomMirrorNotice")) return;
    const notice = document.createElement("aside");
    notice.className = "atomMirrorNotice";
    notice.setAttribute("aria-label", "GitHub Pages mirror notice");
    notice.innerHTML = `<strong>STATIC LUCERNA LABS MIRROR</strong>Articles and browser demonstrations run here. The protected Vibe Coder API opens on the <a href="${canonical}/#coder-title">canonical live site</a>.`;
    document.body.appendChild(notice);
  }

  document.addEventListener("click", event => {
    const target = event.target instanceof Element ? event.target.closest("button") : null;
    if (!target || !target.closest(".ordoAvc")) return;
    const label = target.textContent?.trim().toUpperCase();
    if (label !== "RUN" && label !== "DOWNLOAD APP" && label !== "THINKING…") return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = `${canonical}/#coder-title`;
  }, true);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installNotice, { once: true });
  else installNotice();
})();
