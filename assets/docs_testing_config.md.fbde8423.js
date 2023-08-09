import{_ as s,o as n,c as a,X as l}from"./chunks/framework.319defb2.js";const h=JSON.parse('{"title":"Testing Config","description":"Testing Config","frontmatter":{"description":"Testing Config"},"headers":[],"relativePath":"docs/testing/config.md","filePath":"docs/testing/config.md"}'),e={name:"docs/testing/config.md"},t=l(`<h1 id="testing-config" tabindex="-1">Testing Config <a class="header-anchor" href="#testing-config" aria-label="Permalink to &quot;Testing Config&quot;">​</a></h1><p>The <code>testing</code> config setting in <code>stencil.config.ts</code> specifies an object that corresponds to the jest configuration that should be used in your tests. Stencil provides a default configuration, which you likely won&#39;t need to edit, however it can be extended with the same configuration options as Jest. See the <a href="https://jestjs.io/docs/en/configuration.html" target="_blank" rel="noreferrer">Configuring Jest Guide</a> for configuration details.</p><div class="info custom-block"><p class="custom-block-title">提示</p><p>Keep in mind that the usual way of configuring Jest (<code>package.json</code> and <code>jest.config.js</code>) is not used with the <code>stencil testing</code> command. Jest can still be used, but configuring the presets, transpilation and setting up the correct commands must be done by the project.</p></div><p>Some additional Stencil specific options may be set here as well for configuring the e2e tests:</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TestingConfig</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">JestConfig</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * The \`allowableMismatchedPixels\` value is used to determine an acceptable</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * number of pixels that can be mismatched before the image is considered</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * to have changes. Realistically, two screenshots representing the same</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * content may have a small number of pixels that are not identical due to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * anti-aliasing, which is perfectly normal. If the \`allowableMismatchedRatio\`</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * is provided it will take precedence, otherwise \`allowableMismatchedPixels\`</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * will be used.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">allowableMismatchedPixels</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * The \`allowableMismatchedRatio\` ranges from \`0\` to \`1\` and is used to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * determine an acceptable ratio of pixels that can be mismatched before</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * the image is considered to have changes. Realistically, two screenshots</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * representing the same content may have a small number of pixels that</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * are not identical due to anti-aliasing, which is perfectly normal. The</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * \`allowableMismatchedRatio\` is the number of pixels that were mismatched,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * divided by the total number of pixels in the screenshot. For example,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * a ratio value of \`0.06\` means 6% of the pixels can be mismatched before</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * the image is considered to have changes. If the \`allowableMismatchedRatio\`</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * is provided it will take precedence, otherwise \`allowableMismatchedPixels\`</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * will be used.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">allowableMismatchedRatio</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Matching threshold while comparing two screenshots. Value ranges from \`0\` to \`1\`.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Smaller values make the comparison more sensitive. The \`pixelmatchThreshold\`</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * value helps to ignore anti-aliasing. Default: \`0.1\`</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">pixelmatchThreshold</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Additional arguments to pass to the browser instance.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">browserArgs</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Path to a Chromium or Chrome executable to run instead of the bundled Chromium.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">browserExecutablePath</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Whether to run browser e2e tests in headless mode.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   *</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * \`headless\` is an argument passed through to Puppeteer (which is passed to Chrome) for</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * end-to-end testing. Prior to Chrome v112, \`headless\` was treated like a boolean flag.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Starting with Chrome v112, &#39;new&#39; is an accepted option to support Chrome&#39;s new</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * headless mode.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   *</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * The following values are accepted:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * - &quot;new&quot; - enables the &quot;new&quot; headless mode, starting with Chrome 112</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * - \`true\` - enables the &quot;old&quot; headless mode, prior to Chrome 112</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * - \`false\` - enables the &quot;headful&quot; mode</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   *</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Stencil will default to \`true\` (the old headless mode) if no value is provided.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   *</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * In the future, Chrome will enable the new headless mode by default, even when \`true\`</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * is provided.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   *</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * {</span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">see</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">https://developer.chrome.com/articles/new-headless/}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">browserHeadless</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Whether to auto-open a DevTools panel for each tab.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * If this option is true, the headless option will be set false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">browserDevtools</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Slows down e2e browser operations by the specified amount of milliseconds.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Useful so that you can see what is going on.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">browserSlowMo</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Array of browser emulations to be using during e2e tests. A full e2e</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * test is ran for each emulation.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">emulate</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">EmulateConfig</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Path to the Screenshot Connector module.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">screenshotConnector</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">EmulateConfig</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Predefined device descriptor name, such as &quot;iPhone X&quot; or &quot;Nexus 10&quot;.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * For a complete list please see: https://github.com/puppeteer/puppeteer/blob/main/src/DeviceDescriptors.ts</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">device</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * User-Agent to be used. Defaults to the user-agent of the installed Puppeteer version.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">userAgent</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">viewport</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">EmulateViewport</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">EmulateViewport</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Page width in pixels.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * page height in pixels.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Specify device scale factor (can be thought of as dpr). Defaults to 1.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">deviceScaleFactor</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Whether the meta viewport tag is taken into account. Defaults to false.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">isMobile</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Specifies if viewport supports touch events. Defaults to false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">hasTouch</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Specifies if viewport is in landscape mode. Defaults to false.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">isLandscape</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div>`,5),o=[t];function p(c,i,r,y,f,C){return n(),a("div",null,o)}const F=s(e,[["render",p]]);export{h as __pageData,F as default};
