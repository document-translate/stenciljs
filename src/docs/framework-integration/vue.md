---
description: Learn how to wrap your components so that people can use them natively in Vue
---

# Vue 集成

**支持: Vue 3 • TypeScript 4.0+ • Stencil v2.9.0+**

Stencil 可以为您的 web 组件生成 Vue 组件包装器。这允许您的 Stencil 组件在 Vue 3 应用程序中使用。与标准 web 组件相比，使用 Stencil 的组件包装器的好处包括：

- 对组件进行类型检查。
- 集成 router link 和 Vue router。
- 可选的，表单控件 web 组件可以与`v-model`一起使用。

## 设置{#setup}

### 项目结构{#project-structure}

我们建议在组件库中使用 [monorepo](https://www.toptal.com/front-end/guide-to-monorepos) 结构和组件包装器。
您的项目工作区应该包含您的 Stencil 组件库和用于生成 Vue 组件包装器的库。

一个项目设置的示例可能看起来类似于：

```bash
top-most-directory/
└── packages/
    ├── vue-library/
    │   └── src/
    │       ├── lib/
    │       └── index.ts
    └── stencil-library/
        ├── stencil.config.js
        └── src/components
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

#### 创建一个 Vue 组件库

:::info 提示
如果您已经有了 Vue 组件库，请跳过本节。
:::

第一次想要创建组件包装器时，需要有一个 Vue 库包来进行编写。

使用 Lerna 和 Vue CLI，为你的 Vue 组件包装器生成一个工作区和一个库:

:::code-group

```bash [npm]
# From your top-most-directory/
lerna create vue-library
# Follow the prompts and confirm
cd packages/vue-library
# Install Vue dependency
npm install vue@3 --save-dev
```

```bash [yarn]
# From your top-most-directory/
lerna create vue-library
# Follow the prompts and confirm
cd packages/vue-library
# Install Vue dependency
yarn add vue@3 --dev
```

```bash [pnpm]
# From your top-most-directory/
lerna create vue-library
# Follow the prompts and confirm
cd packages/vue-library
# Install Vue dependency
pnpm add vue@3 --save-dev
```

:::

Lerna 没有附带 TypeScript 配置。在工作区的根目录下，创建一个 `tsconfig.json`：

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

在你的 `vue-library` 项目中，创建一个项目级别的 `tsconfig.json` 来扩展根配置:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "lib": ["dom", "es2020"],
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es2017",
    "skipLibCheck": true
  },
  "include": ["lib"],
  "exclude": ["node_modules"]
}
```

在 `vue-library` 项目中更新生成的 `package.json`，将以下选项添加到现有配置中：

```diff
{
   "main": "lib/vue-library.js", // [!code --]
   "main": "dist/index.js", // [!code ++]
   "types": "dist/index.d.ts", // [!code ++]
  "scripts": {
     "test": "echo \"Error: run tests from root\" && exit 1" // [!code --]
     "test": "echo \"Error: run tests from root\" && exit 1", // [!code ++]
     "build": "npm run tsc", // [!code ++]
     "tsc": "tsc -p ." // [!code ++]
   } // [!code --]
   }, // [!code ++]
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

### 添加 Vue 输出目标{#adding-the-vue-output-target}

安装 `@stencil/vue-output-target` 依赖到你的 Stencil 组件库。

:::code-group

```bash [npm]
# 安装依赖 (from `packages/stencil-library`)
npm install @stencil/vue-output-target --save-dev
```

```bash [yarn]
# 安装依赖 (from `packages/stencil-library`)
yarn add @stencil/vue-output-target --dev
```

```bash [pnpm]
# 安装依赖 (from `packages/stencil-library`)
pnpm add @stencil/vue-output-target --save-dev
```

:::

在项目的 `stencil.config.ts`, 添加 `vueOutputTarget` 配置到 `outputTargets` 数组中：

```ts
import { vueOutputTarget } from "@stencil/vue-output-target";

export const config: Config = {
  namespace: "stencil-library",
  outputTargets: [
    // By default, the generated proxy components will
    // leverage the output from the `dist` target, so we
    // need to explicitly define that output alongside the
    // Vue target
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    vueOutputTarget({
      componentCorePackage: "stencil-library",
      proxiesFile: "../vue-library/lib/components.ts",
    }),
  ],
};
```

:::tip
`proxiesFile` 是所有 Vue 组件包装器生成的文件的相对路径。您将替换文件路径以匹配项目的结构和各自的名称。你可以生成任何文件名而不是 `components.ts`。

`componentCorePackage` 应该与你的 Stencil 项目的 `package.json` 中的 `name` 字段匹配。
:::

现在可以构建 Stencil 组件库来生成组件包装器。

:::code-group

```bash [npm]
# Build the library and wrappers (from `packages/stencil-library`)
npm run build
```

```bash [yarn]
# Build the library and wrappers (from `packages/stencil-library`)
yarn build
```

```bash [pnpm]
# Build the library and wrappers (from `packages/stencil-library`)
pnpm run build
```

:::

如果构建成功，您现在将在 `proxiesFile` 参数指定的位置看到新生成的文件。

### 注册自定义元素{#registering-custom-elements}

要将 web 组件注册为 lazy-loaded (hydrated) 捆绑包，你需要为 Vue 插件创建一个新文件:

```ts
// packages/vue-library/lib/plugin.ts

import { Plugin } from "vue";
import { applyPolyfills, defineCustomElements } from "stencil-library/loader";

export const ComponentLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  },
};
```

现在，您终于可以为您的组件库导出生成的组件包装器和 Vue 插件，以使它们可供实现者使用。
导出上一步创建的 `plugin.ts` 文件，以及 Vue 输出目标生成的 `proxiesFile` 文件:

```ts
// packages/vue-library/lib/index.ts
export * from "./components";
export * from "./plugin";
```

### Link Your Packages (Optional)

:::info 提示
如果你已经使用了 monorepo 工具 (Lerna, Nx, etc.), 请跳过本节。
:::

在你成功构建本地版本的 Vue 组件库之前，你需要将 Stencil 包链接到 Vue 包。

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

在你的 Vue 组件库目录下，运行以下命令：

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

你的组件库现在已经链接在一起了。你可以在 Stencil 组件库中进行更改，然后运行 `npm run build` 将更改传播到 Vue 组件库。

:::info 提示
作为 `npm link` 的替代方法，你也可以使用模板组件库的相对路径运行 `npm install`。然而，这个策略会修改你的 `package_json`，所以确保你不提交这些更改很重要。
:::

## 消费者使用{#consumer-usage}

### 创建一个消费级 Vue 应用

在 `packages/` 目录下，运行以下命令生成一个 Vue 应用：

:::code-group

```bash [npm]
npm init vue@3 my-app
```

```bash [yarn]
yarn create vue@3 my-app
```

```bash [pnpm]
pnpm create vue@3 my-app
```

:::

按照提示选择最适合您的项目的选项。

你还需要链接你的 Vue 组件库作为依赖。这一步使您的 Vue 应用程序能够正确解析从 Vue 库中导入的内容。通过修改你的 Vue 应用程序的 `package.json` 来包含以下内容，很容易实现:

```json
"dependencies": {
  "vue-library": "*"
}
```

有关更多信息，请参阅 Lerna 文档[包依赖管理](https://lerna.js.org/docs/getting-started#package-dependency-management)。

最后，你需要更新生成的 `vite.config.ts`：

```diff
export default defineConfig({
   plugins: [vue(), vueJsx()], // [!code --]
   plugins: [ // [!code ++]
     vue({ // [!code ++]
       template: { // [!code ++]
         compilerOptions: { // [!code ++]
           // treat all tags with a dash as custom elements // [!code ++]
           isCustomElement: (tag) => tag.includes('-'), // [!code ++]
         }, // [!code ++]
       }, // [!code ++]
     }), // [!code ++]
     vueJsx(), // [!code ++]
   ], // [!code ++]
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

这将防止 Vue 记录关于组件解析失败的警告(例如:Failed to resolve component: my-component)。

### 使用 Vue 包装器组件

本节介绍使用 Vue 组件包装器的开发人员将如何使用您的包和组件包装器。

在使用 Vue 代理组件之前，你需要构建 Vue 组件库。在 `packages/vue-library` 中简单地运行：

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

在你的 `main.js` 文件中，导入组件库插件并使用它:

```js
// src/main.js
import { ComponentLibrary } from "vue-library";

createApp(App).use(ComponentLibrary).mount("#app");
```

在你的页面或组件中，你现在可以导入和使用组件包装器了:

```html
<template>
  <my-component first="Your" last="Name"></my-component>
</template>
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
    vueOutputTarget({
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

### componentModels

**Optional**

**Default: `[]`**

**Type: `ComponentModelConfig[]`**

此选项用于定义哪些组件应该与 `v-model` 集成。它允许你设置目标属性是什么(比如：`value`)，哪些事件会导致目标属性改变，等等。

```tsx
const componentModels: ComponentModelConfig[] = [
  {
    elements: ["my-input", "my-textarea"],
    event: "v-on-change",
    externalEvent: "on-change",
    targetAttr: "value",
  },
];

export const config: Config = {
  namespace: "stencil-library",
  outputTargets: [
    vueOutputTarget({
      componentCorePackage: "component-library",
      proxiesFile: "{path to your proxy file}",
      componentModels: componentModels,
    }),
  ],
};
```

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

这允许您指定您不想为其生成 Vue 包装组件的组件标签名称。如果你需要编写特定于框架的组件版本，这很有用。
例如，在 Ionic 框架中，它用于路由组件(如 tabs)，以便 Ionic 框架可以更好地与 Vue 的路由器集成。

### includeDefineCustomElements

**Optional**

**Default: `true`**

**Type: `boolean`**

如果为 `true`，所有的 Web 组件将自动注册到自定义元素注册表。这只能在延迟加载 Web 组件时使用，当 `includeImportCustomElements` 为 `true` 时将不起作用。

### includeImportCustomElements{#includeimportcustomelements}

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

此参数允许您命名包含在编译过程中生成的所有组件包装器定义的文件。这是您应该在 Vue 项目中导入的第一个文件。

## FAQ

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
    vueOutputTarget({
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

### Vue 警告 "Failed to resolve component: my-component"

#### Lazy loaded bundle

如果你使用的是 Vue CLI，更新你的 `vue.config.js` 来匹配你的自定义元素选择器:

```js
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compilerOptions = {
          ...options.compilerOptions,
          // stencil-library 组件以 "my-" 开头
          isCustomElement: (tag) => tag.startsWith("my-"),
        };
        return options;
      });
  },
});
```

#### Custom elements bundle

如果你看到这个警告，那么很可能你没有从 Vue 库 `vue-library` 中导入你的组件。默认情况下，所有 Vue 组件都是在本地注册的，这意味着每次你想使用它们时都需要导入它们。

如果不导入组件，你将只得到底层的 Web 组件，而 vue 特有的功能，如 `v-model` 将不起作用。

要解决这个问题，你需要从 `Vue-library` (你的包名)中导入组件并将其提供给你的 Vue 组件:

```html
<template>
  <my-component first="Your" last="Name"></my-component>
