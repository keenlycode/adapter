/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: "Adapter",
  tagline: "A tiny styling runtime for Web Components",
  url: "https://keenlycode.github.io",
  baseUrl: "/adapter/",
  trailingSlash: false,
  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  organizationName: "keenlycode",
  projectName: "adapter",

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          sidebarPath: "./sidebars.cjs",
          includeCurrentVersion: true,
          lastVersion: "current",
          versions: {
            current: {
              label: "3.3.3",
              path: "/",
            },
          },
          exclude: ["**/_*"],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  plugins: [
    function registryCommonjsParserPlugin() {
      return {
        name: "registry-commonjs-parser-plugin",
        configureWebpack() {
          return {
            module: {
              rules: [
                {
                  test: /[\\/]\.docusaurus[\\/](registry|client-modules)\.js$/,
                  type: "javascript/auto",
                },
              ],
            },
          };
        },
      };
    },
  ],

  themeConfig: {
    navbar: {
      title: "Adapter",
      items: [
        { type: "doc", docId: "index", position: "left", label: "Docs" },
        { type: "docsVersionDropdown", position: "right" },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Adapter contributors.`,
    },
  },
};
