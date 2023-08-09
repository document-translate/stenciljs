import{_ as s,o as a,c as n,X as o}from"./chunks/framework.319defb2.js";const i=JSON.parse('{"title":"输出目标的拷贝任务","description":"Stencil Copy Tasks","frontmatter":{"description":"Stencil Copy Tasks"},"headers":[],"relativePath":"docs/output-targets/copy-tasks.md","filePath":"docs/output-targets/copy-tasks.md"}'),p={name:"docs/output-targets/copy-tasks.md"},l=o(`<h1 id="输出目标的拷贝任务" tabindex="-1">输出目标的拷贝任务 <a class="header-anchor" href="#输出目标的拷贝任务" aria-label="Permalink to &quot;输出目标的拷贝任务&quot;">​</a></h1><p>每个输出目标都可以有自己的 <code>copy</code> 配置，它是一个对象数组，定义了应该复制到输出目标的构建目录中的任何文件或文件夹。</p><h3 id="src" tabindex="-1">src <a class="header-anchor" href="#src" aria-label="Permalink to &quot;src&quot;">​</a></h3><p>数组中的每个对象都必须包含一个 <code>src</code> 属性，它可以是一个绝对路径，一个来自 <code>srcDir</code> 的相对路径，或者一个通配模式。默认情况下，复制到目标的项将使用与源相同的名称。</p><p>在下面的 <code>www</code> 输出目标示例中的 <code>copy</code> 配置中，构建将把整个目录从 <code>src/images</code> 复制到 <code>www/images</code> 。在这个例子中，由于没有设置 <code>srcDir</code> 属性，默认的源目录是 <code>src</code>。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">outputTargets</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">www</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">copy</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">src</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">images</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h3 id="dest" tabindex="-1">dest <a class="header-anchor" href="#dest" aria-label="Permalink to &quot;dest&quot;">​</a></h3><p>配置文件还可以提供一个可选的 <code>dest</code> 属性，它可以是一个绝对路径，也可以是输出目标的构建目录的相对路径。 在下面的例子中，我们将构建目录自定义为 <code>public</code> 而不是默认的，这会将 <code>src/files/fonts</code> 复制到 <code>public/static/web-fonts</code>。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">outputTargets</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">www</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">dir</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">public</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">copy</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">src</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">files/fonts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">dest</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">static/web-fonts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h3 id="warn" tabindex="-1">warn <a class="header-anchor" href="#warn" aria-label="Permalink to &quot;warn{#warn}&quot;">​</a></h3><p>默认情况下，如果文件或目录不可用，如果复制任务找不到它，则不会发出警告。要查看无法找到复制任务源的警告，请使用复制配置对象设置 <code>warn: true</code>。</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">outputTargets</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dist</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">copy</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">src</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">fonts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">warn</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span></code></pre></div>`,12),e=[l];function t(c,r,D,y,F,C){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};
