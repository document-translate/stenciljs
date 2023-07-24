---
description: Custom Elements with Stencil
---

# 自定义元素{#custom-elements}

The `dist-custom-elements` output target creates custom elements that directly extend `HTMLElement` and provides simple utility functions for easily defining these elements on the [Custom Element Registry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry). This output target excels in use in frontend frameworks and projects that will handle bundling, lazy-loading, and custom element registration themselves.

This target can be used outside of frameworks as well, if lazy-loading functionality is not required or desired. For using lazily loaded Stencil components, please refer to the [dist output target](./dist).

To generate components using the `dist-custom-elements` output target, add it to a project's `stencil.config.ts` file like so:

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

_default: `undefined`_

在构建过程中执行的[copy tasks](./copy-tasks)数组。

### customElementsExportBehavior

_default: `'default'`_

By default, the `dist-custom-elements` output target generates a single file per component, and exports each of those files individually.

In some cases, library authors may want to change this behavior, for instance to automatically define component children, provide a single file containing all component exports, etc.

This config option provides additional behaviors that will alter the default component export _OR_ custom element definition behaviors
for this target. The desired behavior can be set via the following in a project's Stencil config:

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

_default: `true`_

Setting this flag to `true` will remove the contents of the [output directory](#dir) between builds.

### externalRuntime

_default: `true`_

Setting this flag to `true` results in the following behaviors:

1. Minification will follow what is specified in the [Stencil config](../config/overview#minifyjs).
2. Filenames will not be hashed.
3. All imports from packages under `@stencil/core/*` will be marked as external and therefore not included in the generated Rollup bundle.

### generateTypeDeclarations

_default: `true`_

By default, Stencil will generate type declaration files (`.d.ts` files) as a part of the `dist-custom-elements` output target through the `generateTypeDeclarations` field on the target options. Type declaration files will be placed in the `dist/types` directory in the root of a Stencil project. At this time, this output destination is not able to be configured.

Setting this flag to `false` will not generate type declaration files for the `dist-custom-elements` output target.

:::info 提示
When set to generate type declarations, Stencil respects the export behavior selected via `customElementsExportBehavior` and generates type declarations specific to the content of the generated [output directory's](#dir) `index.js` file.
:::

### includeGlobalScripts

_default: `false`_

Setting this flag to `true` will include [global scripts](../config/overview#globalscript) in the bundle and execute them once the bundle entry point in loaded.

### isPrimaryPackageOutputTarget

_default: `false`_

If `true`, this output target will be used to validate `package.json` fields for your project's distribution. See the overview of [primary package output target validation](./overview#primary-package-output-target-validation)
for more information.

### minify

_default: `false`_

Setting this flag to `true` will cause file minification to follow what is specified in the [Stencil config](../config/overview#minifyjs). _However_, if [`externalRuntime`](#externalruntime) is enabled, it will override this option and always result in minification being disabled.

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

For performance reasons, the generated bundle does not include [local assets](../guides/assets.md) built within the JavaScript output,
but instead it's recommended to keep static assets as external files. By keeping them external this ensures they can be requested on-demand, rather
than either welding their content into the JS file, or adding many URLs for the bundler to add to the output.
One method to ensure [assets](../guides/assets) are available to external builds and http servers is to set the asset path using `setAssetPath()`.

The `setAssetPath()` function is used to manually set the base path where static assets can be found.
For the lazy-loaded output target the asset path is automatically set and assets copied to the correct
build directory. However, for custom elements builds, the `setAssetPath(path)` should be
used to customize the asset path depending on where they are found on the http server.

If the component's script is a `type="module"`, it's recommended to use `import.meta.url`, such
as `setAssetPath(import.meta.url)`. Other options include `setAssetPath(document.currentScript.src)`, or using a bundler's replace plugin to
dynamically set the path at build time, such as `setAssetPath(process.env.ASSET_PATH)`.

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
