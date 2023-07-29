---
description: Ember 与 Stencil 的集成
---

# Ember

得益于 `ember-cli-stencil` 插件，在 Ember 中使用 Stencil 组件非常简单。它处理：

- 将所需文件导入到 `vendor.js` 中
- 将组件定义复制到`assets`目录中
- 可选地生成一个包装组件，以提高与旧版本 Ember 的兼容性

首先安装 Ember 插件

```bash
ember install ember-cli-stencil
```

现在，当你构建应用程序时，依赖项中的 Stencil 集合将自动被发现并拉入应用程序。
你可以直接在你的 `hbs` 文件中开始使用自定义元素，而不需要进一步的工作。
更多信息，请查看 [`ember-cli-stencil` 文档](https://github.com/alexlafroscia/ember-cli-stencil)。
