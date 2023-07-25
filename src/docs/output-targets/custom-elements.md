---
description: Custom Elements with Stencil
---

# 自定义元素{#custom-elements}

`dist-custom-elements` 输出目标创建直接扩展 `HTMLElement` 的自定义元素，并提供简单的实用函数，以便在[自定义元素注册表](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry)上轻松定义这些元素。这个输出目标非常适合用于处理打包、懒加载和自定义元素注册的前端框架和项目。

如果不需要或不需要懒加载功能，这个目标也可以在框架之外使用。要使用惰性加载的 Stencil 组件，请参考[dist 输出目标](./dist)。

要使用 `dist-custom-elements` 输出目标生成组件，请将其添加到项目的 `stencil.config.ts` 文件中，如下所示：

:::code-group

```tsx [stencil.config.ts]
import { Config } from "@stencil/core";

export const config: Config = {
  // Other top-level config options here
  outputTargets: [
    {
      type: "dist-custom-elements",
      // Output target config options here
    },
    // Other output targets here
  ],
};
```

:::

## 配置{#config}

### copy

_默认值: `undefined`_

在构建过程中执行的 [copy tasks](./copy-tasks) 数组。

### customElementsExportBehavior

_默认值: `'default'`_

默认情况下，`dist-custom-elements` 输出目标为每个组件生成一个文件，并分别导出这些文件。

在某些情况下，库的作者可能想要改变这种行为，例如自动定义组件子组件，提供一个包含所有组件导出的文件，等等。

此配置选项提供其他行为，这些行为将更改此目标的默认组件导出或自定义元素定义行为。在项目的 Stencil 配置文件中，可以通过以下方式设置所需的行为:

```ts
// stencil.config.ts
import { Config } from "@stencil/core";

export const config: Config = {
  outputTargets: [
    {
      type: "dist-custom-elements",
      customElementsExportBehavior:
        "default" |
        "auto-define-custom-elements" |
        "bundle" |
        "single-export-module",
    },
    // ...
  ],
  // ...
};
```

