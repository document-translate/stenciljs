import { defineConfig } from "vitepress";
import vueJsx from "@vitejs/plugin-vue-jsx";
import sidebar from "./config/sidebar.js";
import genSitemap from "./config/gen-sitemap.js";

export default defineConfig({
  lang: "zh-CN",
  title: "StencilJS",
  description: "StencilJS 中文文档",
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
          "StencilJS, StencilJS 中文文档, StencilJS 中文手册, StencilJS 中文教程, StencilJS 中文帮助, StencilJS 中文资源, StencilJS 中文",
      },
    ],
    [
      "meta",
      {
        name: "application-name",
        content: "StencilJS 中文文档",
      },
    ],
    [
      "meta",
      {
        name: "generator",
        content: "vitepress v1.0.0-beta5",
      },
    ],
  ],
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
    outline: [2, 3],
    outlineTitle: "章节目录",
    footer: {
      message: "此文档为非官方翻译版本",
      copyright: "Copyright © 2023-现在 GuoJiKun",
    },
  },
  buildEnd: (siteConfig) => {
    const { pages, outDir } = siteConfig;
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
