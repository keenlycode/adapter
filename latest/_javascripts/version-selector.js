(() => {
  const VERSION_FILE = "versions.json";
  const VERSION_SEGMENT = /^\d+\.\d+\.\d+(?:[-+][A-Za-z0-9.-]+)?$/;

  function rootPath() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const versionIndex = parts.findIndex((part) =>
      part === "latest" || VERSION_SEGMENT.test(part)
    );

    if (versionIndex === -1) {
      return `${window.location.origin}/`;
    }

    return `${window.location.origin}/${
      parts.slice(0, versionIndex).join("/")
    }${versionIndex > 0 ? "/" : ""}`;
  }

  function currentIdentifier() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts.find((part) =>
      part === "latest" || VERSION_SEGMENT.test(part)
    );
  }

  function currentPagePath() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const versionIndex = parts.findIndex((part) =>
      part === "latest" || VERSION_SEGMENT.test(part)
    );

    if (versionIndex === -1) {
      return "";
    }

    return parts.slice(versionIndex + 1).join("/");
  }

  function optionLabel(version) {
    const aliases = version.aliases?.length
      ? ` (${version.aliases.join(", ")})`
      : "";
    return `${version.title || version.version}${aliases}`;
  }

  function targetIdentifier(version) {
    return version.aliases?.includes("latest") ? "latest" : version.version;
  }

  function createSelector(versions) {
    const wrapper = document.createElement("label");
    wrapper.className = "adapter-version-selector";

    const label = document.createElement("span");
    label.className = "sr-only";
    label.textContent = "Documentation version";

    const select = document.createElement("select");
    select.setAttribute("aria-label", "Documentation version");

    const current = currentIdentifier();

    for (const version of versions) {
      const option = document.createElement("option");
      option.value = targetIdentifier(version);
      option.textContent = optionLabel(version);
      option.selected = current === version.version ||
        version.aliases?.includes(current);
      select.append(option);
    }

    select.addEventListener("change", () => {
      const pagePath = currentPagePath();
      const root = rootPath();
      const nextPath = pagePath
        ? `${select.value}/${pagePath}`
        : `${select.value}/`;
      window.location.href =
        `${root}${nextPath}${window.location.search}${window.location.hash}`;
    });

    wrapper.append(label, select);
    return wrapper;
  }

  function mount(selector) {
    const headerActions = document.querySelector(
      "header .ml-auto.flex.items-center",
    );
    if (headerActions) {
      headerActions.prepend(selector);
    }
  }

  async function init() {
    try {
      const response = await fetch(`${rootPath()}${VERSION_FILE}`);
      if (!response.ok) return;

      const versions = await response.json();
      if (!Array.isArray(versions) || versions.length === 0) return;

      mount(createSelector(versions));
    } catch {
      // Normal mkdocs builds do not have mike metadata. In that case, skip UI.
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
