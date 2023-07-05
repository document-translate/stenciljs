import { defineConfig } from "vitepress";
import sidebar from "./config/sidebar.js";

export default defineConfig({
  lang: "zh-CN",
  title: "StencilJS",
  description: "StencilJS 中文文档",
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/docs/introduction/overview" },
    ],
    sidebar,
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/document-translate/stenciljs",
      },
    ],
    search: {
      provider: "local",
    },
  },
});
