import{_ as s,o as a,c as e,X as n}from"./chunks/framework.319defb2.js";const h=JSON.parse('{"title":"Stencil Core Compiler API","description":"Stencil Core Compiler API","frontmatter":{"description":"Stencil Core Compiler API"},"headers":[],"relativePath":"docs/core/compiler-api.md","filePath":"docs/core/compiler-api.md"}'),o={name:"docs/core/compiler-api.md"},l=n(`<h1 id="stencil-core-compiler-api" tabindex="-1">Stencil Core Compiler API <a class="header-anchor" href="#stencil-core-compiler-api" aria-label="Permalink to &quot;Stencil Core Compiler API&quot;">​</a></h1><p>The compiler API can be found at <code>@stencil/core/compiler/stencil.js</code>. This module can work within a NodeJS environment, web worker, and browser window. The <code>stencil.min.js</code> file is also provided and recommended when used within a browser.</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// NodeJS (commonjs)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> stencil </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@stencil/core/compiler</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Web Worker from CDN URL (add the version to in the URL)</span></span>
<span class="line"><span style="color:#82AAFF;">importScripts</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://cdn.jsdelivr.net/npm/@stencil/core@[VERSION]/compiler/stencil.min.js</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// self.stencil will be available after the script import</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Browser Window</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://cdn.jsdelivr.net/npm/@stencil/core@[VERSION]/compiler/stencil.min.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// window.stencil will be available after the script executes</span></span></code></pre></div><h2 id="transpile" tabindex="-1">transpile() <a class="header-anchor" href="#transpile" aria-label="Permalink to &quot;transpile()&quot;">​</a></h2><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">transpile</span><span style="color:#A6ACCD;">(code: string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> opts</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> TranspileOptions): </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">TranspileResults</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>The <code>transpile()</code> function inputs source code as a string, with various options within the second argument. The function is stateless and returns a <code>Promise</code> of the results, including diagnostics and the transpiled code. The <code>transpile()</code> function does not handle any bundling, minifying, or precompiling any CSS preprocessing like Sass or Less.</p><p>The <code>transpileSync()</code> equivalent is available so the same function it can be called synchronously. However, TypeScript must be already loaded within the global for it to work, where as the async <code>transpile()</code> function will load TypeScript automatically.</p><p>Since TypeScript is used, the source code will transpile from TypeScript to JavaScript, and does not require Babel presets. Additionally, the results includes an <code>imports</code> array of all the import paths found in the source file. The transpile options can be used to set the <code>module</code> format, such as <code>cjs</code>, and JavaScript <code>target</code> version, such as <code>es2017</code>.</p><h2 id="transpilesync" tabindex="-1">transpileSync() <a class="header-anchor" href="#transpilesync" aria-label="Permalink to &quot;transpileSync()&quot;">​</a></h2><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">transpileSync</span><span style="color:#A6ACCD;">(code: string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> opts</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> TranspileOptions): TranspileResults</span></span></code></pre></div><p>Synchronous equivalent of the <code>transpile()</code> function. When used in a browser environment, TypeScript must already be available globally, where as the async <code>transpile()</code> function will load TypeScript automatically.</p><h2 id="createcompiler" tabindex="-1">createCompiler() <a class="header-anchor" href="#createcompiler" aria-label="Permalink to &quot;createCompiler()&quot;">​</a></h2><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">createCompiler</span><span style="color:#A6ACCD;">(config: Config): </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">Compiler</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>The compiler is the utility that brings together many tools to build optimized components, such as a transpiler, bundler and minifier. When using the CLI, the <code>stencil build</code> command uses the compiler for the various builds, such as a production build, or watch mode during development. If only one file should be transpiled (converting source code from TypeScript to JavaScript) then the <code>transpile()</code> function should be used instead.</p><p>Given a Stencil config, this method asynchronously returns a <code>Compiler</code> instance. The config provided should already be created using the <code>loadConfig({...})</code> method.</p><p>Below is an example of a NodeJS environment running a full build.</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createNodeLogger</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createNodeSys</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@stencil/core/sys/node</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createCompiler</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">loadConfig</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@stencil/core/compiler</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> logger </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createNodeLogger</span><span style="color:#A6ACCD;">(process)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> sys </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createNodeSys</span><span style="color:#A6ACCD;">(process)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> validated </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">loadConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  logger</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  sys</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">config</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* user config */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> compiler </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createCompiler</span><span style="color:#A6ACCD;">(validated</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">config)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> results </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#A6ACCD;"> compiler</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">build</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="createsystem" tabindex="-1">createSystem() <a class="header-anchor" href="#createsystem" aria-label="Permalink to &quot;createSystem()&quot;">​</a></h2><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">createSystem</span><span style="color:#A6ACCD;">(): CompilerSystem</span></span></code></pre></div><p>The compiler uses a <code>CompilerSystem</code> instance to access any file system reads and writes. When used from the CLI, the CLI will provide its own system based on NodeJS. This method provide a compiler system is in-memory only and independent of any platform.</p><h2 id="dependencies" tabindex="-1">dependencies <a class="header-anchor" href="#dependencies" aria-label="Permalink to &quot;dependencies&quot;">​</a></h2><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">dependencies</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> CompilerDependency[]</span></span></code></pre></div><p>The <code>dependencies</code> array is only informational and provided to state which versions of dependencies the compiler was built and works with. For example, the version of TypeScript, Rollup and Terser used for this version of Stencil are listed here.</p><h2 id="loadconfig" tabindex="-1">loadConfig() <a class="header-anchor" href="#loadconfig" aria-label="Permalink to &quot;loadConfig()&quot;">​</a></h2><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">loadConfig</span><span style="color:#A6ACCD;">(init</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> LoadConfigInit): </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">LoadConfigResults</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>The <code>loadConfig(init)</code> method is used to take raw config information and transform it into a usable config object for the compiler and dev-server. The <code>init</code> argument should be given an already created system and logger which can also be used by the compiler.</p><h2 id="optimizecss" tabindex="-1">optimizeCss() <a class="header-anchor" href="#optimizecss" aria-label="Permalink to &quot;optimizeCss()&quot;">​</a></h2><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">optimizeCss</span><span style="color:#A6ACCD;">(cssInput</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> OptimizeCssInput): </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">OptimizeCssOutput</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Utility function used by the compiler to optimize CSS.</p><h2 id="optimizejs" tabindex="-1">optimizeJs() <a class="header-anchor" href="#optimizejs" aria-label="Permalink to &quot;optimizeJs()&quot;">​</a></h2><div class="language-jsx"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">optimizeJs</span><span style="color:#A6ACCD;">(jsInput</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> OptimizeJsInput): </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">OptimizeJsOutput</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Utility function used by the compiler to optimize JavaScript. Knowing the JavaScript target will further apply minification optimizations beyond usual minification.</p><h2 id="path" tabindex="-1">path <a class="header-anchor" href="#path" aria-label="Permalink to &quot;path&quot;">​</a></h2><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> PlatformPath</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>Utility of the <code>path</code> API provided by NodeJS, but capable of running in any environment. This <code>path</code> API is only the POSIX version: <a href="https://nodejs.org/api/path.html" target="_blank" rel="noreferrer">https://nodejs.org/api/path.html</a></p><h2 id="version" tabindex="-1">version <a class="header-anchor" href="#version" aria-label="Permalink to &quot;version&quot;">​</a></h2><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">version</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> string</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>Current version of <code>@stencil/core</code>.</p>`,38),t=[l];function p(c,i,r,d,y,D){return a(),e("div",null,t)}const F=s(o,[["render",p]]);export{h as __pageData,F as default};
