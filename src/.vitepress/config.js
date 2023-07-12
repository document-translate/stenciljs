import { defineConfig } from "vitepress";
import vueJsx from "@vitejs/plugin-vue-jsx";
import sidebar from "./config/sidebar.js";
import genSitemap from "./config/gen-sitemap.js";

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
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    search: {
      provider: "local",
    },
    outlineTitle: "章节目录",
    footer: {
      message: "此文档为非官方翻译版本",
      copyright: "Copyright © 2023-现在 GuoJiKun",
    },
  },
  buildEnd: (siteConfig) => {
    console.log("buildEnd", siteConfig);
    const { pages, outDir } = siteConfig;
    const routes = siteConfig.pages;
    const conf = {
      host: "https://stenciljs.jikun.dev/",
      pages,
      outDir,
    };
    genSitemap(conf);
  },
  vite: {
    // Vite config options
    plugins: [vueJsx()],
  },
});
