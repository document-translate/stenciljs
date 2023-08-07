---
description: 学习如何包装组件，以便人们可以在 React 中使用它们
---

# React 集成

**Supports: React v16.7+ • TypeScript 3.7+ • Stencil v2.9.0+**

Stencil 可以为你的 web 组件生成 React 组件包装器。这允许你的 Stencil 组件在 React 应用程序中使用。与标准 web 组件相比，使用 Stencil 的组件包装器的好处包括：

- 自定义事件将被正确处理，并正确地在 React 渲染树中传播
- 非字符串或数字的属性将被正确地绑定到组件

## 设置{#setup}

### 项目结构{#project-structure}

我们建议在组件库中使用 [monorepo](https://www.toptal.com/front-end/guide-to-monorepos) 结构和组件包装器。
你的项目工作区应该包含你的 Stencil 组件库和生成的 React 组件包装库。

一个项目设置的示例可能看起来类似于：

```bash
top-most-directory/
└── packages/
    ├── stencil-library/
    │   ├── stencil.config.js
    │   └── src/components/
    └── react-library/
        └── src/
            ├── components/
            └── index.ts
```

本指南在 monorepo 中使用 Lerna，但你也可以使用其他解决方案，如 Nx、TurboRepo 等。

要在本教程中使用 Lerna，请全局安装 Lerna:

:::code-group

```bash [npm]
npm install --global lerna
```

```bash [yarn]
yarn global add lerna
```

```bash [pnpm]
pnpm add --global lerna
```

:::

#### 创建一个 monorepo{#creating-a-monorepo}

:::info 提示
如果您已经有一个 monorepo，请跳过本节。
:::

:::code-group

```bash [npm]
# From your top-most-directory/, initialize a workspace
lerna init

# install dependencies
npm install

# install typescript and node types
npm install typescript @types/node --save-dev
```

```bash [yarn]
# From your top-most-directory/, initialize a workspace
lerna init

# install dependencies
yarn install

# install typescript and node types
yarn add typescript @types/node --dev
```

```bash [pnpm]
# From your top-most-directory/, initialize a workspace
lerna init

# install dependencies
pnpm install

# install typescript and node types
pnpm add typescript @types/node --save-dev
```

:::

#### 创建一个 Stencil 组件库

:::info 提示
如果您已经有了 Stencil 组件库，请跳过本节。
:::

:::code-group

```bash [npm]
cd packages/
npm init stencil components stencil-library
cd stencil-library
# Install dependencies
npm install
```

```bash [yarn]
cd packages/
yarn create stencil components stencil-library
cd stencil-library
# Install dependencies
yarn install
```

```bash [pnpm]
cd packages/
pnpm create stencil components stencil-library
cd stencil-library
# Install dependencies
pnpm install
```

:::

#### 创建一个 React 组件库

:::info 提示
如果您已经有了 React 组件库，请跳过本节。
:::

当你第一次创建组件包装器时，你需要有一个 React 库来写入。

在 monorepo 的根目录下运行以下命令来创建一个 React 组件库:

:::code-group

```bash [npm]
# Create a project
lerna create react-library # fill out the prompts accordingly
cd packages/react-library

# Install core dependencies
npm install react react-dom typescript @types/react --save-dev
```

```bash [yarn]
# Create a project
lerna create react-library # fill out the prompts accordingly
cd packages/react-library

# Install core dependencies
yarn add react react-dom typescript @types/react --dev
```

```bash [pnpm]
# Create a project
lerna create react-library # fill out the prompts accordingly
cd packages/react-library

# Install core dependencies
pnpm add react react-dom typescript @types/react --save-dev
```

:::

Lerna 没有附带 TypeScript 配置。在工作空间的根目录，创建一个`tsconfig.json`：

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "noImplicitAny": false,
    "removeComments": true,
    "noLib": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es6",
    "sourceMap": true,
    "lib": ["es6"]
  },
  "exclude": ["node_modules", "**/*.spec.ts", "**/__tests__/**"]
}
```

在你的 `react-library` 项目中，创建一个特定于项目的 `tsconfig.json`，它将扩展根配置：

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "lib": ["dom", "es2015"],
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es2015",
    "skipLibCheck": true,
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "declarationDir": "./dist/types"
  },
  "include": ["lib"],
  "exclude": ["node_modules"]
}
```

