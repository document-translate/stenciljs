import{_ as s,o as a,c as e,X as n}from"./chunks/framework.319defb2.js";const C=JSON.parse('{"title":"Stencil 配置","description":"Stencil 配置","frontmatter":{"description":"Stencil 配置"},"headers":[],"relativePath":"docs/config/overview.md","filePath":"docs/config/overview.md"}'),l={name:"docs/config/overview.md"},o=n(`<h1 id="stencil-config" tabindex="-1">Stencil 配置 <a class="header-anchor" href="#stencil-config" aria-label="Permalink to &quot;Stencil 配置{#stencil-config}&quot;">​</a></h1><p>在大多数情况下，<code>stencil.config.ts</code> 文件不需要任何自定义，因为 Stencil 自带了很多开箱即用的默认值。 一般来说，最好尽可能少配置。事实上，你甚至可以完全删除 <code>stencil.config.ts</code> 文件，应用程序仍然可以正常编译。 但与此同时，编译器可以使用此配置在最低级别进行配置。下面是许多可选的配置属性。</p><p>示例 <code>stencil.config.ts</code>:</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Config</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@stencil/core</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> config</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Config</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">namespace</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">MyApp</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">srcDir</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><h2 id="buildes5" tabindex="-1">buildEs5 <a class="header-anchor" href="#buildes5" aria-label="Permalink to &quot;buildEs5&quot;">​</a></h2><p>设置是否应该生成 ES5 版本。 默认值为 <code>false</code>。 将 <code>buildEs5</code> 设置为 <code>true</code> 也将为 dev 和 prod 模式创建 ES5 构建。 将 <code>buildEs5</code> 设置为 <code>prod</code> 只会在 prod 模式下构建 ES5。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">buildEs5</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> boolean </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prod</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="bundles" tabindex="-1">bundles <a class="header-anchor" href="#bundles" aria-label="Permalink to &quot;bundles&quot;">​</a></h2><p>By default, Stencil will statically analyze the application and generate a component graph of how all the components are interconnected. From the component graph it is able to best decide how components should be grouped depending on their usage with one another within the app. By doing so it&#39;s able to bundle components together in order to reduce network requests. However, bundles can be manually generated using the <code>bundles</code> config.</p><p>The <code>bundles</code> config is an array of objects that represent how components are grouped together in lazy-loaded bundles. This config is rarely needed as Stencil handles this automatically behind the scenes.</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">bundles</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">components</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ion-button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">] </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">components</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ion-card</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ion-card-header</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">] </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="cachedir" tabindex="-1">cacheDir <a class="header-anchor" href="#cachedir" aria-label="Permalink to &quot;cacheDir&quot;">​</a></h2><p><em>default: &#39;.stencil&#39;</em></p><p>The directory where sub-directories will be created for caching when <a href="#enablecache"><code>enableCache</code></a> is set <code>true</code> or if using <a href="./../testing/screenshot-connector.html">Stencil&#39;s Screenshot Connector</a>.</p><p>Stencil 配置如下：</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-q-zWY" id="tab-G2SMZyg" checked="checked"><label for="tab-G2SMZyg">stencil.config.ts</label></div><div class="blocks"><div class="language-ts active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Config</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@stencil/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> config</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Config</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">...,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">enableCache</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">cacheDir</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.cache</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">testing</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">screenshotConnector</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">connector.js</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></div></div><p>将产生以下文件结构：</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">stencil-project-root</span></span>
<span class="line"><span style="color:#A6ACCD;">└── .cache</span></span>
<span class="line"><span style="color:#A6ACCD;">    ├── .build &lt;-- Where build related file caching is written</span></span>
<span class="line"><span style="color:#A6ACCD;">    |</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── screenshot-cache.json &lt;-- Where screenshot caching is written</span></span></code></pre></div><h2 id="devserver" tabindex="-1">devServer <a class="header-anchor" href="#devserver" aria-label="Permalink to &quot;devServer&quot;">​</a></h2><p>请查看 <a href="./dev-server.html">Dev-Server 文档</a>.</p><h2 id="enablecache" tabindex="-1">enableCache <a class="header-anchor" href="#enablecache" aria-label="Permalink to &quot;enableCache{#enablecache}&quot;">​</a></h2><p><em>default: <code>true</code></em></p><p>Stencil 将缓存构建结果，以加快重建速度。要禁用此功能，请将 <code>enableCache</code> 设置为 <code>false</code>。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">enableCache</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="extras" tabindex="-1">extras <a class="header-anchor" href="#extras" aria-label="Permalink to &quot;extras&quot;">​</a></h2><p>请查看 <a href="./extras.html">Extras docs</a>.</p><h2 id="globalscript" tabindex="-1">globalScript <a class="header-anchor" href="#globalscript" aria-label="Permalink to &quot;globalScript{#globalscript}&quot;">​</a></h2><p>全局脚本配置选项接受一个文件路径字符串作为参数。</p><p>全局脚本在库/应用加载之前运行一次，所以你可以做一些事情，比如建立到外部服务的连接或配置你正在使用的库。</p><p>要执行的代码应该放在由全局脚本导出的默认函数中。确保全局脚本中的所有代码都包装在导出的函数中：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// or export default async function()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">initServerConnection</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">提示</p><p>导出的函数也可以是 <code>async</code>。</p></div><h2 id="globalstyle" tabindex="-1">globalStyle <a class="header-anchor" href="#globalstyle" aria-label="Permalink to &quot;globalStyle{#globalstyle}&quot;">​</a></h2><p>Stencil 传统上用于将多个组件编译为应用程序，每个组件都有自己的划分样式。 然而，在所有组件和网站中保持“全局”样式仍然是很常见的。全局 CSS 文件通常用于设置 <a href="./../components/styling.html">CSS 变量</a>。</p><p>此外，<code>globalStyle</code> 配置可以用来预编译 Sass、PostCss 等等。</p><p>下面是一个包含 webapp 全局 css 文件<code>app.css</code>的示例文件夹结构。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">src/</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">components/</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">global/</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">app.css</span></span></code></pre></div><p>全局样式配置接受一个文件路径字符串作为参数。此构建的输出将转到 <code>buildDir</code>。在这个例子中，它将被保存到 <code>www/build/app.css</code>。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">globalStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src/global/app.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>在 <a href="./../components/styling.html#global-styles">styling docs</a> 中查看如何在应用中使用全局样式。</p><h2 id="hashedfilenamelength" tabindex="-1">hashedFileNameLength <a class="header-anchor" href="#hashedfilenamelength" aria-label="Permalink to &quot;hashedFileNameLength&quot;">​</a></h2><p><em>default: <code>8</code></em></p><p>当 <code>hashFileNames</code> 配置设置为 <code>true</code> 时，并且它是一个生产构建，<code>hashedFileNameLength</code> 配置将用于确定文件名的哈希值应该是多少个字符。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">hashedFileNameLength</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">8</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="hashfilenames" tabindex="-1">hashFileNames <a class="header-anchor" href="#hashfilenames" aria-label="Permalink to &quot;hashFileNames&quot;">​</a></h2><p><em>default: <code>true</code></em></p><p>在生产构建过程中，每个生成的文件的内容会被散列以表示内容，散列值会被用作文件名。 如果内容在构建之间没有更新，那么它会收到相同的文件名。当内容更新时，文件名就不一样了。 通过这样做，部署的应用程序可以“永久缓存”构建目录，并充分利用内容分发网络(cdn)和大量缓存文件以获得更快的应用程序。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">hashFileNames</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="invisibleprehydration" tabindex="-1">invisiblePrehydration <a class="header-anchor" href="#invisibleprehydration" aria-label="Permalink to &quot;invisiblePrehydration&quot;">​</a></h2><p><em>default: <code>true</code></em></p><p>当设置为 <code>true</code> 时，<code>prehydration</code> 将在 hydration 之前通过向文档头部自动注入样式标签来隐藏组件。 将 <code>prehydration</code> 设置为 <code>false</code> 将不会将样式标签注入到头部，从而允许你为 web 组件预 hydration 设置样式。</p><div class="info custom-block"><p class="custom-block-title">提示</p><p>将 <code>invisiblePrehydration</code> 设置为 <code>false</code> 将导致页面加载时所有内容都可见，导致无样式内容 (FOUC) 的闪烁更加突出。 但是，您可以根据您的偏好设置 web 组件的备用内容。</p></div><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">invisiblePrehydration</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="minifycss" tabindex="-1">minifyCss <a class="header-anchor" href="#minifycss" aria-label="Permalink to &quot;minifyCss&quot;">​</a></h2><p><em>default: <code>true</code> in production</em></p><p>当设置为 <code>true</code> 时，浏览器的 CSS 文件将被压缩。</p><h2 id="minifyjs" tabindex="-1">minifyJs <a class="header-anchor" href="#minifyjs" aria-label="Permalink to &quot;minifyJs{#minifyjs}&quot;">​</a></h2><p><em>default: <code>true</code> in production</em></p><p>当设置为 <code>true</code> 时，浏览器的 JS 文件将被压缩。 Stencil 在底层使用 <a href="https://terser.org/" target="_blank" rel="noreferrer">Terser</a> 进行文件压缩。</p><h2 id="namespace" tabindex="-1">namespace <a class="header-anchor" href="#namespace" aria-label="Permalink to &quot;namespace{#namespace}&quot;">​</a></h2><p><em>default: <code>App</code></em></p><p><code>namespace</code> 配置是一个代表应用命名空间的 <code>string</code>。对于不打算成为可重用组件库的应用，默认的 <code>app</code> 就可以了。 然而，如果应用程序打算作为第三方库使用，例如 <code>Ionic</code>，则需要一个唯一的命名空间。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">namespace</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Ionic</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="outputtargets" tabindex="-1">outputTargets <a class="header-anchor" href="#outputtargets" aria-label="Permalink to &quot;outputTargets&quot;">​</a></h2><p>请查看 <a href="./../output-targets/overview.html">Output Target 文档</a>.</p><h2 id="plugins" tabindex="-1">plugins <a class="header-anchor" href="#plugins" aria-label="Permalink to &quot;plugins&quot;">​</a></h2><p>请查看 <a href="./plugins.html">插件文档</a>.</p><h2 id="preamble" tabindex="-1">preamble <a class="header-anchor" href="#preamble" aria-label="Permalink to &quot;preamble&quot;">​</a></h2><p><em>default: <code>undefined</code></em></p><p><code>preamble</code> 配置字段是一个 <code>string</code> 类型的字段，用于帮助持久化 banner 或添加关于最终构建的相关信息， 它将被转换为固定注释，并放置在所有发出的 JavaScript 文件的顶部，任何发出的 polyfills 除外。 转义的换行符可以放在这个字段提供的值中，并且会被 Stencil 使用。</p><p>示例：</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">preamble</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Built with Stencil</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">Copyright (c) SomeCompanyInc.</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>将生成以下注释：</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/*!</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * Built with Stencil</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * Copyright (c) SomeCompanyInc.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span></code></pre></div><h2 id="sourcemap" tabindex="-1">sourceMap <a class="header-anchor" href="#sourcemap" aria-label="Permalink to &quot;sourceMap&quot;">​</a></h2><p><em>default: <code>true</code></em></p><p>当省略或设置为 <code>true</code> 时，将为项目生成 sourcemap。 当设置为 <code>false</code> 时，将不会生成 sourcemap。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sourceMap</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>Sourcemap 创建了一个用 TypeScript/JSX 编写的 Stencil 组件和由 Stencil 输出的结果 JavaScript 之间的转换。 在项目中启用源映射可以改善 Stencil 组件的调试体验。 例如，它们允许外部工具(例如集成开发环境)直接在原始源代码中添加断点，这允许你逐行“单步执行”代码，检查变量中保存的值，观察逻辑流等。</p><p>请注意:在编译期间，Stencil 将始终尝试尽可能压缩组件的源代码。 当启用 <code>sourceMap</code> 时，与未启用 <code>sourceMap</code> 时生成的压缩结果相比，Stencil 生成的压缩结果可能略有不同。</p><p>开发人员负责确定他们是否选择在为组件提供服务的每个环境中提供 sourcemap，并相应地实现他们的决定。</p><h2 id="srcdir" tabindex="-1">srcDir <a class="header-anchor" href="#srcdir" aria-label="Permalink to &quot;srcDir&quot;">​</a></h2><p><em>default: <code>src</code></em></p><p><code>srcDir</code> 配置指定了包含每个组件源 typescript 文件的目录。Stencil 应用的标准是默认使用 <code>src</code>。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">srcDir</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="taskqueue" tabindex="-1">taskQueue <a class="header-anchor" href="#taskqueue" aria-label="Permalink to &quot;taskQueue&quot;">​</a></h2><p><em>default: <code>async</code></em></p><p>设置 stencil 运行时使用的任务队列。任务队列调度跨帧的 DOM 读写，以有效地渲染和减少布局抖动。 默认情况下，使用 <code>async</code>。建议您尝试每种设置，以确定哪种最适合您的用例。 在所有情况下，如果你的应用程序有许多 CPU 密集型任务，导致主线程周期性地锁住， 总是建议尝试使用 <a href="./../guides/workers.html">Web worker</a> 来完成这些任务。</p><ul><li><p><code>congestionAsync</code>: DOM 读写被安排在下一帧进行，以防止布局抖动。 当应用程序的任务量很大，队列变得拥塞时，它会将工作分配给多个帧，以防止阻塞主线程。 然而，在某些情况下，它也会引入不必要的回流，尤其是在启动期间。 <code>congestionAsync</code> 非常适合应用程序在运行动画的同时执行密集的任务，这些任务可能会锁住主线程。</p></li><li><p><code>async</code>: DOM 读写被安排在下一帧进行，以防止布局抖动。在密集的 CPU 任务期间，它不会重新安排在下一帧渲染。 <code>async</code> 对于大多数应用程序都是理想的，如果应用程序有许多密集的任务导致主线程锁定， 建议尝试 <a href="./../guides/workers.html">Web worker</a> 而不是拥塞的异步队列。</p></li><li><p><code>immediate</code>: 使 writeTask() 和 readTask() 回调同步执行。任务不会被安排在下一帧运行，但至少有一个微任务。 <code>immediate</code>设置非常适合那些不提供长时间流畅动画的应用程序。 和 async 设置一样，如果应用程序有密集的任务导致主线程锁定，建议尝试 <a href="./../guides/workers.html">Web Workers</a>。</p></li></ul><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">taskQueue</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">async</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="testing" tabindex="-1">testing <a class="header-anchor" href="#testing" aria-label="Permalink to &quot;testing&quot;">​</a></h2><p>请查看 <a href="./../testing/config.html">testing config 文档</a>.</p><h2 id="transformaliasedimportpaths" tabindex="-1">transformAliasedImportPaths <a class="header-anchor" href="#transformaliasedimportpaths" aria-label="Permalink to &quot;transformAliasedImportPaths{#transformaliasedimportpaths}&quot;">​</a></h2><p><em>default: <code>true</code></em></p><p>这设置了 Stencil 是否应该将项目的 <code>tsconfig.json</code> 中设置的路径别名从分配的模块别名转换为已解析的相对路径。 这不会转换外部导入(如 <code>@stencil/core</code> )或相对导入(如 <code>../utils</code> )。</p><p>此选项全局适用，并将影响 Stencil 处理的所有代码。包括 <code>.d.ts</code> 文件和规范测试。</p><p>路径转换的示例如下所示。</p><p>首先，在 <code>tsconfig.json</code> 中有一组 <code>paths</code> 别名:</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-51GbC" id="tab-OwnOWyv" checked="checked"><label for="tab-OwnOWyv">tsconfig.json</label></div><div class="blocks"><div class="language-json active"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">compilerOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">paths</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">@utils</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../path/to/utils</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></div></div><p>然后输入以下内容：</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-Gbmmh" id="tab-Gxjc7jV" checked="checked"><label for="tab-Gxjc7jV">src/my-module.ts</label></div><div class="blocks"><div class="language-ts active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">utilFunc</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">UtilInterface</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@utils</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">util</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">arg</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UtilInterface</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">utilFunc</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">arg</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></div></div><p>Stencil 将产生以下输出：</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-2TeYQ" id="tab-_5sLbm4" checked="checked"><label for="tab-_5sLbm4">dist/my-module.js</label></div><div class="blocks"><div class="language-js active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">utilFunc</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../path/to/utils</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">util</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">arg</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">utilFunc</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">arg</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></div></div><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-pbDze" id="tab-rfwAzs3" checked="checked"><label for="tab-rfwAzs3">dist/my-module.d.ts</label></div><div class="blocks"><div class="language-ts active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">UtilInterface</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../path/to/utils</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">util</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">arg</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UtilInterface</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">;</span></span></code></pre></div></div></div><h2 id="validateprimarypackageoutputtarget" tabindex="-1">validatePrimaryPackageOutputTarget <a class="header-anchor" href="#validateprimarypackageoutputtarget" aria-label="Permalink to &quot;validatePrimaryPackageOutputTarget&quot;">​</a></h2><p><em>default: <code>false</code></em></p><p>当设置为 <code>true</code> 时，将根据设置输出目标的 <code>isPrimaryPackageOutputTarget</code> 标志来验证常见的 <code>package.json</code> 字段。</p><p>有关包验证的更多信息，请参阅<a href="./../output-targets/overview.html#primary-package-output-target-validation">output target docs</a>。</p>`,108),p=[o];function t(c,r,i,d,y,D){return a(),e("div",null,p)}const h=s(l,[["render",t]]);export{C as __pageData,h as default};