import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Adapter Guide",
  description: "Documentation for Adapter usage and contribution.",
  srcDir: ".",
  cleanUrls: true,
  themeConfig: {
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Usage", link: "/usage/getting-started" },
      { text: "Contribution", link: "/contribution/overview" },
    ],
    sidebar: {
      "/usage/": [
        {
          text: "Usage",
          items: [
            { text: "Getting Started", link: "/usage/getting-started" },
            { text: "Core Concepts", link: "/usage/core-concepts" },
            { text: "Patterns & Recipes", link: "/usage/patterns-and-recipes" },
            { text: "Framework Integration", link: "/usage/framework-integration" },
            { text: "CSS Processing", link: "/usage/css-processing" },
          ],
        },
      ],
      "/contribution/": [
        {
          text: "Contribution",
          items: [
            { text: "Overview", link: "/contribution/overview" },
            { text: "Workflow", link: "/contribution/workflow" },
            { text: "Development", link: "/contribution/development" },
            { text: "Docstring Guide", link: "/contribution/docstring" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/devcapsule/adapter" },
    ],
  },
});