更新 `react-library` 中生成的 `package.json`，在现有配置中添加以下选项：

```diff
{
   "main": "lib/react-library.js", // [!code --]
   "main": "dist/index.js", // [!code ++]
   "module": "dist/index.js", // [!code ++]
   "types": "dist/types/index.d.ts", // [!code ++]
   "scripts": {
     "test": "node ./__tests__/react-library.test.js" // [!code --]
     "test": "node ./__tests__/react-library.test.js", // [!code ++]
     "build": "npm run tsc", // [!code ++]
     "tsc": "tsc -p ." // [!code ++]
   } // [!code --]
   }, // [!code ++]
   "files": [
     "lib" // [!code --]
     "dist" // [!code ++]
   ]
   "publishConfig": { // [!code ++]
     "access": "public" // [!code ++]
   }, // [!code ++]
   "dependencies": { // [!code ++]
     "stencil-library": "*" // [!code ++]
   } // [!code ++]
}
```

:::info 提示
Lerna 通过`stencil_library`依赖来解决内部 Stencil 库依赖。请参阅 Lerna 的文档
[包依赖管理](https://lerna.js.org/docs/getting-started#package-dependency-management)了解更多信息。
:::

### 添加 React 输出目标

安装 `@stencil/react-output-target` 依赖到你的 Stencil 组件库。

:::code-group

```bash [npm]
# Install dependency
npm install @stencil/react-output-target --save-dev
```

```bash [yarn]
# Install dependency
yarn add @stencil/react-output-target --save-dev
```

```bash [pnpm]
# Install dependency
pnpm add @stencil/react-output-target --save-dev
```

:::

在项目的 `stencil.config.ts`, 添加 `reactOutputTarget` 配置到 `outputTargets` 数组中：

```ts
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "stencil-library",
  outputTargets: [
    // By default, the generated proxy components will
    // leverage the output from the `dist` target, so we
    // need to explicitly define that output alongside the
    // React target
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    reactOutputTarget({
      componentCorePackage: "stencil-library",
      proxiesFile: "../react-library/lib/components/stencil-generated/index.ts",
    }),
  ],
};
```

:::tip
`proxiesFile` 是所有 React 组件包装器生成的文件的相对路径。您将替换文件路径以匹配项目的结构和各自的名称。你可以生成任何文件名而不是 `components.ts`。

`componentCorePackage` 应该与你的 Stencil 项目的 `package.json` 中的 `name` 字段匹配。
:::

有关每个输出目标选项的详细信息，请参阅下面的 [API 部分](#api)。

您现在可以构建您的 Stencil 组件库来生成组件包装器。

:::code-group

```bash [npm]
# Build the library and wrappers
npm run build
```

```bash [yarn]
# Build the library and wrappers
yarn build
```

```bash [pnpm]
# Build the library and wrappers
pnpm run build
```

:::

如果构建成功，你将在 React 组件库中的 `proxiesFile` 参数指定的位置看到新生成的文件。

### 将这些组件添加到 React 组件库的入口文件中

为了让生成的文件在 React 组件库及其使用者中可用，你需要从入口文件中导出所有内容。首先，将 `react-library.js` 重命名为 `index.ts`。然后，修改内容以匹配以下内容:

```tsx
export * from "./components/stencil-generated";
```

### 注册自定义元素{#registering-custom-elements}

要为懒加载(hydrated) bundle 注册 web 组件，你需要暴露一个方法，用于注册底层 Stencil 生成的自定义元素，以便 React 代理组件使用。
最简单的方法是修改 React 库的入口文件，以重新导出模板加载器的 `defineCustomElements()` 方法。
在你的 React 库的入口文件( `packages/react-library/lib/index.ts` )中，添加以下内容:

```ts
export * from "./components/stencil-generated";
export { defineCustomElements } from "stencil-library/loader"; // [!code ++]
```

### Link Your Packages (Optional)

:::info 提示
如果你已经使用了 monorepo 工具 (Lerna, Nx, etc.), 请跳过本节。
:::

在你成功构建本地版本的 React 组件库之前，你需要将 Stencil 包链接到 React 包。

在你的 Stencil 项目目录中，运行以下命令：

:::code-group

```bash [npm]
# Link the working directory
npm link
```

```bash [yarn]
# Link the working directory
yarn link
```

```bash [pnpm]
# Link the working directory
pnpm link
```

:::

在你的 React 组件库目录下，运行以下命令：

:::code-group

```bash [npm]
# Link the package name
npm link name-of-your-stencil-package
```

```bash [yarn]
# Link the package name
yarn link name-of-your-stencil-package
```

```bash [pnpm]
# Link the package name
pnpm link name-of-your-stencil-package
```

:::

你的 Stencil 包的名称应该与 Stencil 组件库的 `package.json` 中的 `name` 属性匹配。

你的组件库现在已经链接在一起了。你可以在 Stencil 组件库中进行更改，然后运行 `npm run build` 将更改传播到 React 组件库。

:::info 提示
作为 `npm link` 的替代方法，你也可以使用模板组件库的相对路径运行 `npm install`。然而，这个策略会修改你的 `package_json`，所以确保你不提交这些更改很重要。
:::

## Consumer Usage

### Creating a Consumer React App

:::info 提示
如果你已经有了一个 React 应用，请跳过本节。
:::

在 `packages/` 目录下，运行以下命令生成一个 React 应用：

<!-- TODO: see if we can convert this to use `npm2yarn` once related issues are resolved -->
<!-- See https://github.com/facebook/docusaurus/issues/5861 for more information -->

```bash
# Create the React app
npm create vite@latest my-app -- --template react-ts
# of if using yarn
yarn create vite my-app --template react-ts

cd ./my-app

# install dependencies
npm install
# or if using yarn
yarn install
```

你还需要链接你的 React 组件库作为依赖。这一步使您的 React 应用程序能够正确解析从 React 组件库中导入的内容。

通过修改你的 React 应用程序的 `package.json` 来包含以下内容，很容易实现：

```json
"dependencies": {
  "react-library": "*"
}
```

### 使用 React 包装器组件

本节将介绍使用 React 组件包装器的开发者如何使用你的包和组件包装器。

在使用 React 代理组件之前，你需要构建 React 组件库。在 `packages/react-library` 中运行:

:::code-group

```bash [npm]
npm run build
```

```bash [yarn]
yarn build
```

```bash [pnpm]
pnpm run build
```

:::

要在 React 应用程序中使用 React 组件库，请在需要使用组件的文件中从 React 组件库中导入组件。

```tsx
// App.tsx
import "./App.css";
import { MyComponent, defineCustomElements } from "react-library";

defineCustomElements();

function App() {
  return (
    <div className="App">
      <MyComponent first="Your" last="Name" />
    </div>
  );
}

export default App;
```

## API

### componentCorePackage

**Optional**

**Default: The `components.d.ts` file in the Stencil project's `package.json` types field**

**Type: `string`**

消费者可以使用的 Stencil 包的名称(即 Stencil 组件库的 `package.json` 中的 `name` 属性的值)。
这用于在编译期间为组件编写正确的导入。

运行以下命令生成一个入门 Stencil 项目:

:::code-group

```bash [npm]
npm init stencil component my-component-lib
```

```bash [yarn]
yarn create stencil component my-component-lib
```

```bash [pnpm]
pnpm create stencil component my-component-lib
```

:::

`componentCorePackage` 将被设置为：

```ts
// stencil.config.ts

export const config: Config = {
  ...,
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: 'my-component-lib',
      // ... additional config options
    })
  ]
}
```

导入路径如下所示：

```js
import { defineCustomElement as defineMyComponent } from "my-component-lib/components/my-component.js";
```

:::info 提示
尽管此字段是可选的，但 _强烈_ 建议始终定义它，以避免在组合其他 API 参数时无法正确生成路径的潜在问题。
:::

### customElementsDir

**Optional**

**Default: 'dist/components'**

**Type: `string`**

如果 [includeImportCustomElements](#includeimportcustomelements) 为 `true`，此选项可用于指定生成的自定义元素所在的目录。
只有当 `dist-custom-elements` 输出目标上的 `dir` 字段被设置为默认目录以外的目录时，才需要设置此值。

### excludeComponents

**Optional**

**Default: `[]`**

**Type: `string[]`**

这可以让你指定不想生成 React 包装组件的组件标签名。如果你需要编写特定于框架的组件版本，这很有用。
例如，在 Ionic 框架中，它用于路由组件(如选项卡)，以便 Ionic 框架可以更好地与 React Router 集成。

### includeDefineCustomElements

**Optional**

**Default: `true`**

**Type: `boolean`**

如果为 `true`，所有的 Web 组件将自动注册到自定义元素注册表。这只能在延迟加载 Web 组件时使用，当 `includeImportCustomElements` 为 `true` 时将不起作用。

### includeImportCustomElements

**Optional**

**Default: `undefined`**

**Type: `boolean`**

如果为 `true`，当组件在用户的应用程序内部被导入时，输出目标将导入自定义元素实例并将其注册到自定义元素注册表。
这只能用于[自定义元素包](../output-targets/custom- Elements)，而不能用于惰性加载组件。

### includePolyfills

**Optional**

**Default: `true`**

**Type: `boolean`**

如果为 `true`， polyfills 将自动导入，`applyPolyfills` 函数将在你的代理文件中被调用。
这只能在延迟加载 Web 组件时使用，当启用 `includeImportCustomElements` 时将不起作用。

### loaderDir

**Optional**

**Default: `/dist/loader`**

**Type: `string`**

在构建的项目中，`defineCustomElements` 辅助方法存在的路径。此选项仅在启用 `includeDefineCustomElements` 时使用。

### proxiesFile

**Required**

**Type: `string`**

此参数允许您命名包含在编译过程中生成的所有组件包装器定义的文件。这是您应该在 React 项目中导入的第一个文件。

## FAQ's

### 我必须使用 dist 输出目标吗?

不！默认情况下，输出目标将使用 `dist` 输出，但也可以使用 `dist-custom-elements` 的输出。

为此，只需在输出目标配置中设置 `includeImportCustomElements` 选项，并确保将[自定义元素输出目标](../output-targets/custom-elements)添加到模板配置的输出目标数组中:

```ts
// stencil.config.ts

export const config: Config = {
  ...,
  outputTargets: [
    // Needs to be included
    {
      type: 'dist-custom-elements'
    },
    reactOutputTarget({
      componentCorePackage: 'component-library',
      proxiesFile: '{path to your proxy file}',
      // This is what tells the target to use the custom elements output
      includeImportCustomElements: true
    })
  ]
}
```

现在，所有生成的导入都将指向自定义元素输出的默认目录。如果你使用 `dir` 属性为 `dist-custom-elements` 指定了一个不同的目录，你还需要为 Vue 的输出目标指定该目录。
查看 [API 部分](#customelementsdir)以获取更多信息。

此外，当生成的组件模块被引导时，所有的 Web 组件都将被自动定义。

### 什么是最好的 event 名字的写法?

最初用模板书写的事件名称不应该包含特殊字符。尝试使用驼峰格式的事件名称来实现框架之间的互操作性。
