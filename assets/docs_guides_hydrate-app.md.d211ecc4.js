import{_ as e,o as s,c as a,X as o}from"./chunks/framework.319defb2.js";const h=JSON.parse('{"title":"Hydrate App","description":"Hydrate App","frontmatter":{"description":"Hydrate App"},"headers":[],"relativePath":"docs/guides/hydrate-app.md","filePath":"docs/guides/hydrate-app.md"}'),n={name:"docs/guides/hydrate-app.md"},t=o(`<h1 id="hydrate-app" tabindex="-1">Hydrate App <a class="header-anchor" href="#hydrate-app" aria-label="Permalink to &quot;Hydrate App&quot;">​</a></h1><p>The hydrate app is a Stencil output target which generates a module that can be used on a NodeJS server to hydrate HTML and implement server side rendering (SSR). This functionality is used internally by the Stencil compiler for prerendering, as well as for the Angular Universal SSR for the Ionic framework. However, like Stencil components, the hydrate app itself is not restricted to one framework.</p><p><em>Note that Stencil does <strong>NOT</strong> use Puppeteer for SSR or prerendering.</em></p><h2 id="how-to-use-the-hydrate-app" tabindex="-1">How to Use the Hydrate App <a class="header-anchor" href="#how-to-use-the-hydrate-app" aria-label="Permalink to &quot;How to Use the Hydrate App&quot;">​</a></h2><p>Server side rendering (SSR) can be accomplished in a similar way to prerendering. Instead of using the <code>--prerender</code> CLI flag, you can an output target of type <code>&#39;dist-hydrate-script&#39;</code> to your <code>stencil.config.ts</code>, like so:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">outputTargets</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dist-hydrate-script</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>This will generate a <code>hydrate</code> app in your root project directory that can be imported and used by your Node server.</p><p>After publishing your component library, you can import the hydrate app into your server&#39;s code like this:</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">hydrateDocument</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">yourpackage/hydrate</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>The hydrate app module exports two functions, <code>hydrateDocument</code> and <code>renderToString</code>. <code>hydrateDocument</code> takes a <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument" target="_blank" rel="noreferrer">document</a> as its input while <code>renderToString</code> takes a raw HTML string. Both functions return a Promise which wraps a result object.</p><h3 id="hydratedocument" tabindex="-1">hydrateDocument <a class="header-anchor" href="#hydratedocument" aria-label="Permalink to &quot;hydrateDocument&quot;">​</a></h3><p>You can use <code>hydrateDocument</code> as a part of your server&#39;s response logic before serving the web page. <code>hydrateDocument</code> takes two arguments, a <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument" target="_blank" rel="noreferrer">document</a> and a config object. The function returns a promise with the hydrated results, with the hydrated HTML under the <code>html</code> property.</p><p><em>Example taken from Ionic Angular server</em></p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">hydrateDocument</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">yourpackage/hydrate</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">hydrateComponents</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">doc</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">hydrateDocument</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">doc</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">hydrateResults</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// execute logic based on results</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">hydrateResults</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">hydrateResults</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h4 id="hydratedocument-options" tabindex="-1">hydrateDocument Options <a class="header-anchor" href="#hydratedocument-options" aria-label="Permalink to &quot;hydrateDocument Options&quot;">​</a></h4><ul><li><code>canonicalUrl</code> - string</li><li><code>constrainTimeouts</code> - boolean</li><li><code>clientHydrateAnnotations</code> - boolean</li><li><code>cookie</code> - string</li><li><code>direction</code> - string</li><li><code>language</code> - string</li><li><code>maxHydrateCount</code> - number</li><li><code>referrer</code> - string</li><li><code>removeScripts</code> - boolean</li><li><code>removeUnusedStyles</code> - boolean</li><li><code>resourcesUrl</code> - string</li><li><code>timeout</code> - number</li><li><code>title</code> - string</li><li><code>url</code> - string</li><li><code>userAgent</code> - string</li></ul><h3 id="rendertostring" tabindex="-1">renderToString <a class="header-anchor" href="#rendertostring" aria-label="Permalink to &quot;renderToString&quot;">​</a></h3><p>The hydrate app also has a <code>renderToString</code> function that takes an HTML string and returns a promise of <code>HydrateResults</code>. The optional second parameter is a config object that can alter the output of the markup. Like <code>hydrateDocument</code>, the hydrated HTML can be found under the <code>html</code> property.</p><p><em>Example taken from Ionic Core</em></p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> results </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#A6ACCD;"> hydrate</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">renderToString</span><span style="color:#A6ACCD;">(srcHtml</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">prettyHtml</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">removeScripts</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(results</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">html)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h4 id="rendertostring-options" tabindex="-1">renderToString Options <a class="header-anchor" href="#rendertostring-options" aria-label="Permalink to &quot;renderToString Options&quot;">​</a></h4><ul><li><code>approximateLineWidth</code> - number</li><li><code>prettyHtml</code> - boolean</li><li><code>removeAttributeQuotes</code> - boolean</li><li><code>removeBooleanAttributeQuotes</code> - boolean</li><li><code>removeEmptyAttributes</code> - boolean</li><li><code>removeHtmlComments</code> - boolean</li><li><code>afterHydrate</code> - boolean</li><li><code>beforeHydrate</code> - boolean</li></ul>`,22),l=[t];function p(r,c,i,d,y,D){return s(),a("div",null,l)}const u=e(n,[["render",p]]);export{h as __pageData,u as default};
