import{_ as s,o as n,c as e,X as o}from"./chunks/framework.319defb2.js";const d=JSON.parse('{"title":"Testing","description":"Testing overview.","frontmatter":{"description":"Testing overview."},"headers":[],"relativePath":"docs/testing/overview.md","filePath":"docs/testing/overview.md"}'),a={name:"docs/testing/overview.md"},t=o(`<h1 id="testing" tabindex="-1">Testing <a class="header-anchor" href="#testing" aria-label="Permalink to &quot;Testing&quot;">​</a></h1><p>In order to ensure that your Stencil components work the way you expect, Stencil provides testing support out of the box. Stencil offers both unit testing and end-to-end testing capabilities.</p><h2 id="unit-testing-vs-end-to-end-testing" tabindex="-1">Unit Testing vs. End-to-end Testing <a class="header-anchor" href="#unit-testing-vs-end-to-end-testing" aria-label="Permalink to &quot;Unit Testing vs. End-to-end Testing&quot;">​</a></h2><p>Testing within Stencil is broken up into two distinct types: Unit tests and End-to-end (e2e) tests.</p><p>There are several philosophies on how testing should be done, and how to differentiate what should be considered a unit test versus an end-to-end test. Stencil takes an opinionated stance so developers have a description of each to better choose when to use each type of testing:</p><p><strong>Unit tests</strong> focus on testing a component&#39;s methods in isolation. For example, when a method is given the argument <code>X</code>, it should return <code>Y</code>.</p><p><strong>End-to-end tests</strong> focus on how the components are rendered in the DOM and how the individual components work together. For example, when <code>my-component</code> has the <code>X</code> attribute, the child component then renders the text <code>Y</code>, and expects to receive the event <code>Z</code>.</p><p>Both types of testing use <a href="https://jestjs.io/" target="_blank" rel="noreferrer">Jest</a> as the JavaScript testing solution. End-to-end tests also use <a href="https://pptr.dev/" target="_blank" rel="noreferrer">Puppeteer</a> instead of a Node environment. This allows end-to-end tests to run within an actual browser in order to provide more realistic results.</p><h2 id="library-support" tabindex="-1">Library Support <a class="header-anchor" href="#library-support" aria-label="Permalink to &quot;Library Support&quot;">​</a></h2><p>Stencil uses <a href="https://jestjs.io/" target="_blank" rel="noreferrer">Jest</a> and <a href="https://pptr.dev/" target="_blank" rel="noreferrer">Puppeteer</a> as its testing libraries, and allows developers to install both libraries using their preferred package manager.</p><p>If you created a project using <code>npm init stencil</code>, these libraries were installed for you. Depending on when your project was created, you may or may not have the latest supported version installed.</p><p>To view current version support for both Jest and Puppeteer, please see the <a href="./../reference/support-policy.html#testing-libraries">Stencil support policy for testing libraries</a>.</p><h2 id="testing-commands" tabindex="-1">Testing Commands <a class="header-anchor" href="#testing-commands" aria-label="Permalink to &quot;Testing Commands&quot;">​</a></h2><p>Stencil tests are run using the command <code>stencil test</code>, followed by one or more optional flags:</p><ul><li><code>--spec</code> to run unit tests</li><li><code>--e2e</code> to run end-to-end tests</li><li><code>--watchAll</code> to watch the file system for changes, and rerun tests when changes are detected</li></ul><p>When the <code>--spec</code> and/or <code>--e2e</code> flags are provided, Stencil will automatically run the tests associated with each flag.</p><p>Below a series of example <code>npm</code> scripts which can be added to the project&#39;s <code>package.json</code> file to run Stencil tests:</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stencil test --spec</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">test.watch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stencil test --spec --watchAll</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">test.end-to-end</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stencil test --e2e</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>Each command above begins with <code>stencil test</code>, which tells Stencil to run tests. Note that each <code>stencil test</code> command in example above is followed one or more of the optional flags. Looking at each script, one at a time:</p><ul><li>the <code>test</code> script runs unit tests for our Stencil project.</li><li>the <code>test.watch</code> script runs unit tests for our Stencil project. It watches the filesystem for changes, and reruns tests when changes are detected.</li><li>the <code>test.end-to-end</code> script runs the end-to-end tests for our Stencil project.</li></ul><p>If you created a project using <code>npm init stencil</code>, these scripts are provided to you automatically.</p><p>Stencil does not prescribe any specific naming convention for the names of your scripts. The <code>test.watch</code> script could as easily be named <code>test-watch</code>, <code>test.incremental</code>, etc. As long as the script itself uses the <code>stencil test</code> command, your tests should be run.</p><h3 id="testing-configuration" tabindex="-1">Testing Configuration <a class="header-anchor" href="#testing-configuration" aria-label="Permalink to &quot;Testing Configuration&quot;">​</a></h3><p>Stencil will apply defaults from data it has already gathered. For example, Stencil already knows what directories to look through, and what files are spec and e2e files. Jest can still be configured using the same config names, but now using the stencil config <code>testing</code> property. Please see the <a href="./config.html#testing-config">Testing Config docs</a> for more info.</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Config</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@stencil/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> config</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Config</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">testing</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">testPathIgnorePatterns</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><h2 id="running-and-debugging-tests-in-vs-code" tabindex="-1">Running and Debugging Tests in VS Code <a class="header-anchor" href="#running-and-debugging-tests-in-vs-code" aria-label="Permalink to &quot;Running and Debugging Tests in VS Code&quot;">​</a></h2><p>Adding the following configurations to <code>.vscode/launch.json</code> will allow you to use the VS Code Debugger to run the Stencil test runner for the currently active file in your editor.</p><p>To use the below configuration:</p><ol><li>Ensure the test file you want to run is open and in the current active window in VS Code.</li><li>Select the debug configuration to run: <ol><li>&#39;E2E Test Current File&#39; will run the end-to-end tests in the active test file</li><li>&#39;Spec Test Current File&#39; will run the spec tests in the active test file</li></ol></li><li>Hit the play button to start the test.</li></ol><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">configurations</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">node</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">request</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">launch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">E2E Test Current File</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">cwd</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\${workspaceFolder}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">program</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\${workspaceFolder}/node_modules/.bin/stencil</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">args</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">--e2e</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">--</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">--maxWorkers=0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\${fileBasename}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">console</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">integratedTerminal</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">internalConsoleOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">neverOpen</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">node</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">request</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">launch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Spec Test Current File</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">cwd</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\${workspaceFolder}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">program</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\${workspaceFolder}/node_modules/.bin/stencil</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">args</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">--spec</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">--</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\${fileBasename}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">console</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">integratedTerminal</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">internalConsoleOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">neverOpen</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Windows users: The <code>program</code> value should be set to <code>&quot;\${workspaceFolder}/node_modules/bin/stencil&quot;</code>. If that value does not work, please try<code>&quot;\${workspaceFolder}/node_modules/@stencil/core/bin/stencil&quot;</code>.</p></div><p>The configuration above makes use of special VS Code variables, such as <code>\${workspaceFolder}</code>. These variables are substituted with actual values upon starting the tests. For more information regarding the values these variables resolve to, please see VS Code&#39;s <a href="https://code.visualstudio.com/docs/editor/variables-reference" target="_blank" rel="noreferrer">Variables Reference documentation</a>.</p><h2 id="other-resources" tabindex="-1">Other Resources <a class="header-anchor" href="#other-resources" aria-label="Permalink to &quot;Other Resources&quot;">​</a></h2><ul><li><a href="https://eliteionic.com/tutorials/the-basics-of-unit-testing-in-stencil-js/" target="_blank" rel="noreferrer">The Basics of Unit Testing in StencilJS</a></li></ul>`,34),l=[t];function p(r,c,i,D,F,y){return n(),e("div",null,l)}const C=s(a,[["render",p]]);export{d as __pageData,C as default};