| 选项                          | 描述                                                                                                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `default`                     | 不会执行额外的重新导出或自动定义行为。<br/>如果在配置中没有设置显式值，或者给定的值不是有效选项，则使用此值。                                                            |
| `auto-define-custom-elements` | 当组件的模块被导入时，组件及其子组件将自动使用 `CustomElementRegistry` 定义。                                                                                            |
| `bundle`                      | 从输出目录的 `index.js` 文件中导出一个实用的 `defineCustomElements()` 函数。此函数可用于在自定义元素注册表上快速定义项目中的所有 Stencil 组件。                          |
| `single-export-module`        | 所有组件和自定义元素定义的辅助函数都将从输出目录中的`index.js`文件中导出。当分发组件库时，这个文件可以用作根模块，请参阅[下面](#consuming-custom-elements)了解更多细节。 |

:::info 提示
此时，不使用 JSX 的组件无法自动定义。这是 Stencil 的一个已知限制，用户应该知道。
:::

### dir

_default: `'dist/components'`_

此配置选项允许您更改将写入此输出目标的编译输出的输出目录。

### empty

_默认值: `true`_

将此标志设置为 `true` 将在构建之间删除[输出目录](#dir)的内容。

### externalRuntime{#externalruntime}

_默认值: `true`_

将此标志设置为 `true` 会导致以下行为：

1. 压缩将遵循 [Stencil config](../config/overview#minifyjs) 中指定的内容。
2. 文件名不会被哈希。
3. 所有从 `@stencil/core/*` 下导入的包都将被标记为外部，因此不会包含在生成的 Rollup 包中。

### generateTypeDeclarations

_默认值: `true`_

默认情况下，Stencil 将通过目标选项上的 `generateTypeDeclarations` 字段生成类型声明文件(`.d.ts` 文件)，作为 `dist-custom-elements` 输出目标的一部分。
类型声明文件将放置在 Stencil 项目根目录的 `dist/types` 目录中。此时，无法配置此输出目标。

将此标志设置为 `false` 将不会为 `dist-custom-elements` 输出目标生成类型声明文件。

:::info 提示
当设置为生成类型声明时，Stencil 遵守通过 `customElementsExportBehavior` 选择的导出行为，并生成特定于生成的[输出目录](#dir)内容的类型声明 `index.js` 文件。
:::

### includeGlobalScripts

_默认值: `false`_

将此标志设置为 `true` 将在打包文件中包含[全局脚本](../config/overview#globalscript)，并在打包文件入口点加载后执行它们。

### isPrimaryPackageOutputTarget

_默认值: `false`_

如果为 `true`，则此输出目标将用于验证项目发行版的 `package.json` 字段。
有关更多信息，请参阅[主包输出目标验证](./overview#primary-package-output-target-validation)的概述。

### minify

_默认值: `false`_

将此标志设置为 `true` 将导致文件压缩遵循 [Stencil 配置](../config/overview#minifyjs)中指定的内容。
但是，如果启用了 [`externalRuntime`](#externalruntime) ，它将覆盖此选项，并始终导致禁用压缩。

## 使用自定义元素{#consuming-custom-elements}

默认情况下，自定义元素文件将被写入 `dist/components/`。这个目录可以使用输出目标的 [`dir`](#dir) 配置来配置。

生成的文件将每个导出一个组件类，并且已经打包了样式。然而，这个版本并没有定义自定义元素或者应用任何 polyfills。
组件中引用的静态资源需要使用 `setAssetPath` 来设置(请参阅[使资源可用](#making-assets-available))。

下面是定义自定义元素的示例:

```tsx
import { defineCustomElement } from "my-library/dist/components/hello-world";

defineCustomElement(); // Same as manually calling: customElements.define('hello-world', HelloWorld);
```

输出目录还将包含一个默认导出一些辅助方法的 `index.js`文件。文件内容看起来像这样：

```js
export {
  setAssetPath,
  setPlatformOptions,
} from "@stencil/core/internal/client";
```

:::info 提示
如果指定了 [`customElementsExportBehavior`](#customelementsexportbehavior)，内容可能看起来不一样!
:::

## 使资源可用{#making-assets-available}

出于性能原因，生成的打包文件不包括 JavaScript 输出中构建的[本地资源](../guides/assets.md)，而是建议将静态资源作为外部文件。
通过将它们放在外部，可以确保它们可以按需请求，而不是将它们的内容焊接到 JS 文件中，或者为打包工具添加许多 url 以输出。

确保 [assets](../guides/assets) 对外部构建和 http 服务器可用的一种方法是使用 `setAssetPath()` 设置资源路径。

`setAssetPath()` 函数用于手动设置可以找到静态资源的基本路径。
对于延迟加载的输出目标，资源路径会自动设置，资源会被复制到正确的构建目录中。然而，对于自定义元素的构建，应该使用 `setAssetPath(path)` 来根据 http 服务器上的位置自定义资源路径。

如果组件的脚本是 `type="module"`，则建议使用 `import.meta.url`，例如 `setAssetPath(import.meta.url)`。
其他选项包括 `setAssetPath(document.currentScript.src)`，或者使用打包工具的替换插件

在构建时动态设置路径，例如`setAssetPath(process.env.ASSET_PATH)`。

```tsx
import { setAssetPath } from "my-library/dist/components";

setAssetPath(document.currentScript.src);
```

请确保将资源文件复制到应用程序的公共目录中。这个配置取决于你的脚本是如何打包的，是否打包，以及资源文件从哪里加载。如何将文件复制到生产环境的构建目录取决于打包工具或工具。
下面的配置提供了如何使用流行的打包工具自动完成此操作的示例。

## 分发自定义元素{#distributing-custom-elements}

请参阅我们[发布组件库](../guides/publishing)的文档，了解有关设置库的 `package_json` 文件和发布到包管理器的信息。

默认情况下，自定义元素需要从输出目标配置中指定的[输出目录](#dir)中导入：

```tsx
import { MyComponent } from "best-web-components/dist/components/my-component";
```

但是 `package_json` 中的 `module` 属性可以被修改为指向自定义元素的输出：

:::code-group

```tsx [package.json]
{
  "module": "dist/components/index.js",
  "dependencies": {
    "@stencil/core": "latest"
  },
  ...
}
```

:::

:::info 提示
一定要将 `@stencil/core` 设置为包的依赖项。
:::

因此，可以选择从已发布包的根目录导入组件：

```tsx
import { MyComponent } from "best-web-components";
```

:::info 提示
如果你同时分发 [`dist`](./dist) 和 `dist-custom-elements` 目标的输出，那么由你来选择它们中的哪一个应该出现在 `module` 条目中。
:::

### 在 Typescript 中使用{#usage-in-typescript}

如果你计划支持在 Typescript 中使用组件库，你需要在 `stencil.config.ts` 的输出目标上设置 `generateTypeDeclarations: true`，如下所示：

:::code-group

```tsx [stencil.config.ts]
import { Config } from "@stencil/core";

export const config: Config = {
  outputTargets: [
    {
      type: "dist-custom-elements",
      generateTypeDeclarations: true,
    },
    // ...
  ],
  // ...
};
```

:::

然后你可以在 `package.json` 中设置 `types` 属性，以便你的包的使用者可以找到类型定义，如下所示：

:::code-group

```tsx [package.json]
{
  "module": "dist/components/index.js",
  "types": "dist/components/index.d.ts",
  "dependencies": {
    "@stencil/core": "latest"
  },
  ...
}
```

:::

:::info 提示
如果你在输出目标配置文件中设置了 `dir` 属性，用配置文件中设置的路径替换上面代码片段中的 `dist/components`。
:::

## Example Bundler Configs

"根据您使用的打包工具，自定义元素捆绑包的使用方式会有所不同。以下示例将帮助您的用户在 webpack 和 Rollup 中使用您的组件。"

下面的例子假设你的组件库以 `my-library` 的形式发布到 NPM 上。您应该将其更改为您实际发布库的名称。

用户需要在导入之前安装你的库。

:::code-group

```bash [npm]
npm install my-library
```

```bash [yarn]
npm add my-library
```

```bash [pnpm]
npm add my-library
```

:::

### webpack.config.js

webpack 配置如下所示。请注意，资源文件是如何通过 `CopyPlugin` 工具从库的 `node_module` 文件夹复制到 `dist/assets`的。
如果你的库包含[本地资源](../guides/assets)，这很重要。

```js
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            "node_modules/my-library/dist/my-library/assets"
          ),
          to: path.resolve(__dirname, "dist/assets"),
        },
      ],
    }),
  ],
};
```

### rollup.config.js

Rollup 配置如下所示。请注意，资源是如何通过 `rollup-copy-plugin` 工具从库的 `node_module` 文件夹复制到 `dist/assets` 的。
如果你的库包含[本地资源](../guides/assets)，这很重要。

```js
import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: [{ dir: path.resolve("dist/"), format: "es" }],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extensions: [".css"],
    }),
    copy({
      targets: [
        {
          src: path.resolve(
            __dirname,
            "node_modules/my-library/dist/my-library/assets"
          ),
          dest: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
};
```

## 这与 "dist" 输出目标有何不同?

`dist-custom-elements` 将每个组件构建为一个独立的类，它扩展了 `HTMLElement`。输出是一个标准化的自定义元素，样式已经附加，没有任何 Stencil 的懒加载功能。对于已经处理打包、懒加载和自定义元素的项目来说，这可能是首选。

另一方面，`dist` 输出目标更多地用于那些希望允许组件自己懒加载的项目，而无需设置打包配置。

幸运的是，所有构建可以同时生成，使用相同的源代码，并在相同的发行版中发布。使用哪个版本将由组件库的使用者决定。