</template>

<script lang="ts">
  import { MyComponent } from "vue-library";
  import { defineComponent } from "vue";

  export default defineComponent({
    components: { MyComponent },
  });
</script>
```

### Vue 警告: "slot attributes are deprecated vue/no-deprecated-slot-attribute"

Stencil 中使用的 slot 是[Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots) slot，
与 Vue 2 中使用的 slot 不同。不幸的是，两者的 api 非常相似，你的 lint 程序可能会把两者搞混。

你需要更新 `.eslintrc.js` 中的 lint 规则来忽略这个警告:

```js
module.exports = {
  rules: {
    "vue/no-deprecated-slot-attribute": "off",
  },
};
```

如果你使用的是 VSCode 并且安装了 Vetur 插件，你得到这个警告可能是因为 Vetur，而不是 ESLint。默认情况下，Vetur 加载默认的 Vue 3 检查规则并忽略任何自定义的 ESLint 规则。

要解决这个问题，你需要使用 `vetur.validation.template: false` 关闭 Vetur 的模板验证。更多信息请参阅[Vetur lint 指南](https://vuejs.github.io/vetur/guide/linting-error.html#linting)。

### 组件上的方法不是函数

为了在 Vue 中访问 Stencil 组件上的方法，你需要首先访问底层的 Web 组件实例:

```ts
// ✅ 这是正确的
myComponentRef.value.$el.someMethod();

