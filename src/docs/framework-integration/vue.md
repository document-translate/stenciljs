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
The `stencil-library` dependency is how Lerna knows to resolve the internal Stencil library dependency. See Lerna's documentation on
[package dependency management](https://lerna.js.org/docs/getting-started#package-dependency-management) for more information.
:::

### 添加 Vue 输出目标{#adding-the-vue-output-target}

安装 `@stencil/vue-output-target` 依赖到你的 Stencil 组件库.

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

在项目的 `stencil.config.ts`, 添加 `vueOutputTarget` 配置到 `outputTargets` 数组中:

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

如果构建成功，您现在将在 `proxiesFile` 中指定的文件中拥有内容。

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

You can now finally export the generated component wrappers and the Vue plugin for your component library to make them available to implementers. Export
the `plugin.ts` file created in the previous step, as well as the file `proxiesFile` generated by the Vue Output Target:

```ts
// packages/vue-library/lib/index.ts
export * from "./components";
export * from "./plugin";
```

### Link Your Packages (Optional)

:::info 提示
If you are using a monorepo tool (Lerna, Nx, etc.), skip this section.
:::

Before you can successfully build a local version of your Vue component library, you will need to link the Stencil package to the Vue package.

From your Stencil project's directory, run the following command:

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

From your Vue component library's directory, run the following command:

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

The name of your Stencil package should match the `name` property from the Stencil component library's `package.json`.

Your component libraries are now linked together. You can make changes in the Stencil component library and run `npm run build` to propagate the
changes to the Vue component library.

:::info 提示
As an alternative to `npm link`, you can also run `npm install` with a relative path to your Stencil component library. This strategy,
however, will modify your `package.json` so it is important to make sure you do not commit those changes.
:::

## Consumer Usage

### Creating a Consumer Vue App

From the `packages/` directory, run the following command to generate a Vue app:

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

Follow the prompts and choose the options best for your project.

You'll also need to link your Vue component library as a dependency. This step makes it so your Vue app will be able to correctly
resolve imports from your Vue library. This is easily done by modifying your Vue app's `project.json` to include the following:

```json
"dependencies": {
  "vue-library": "*"
}
```

For more information, see the Lerna documentation on [package dependency management](https://lerna.js.org/docs/getting-started#package-dependency-management).

Lastly, you'll want to update the generated `vite.config.ts`:

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

This will prevent Vue from logging a warning about failing to resolve components (e.g. "Failed to resolve component: my-component").

### Consuming the Vue Wrapper Components

This section covers how developers consuming your Vue component wrappers will use your package and component wrappers.

Before you can use your Vue proxy components, you'll need to build your Vue component library. From `packages/vue-library` simply run:

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

In your `main.js` file, import your component library plugin and use it:

```js
// src/main.js
import { ComponentLibrary } from "vue-library";

createApp(App).use(ComponentLibrary).mount("#app");
```

In your page or component, you can now import and use your component wrappers:

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

The name of the Stencil package where components are available for consumers (i.e. the value of the `name` property in your Stencil component library's `package.json`).
This is used during compilation to write the correct imports for components.

For a starter Stencil project generated by running:

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

The `componentCorePackage` would be set to:

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

Which would result in an import path like:

```js
import { defineCustomElement as defineMyComponent } from "my-component-lib/components/my-component.js";
```

:::info 提示
Although this field is optional, it is _highly_ recommended that it always be defined to avoid potential issues with paths not being generated correctly
when combining other API arguments.
:::

### componentModels

**Optional**

**Default: `[]`**

**Type: `ComponentModelConfig[]`**

This option is used to define which components should be integrated with `v-model`. It allows you to set what the target prop is (i.e. `value`),
which event will cause the target prop to change, and more.

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

If [includeImportCustomElements](#includeimportcustomelements) is `true`, this option can be used to specify the directory where the generated
custom elements live. This value only needs to be set if the `dir` field on the `dist-custom-elements` output target was set to something other than
the default directory.

### excludeComponents

**Optional**

**Default: `[]`**

**Type: `string[]`**

This lets you specify component tag names for which you don't want to generate Vue wrapper components. This is useful if you need to write framework-specific versions of components. For instance, in Ionic Framework, this is used for routing components - like tabs - so that
Ionic Framework can integrate better with Vue's Router.

### includeDefineCustomElements

**Optional**

**Default: `true`**

**Type: `boolean`**

If `true`, all Web Components will automatically be registered with the Custom Elements Registry. This can only be used when lazy loading Web Components and will not work when `includeImportCustomElements` is `true`.

### includeImportCustomElements

**Optional**

**Default: `undefined`**

**Type: `boolean`**

If `true`, the output target will import the custom element instance and register it with the Custom Elements Registry when the component is imported inside of a user's app. This can only be used with the [Custom Elements Bundle](../output-targets/custom-elements.md) and will not work with lazy loaded components.

### includePolyfills

**Optional**

**Default: `true`**

**Type: `boolean`**

If `true`, polyfills will automatically be imported and the `applyPolyfills` function will be called in your proxies file. This can only be used when lazy loading Web Components and will not work when `includeImportCustomElements` is enabled.

### loaderDir

**Optional**

**Default: `/dist/loader`**

**Type: `string`**

The path to where the `defineCustomElements` helper method exists within the built project. This option is only used when `includeDefineCustomElements` is enabled.

### proxiesFile

**Required**

**Type: `string`**

This parameter allows you to name the file that contains all the component wrapper definitions produced during the compilation process. This is the first file you should import in your Vue project.

## FAQ

### Do I have to use the `dist` output target?

No! By default, this output target will look to use the `dist` output, but the output from `dist-custom-elements` can be used alternatively.

To do so, simply set the `includeImportCustomElements` option in the output target's config and ensure the
[custom elements output target](../output-targets/custom-elements.md) is added to the Stencil config's output target array:

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

Now, all generated imports will point to the default directory for the custom elements output. If you specified a different directory
using the `dir` property for `dist-custom-elements`, you need to also specify that directory for the Vue output target. See
[the API section](#customelementsdir) for more information.

In addition, all the Web Components will be automatically defined as the generated component modules are bootstrapped.

### Vue warns "Failed to resolve component: my-component"

#### Lazy loaded bundle

If you are using Vue CLI, update your `vue.config.js` to match your custom element selector as a custom element:

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
          // The stencil-library components start with "my-"
          isCustomElement: (tag) => tag.startsWith("my-"),
        };
        return options;
      });
  },
});
```

#### Custom elements bundle

If you see this warning, then it is likely you did not import your component from your Vue library: `vue-library`. By default, all Vue components are locally registered, meaning you need to import them each time you want to use them.

Without importing the component, you will only get the underlying Web Component, and Vue-specific features such as `v-model` will not work.

To resolve this issue, you need to import the component from `vue-library` (your package name) and provide it to your Vue component:

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

### Vue warns: "slot attributes are deprecated vue/no-deprecated-slot-attribute"

The slots that are used in Stencil are [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots) slots, which are different than the slots used in Vue 2. Unfortunately, the APIs for both are very similar, and your linter is likely getting the two confused.

You will need to update your lint rules in `.eslintrc.js` to ignore this warning:

```js
module.exports = {
  rules: {
    "vue/no-deprecated-slot-attribute": "off",
  },
};
```

If you are using VSCode and have the Vetur plugin installed, you are likely getting this warning because of Vetur, not ESLint. By default, Vetur loads the default Vue 3 linting rules and ignores any custom ESLint rules.

To resolve this issue, you will need to turn off Vetur's template validation with `vetur.validation.template: false`. See the [Vetur Linting Guide](https://vuejs.github.io/vetur/guide/linting-error.html#linting) for more information.

### Method on component is not a function

In order to access a method on a Stencil component in Vue, you will need to access the underlying Web Component instance first:

```ts
// ✅ This is correct
myComponentRef.value.$el.someMethod();

// ❌ This is incorrect and will result in an error.
myComponentRef.value.someMethod();
```

### Output commonjs bundle for Node environments

First, install `rollup` and `rimraf` as dev dependencies:

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

Next, create a `rollup.config.js` in `/packages/vue-library/`:

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
Update the `external` list for any external dependencies. Update the `stencil-library` to match your Stencil library's package name.
:::

Next, update your `package.json` to include the scripts for rollup:

```json
{
  "scripts": {
    "build": "npm run clean && npm run tsc && npm run bundle",
    "bundle": "rollup --config rollup.config.js",
    "clean": "rimraf dist dist-transpiled"
  }
}
```
