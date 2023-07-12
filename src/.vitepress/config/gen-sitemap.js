import { writeFile } from "node:fs";

const genSitemapUrl = (url) => {
  const lastmod = new Date().toISOString() + "+08:00";

  const sitemapUrl = [
    "<url>",
    "<loc>",
    url.replace(/\/.md$/, ".html"),
    "</loc>",
    "<lastmod>",
    lastmod,
    "</lastmod>",
    "</url>",
  ];
  return sitemapUrl.join("");
};

const genSitemapData = (routes, host) => {
  const start = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  const sitemapUrls = routes.map((c) => genSitemapUrl(`${host}${c}`));

  return `${start}${sitemapUrls.join("")}</urlset>`;
};

const writeDir = (data, dir) => {
  const path = `${dir}/sitemap.xml`;
  return new Promise((resolve, reject) => {
    writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const genSitemap = (conf) => {
  const { pages, outDir, host } = conf;
  const sitemapData = genSitemapData(pages, host);
  writeDir(sitemapData, outDir)
    .then(() => {
      console.log("Sitemap generated");
    })
    .catch((err) => {
      throw err;
    });
};

export default genSitemap;
