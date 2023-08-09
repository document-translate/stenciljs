import{_ as e,o,c as a,X as t}from"./chunks/framework.319defb2.js";const D=JSON.parse('{"title":"Component API","description":"Component API","frontmatter":{"sidebar_label":"API","description":"Component API","slug":"/api"},"headers":[],"relativePath":"docs/components/api.md","filePath":"docs/components/api.md"}'),n={name:"docs/components/api.md"},s=t(`<h1 id="component-api" tabindex="-1">Component API <a class="header-anchor" href="#component-api" aria-label="Permalink to &quot;Component API&quot;">​</a></h1><p>stencil 提供的整个 API 可以浓缩成一组装饰器、生命周期钩子和渲染方法。</p><h2 id="decorators" tabindex="-1">装饰器 <a class="header-anchor" href="#decorators" aria-label="Permalink to &quot;装饰器{#decorators}&quot;">​</a></h2><p>Decorators are a pure compiler-time construction used by stencil to collect all the metadata about a component, the properties, attributes and methods it might expose, the events it might emit or even the associated stylesheets. Once all the metadata has been collected, all the decorators are removed from the output, so they don&#39;t incur any runtime overhead.</p><ul><li><a href="./component.html#component-decorator">@Component()</a> declares a new web component</li><li><a href="./properties.html#the-prop-decorator-prop">@Prop()</a> declares an exposed property/attribute</li><li><a href="./state.html#the-state-decorator-state">@State()</a> declares an internal state of the component</li><li><a href="./reactive-data.html#the-watch-decorator-watch">@Watch()</a> declares a hook that runs when a property or state changes</li><li><a href="./host-element.html#element-decorator">@Element()</a> declares a reference to the host element</li><li><a href="./methods.html#method-decorator">@Method()</a> declares an exposed public method</li><li><a href="./events.html#event-decorator">@Event()</a> declares a DOM event the component might emit</li><li><a href="./events.html#listen-decorator">@Listen()</a> listens for DOM events</li></ul><h2 id="lifecycle-hooks" tabindex="-1">Lifecycle hooks <a class="header-anchor" href="#lifecycle-hooks" aria-label="Permalink to &quot;Lifecycle hooks&quot;">​</a></h2><ul><li><a href="./component-lifecycle.html#connectedcallback">connectedCallback()</a></li><li><a href="./component-lifecycle.html#disconnectedcallback">disconnectedCallback()</a></li><li><a href="./component-lifecycle.html#componentwillload">componentWillLoad()</a></li><li><a href="./component-lifecycle.html#componentdidload">componentDidLoad()</a></li><li><a href="./component-lifecycle.html#componentshouldupdate">componentShouldUpdate(newValue, oldValue, propName): boolean</a></li><li><a href="./component-lifecycle.html#componentwillrender">componentWillRender()</a></li><li><a href="./component-lifecycle.html#componentdidrender">componentDidRender()</a></li><li><a href="./component-lifecycle.html#componentwillupdate">componentWillUpdate()</a></li><li><a href="./component-lifecycle.html#componentdidupdate">componentDidUpdate()</a></li><li><strong><a href="./templating-and-jsx.html">render()</a></strong></li></ul><h2 id="componentonready" tabindex="-1">componentOnReady() <a class="header-anchor" href="#componentonready" aria-label="Permalink to &quot;componentOnReady()&quot;">​</a></h2><p>这不是一个在组件类定义中声明的真正的 &quot;生命周期&quot; 方法，而是一个实用方法；它可以用来实现检测你的 Stencil 组件何时完成其第一个渲染周期。</p><p>这个方法返回一个 Promise，该 Promise 在第一个渲染周期的 <code>componentDidRender()</code> 之后被调用。</p><div class="info custom-block"><p class="custom-block-title">提示</p><p><code>componentOnReady()</code>在每个组件的生命周期中只解析一次。如果你需要挂钩到后续的渲染周期，请使用 <code>componentDidRender()</code> 或 <code>componentDidUpdate()</code>。</p></div><p>Executing code after <code>componentOnReady()</code> resolves could look something like this:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// Get a reference to the element</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> el </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">my-component</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">componentOnReady</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// Place any code in here you want to execute when the component is ready</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">my-component is ready</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>The availability of <code>componentOnReady()</code> depends on the component&#39;s compiled output type. This method is only available for lazy-loaded distribution types (<a href="./../output-targets/dist.html"><code>dist</code></a> and <a href="./../output-targets/www.html"><code>www</code></a>) and, as such, is not available for <a href="./../output-targets/custom-elements.html"><code>dist-custom-elements</code></a> output. If you want to simulate the behavior of <code>componentOnReady()</code> for non-lazy builds, you can implement a helper method to wrap the functionality similar to what the Ionic Framework does <a href="https://github.com/ionic-team/ionic-framework/blob/main/core/src/utils/helpers.ts#L60-L79" target="_blank" rel="noreferrer">here</a>.</p><h2 id="the-appload-event" tabindex="-1">appload 事件 <a class="header-anchor" href="#the-appload-event" aria-label="Permalink to &quot;appload 事件{#the-appload-event}&quot;">​</a></h2><p>除了特定于组件的生命周期钩子之外，当应用及其所有子组件完成加载时，一个名为 <code>appload</code> 的特殊事件将被触发。你可以在 <code>window</code> 对象上监听它。</p><p>If you have multiple apps on the same page, you can determine which app emitted the event by checking <code>event.detail.namespace</code>. This will be the value of the <a href="./../config/overview.html#namespace">namespace config option</a> you&#39;ve set in your Stencil config.</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">appload</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">event</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">detail</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">namespace</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="other" tabindex="-1">Other <a class="header-anchor" href="#other" aria-label="Permalink to &quot;Other&quot;">​</a></h2><ul><li><p><a href="./host-element.html"><strong>Host</strong></a>: Host 是一个函数组件，可以在 <code>render</code> 函数的根节点使用，为宿主元素本身设置属性和事件监听器。</p></li><li><p><a href="./templating-and-jsx.html"><strong>h()</strong></a>: 它在 <code>render()</code> 中用于将 JSX 转换为虚拟的 DOM 元素。</p></li><li><p><a href="https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing" target="_blank" rel="noreferrer"><strong>readTask()</strong></a>: 调度 DOM-read 任务。提供的回调函数将在执行 DOM 读取的最佳时机执行，而不会导致布局混乱。</p></li><li><p><a href="https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing" target="_blank" rel="noreferrer"><strong>writeTask()</strong></a>: 调度 DOM-write 任务。提供的回调函数将在执行 DOM 变化的最佳时机执行，而不会导致布局混乱。</p></li><li><p><strong>forceUpdate()</strong>: 即使状态没有改变，也调度给定实例或元素的新渲染。请注意 <code>forceUpdate()</code> 不是同步的，可能在下一帧执行 DOM 渲染。</p></li><li><p>getAssetPath(): 获取本地资源的路径。参考 <a href="./../guides/assets.html#get-asset-path">Assets</a> 页面获取使用信息。</p></li><li><p>setMode()</p></li><li><p>getMode()</p></li><li><p>getElement()</p></li></ul>`,20),l=[s];function p(c,r,i,d,h,m){return o(),a("div",null,l)}const u=e(n,[["render",p]]);export{D as __pageData,u as default};