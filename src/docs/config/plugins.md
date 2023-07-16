---
description: Plugin Config
---

# 插件{#plugins}

## Stencil 插件{#stencil-plugins}

默认情况下，Stencil 不支持 `Sass` 或 `PostCss`。但是，它们都可以使用 `plugins` 数组添加。

```tsx
import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  plugins: [sass()],
};
```

## Rollup 插件{#rollup plugins}

`rollupPlugins` 配置可以用来添加你自己的 [Rollup](https://rollupjs.org)插件。
在底层，stencil 内置了一些插件，包括 `node-resolve` 和 `commonjs`，因为 rollup 插件的执行顺序很重要，所以 stencil 提供了一个 API，
可以在 **node-resolve 之前**和 **commonjs 转换**之后注入自定义插件:

```tsx
export const config = {
  rollupPlugins: {
    before: [
      // Plugins injected before rollupNodeResolve()
      resolvePlugin(),
    ],
    after: [
      // Plugins injected after commonjs()
      nodePolyfills(),
    ],
  },
};
```

### 相关插件{#related-plugins}

- [@stencil/sass](https://www.npmjs.com/package/@stencil/sass)
- [@stencil-community/postcss](https://www.npmjs.com/package/@stencil-community/postcss)
- (弃用) [@stencil/less](https://www.npmjs.com/package/@stencil/less)
- (弃用) [@stencil/stylus](https://www.npmjs.com/package/@stencil/stylus)

## Node Polyfills

在 [Node Polyfills in Module bundling](../guides/module-bundling#node-polyfills) 查看其它示例。
