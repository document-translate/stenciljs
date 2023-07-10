import { defineConfig } from "vitepress";
import vueJsx from "@vitejs/plugin-vue-jsx";
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
      { text: "官网文档（EN）", link: "https://stenciljs.com/" },
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
    outlineTitle: "章节目录",
  },
  vite: {
    // Vite config options
    plugins: [vueJsx()],
  },
});
