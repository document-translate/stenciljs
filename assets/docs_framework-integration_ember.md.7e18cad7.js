import{_ as e,o as a,c as t,X as s}from"./chunks/framework.319defb2.js";const h=JSON.parse('{"title":"Ember","description":"Ember 与 Stencil 的集成","frontmatter":{"description":"Ember 与 Stencil 的集成"},"headers":[],"relativePath":"docs/framework-integration/ember.md","filePath":"docs/framework-integration/ember.md"}'),r={name:"docs/framework-integration/ember.md"},o=s('<h1 id="ember" tabindex="-1">Ember <a class="header-anchor" href="#ember" aria-label="Permalink to &quot;Ember&quot;">​</a></h1><p>得益于 <code>ember-cli-stencil</code> 插件，在 Ember 中使用 Stencil 组件非常简单。它处理：</p><ul><li>将所需文件导入到 <code>vendor.js</code> 中</li><li>将组件定义复制到<code>assets</code>目录中</li><li>可选地生成一个包装组件，以提高与旧版本 Ember 的兼容性</li></ul><p>首先安装 Ember 插件</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ember</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ember-cli-stencil</span></span></code></pre></div><p>现在，当你构建应用程序时，依赖项中的 Stencil 集合将自动被发现并拉入应用程序。 你可以直接在你的 <code>hbs</code> 文件中开始使用自定义元素，而不需要进一步的工作。 更多信息，请查看 <a href="https://github.com/alexlafroscia/ember-cli-stencil" target="_blank" rel="noreferrer"><code>ember-cli-stencil</code> 文档</a>。</p>',6),c=[o];function l(n,i,p,d,m,b){return a(),t("div",null,c)}const f=e(r,[["render",l]]);export{h as __pageData,f as default};
