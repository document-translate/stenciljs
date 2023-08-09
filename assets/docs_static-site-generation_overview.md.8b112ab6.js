import{_ as e,o as t,c as r,X as n}from"./chunks/framework.319defb2.js";const u=JSON.parse('{"title":"Static Site Generation","description":"","frontmatter":{"title":"Static Site Generation","sidebar_label":"Overview","slug":"/static-site-generation"},"headers":[],"relativePath":"docs/static-site-generation/overview.md","filePath":"docs/static-site-generation/overview.md"}'),i={name:"docs/static-site-generation/overview.md"},a=n('<h1 id="static-site-generation-with-stencil" tabindex="-1">Static Site Generation with Stencil <a class="header-anchor" href="#static-site-generation-with-stencil" aria-label="Permalink to &quot;Static Site Generation with Stencil&quot;">​</a></h1><p>One of the best ways to build fast, interactive web sites and web apps is to utilize Static Site Generation instead of Server Side Rendering (known as SSR) or Client Side Rendering (known as Single Page Apps, or SPAs).</p><p>Static Site Generation (SSG) means building and rendering components and routes at build time (aka prerendering) rather than server request time (SSR) or at client run-time (SPA). Because a route is already prerendered, all of the content for the route is available to search engines and clients <em>immediately</em>, so SEO and performance are maximized.</p><p>Static Site Generation doesn&#39;t mean your pages have to be and/or <em>stay</em> static! Stencil utilizes hydration to efficiently load client-side components at runtime to get the best of both worlds.</p><p>Since Static Site Generation prerenders components, there are some tradeoffs and things to keep in mind, but most components can be easily prerendered without much modification.</p><p>Stencil makes SSG easy, so read on to see how to incorporate it into your apps.</p><h2 id="benefits-of-static-site-generation" tabindex="-1">Benefits of Static Site Generation <a class="header-anchor" href="#benefits-of-static-site-generation" aria-label="Permalink to &quot;Benefits of Static Site Generation&quot;">​</a></h2><ul><li>Great <a href="https://developers.google.com/web/tools/lighthouse/" target="_blank" rel="noreferrer">Lighthouse</a> scores</li><li>Faster time to <a href="https://web.dev/lcp/" target="_blank" rel="noreferrer">Largest Contentful Paint (LCP)</a></li><li>Better <a href="https://support.google.com/webmasters/answer/7451184" target="_blank" rel="noreferrer">Search Engine Optimization (SEO)</a></li><li>Provides functionality for users with JavaScript disabled</li></ul><h2 id="how-static-site-generation-and-prerendering-works" tabindex="-1">How Static Site Generation and Prerendering Works <a class="header-anchor" href="#how-static-site-generation-and-prerendering-works" aria-label="Permalink to &quot;How Static Site Generation and Prerendering Works&quot;">​</a></h2><p><strong>Build Hydrate App</strong>: The first step in prerendering is for the compiler to generate a &quot;hydrate&quot; app, which is a single directory to be used by Node.js. The &quot;hydrate&quot; app is automatically generated when the <code>--prerender</code> CLI flag is provided and by default the app is saved to <code>dist/hydrate</code>. Prerendering uses the hydrate app internally, however it can be used directly at a lower-level. <a href="./../guides/hydrate-app.html">Learn more about the Hydrate App</a></p><p><strong>Fork Prerender Tasks to Available CPUs</strong>: Stencil can efficiently divide out the prerendering to each of the current machine&#39;s CPUs using <a href="https://nodejs.org/api/child_process.html" target="_blank" rel="noreferrer">Node.js&#39; Child Process API</a>. By tasking each CPU on the machine, the compiler can drastically speed up prerendering times.</p><p><strong>Prerender Index</strong>: After the compiler has completed the build and created child processes on each available CPU, it will then kick off the prerendering by starting at the single base URL, or the configured entry URLs. Once the page has finished prerendering it&#39;ll be written to the configured <code>www</code> directory as an <code>index.html</code> file.</p><p><strong>Crawl App</strong>: During each page prerender, Stencil also collects the anchor elements and URLs used within the page. With this information, it&#39;s able to inform the main thread of which pages should be prerendered next. The main thread is in charge of orchestrating all of the URLs, and the job is finished once all of the pages have been crawled and prerendered.</p><p><strong>Deploy Static Files to Production</strong>: Now that all of the pages have been prerendered and written as static HTML files, the <code>www</code> directory can now be deployed to a server. A significant difference from prerendering and Server-side Rendering (SSR), is that the HTTP server is just serving up static HTML files rather than dynamically generating the HTML on the server.</p><p><strong>Static HTML Response</strong>: With the static HTML files deploy to a server, visitors of each prerendered page first receive the HTML with inline styles, and no blocking JS or CSS. Additionally, the compiler is already aware of the exact modules the visitor will need for this page, and will asynchronously preload the modules using <a href="https://html.spec.whatwg.org/multipage/links.html#link-type-modulepreload" target="_blank" rel="noreferrer">link <code>modulepreload</code></a>.</p><p><strong>Client-side Hydration</strong>: After the HTML and inlined styles have rendered the first paint, the next step is for the same nodes within the DOM to be hydrated by the client-side JavaScript. Each component within the page will asynchronously hydrate using the initial order they were found in the DOM structure. Next, as each component lazily hydrates they&#39;re able to reuse the existing nodes found in the DOM.</p><h2 id="tooling" tabindex="-1">Tooling <a class="header-anchor" href="#tooling" aria-label="Permalink to &quot;Tooling&quot;">​</a></h2><p>To be clear, Stencil does <em>not</em> use <code>Puppeteer</code> or <code>jsdom</code> for prerendering. Puppeteer is great for End-to-End testing, but for performance reasons it&#39;s not ideal to quickly generate a large website with hundreds or thousands of pages. Additionally, <code>jsdom</code> is often used for unit testing, but in our experience it&#39;s difficult to use with async components and its global environment nature.</p><p>Instead, Stencil uses its own internal DOM APIs which strictly follow the web standards, but optimized for prerendering, Static Site Generation and Server-side Rendering. By doing so, developers can still use all the same APIs they&#39;re already familiar with, but they&#39;ll seamlessly work within a NodeJS environment too. This means developers often do not have to write code differently in how they&#39;re building components, but rather they focus only on writing one type of component, and coding it using the standards they already know. To reiterate, developers do not have to learn a new API for prerendering. It&#39;s just the same web APIs your components are already using.</p><p>Every component, machine and environment will perform differently, so it&#39;s difficult to provide a consistent benchmark. However, what we do know is that <a href="https://ionicframework.com/docs" target="_blank" rel="noreferrer">Ionic&#39;s Documentation site</a> has hundreds of pages and Stencil is able to prerender the entire site in a few seconds.</p>',20),o=[a];function s(d,l,h,c,p,g){return t(),r("div",null,o)}const m=e(i,[["render",s]]);export{u as __pageData,m as default};
