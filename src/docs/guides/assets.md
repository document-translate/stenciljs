---
description: 了解如何在组件中引用资产
---

# 资源

Stencil 组件可能需要一个或多个静态文件作为其设计的一部分。
这些类型的文件被称为 '资产'，包括图像、字体等。

在本指南中，我们将描述在文件系统上解析资源的不同策略。

:::info 提示
CSS 文件与资产文件的处理方式不同;有关使用 CSS 的更多信息，请参阅 [styling 文档](../components/styling)。
:::

## 资产基础路径{#asset-base-path}

**资源基础路径**是 Stencil 将用于解析资产的目录。
当组件使用资产时，资产的位置相对于资产基路径进行解析。

资产基路径会自动为以下输出目标设置：

- [dist](../output-targets/dist)
- [hydrate](./hydrate-app)
- [www](../output-targets/www)

对于所有其他输出目标，资源必须被[移动](#manually-moving-assets)并且资产的基础路径必须被[手动设置](#setassetpath)。

对于加载的每个 Stencil 运行时实例，都有一个单一的资产基路径。
通常，这意味着每个使用 Stencil 的应用程序只有一个资产基路径。

## 解决方案概览{#resolution-overview}

解析资产的过程包括要求 Stencil 在文件系统上构建到该资产的路径。

当资源的路径被构建时，解析总是在项目的编译输出中完成，而不是在包含原始源代码的目录中。

下面的示例使用 [`www` 输出目标](../output-targets/www)的输出来演示如何解析资源。
虽然示例使用了 `www` 构建的输出，但如何找到资源的一般原则适用于所有输出目标。

当使用 `www` 输出目标时，会自动创建一个 `build/` 目录并将其设置为资源基路径。
下面是一个 `build/` 目录及其包含的资源的例子。

```
www/
├── build/
│   ├── assets/
│   │   ├── logo.png
│   │   └── scenery/
│   │       ├── beach.png
│   │       └── sunset.png
│   └── other-assets/
│       └── font.tiff
└── ...
```

要解析资源的路径，可以使用 Stencil 的 [`getAssetPath()` API](#getassetpath)。
当使用 `getAssetPath` 时，上述目录结构中的资源将相对于 `build/` 解析。

下面的代码示例演示了 `getAssetPath` 对于不同的 `path` 参数的返回值。
返回值是 Stencil 构建的路径，用于在文件系统中检索资源。

```ts
// with an asset base path of "/build/":

// '/build/assets/logo.png'
getAssetPath("assets/logo.png");
// '/build/assets/scenery/beach.png'
getAssetPath("assets/scenery/beach.png");
// '/build/other-assets/font.tiff'
getAssetPath("other-assets/font.tiff");
```

## 使资产可用{#making-assets-available}

为了能够在运行时找到资源，它们需要在文件系统中从 Stencil 的输出中找到。
换句话说，我们需要确保它们存在于分发目录中。
本节描述如何使资产在资产基路径下可用。

### assetsDirs

`@Component` 装饰器可以[使用 `assetsDirs` 选项配置](../components/component#component-options)。
`assetsDirs` 接受一个字符串数组，其中每个条目是一个相对路径，从组件到包含组件所需资源的目录。

当使用 `dist` 或 `www` 输出目标时，设置 `assetsDirs` 会通知 Stencil 将该文件夹复制到分发文件夹中。
当使用其他输出目标时，Stencil 不会将资源复制到 distribution 文件夹中。

下面是一个示例项目的目录结构，其中包含一个示例组件和一个 assets 目录。

```
src/
└── components/
    ├── assets/
    │   ├── beach.jpg
    │   └── sunset.jpg
    └── my-component.tsx
```

下面，`my-component` 组件将根据它的 `image` 属性正确加载资源。

```tsx
// file: my-component.tsx
// 1. getAssetPath is imported from '@stencil/core'
import { Component, Prop, getAssetPath, h } from "@stencil/core";

@Component({
  tag: "my-component",
  // 2. assetsDirs lists the 'assets' directory as a relative
  //    (sibling) directory
  assetsDirs: ["assets"],
})
export class MyComponent {
  @Prop() image = "sunset.jpg";

  render() {
    // 3. the asset path is retrieved relative to the asset
    //    base path to use in the <img> tag
    const imageSrc = getAssetPath(`./assets/${this.image}`);
    return <img src={imageSrc} />;
  }
}
```

在上面的例子中，以下代码允许 `my-component` 显示提供的资源:

1. [`getAssetPath()`](#getassetpath) 是从 `@stencil/core` 导入的
2. `my-component` 的组件装饰器有 `assetsDirs` 属性，并列出兄弟目录 `assets`。这将把 `assets` 复制到分发目录。
3. `getAssetPath` 用于检索在 `<img>` 标签中使用的图像的路径

### 手动移动资产{#manually-moving-assets}

对于 [dist-custom-elements](../output-targets/custom-elements) 输出目标，像 `assetsDirs` 这样的选项不会将资源复制到分发目录。

建议使用打包工具(如 rollup)或 Stencil 的 `copy` 任务来确保静态资源被复制到分发目录中。

#### Stencil Copy Task

[Stencil `copy` task](../output-targets/copy-tasks) 可以用来定义要复制到分发目录中的文件和文件夹。

下面的例子展示了如何使用复制任务在项目的 `src` 目录下找到所有 `.jpg` 和 `.png` 文件，并在构建时将它们复制到 `dist/components/assets` 中。

```ts
import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "your-component-library",
  outputTargets: [
    {
      type: "dist-custom-elements",
      copy: [
        {
          src: "**/*.{jpg,png}",
          dest: "dist/components/assets",
          warn: true,
        },
      ],
    },
  ],
  // ...
};
```

#### Rollup 配置

[Rollup 插件](../config/plugins#rollup-plugins)可以用来定义要复制到分发目录中的文件和文件夹。

下面的例子展示了如何使用 `rollup-plugin-copy` NPM 模块在项目的 `src` 目录下找到所有 `.jpg` 和 `.png` 文件，
并在构建时将它们复制到 `dist/components/assets` 中。

```javascript
import { Config } from "@stencil/core";
import copy from "rollup-plugin-copy";

export const config: Config = {
  namespace: "copy",
  outputTargets: [
    {
      type: "dist-custom-elements",
    },
  ],
  rollupPlugins: {
    after: [
      copy({
        targets: [
          {
            src: "src/**/*.{jpg,png}",
            dest: "dist/components/assets",
          },
        ],
      }),
    ],
  },
};
```

## API 参考{#api-reference}

### getAssetPath{#get-asset-path}

`getAssetPath()` 是 Stencil 提供的一个 API，用于相对于资源基路径构建资源的路径。

```ts
/**
 * Builds a URL to an asset. This is achieved by combining the
 * provided `path` argument with the base asset path.
 * @param path the path of the asset to build a URL to
 * @returns the built URL
 */
declare function getAssetPath(path: string): string;
```

下面的代码示例演示了当设置了资源基础路径 `/build/` 时，对于不同的 `path` 参数，`getAssetPath` 的返回值。

```ts
// with an asset base path of "/build/":
// "/build/"
getAssetPath("");
// "/build/my-image.png"
getAssetPath("my-image.png");
// "/build/assets/my-image.png"
getAssetPath("assets/my-image.png");
// "/build/assets/my-image.png"
getAssetPath("./assets/my-image.png");
// "/assets/my-image.png"
getAssetPath("../assets/my-image.png");
// "/assets/my-image.png"
getAssetPath("/assets/my-image.png");
```

### setAssetPath{#setassetpath}

`setAssetPath` 是一个由 Stencil 提供的 API，用于手动设置可以找到资源的资源基础路径

```ts
/**
 * Set the base asset path for resolving components
 * @param path the base asset path
 * @returns the new base asset path
 */
export declare function setAssetPath(path: string): string;
```

调用此 API 将为附加到一个 Stencil 运行时的所有 Stencil 组件设置资产基路径。
因此，为了防止在使用组件时产生不必要的副作用，不应该在组件内部调用 `setAssetPath`。

如果调用 `setAssetPath` 的文件是一个模块，建议使用 `import.meta.url`。

或者，当在浏览器中工作时，可以使用 [`document.currentScript.src`](https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript)，
而不使用模块或环境变量(例如：`document.env.ASSET_PATH`) 来设置资源基路径。
这个配置取决于你的脚本是如何打包的(或者没有打包)，以及从哪里加载资源。