// ❌ 这是不正确的，将导致错误。
myComponentRef.value.someMethod();
```

### 为 Node 环境输出 commonjs 包

首先，安装 `rollup` 和 `rimraf` 作为开发依赖：

:::code-group

```bash [npm]
npm i -D rollup rimraf
```

```bash [yarn]
yarn add --dev rollup rimraf
```

```bash [pnpm]
pnpm add -D rollup rimraf
```

:::

接下来, 在 `/packages/vue-library/` 下创建 `rollup.config.js`:

```js
const external = ["vue", "vue-router"];

export default {
  input: "dist-transpiled/index.js",
  output: [
    {
      dir: "dist/",
      entryFileNames: "[name].esm.js",
      chunkFileNames: "[name]-[hash].esm.js",
      format: "es",
      sourcemap: true,
    },
    {
      dir: "dist/",
      format: "commonjs",
      preferConst: true,
      sourcemap: true,
    },
  ],
  external: (id) => external.includes(id) || id.startsWith("stencil-library"),
};
```

:::info 提示
更新所有外部依赖的 `external` 列表。更新 `stencil_library` 以匹配你的 Stencil 库的包名称。
:::

接下来，更新你的 `package.json` 以包含 rollup 的脚本：

```json
{
  "scripts": {
    "build": "npm run clean && npm run tsc && npm run bundle",
    "bundle": "rollup --config rollup.config.js",
    "clean": "rimraf dist dist-transpiled"
  }
}
```
