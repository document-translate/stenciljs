import{_ as s,o as a,c as n,X as l}from"./chunks/framework.319defb2.js";const d=JSON.parse('{"title":"快速上手","description":"快速上手","frontmatter":{"description":"快速上手"},"headers":[],"relativePath":"docs/introduction/getting-started.md","filePath":"docs/introduction/getting-started.md"}'),p={name:"docs/introduction/getting-started.md"},o=l(`<h1 id="getting-started" tabindex="-1">快速上手 <a class="header-anchor" href="#getting-started" aria-label="Permalink to &quot;快速上手{#getting-started}&quot;">​</a></h1><h2 id="starting-a-new-project" tabindex="-1">开始一个新项目 <a class="header-anchor" href="#starting-a-new-project" aria-label="Permalink to &quot;开始一个新项目{#starting-a-new-project}&quot;">​</a></h2><h3 id="prerequisites" tabindex="-1">前置条件 <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;前置条件{#prerequisites}&quot;">​</a></h3><p>Stencil 需要最新的 LTS 版本的 <a href="https://nodejs.org/" target="_blank" rel="noreferrer">NodeJS</a> 和 npm/yarn。在继续之前，请确保已经安装或更新了 Node。</p><h3 id="running-the-create-stencil-cli" tabindex="-1">运行 <code>create-stencil</code> CLI <a class="header-anchor" href="#running-the-create-stencil-cli" aria-label="Permalink to &quot;运行 \`create-stencil\` CLI{#running-the-create-stencil-cli}&quot;">​</a></h3><p><code>create-stencil</code> 命令行可以用来创建一个新的 Stencil 项目，可以使用以下命令运行:</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-eygr0" id="tab-9sry_ck" checked="checked"><label for="tab-9sry_ck">npm</label><input type="radio" name="group-eygr0" id="tab-HphN5fW"><label for="tab-HphN5fW">yarn</label><input type="radio" name="group-eygr0" id="tab-kEClAu5"><label for="tab-kEClAu5">pnpm</label></div><div class="blocks"><div class="language-bash active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stencil</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stencil</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stencil</span></span></code></pre></div></div></div><p>Stencil 可以用来创建独立组件，也可以用来创建整个应用程序。 <code>create-stencil</code>将提供一个提示，以便您可以选择要创建的项目类型:</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">? Select a starter project.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Starters marked as [community] are developed by the Stencil</span></span>
<span class="line"><span style="color:#A6ACCD;">Community, rather than Ionic. For more information on the</span></span>
<span class="line"><span style="color:#A6ACCD;">Stencil Community, please see github.com/stencil-community</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">❯   component                Collection of web components that can be</span></span>
<span class="line"><span style="color:#A6ACCD;">                             used anywhere</span></span>
<span class="line"><span style="color:#A6ACCD;">    app [community]          Minimal starter for building a Stencil</span></span>
<span class="line"><span style="color:#A6ACCD;">                             app or website</span></span>
<span class="line"><span style="color:#A6ACCD;">    ionic-pwa [community]    Ionic PWA starter with tabs layout and routes</span></span></code></pre></div><p>选择 &#39;component&#39; 选项将提示您输入项目的名称。 这里，我们将我们的项目命名为 &#39;my-first-stencil-project&#39;:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">✔</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Pick</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">starter</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">›</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">component</span></span>
<span class="line"><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> Project name › my-first-stencil-project</span></span></code></pre></div><p>在按下 <code>ENTER</code> 确认您的选择后，CLI 将在与提供的项目名称匹配的目录中为我们生成一个 Stencil 项目。 成功创建项目后，CLI 将在控制台打印类似下面的内容:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">✔</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Project</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">›</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my-first-stencil-project</span></span>
<span class="line"><span style="color:#FFCB6B;">✔</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">All</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">setup</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">26</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ms</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">We</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">suggest</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">that</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">you</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">begin</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">by</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">typing:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my-first-stencil-project</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">Starts</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">the</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">development</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">Builds</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">your</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">project</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">production</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mode.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">Starts</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">the</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">runner.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Further</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">reading:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://github.com/ionic-team/stencil-component-starter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Happy</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">coding!</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">🎈</span></span></code></pre></div><p>第一部分描述了完成项目引导所需的几个命令。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my-first-stencil-project</span></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span></span></code></pre></div><p>这会将当前目录更改为 <code>my-first-stencil-project</code> ，为您安装依赖项，并启动开发服务器</p><h3 id="useful-initial-commands" tabindex="-1">有用的初始命令 <a class="header-anchor" href="#useful-initial-commands" aria-label="Permalink to &quot;有用的初始命令{#useful-initial-commands}&quot;">​</a></h3><p><code>create-stencil</code> 输出的第二部分描述了开发过程中可用的一些有用命令</p><ul><li><p><code>npm start</code> 启动本地开发服务器。开发服务器将打开一个新的浏览器选项卡，其中包含项目的组件。当你修改组件时，dev-server 使用热模块重载来更新浏览器中的组件，以获得快速的反馈周期。</p></li><li><p><code>npm run build</code> 构建组件的生产版本。这一步生成的组件不能在本地开发服务器中使用，而是要在使用组件的项目中使用。</p></li><li><p><code>npm test</code> 运行项目的测试。<code>create-stencil</code> 命令行在搭建项目时创建了端到端测试和单元测试。</p></li></ul><p>At this time, Stencil does not interact with any version control systems (VCS) when running the <code>create-stencil</code> CLI. If you wish to place your project under version control, we recommend initializing your VCS now. If you wish to use git, run the following after changing your current directory to the root of your Stencil project:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-A</span></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">commit</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">initialize project using stencil cli</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h2 id="my-first-component" tabindex="-1">我的第一个组件 <a class="header-anchor" href="#my-first-component" aria-label="Permalink to &quot;我的第一个组件{#my-first-component}&quot;">​</a></h2><p>通过添加一个后缀为 <code>.tsx</code> 的新文件来创建 Stencil 组件。例如 <code>my-component.tsx</code>。 因为 Stencil 组件是使用 <a href="./../components/templating-and-jsx.html">JSX</a> 和 TypeScript 构建的，所以需要 tsx 的扩展。</p><p>当我们运行上面的 <code>create-stencil</code> 时，它生成了一个组件 <code>my-component.tsx</code>。你可以在 <code>src/components/my-component</code> 目录下找到它：</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-QMPq-" id="tab-39_hDhq" checked="checked"><label for="tab-39_hDhq">my-component.tsx</label></div><div class="blocks"><div class="language-tsx active"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Component</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Prop</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">h</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@stencil/core</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">format</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../../utils/utils</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tag</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">my-component</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">styleUrl</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">my-component.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">shadow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyComponent</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Prop</span><span style="color:#A6ACCD;">() </span><span style="color:#F07178;">first</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Prop</span><span style="color:#A6ACCD;">() </span><span style="color:#F07178;">middle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Prop</span><span style="color:#A6ACCD;">() </span><span style="color:#F07178;">last</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">getText</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">format</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">first</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">middle</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">last</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Hello, World! I&#39;m </span><span style="color:#89DDFF;">{this.</span><span style="color:#82AAFF;">getText</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">}&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></div></div><p>编译后，这个组件就可以像其他标签一样在 HTML 中使用。</p><div class="language-md"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;my-component first=&quot;Stencil&quot; middle=&quot;&#39;Don&#39;t call me a framework&#39;&quot; last=&quot;JS&quot;&gt;&lt;/my-component&gt;</span></span></code></pre></div><p>渲染后，浏览器将显示 <code>Hello World! I&#39;m Stencil &#39;Don&#39;t call me a framework&#39; JS</code>.</p><h3 id="anatomy-of-my-component" tabindex="-1"><code>my-component</code> 剖析 <a class="header-anchor" href="#anatomy-of-my-component" aria-label="Permalink to &quot;\`my-component\` 剖析{#anatomy-of-my-component}&quot;">​</a></h3><p>让我们深入了解并逐行分析 <code>my-component</code> 中发生了什么。</p><p>import 语句之后，我们看到的第一个部分是 <a href="./../components/component.html"><code>@Component</code> 装饰器</a>:</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tag</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">my-component</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">styleUrl</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">my-component.css</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">shadow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>这个装饰器为 Stencil 编译器提供了组件的元数据。 例如要使用的自定义元素名称( <code>tag</code> )等信息可以在这里设置。 这个装饰器告诉 Stencil：</p><ul><li>设置 <a href="./../components/component.html#tag">元素名字</a> 为 &#39;my-component&#39;</li><li><a href="./../components/component.html#styleurl">应用样式表</a> &#39;my-component.css&#39; 到组件</li><li>为该组件启用 <a href="./../components/component.html#shadow">原生 Shadow DOM 功能</a></li></ul><p>在 <code>@Component()</code> 装饰器下面，我们有一个标准的 JavaScript 类声明:</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyComponent</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span></code></pre></div><p>在这个类中，您将编写大量代码，以使 Stencil 组件栩栩如生。</p><p>接下来，该组件包含三个类成员：<code>first</code>、 <code>middle</code> 和 <code>last</code>。 这些类的每个成员都应用了 <a href="./../components/properties.html#the-prop-decorator-prop"><code>@Prop()</code> 装饰器</a>：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Prop</span><span style="color:#A6ACCD;">() </span><span style="color:#FFCB6B;">first</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Prop</span><span style="color:#A6ACCD;">() </span><span style="color:#FFCB6B;">middle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Prop</span><span style="color:#A6ACCD;">() </span><span style="color:#FFCB6B;">last</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> string</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p><code>@Prop()</code> 告诉 Stencil 该属性对组件是公共的，并允许 Stencil 在这些公共属性发生变化时重新渲染。 在讨论完 <code>render()</code> 函数后，我们将看到它是如何工作的。</p><p>为了让组件在屏幕上渲染一些东西，我们必须声明一个返回 JSX 的 <a href="./../components/templating-and-jsx.html#basics"><code>render()</code> 函数</a>。 如果你不确定 JSX 是什么，请务必参考 <a href="./../components/templating-and-jsx.html">使用 JSX</a> 文档。</p><p>简单地说，我们的呈现函数需要返回我们想要推送到 DOM 的 HTML 的表示形式。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">private </span><span style="color:#82AAFF;">getText</span><span style="color:#A6ACCD;">(): string </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">format</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">first</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">middle</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">last</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Hello, World! I&#39;m </span><span style="color:#89DDFF;">{this.</span><span style="color:#82AAFF;">getText</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">}&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>这个组件的 <code>render()</code> 返回一个 <code>&lt;div&gt;</code> 元素，包含要渲染到屏幕上的文本。</p><p><code>render()</code> 函数通过 <code>getText</code> 函数使用了所有三个用 <code>@Prop()</code> 修饰的类成员。 声明像 <code>getText</code> 这样的私有函数有助于将逻辑从 <code>render()</code> 函数的 JSX 中提取出来。</p><p>任何用 <code>@Prop()</code> 修饰的属性也会被自动监视变化。 如果我们组件的用户要更改元素的 <code>first</code>、<code>middle</code> 或 <code>last</code> 属性，我们的组件将再次触发它的 <code>render()</code> 函数，更新显示的内容。</p><h2 id="component-generator" tabindex="-1">组件生成器 <a class="header-anchor" href="#component-generator" aria-label="Permalink to &quot;组件生成器{#component-generator}&quot;">​</a></h2><p><code>create-stencil</code> CLI 可以为你生成新组件。 如果使用了其中一个启动器，则可以简单地在项目中运行名为 <code>generate</code> 的 npm 脚本，该脚本将启动交互式生成器。</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-UVFR9" id="tab-3bW8oTw" checked="checked"><label for="tab-3bW8oTw">npm</label><input type="radio" name="group-UVFR9" id="tab-acgQ9wg"><label for="tab-acgQ9wg">yarn</label><input type="radio" name="group-UVFR9" id="tab-5OKlwE_"><label for="tab-5OKlwE_">pnpm</label></div><div class="blocks"><div class="language-bash active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">generate</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">generate</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">generate</span></span></code></pre></div></div></div><p>你可以直接使用 <code>generate</code> 命令(简称 <code>g</code>) 调用 Stencil CLI。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">stencil</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">generate</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># or</span></span>
<span class="line"><span style="color:#FFCB6B;">stencil</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">g</span></span></code></pre></div><p>如果你想在 stencil 项目之外运行 <code>stencil generate</code>，它可以全局安装。 要做到这一点，请在上面的命令前加上 <a href="https://docs.npmjs.com/cli/v9/commands/npx" target="_blank" rel="noreferrer"><code>npx</code></a>，就像这样:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stencil</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">generate</span></span></code></pre></div><p>运行以 <code>npx</code> 为前缀的命令会自动为你获取包并提示你安装它。 安装后，Stencil 将运行任务来脚手架一个新组件。</p><p>您可以选择将组件标签名称直接传递给命令。 组件标签名必须是小写的，并且至少包含一个破折号(<code>-</code>)。</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">stencil</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">generate</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my-new-component</span></span></code></pre></div><p>生成器会询问你要生成哪些文件。 这允许您创建样式表、 spec 和 e2e 测试以及组件文件。</p><p>所有组件都将在 <code>src/components</code> 文件夹中生成。 在该目录中，将创建一个与您提供的组件标签名称相同的文件夹，文件将在该文件夹中生成。 也可以指定一个或多个子文件夹来生成组件。</p><p>例如，如果指定 <code>pages/page-home</code> 作为组件标签名，则文件将在 <code>src/components/pages/page-home</code> 中生成。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">stencil</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">generate</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pages/page-home</span></span></code></pre></div><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">src</span></span>
<span class="line"><span style="color:#A6ACCD;">└── components</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── pages</span></span>
<span class="line"><span style="color:#A6ACCD;">        └── page-home</span></span>
<span class="line"><span style="color:#A6ACCD;">            ├── page-home.css</span></span>
<span class="line"><span style="color:#A6ACCD;">            ├── page-home.e2e.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">            ├── page-home.spec.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">            └── page-home.tsx</span></span></code></pre></div><h2 id="updating-stencil" tabindex="-1">更新 Stencil <a class="header-anchor" href="#updating-stencil" aria-label="Permalink to &quot;更新 Stencil{#updating-stencil}&quot;">​</a></h2><p>要获得 <code>@stencil/core</code> 的最新版本，您可以运行:</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-YuZS_" id="tab-CbmjljP" checked="checked"><label for="tab-CbmjljP">npm</label><input type="radio" name="group-YuZS_" id="tab-IduActh"><label for="tab-IduActh">yarn</label><input type="radio" name="group-YuZS_" id="tab-aZOki0m"><label for="tab-aZOki0m">pnpm</label></div><div class="blocks"><div class="language-bash active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@stencil/core@latest</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-exact</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@stencil/core@latest</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-exact</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@stencil/core@latest</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-exact</span></span></code></pre></div></div></div>`,64),e=[o];function t(c,r,i,y,C,D){return a(),n("div",null,e)}const F=s(p,[["render",t]]);export{d as __pageData,F as default};