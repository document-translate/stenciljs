---
description: Stencil 配置
---

# Stencil 配置{#stencil-config}

在大多数情况下，`stencil.config.ts` 文件不需要任何自定义，因为 Stencil 自带了很多开箱即用的默认值。
一般来说，最好尽可能少配置。事实上，你甚至可以完全删除 `stencil.config.ts` 文件，应用程序仍然可以正常编译。
但与此同时，编译器可以使用此配置在最低级别进行配置。下面是许多可选的配置属性。

示例 `stencil.config.ts`:

```tsx
import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "MyApp",
  srcDir: "src",
};
```

## buildEs5

设置是否应该生成 ES5 版本。
默认值为 `false`。
将 `buildEs5` 设置为 `true` 也将为 dev 和 prod 模式创建 ES5 构建。
将 `buildEs5` 设置为 `prod` 只会在 prod 模式下构建 ES5。

```tsx
buildEs5: boolean | "prod";
```

## bundles

By default, Stencil will statically analyze the application and generate a component graph of how all the components are interconnected. From the component graph it is able to best decide how components should be grouped depending on their usage with one another within the app. By doing so it's able to bundle components together in order to reduce network requests. However, bundles can be manually generated using the `bundles` config.

The `bundles` config is an array of objects that represent how components are grouped together in lazy-loaded bundles. This config is rarely needed as Stencil handles this automatically behind the scenes.

```tsx
bundles: [
  { components: ["ion-button"] },
  { components: ["ion-card", "ion-card-header"] },
];
```

## cacheDir

_default: '.stencil'_

