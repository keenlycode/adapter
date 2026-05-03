(() => {
  const labels = {
    ts: "TypeScript",
    tsx: "TSX",
    js: "JavaScript",
    jsx: "JSX",
    html: "HTML",
    css: "CSS",
    bash: "Bash",
    sh: "Shell",
    json: "JSON",
    yaml: "YAML",
    yml: "YAML",
    vue: "Vue",
    svelte: "Svelte",
  };

  const applyCodeLanguageLabels = (root = document) => {
    for (const block of root.querySelectorAll(".codehilite")) {
      const languageClass = Array.from(block.classList).find((name) => name.startsWith("language-"));
      if (!languageClass) continue;

      const rawLanguage = languageClass.slice("language-".length);
      const label = labels[rawLanguage] ?? rawLanguage.toUpperCase();
      block.setAttribute("data-language", label);
    }
  };

  const start = () => {
    applyCodeLanguageLabels();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;

          if (node.matches?.(".codehilite")) {
            applyCodeLanguageLabels(node.parentElement ?? document);
            continue;
          }

          if (node.querySelector?.(".codehilite")) {
            applyCodeLanguageLabels(node);
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