The directory where sub-directories will be created for caching when [`enableCache`](#enablecache) is set `true` or if using
[Stencil's Screenshot Connector](../testing/screenshot-connector).

Stencil 配置如下：

:::code-group

```ts [stencil.config.ts]
import { Config } from '@stencil/core';

export const config: Config = {
  ...,
  enableCache: true,
  cacheDir: '.cache',
  testing: {
    screenshotConnector: 'connector.js'
  }
}
```

:::

将产生以下文件结构：

```txt
stencil-project-root
└── .cache
    ├── .build <-- Where build related file caching is written
    |
    └── screenshot-cache.json <-- Where screenshot caching is written
```

## devServer

请查看 [Dev-Server 文档](./dev-server).

## enableCache{#enablecache}

_default: `true`_

Stencil 将缓存构建结果，以加快重建速度。要禁用此功能，请将 `enableCache` 设置为 `false`。

```tsx
enableCache: true;
```

## extras

请查看 [Extras docs](./extras).

## globalScript{#globalscript}

全局脚本配置选项接受一个文件路径字符串作为参数。

全局脚本在库/应用加载之前运行一次，所以你可以做一些事情，比如建立到外部服务的连接或配置你正在使用的库。

要执行的代码应该放在由全局脚本导出的默认函数中。确保全局脚本中的所有代码都包装在导出的函数中：

```javascript
export default function () {
  // or export default async function()
  initServerConnection();
}
```

:::info 提示
导出的函数也可以是 `async`。
:::

## globalStyle{#globalstyle}

Stencil 传统上用于将多个组件编译为应用程序，每个组件都有自己的划分样式。
然而，在所有组件和网站中保持“全局”样式仍然是很常见的。全局 CSS 文件通常用于设置 [CSS 变量](../components/styling)。

此外，`globalStyle` 配置可以用来预编译 Sass、PostCss 等等。

下面是一个包含 webapp 全局 css 文件`app.css`的示例文件夹结构。

```bash
src/
  components/
  global/
    app.css
```

全局样式配置接受一个文件路径字符串作为参数。此构建的输出将转到 `buildDir`。在这个例子中，它将被保存到 `www/build/app.css`。

```tsx
globalStyle: "src/global/app.css";
```

在 [styling docs](../components/styling#global-styles) 中查看如何在应用中使用全局样式。

## hashedFileNameLength

_default: `8`_

当 `hashFileNames` 配置设置为 `true` 时，并且它是一个生产构建，`hashedFileNameLength` 配置将用于确定文件名的哈希值应该是多少个字符。

```tsx
hashedFileNameLength: 8;
```

## hashFileNames

_default: `true`_

在生产构建过程中，每个生成的文件的内容会被散列以表示内容，散列值会被用作文件名。
如果内容在构建之间没有更新，那么它会收到相同的文件名。当内容更新时，文件名就不一样了。
通过这样做，部署的应用程序可以“永久缓存”构建目录，并充分利用内容分发网络(cdn)和大量缓存文件以获得更快的应用程序。

```tsx
hashFileNames: true;
```

## invisiblePrehydration

_default: `true`_

当设置为 `true` 时，`prehydration` 将在 hydration 之前通过向文档头部自动注入样式标签来隐藏组件。
将 `prehydration` 设置为 `false` 将不会将样式标签注入到头部，从而允许你为 web 组件预 hydration 设置样式。

:::info 提示
将 `invisiblePrehydration` 设置为 `false` 将导致页面加载时所有内容都可见，导致无样式内容 (FOUC) 的闪烁更加突出。
但是，您可以根据您的偏好设置 web 组件的备用内容。
:::

```tsx
invisiblePrehydration: true;
```

## minifyCss

_default: `true` in production_

当设置为 `true` 时，浏览器的 CSS 文件将被压缩。

## minifyJs{#minifyjs}

_default: `true` in production_

当设置为 `true` 时，浏览器的 JS 文件将被压缩。
Stencil 在底层使用 [Terser](https://terser.org/) 进行文件压缩。

## namespace{#namespace}

_default: `App`_

`namespace` 配置是一个代表应用命名空间的 `string`。对于不打算成为可重用组件库的应用，默认的 `app` 就可以了。
然而，如果应用程序打算作为第三方库使用，例如 `Ionic`，则需要一个唯一的命名空间。

```tsx
namespace: "Ionic";
```

## outputTargets

请查看 [Output Target 文档](../output-targets/overview).

## plugins

请查看 [插件文档](./plugins).

## preamble

_default: `undefined`_

`preamble` 配置字段是一个 `string` 类型的字段，用于帮助持久化 banner 或添加关于最终构建的相关信息，
它将被转换为固定注释，并放置在所有发出的 JavaScript 文件的顶部，任何发出的 polyfills 除外。
转义的换行符可以放在这个字段提供的值中，并且会被 Stencil 使用。

示例：

```tsx
preamble: "Built with Stencil\nCopyright (c) SomeCompanyInc.";
```

将生成以下注释：

```tsx
/*!
 * Built with Stencil
 * Copyright (c) SomeCompanyInc.
 */
```

## sourceMap

_default: `true`_

当省略或设置为 `true` 时，将为项目生成 sourcemap。
当设置为 `false` 时，将不会生成 sourcemap。

```tsx
sourceMap: true | false;
```

Sourcemap 创建了一个用 TypeScript/JSX 编写的 Stencil 组件和由 Stencil 输出的结果 JavaScript 之间的转换。
在项目中启用源映射可以改善 Stencil 组件的调试体验。
例如，它们允许外部工具(例如集成开发环境)直接在原始源代码中添加断点，这允许你逐行“单步执行”代码，检查变量中保存的值，观察逻辑流等。

请注意:在编译期间，Stencil 将始终尝试尽可能压缩组件的源代码。
当启用 `sourceMap` 时，与未启用 `sourceMap` 时生成的压缩结果相比，Stencil 生成的压缩结果可能略有不同。

开发人员负责确定他们是否选择在为组件提供服务的每个环境中提供 sourcemap，并相应地实现他们的决定。

## srcDir

_default: `src`_

`srcDir` 配置指定了包含每个组件源 typescript 文件的目录。Stencil 应用的标准是默认使用 `src`。

```tsx
srcDir: "src";
```

## taskQueue

_default: `async`_

设置 stencil 运行时使用的任务队列。任务队列调度跨帧的 DOM 读写，以有效地渲染和减少布局抖动。
默认情况下，使用 `async`。建议您尝试每种设置，以确定哪种最适合您的用例。
在所有情况下，如果你的应用程序有许多 CPU 密集型任务，导致主线程周期性地锁住，
总是建议尝试使用 [Web worker](../guides/workers) 来完成这些任务。

- `congestionAsync`: DOM 读写被安排在下一帧进行，以防止布局抖动。
  当应用程序的任务量很大，队列变得拥塞时，它会将工作分配给多个帧，以防止阻塞主线程。
  然而，在某些情况下，它也会引入不必要的回流，尤其是在启动期间。
  `congestionAsync` 非常适合应用程序在运行动画的同时执行密集的任务，这些任务可能会锁住主线程。

- `async`: DOM 读写被安排在下一帧进行，以防止布局抖动。在密集的 CPU 任务期间，它不会重新安排在下一帧渲染。
  `async` 对于大多数应用程序都是理想的，如果应用程序有许多密集的任务导致主线程锁定，
  建议尝试 [Web worker](../guides/workers) 而不是拥塞的异步队列。

- `immediate`: 使 writeTask() 和 readTask() 回调同步执行。任务不会被安排在下一帧运行，但至少有一个微任务。
  `immediate`设置非常适合那些不提供长时间流畅动画的应用程序。
  和 async 设置一样，如果应用程序有密集的任务导致主线程锁定，建议尝试 [Web Workers](../guides/workers)。

```tsx
taskQueue: "async";
```

## testing

请查看 [testing config 文档](../testing/config).

## transformAliasedImportPaths{#transformaliasedimportpaths}

_default: `true`_

这设置了 Stencil 是否应该将项目的 `tsconfig.json` 中设置的路径别名从分配的模块别名转换为已解析的相对路径。
这不会转换外部导入(如 `@stencil/core` )或相对导入(如 `../utils` )。

此选项全局适用，并将影响 Stencil 处理的所有代码。包括 `.d.ts` 文件和规范测试。

路径转换的示例如下所示。

首先，在 `tsconfig.json` 中有一组 `paths` 别名:

:::code-group

```json [tsconfig.json]
{
  "compilerOptions": {
    "paths": {
      "@utils": ["../path/to/utils"]
    }
  }
}
```

:::

然后输入以下内容：

:::code-group

```ts [src/my-module.ts]
import { utilFunc, UtilInterface } from "@utils";

export function util(arg: UtilInterface) {
  utilFunc(arg);
}
```

:::

Stencil 将产生以下输出：

:::code-group

```js [dist/my-module.js]
import { utilFunc } from "../path/to/utils";
export function util(arg) {
  utilFunc(arg);
}
```

:::

:::code-group

```ts [dist/my-module.d.ts]
import { UtilInterface } from "../path/to/utils";
export declare function util(arg: UtilInterface): void;
```

:::

## validatePrimaryPackageOutputTarget

_default: `false`_

当设置为 `true` 时，将根据设置输出目标的 `isPrimaryPackageOutputTarget` 标志来验证常见的 `package.json` 字段。

有关包验证的更多信息，请参阅[output target docs](../output-targets/overview#primary-package-output-target-validation)。
